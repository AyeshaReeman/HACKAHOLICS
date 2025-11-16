
import React from 'react';
import { Patient } from '../types';
import { ExclamationIcon } from './icons/ExclamationIcon';

interface PatientListProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  onSelectPatient: (patient: Patient) => void;
}

const PatientList: React.FC<PatientListProps> = ({ patients, selectedPatient, onSelectPatient }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Patient List</h2>
      </div>
      <div className="flex-grow overflow-y-auto">
        {patients.map((patient) => (
          <button
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className={`w-full text-left p-4 flex items-center space-x-4 border-l-4 transition-all duration-200 ${
              selectedPatient?.id === patient.id
                ? 'bg-blue-50 border-brand-blue'
                : 'border-transparent hover:bg-gray-50'
            }`}
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{patient.name} ({patient.id})</p>
              <p className="text-sm text-gray-500">Room: {patient.room} | {patient.diagnosis}</p>
            </div>
            <div className="flex space-x-1">
              {patient.alerts.some(a => a.level === 'critical') && (
                <ExclamationIcon className="w-5 h-5 text-status-critical" />
              )}
               {patient.alerts.some(a => a.level === 'warning') && (
                <ExclamationIcon className="w-5 h-5 text-status-high" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PatientList;
