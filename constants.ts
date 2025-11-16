import { User, Patient, LabReport, Handoff, AlertType, LabStatus, FatigueInputs, MentalHealthLog, Sentiment, Emotion } from './types';

// This object simulates a backend user database.
// In a real application, passwords would be securely hashed.
export const USERS_DB = {
  "nurse1@hospital.com": {
    id: "nurse1",
    password: "nurse123",
    role: "nurse",
    name: "Emily Carter, RN"
  },
  "doctor1@hospital.com": {
    id: "doctor1",
    password: "doctor123",
    role: "doctor",
    name: "Dr. Johnathan Reed"
  },
  "nurse2@hospital.com": {
    id: "nurse2",
    password: "nurse123",
    role: "nurse",
    name: "Meera Singh, RN"
  }
};


export const PATIENTS: Patient[] = [
  {
    id: 'P001',
    name: 'John Doe',
    age: 68,
    gender: 'Male',
    room: '302A',
    mrn: 'MRN789123',
    diagnosis: 'Pneumonia',
    attendingPhysician: 'Dr. Evelyn Reed',
    alerts: [
      { type: AlertType.CriticalVital, message: 'O2 Saturation below 92%', level: 'critical' },
    ],
    vitals: { heartRate: 88, bloodPressure: '130/85', temperature: 38.5, respiratoryRate: 22, oxygenSaturation: 91 },
    notes: 'Patient is on Day 2 of IV antibiotics. Responding well but requires frequent monitoring of respiratory status.',
  },
  {
    id: 'P002',
    name: 'Mary Smith',
    age: 74,
    gender: 'Female',
    room: '303B',
    mrn: 'MRN456789',
    diagnosis: 'Congestive Heart Failure',
    attendingPhysician: 'Dr. Ben Carter',
    alerts: [
      { type: AlertType.PendingTask, message: 'Diuretic dose adjustment pending', level: 'warning' },
    ],
    vitals: { heartRate: 95, bloodPressure: '145/90', temperature: 37.2, respiratoryRate: 20, oxygenSaturation: 94 },
    notes: 'Patient showing signs of fluid overload. Strict I&O monitoring required. Awaiting cardiology consult.',
  },
  {
    id: 'P003',
    name: 'Robert Lee',
    age: 55,
    gender: 'Male',
    room: '304A',
    mrn: 'MRN123456',
    diagnosis: 'Post-operative Care (Knee)',
    attendingPhysician: 'Dr. Evelyn Reed',
    alerts: [],
    vitals: { heartRate: 72, bloodPressure: '120/80', temperature: 37.0, respiratoryRate: 16, oxygenSaturation: 98 },
    notes: 'Patient is recovering well from knee surgery. Pain is managed. Ambulating with assistance.',
  },
  {
    id: 'P004',
    name: 'Asha Rao',
    age: 42,
    gender: 'Female',
    room: '305C',
    mrn: 'MRN654321',
    diagnosis: 'Diabetic Ketoacidosis',
    attendingPhysician: 'Dr. Ben Carter',
    alerts: [
      { type: AlertType.CriticalVital, message: 'Blood Glucose > 300 mg/dL', level: 'critical' },
    ],
    vitals: { heartRate: 110, bloodPressure: '100/60', temperature: 37.8, respiratoryRate: 24, oxygenSaturation: 96 },
    notes: 'Patient on insulin drip protocol. Requires frequent blood glucose monitoring. Shows signs of confusion.',
  },
   {
    id: 'P005',
    name: 'Ramesh Patil',
    age: 78,
    gender: 'Male',
    room: '306D',
    mrn: 'MRN987654',
    diagnosis: 'Atrial Fibrillation',
    attendingPhysician: 'Dr. Ben Carter',
    alerts: [
       { type: AlertType.PendingTask, message: 'Anticoagulation therapy review needed', level: 'warning' },
    ],
    vitals: { heartRate: 105, bloodPressure: '125/80', temperature: 37.1, respiratoryRate: 18, oxygenSaturation: 97 },
    notes: 'Patient is in A-Fib with RVR. Started on a diltiazem drip. Monitor heart rate and blood pressure closely.',
  },
];

