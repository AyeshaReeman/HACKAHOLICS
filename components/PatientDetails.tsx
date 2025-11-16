
import React from 'react';
import { Patient, LabReport, Alert, User, Handoff } from '../types';
import { HeartIcon } from './icons/HeartIcon';
import { FireIcon } from './icons/FireIcon';
import { ExclamationIcon } from './icons/ExclamationIcon';
import HandoffSummary from './HandoffSummary';

interface PatientDetailsProps {
  patient: Patient;
  labReports: LabReport[];
  currentUser: User;
  addHandoff: (handoff: Handoff) => void;
}

const VitalSign: React.FC<{ label: string; value: string | number; unit: string }> = ({ label, value, unit }) => (
  <div className="text-center p-3 bg-gray-50 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-bold text-brand-blue-dark">
      {value} <span className="text-sm font-normal text-gray-600">{unit}</span>
    </p>
  </div>
);

const AlertItem: React.FC<{ alert: Alert }> = ({ alert }) => (
  <div className={`p-3 rounded-lg flex items-start space-x-3 ${alert.level === 'critical' ? 'bg-red-50' : 'bg-yellow-50'}`}>
    <ExclamationIcon className={`w-6 h-6 flex-shrink-0 ${alert.level === 'critical' ? 'text-status-critical' : 'text-status-high'}`} />
    <div>
      <p className={`font-semibold ${alert.level === 'critical' ? 'text-status-critical' : 'text-status-high'}`}>{alert.type}</p>
      <p className="text-sm text-gray-700">{alert.message}</p>
    </div>
  </div>
);

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient, labReports, currentUser, addHandoff }) => {
  return (
    <div className="space-y-6 pb-6">
      {/* Patient Header */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
            <p className="text-md text-gray-600">
              {patient.age} y/o {patient.gender} | ID: {patient.id} | Room: {patient.room}
            </p>
            <p className="mt-2 text-md">
              <span className="font-semibold">Diagnosis:</span> {patient.diagnosis}
            </p>
            <p className="text-md">
              <span className="font-semibold">Attending:</span> {patient.attendingPhysician}
            </p>
          </div>
        </div>
      </div>

      {/* Vitals */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
         <h3 className="text-xl font-bold text-gray-800 mb-4">Vitals</h3>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <VitalSign label="Heart Rate" value={patient.vitals.heartRate} unit="bpm"/>
            <VitalSign label="Blood Pressure" value={patient.vitals.bloodPressure} unit="mmHg"/>
            <VitalSign label="Temperature" value={patient.vitals.temperature} unit="°C"/>
            <VitalSign label="Resp. Rate" value={patient.vitals.respiratoryRate} unit="bpm"/>
            <VitalSign label="O2 Sat." value={patient.vitals.oxygenSaturation} unit="%"/>
         </div>
      </div>
      
      {/* Alerts & Notes */}
       <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Alerts</h3>
            {patient.alerts.length > 0 ? (
                <div className="space-y-3">
                    {patient.alerts.map((alert, index) => <AlertItem key={index} alert={alert} />)}
                </div>
            ) : <p className="text-gray-500">No active alerts.</p>}
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Nurse's Notes</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{patient.notes}</p>
        </div>
      </div>
      
      {/* AI Handoff Summary */}
      <HandoffSummary patient={patient} currentUser={currentUser} addHandoff={addHandoff}/>
    </div>
  );
};

export default PatientDetails;
