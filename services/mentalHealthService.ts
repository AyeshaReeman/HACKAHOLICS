import { MentalHealthLog, Sentiment, Emotion, User } from '../types';
import { INITIAL_MENTAL_HEALTH_LOGS } from '../constants';
import { analyzeMentalHealthMessage } from './geminiService';

// --- In-Memory Database Simulation ---
let mentalHealthLogs: MentalHealthLog[] = [...INITIAL_MENTAL_HEALTH_LOGS];

// --- Mock API Service Layer ---

/**
 * Simulates POST /api/mental-health/chat
 * Analyzes a user's chat message, generates an AI response, and saves the log.
 * @returns A tuple containing the AI's text response and the full created log entry.
 */
export const postChatMessage = async (
  nurseId: string,
  message: string
): Promise<[string, MentalHealthLog]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  console.log(`Analyzing message for nurse ${nurseId}: "${message}"`);
  const analysis = await analyzeMentalHealthMessage(message);

  const newLog: MentalHealthLog = {
    id: `mh-${Date.now()}`,
    nurseId,
    message,
    sentiment: analysis.sentiment,
    emotion: analysis.emotion,
    intensity: analysis.intensity,
    timestamp: new Date().toISOString(),
    isCheckIn: false,
  };

  mentalHealthLogs.unshift(newLog); // Add to the start of the array
  console.log("New log created:", newLog);

  return [analysis.response, newLog];
};

/**
 * Simulates POST /api/mental-health/checkin
 * Saves a daily check-in entry.
 * @returns The full created log entry.
 */
export const postCheckin = async (
  nurseId: string,
  moodRating: number, // 1-10
  shiftFeeling: string
): Promise<MentalHealthLog> => {
   // Simulate network delay
  await new Promise(res => setTimeout(res, 300));

  // Simple mapping from 1-10 rating to intensity and emotion
  const intensity = moodRating * 10;
  let emotion = Emotion.Neutral;
  let sentiment = Sentiment.Neutral;

  if (moodRating <= 3) {
      emotion = Emotion.Sadness;
      sentiment = Sentiment.Negative;
  } else if (moodRating >= 8) {
      emotion = Emotion.Calm;
      sentiment = Sentiment.Positive;
  }

  const message = `Daily Check-in: Mood rating ${moodRating}/10. Shift feeling: "${shiftFeeling}"`;

  const newLog: MentalHealthLog = {
    id: `mh-checkin-${Date.now()}`,
    nurseId,
    message,
    sentiment,
    emotion,
    intensity,
    timestamp: new Date().toISOString(),
    isCheckIn: true,
  };
  
  mentalHealthLogs.unshift(newLog);
  console.log("New check-in log created:", newLog);

  return newLog;
};

/**
 * Simulates GET /api/mental-health/history/<nurse_id>
 * Retrieves all historical logs for a given nurse.
 */
export const getHistory = async (nurseId: string): Promise<MentalHealthLog[]> => {
   // Simulate network delay
  await new Promise(res => setTimeout(res, 200));
  
  return mentalHealthLogs.filter(log => log.nurseId === nurseId);
};
