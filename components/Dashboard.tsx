

import React from 'react';
import { View, Patient, LabReport, Handoff, User, MentalHealthLog } from '../types';
import PatientView from './PatientView';
import LabReportsView from './LabReportsView';
import HandoffsView from './HandoffsView';
import MentalHealthView from './MentalHealthView';

interface DashboardProps {
  activeView: View;
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  labReports: LabReport[];
  handoffs: Handoff[];
  addHandoff: (handoff: Handoff) => void;
  currentUser: User;
  mentalHealthLogs: MentalHealthLog[];
  addMentalHealthLog: (log: MentalHealthLog) => void;
}

const Dashboard: React.FC<DashboardProps> = (props) => {
  const renderView = () => {
    switch (props.activeView) {
      case 'patients':
        return (
          <PatientView
            patients={props.patients}
            selectedPatient={props.selectedPatient}
            setSelectedPatient={props.setSelectedPatient}
            labReports={props.labReports}
            currentUser={props.currentUser}
            addHandoff={props.addHandoff}
          />
        );
      case 'lab_reports':
         return <LabReportsView labReports={props.labReports} patients={props.patients} selectedPatient={props.selectedPatient}/>
      case 'handoffs':
        return <HandoffsView handoffs={props.handoffs} patients={props.patients} />;
      case 'mental_health':
        return <MentalHealthView 
                currentUser={props.currentUser}
                logs={props.mentalHealthLogs}
                addLog={props.addMentalHealthLog}
               />;
      default:
        return <div>Select a view</div>;
    }
  };

  return <div className="h-full">{renderView()}</div>;
};

export default Dashboard;