export const LAB_REPORTS: LabReport[] = [
  { id: 'lab1', patientId: 'P001', testName: 'WBC Count', value: '15.2 x10^9/L', range: '4.5-11.0', status: LabStatus.Critical, date: '2023-10-28T08:00:00Z', uploadedBy: 'LabCorp' },
  { id: 'lab2', patientId: 'P002', testName: 'BNP', value: '1200 pg/mL', range: '< 100', status: LabStatus.Critical, date: '2023-10-28T09:30:00Z', uploadedBy: 'Internal Lab' },
  { id: 'lab3', patientId: 'P002', testName: 'Potassium', value: '3.4 mEq/L', range: '3.5-5.0', status: LabStatus.Pending, date: '2023-10-28T09:30:00Z', uploadedBy: 'Internal Lab' },
  { id: 'lab4', patientId: 'P004', testName: 'Glucose', value: '350 mg/dL', range: '70-100', status: LabStatus.Critical, date: '2023-10-28T10:00:00Z', uploadedBy: 'Point-of-Care' },
  { id: 'lab5', patientId: 'P003', testName: 'CBC Panel', value: 'WNL', range: 'N/A', status: LabStatus.Reviewed, date: '2023-10-28T07:45:00Z', uploadedBy: 'LabCorp' },
  { id: 'lab6', patientId: 'P005', testName: 'Troponin', value: '0.01 ng/mL', range: '< 0.04', status: LabStatus.Reviewed, date: '2023-10-28T11:00:00Z', uploadedBy: 'Internal Lab' },
  { id: 'lab7', patientId: 'P004', testName: 'Anion Gap', value: '22 mEq/L', range: '8-16', status: LabStatus.Critical, date: '2023-10-28T10:00:00Z', uploadedBy: 'Internal Lab' },
  { id: 'lab8', patientId: 'P001', testName: 'Blood Culture', value: 'Pending', range: 'No Growth', status: LabStatus.Pending, date: '2023-10-27T14:00:00Z', uploadedBy: 'Microbiology' },
  { id: 'lab9', patientId: 'P005', testName: 'PT/INR', value: '1.8', range: '2.0-3.0', status: LabStatus.Pending, date: '2023-10-28T11:00:00Z', uploadedBy: 'Internal Lab'},
  { id: 'lab10', patientId: 'P004', testName: 'Beta-hydroxybutyrate', value: '4.5 mmol/L', range: '< 0.6', status: LabStatus.Critical, date: '2023-10-28T10:05:00Z', uploadedBy: 'Internal Lab'},
];


export const HANDOFFS: Handoff[] = [
  {
    id: 'h1',
    patientId: 'P002',
    fromNurse: 'Alice Johnson',
    toNurse: 'Emily Carter',
    summary: 'Mary Smith in 303B, 74 y/o female with CHF exacerbation. Vitals stable but BP remains elevated. Received 40mg Lasix at 0800. Awaiting response. Strict I&O. Cardiology consult placed. Family updated on condition.',
    timestamp: '2023-10-27T07:00:00Z',
  },
];

export const NURSE_ACTIVITY_DATA: { [key: string]: FatigueInputs } = {
  'nurse1': {
    hours_worked: 9.5,
    consecutive_shifts: 3,
    night_shifts_last_7_days: 1,
    critical_patients_assigned: 2, // John Doe and Asha Rao
    handoffs_completed_today: 4,
  },
  'nurse2': {
    hours_worked: 11.0,
    consecutive_shifts: 2,
    night_shifts_last_7_days: 2,
    critical_patients_assigned: 1,
    handoffs_completed_today: 5,
  }
};

// Mock data for the mental health module to populate the trend chart
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

export const INITIAL_MENTAL_HEALTH_LOGS: MentalHealthLog[] = [
    { id: 'mh1', nurseId: 'nurse1', message: 'Daily check-in', sentiment: Sentiment.Negative, emotion: Emotion.Exhaustion, intensity: 75, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: true },
    { id: 'mh2', nurseId: 'nurse1', message: 'Felt a bit overwhelmed today with the patient load.', sentiment: Sentiment.Negative, emotion: Emotion.Stress, intensity: 60, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: false },
    { id: 'mh3', nurseId: 'nurse1', message: 'Daily check-in', sentiment: Sentiment.Negative, emotion: Emotion.Burnout, intensity: 80, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: true },
    { id: 'mh4', nurseId: 'nurse1', message: 'Daily check-in', sentiment: Sentiment.Neutral, emotion: Emotion.Neutral, intensity: 50, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: true },
    { id: 'mh5', nurseId: 'nurse1', message: 'A patient\'s family was very grateful, which was nice.', sentiment: Sentiment.Positive, emotion: Emotion.Calm, intensity: 30, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: false },
    { id: 'mh6', nurseId: 'nurse1', message: 'Daily check-in', sentiment: Sentiment.Positive, emotion: Emotion.Calm, intensity: 25, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: true },
    { id: 'mh7', nurseId: 'nurse1', message: 'Daily check-in', sentiment: Sentiment.Negative, emotion: Emotion.Stress, intensity: 65, timestamp: new Date(sevenDaysAgo.setDate(sevenDaysAgo.getDate() + 1)).toISOString(), isCheckIn: true },
];