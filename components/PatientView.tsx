
import React from 'react';
import { Patient, LabReport, User, Handoff } from '../types';
import PatientList from './PatientList';
import PatientDetails from './PatientDetails';

interface PatientViewProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  labReports: LabReport[];
  currentUser: User;
  addHandoff: (handoff: Handoff) => void;
}

const PatientView: React.FC<PatientViewProps> = (props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-1 h-full overflow-y-auto">
        <PatientList
          patients={props.patients}
          selectedPatient={props.selectedPatient}
          onSelectPatient={props.setSelectedPatient}
        />
      </div>
      <div className="lg:col-span-2 h-full overflow-y-auto">
        {props.selectedPatient ? (
          <PatientDetails
            patient={props.selectedPatient}
            labReports={props.labReports}
            currentUser={props.currentUser}
            addHandoff={props.addHandoff}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
            <p className="text-gray-500">Select a patient to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientView;
