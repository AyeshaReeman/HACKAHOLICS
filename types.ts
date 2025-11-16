export interface User {
  id: string;
  name: string;
  email: string;
  role: 'nurse' | 'doctor';
}

export enum AlertType {
  Allergy = 'Allergy',
  CriticalVital = 'Critical Vital',
  PendingTask = 'Pending Task',
}

export interface Alert {
  type: AlertType;
  message: string;
  level: 'critical' | 'warning';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  room: string;
  mrn: string;
  diagnosis: string;
  attendingPhysician: string;
  alerts: Alert[];
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
  };
  notes: string;
}

export enum LabStatus {
  Critical = 'Critical',
  Pending = 'Pending',
  Reviewed = 'Reviewed',
}

export interface LabReport {
  id: string;
  patientId: string;
  testName: string;
  value: string;
  range: string;
  status: LabStatus;
  date: string;
  uploadedBy: string;
}

export interface Handoff {
  id: string;
  patientId: string;
  fromNurse: string;
  toNurse: string;
  summary: string;
  timestamp: string;
}

export enum FatigueStatus {
  Normal = 'Normal',
  Moderate = 'Moderate',
  High = 'High',
  Critical = 'Critical',
}

export interface NurseFatigue {
  score: number;
  status: FatigueStatus;
  recommendation: string;
}

export interface FatigueInputs {
  hours_worked: number;
  consecutive_shifts: number;
  night_shifts_last_7_days: number;
  critical_patients_assigned: number;
  handoffs_completed_today: number;
}

// --- Mental Health Module Types ---
export enum Emotion {
  Stress = 'stress',
  Sadness = 'sadness',
  Burnout = 'burnout',
  Anger = 'anger',
  Fear = 'fear',
  Exhaustion = 'exhaustion',
  Calm = 'calm',
  Neutral = 'neutral', // Added for completeness
}

export enum Sentiment {
    Positive = 'positive',
    Negative = 'negative',
    Neutral = 'neutral',
}

export interface MentalHealthLog {
    id: string;
    nurseId: string;
    message: string;
    sentiment: Sentiment;
    emotion: Emotion;
    intensity: number; // Score from 0-100
    timestamp: string;
    isCheckIn: boolean; // Flag to differentiate chat messages from check-ins
}

export type View = 'patients' | 'handoffs' | 'lab_reports' | 'mental_health';