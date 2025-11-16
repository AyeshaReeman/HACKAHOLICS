
import React, { useState, useEffect } from 'react';
import { NurseFatigue, FatigueStatus, FatigueInputs } from '../types';
import { NURSE_ACTIVITY_DATA } from '../constants';

// --- Embedded Fatigue Engine Logic ---

// The core scoring algorithm based on weighted factors
const calculateRawScore = (inputs: FatigueInputs): number => {
  return (
    inputs.hours_worked * 0.6 +
    inputs.consecutive_shifts * 0.5 +
    inputs.night_shifts_last_7_days * 0.4 +
    inputs.critical_patients_assigned * 0.4 +
    inputs.handoffs_completed_today * 0.2
  );
};

// Determines fatigue level, status, and a corresponding recommendation from a score
const getFatigueDetails = (score: number): { status: FatigueStatus; recommendation: string } => {
  const roundedScore = Math.round(score);
  if (roundedScore >= 9) {
    return { status: FatigueStatus.Critical, recommendation: "Critical fatigue. Immediate intervention required. Inform charge nurse." };
  }
  if (roundedScore >= 7) {
    return { status: FatigueStatus.High, recommendation: "High fatigue detected. Take a 15-min break, hydrate, and consider a brief walk." };
  }
  if (roundedScore >= 4) {
    return { status: FatigueStatus.Moderate, recommendation: "Moderate fatigue. Ensure you take your next scheduled break. Stay hydrated." };
  }
  return { status: FatigueStatus.Normal, recommendation: "Fatigue level is normal. Continue monitoring and practice self-care." };
};

// Simulates fetching and processing dynamic data for a nurse
const getDynamicFatigueData = (nurseId: string): NurseFatigue & { prediction: string } => {
  const baseData = NURSE_ACTIVITY_DATA[nurseId];
  if (!baseData) {
    return { score: 0, status: FatigueStatus.Normal, recommendation: 'No activity data found.', prediction: '' };
  }
  
  // Add slight random variations for a more dynamic demo
  const dynamicInputs: FatigueInputs = {
    ...baseData,
    hours_worked: baseData.hours_worked + Math.random() * 0.5 - 0.25,
    handoffs_completed_today: baseData.handoffs_completed_today + (Math.random() > 0.95 ? 1 : 0),
  };

  const rawScore = calculateRawScore(dynamicInputs);
  const score = Math.max(0, Math.min(10, rawScore));
  const { status, recommendation } = getFatigueDetails(score);

  // Generate a simple prediction for the near future
  const scoreIn2Hours = calculateRawScore({ ...dynamicInputs, hours_worked: dynamicInputs.hours_worked + 2 });
  const clampedScoreIn2Hours = Math.max(0, Math.min(10, Math.round(scoreIn2Hours)));
  const prediction = `Fatigue may reach ${clampedScoreIn2Hours}/10 in approx. 2 hours.`;

  return { score, status, recommendation, prediction };
};


// --- UI Component ---

const getFatigueColors = (status: FatigueStatus): { ring: string; text: string; bg: string } => {
  switch (status) {
    case FatigueStatus.Critical:
      return { ring: 'text-status-critical', text: 'text-status-critical', bg: 'bg-red-50' };
    case FatigueStatus.High:
      return { ring: 'text-status-high', text: 'text-status-high', bg: 'bg-orange-50' };
    case FatigueStatus.Moderate:
      return { ring: 'text-status-moderate', text: 'text-status-moderate', bg: 'bg-yellow-50' };
    case FatigueStatus.Normal:
      return { ring: 'text-status-normal', text: 'text-status-normal', bg: 'bg-green-50' };
    default:
      return { ring: 'text-gray-400', text: 'text-gray-500', bg: 'bg-gray-50' };
  }
};

const FatigueWidget: React.FC<{ nurseId: string }> = ({ nurseId }) => {
    const [fatigueData, setFatigueData] = useState<NurseFatigue & { prediction: string } | null>(null);

    useEffect(() => {
        const updateData = () => {
            const data = getDynamicFatigueData(nurseId);
            setFatigueData(data);
        };
        updateData(); // Initial load
        const intervalId = setInterval(updateData, 60000); // Auto-refresh every 60 seconds
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [nurseId]);

    if (!fatigueData) {
        return <div className="p-4 rounded-xl shadow-md mt-auto bg-white h-[290px] animate-pulse" />;
    }
    
    const { score, status, recommendation, prediction } = fatigueData;
    const { ring, text, bg } = getFatigueColors(status);
    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const strokeDashoffset = circumference - (score / 10) * circumference;
    const roundedScore = Math.round(score);

    return (
        <div className="p-4 rounded-xl shadow-md mt-auto bg-white">
            <h3 className="font-bold text-brand-blue-dark mb-4 text-center">Fatigue Monitor</h3>
            <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    {/* Background Circle */}
                    <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                    />
                    {/* Progress Ring */}
                    <circle
                        className={`${ring} transition-all duration-1000 ease-out`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="52"
                        cx="60"
                        cy="60"
                        strokeDasharray={circumference}
                        style={{ strokeDashoffset }}
                        transform="rotate(-90 60 60)"
                    />
                    {/* Score Text */}
                    <text x="50%" y="50%" className="text-3xl font-bold fill-current text-brand-blue-dark" textAnchor="middle" dy=".3em">
                        {roundedScore}<tspan className="text-xl">/10</tspan>
                    </text>
                </svg>
            </div>
            <div className={`text-center mt-4 p-3 rounded-lg ${bg}`}>
                <p className={`font-bold text-xl ${text}`}>{status}</p>
                <p className="text-sm text-gray-700 mt-1">{recommendation}</p>
                 {status !== FatigueStatus.Normal && <p className="text-xs text-gray-500 mt-2 italic">{prediction}</p>}
            </div>
        </div>
    );
};

export default FatigueWidget;
