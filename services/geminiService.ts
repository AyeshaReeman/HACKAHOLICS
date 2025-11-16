

import { GoogleGenAI, Type } from "@google/genai";
import { Patient, Emotion, Sentiment } from '../types';

// FIX: Per Gemini API guidelines, initialize directly with process.env.API_KEY and assume it's present.
// Removed manual API key check and mock summary fallback.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const generateHandoffSummary = async (patient: Patient): Promise<string> => {
  const patientDataString = `
    - Name: ${patient.name}
    - Age: ${patient.age}
    - Gender: ${patient.gender}
    - Diagnosis: ${patient.diagnosis}
    - Attending Physician: ${patient.attendingPhysician}
    - Current Vitals:
      - Heart Rate: ${patient.vitals.heartRate} bpm
      - Blood Pressure: ${patient.vitals.bloodPressure}
      - Temperature: ${patient.vitals.temperature}°C
      - Respiratory Rate: ${patient.vitals.respiratoryRate} bpm
      - Oxygen Saturation: ${patient.vitals.oxygenSaturation}%
    - Active Alerts: ${patient.alerts.length > 0 ? patient.alerts.map(a => `${a.type}: ${a.message}`).join('; ') : 'None'}
    - Recent Nurse's Notes: ${patient.notes}
  `;

  const prompt = `
    You are an expert charge nurse responsible for creating clear, concise, and actionable patient handoff reports.
    Your goal is to ensure continuity of care and highlight the most critical information for the incoming nurse.
    
    Generate a handoff summary for the following patient using a structured format. Focus on the key issues, recent changes, and the immediate plan.
    Use markdown for formatting, including bolding for emphasis and bullet points for clarity.
    
    The format should be:
    **Patient:** [Name], [Age] [Gender] in Room [Room Number]
    **Diagnosis:** [Primary Diagnosis]
    **Situation:** Brief, one-sentence overview of the patient's current status.
    **Background:** Key context, such as recent procedures or significant events.
    **Assessment:** Summary of current vitals, important lab results, and your clinical assessment. Highlight any abnormalities.
    **Recommendation (Plan):** Clear, actionable steps for the next nurse. What needs to be done, monitored, or followed up on?

    Patient Data:
    ${patientDataString}
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary:", error);
    return "Error: Could not generate AI summary. Please check the console for details.";
  }
};


export interface MentalHealthAnalysis {
    sentiment: Sentiment;
    emotion: Emotion;
    intensity: number; // 0-100
    response: string;
}

export const analyzeMentalHealthMessage = async (message: string): Promise<MentalHealthAnalysis> => {
    const systemInstruction = `
        You are an AI companion for healthcare professionals, specifically nurses, designed to provide a safe space for them to express their feelings.
        Your primary role is to listen, analyze their message for emotional content, and provide a short, supportive, non-medical response.
        
        NEVER provide medical advice, diagnosis, or treatment plans.
        Keep your tone calm, empathetic, and encouraging.
        Your response should include mindfulness tips, suggestions for short breaks, breathing exercises, or positive reinforcement based on the detected emotion.
        
        You MUST analyze the user's message and return a structured JSON object according to the provided schema.
        The emotion should be one of: ${Object.values(Emotion).join(', ')}.
        The sentiment should be one of: ${Object.values(Sentiment).join(', ')}.
        The intensity score (0-100) should reflect the strength of the primary emotion.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        sentiment: { type: Type.STRING, enum: Object.values(Sentiment) },
                        emotion: { type: Type.STRING, enum: Object.values(Emotion) },
                        intensity: { type: Type.INTEGER, description: 'A score from 0 to 100 representing the strength of the emotion.' },
                        response: { type: Type.STRING, description: 'A supportive, non-medical response with coping suggestions for the user.' },
                    },
                    required: ['sentiment', 'emotion', 'intensity', 'response'],
                },
            },
        });

        // The response text is a JSON string that needs to be parsed
        const analysis = JSON.parse(response.text);
        return analysis as MentalHealthAnalysis;

    } catch (error) {
        console.error("Error analyzing mental health message:", error);
        // Fallback in case of API error
        return {
            sentiment: Sentiment.Neutral,
            emotion: Emotion.Neutral,
            intensity: 0,
            response: "I'm here to listen. Sometimes just writing things down can help. Remember to take a deep breath."
        };
    }
};