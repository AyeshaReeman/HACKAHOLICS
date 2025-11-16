import React, { useState, useMemo } from 'react';
import { User, Patient, LabReport, Handoff, View, MentalHealthLog } from './types';
import { PATIENTS, LAB_REPORTS, HANDOFFS, INITIAL_MENTAL_HEALTH_LOGS } from './constants';
import { login } from './services/authService';
import Login from './components/Login';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<View>('patients');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(PATIENTS[0] || null);
  const [handoffs, setHandoffs] = useState<Handoff[]>(HANDOFFS);
  const [mentalHealthLogs, setMentalHealthLogs] = useState<MentalHealthLog[]>(INITIAL_MENTAL_HEALTH_LOGS);

  const handleLogin = async (email: string, password: string): Promise<void> => {
    const user = await login(email, password);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setSelectedPatient(PATIENTS[0] || null);
    setActiveView('patients');
  };

  const addHandoff = (newHandoff: Handoff) => {
    setHandoffs(prev => [newHandoff, ...prev]);
  };
  
  const addMentalHealthLog = (newLog: MentalHealthLog) => {
    setMentalHealthLogs(prev => [newLog, ...prev]);
  };

  const patientLabReports = useMemo(() => {
    if (!selectedPatient) return [];
    return LAB_REPORTS.filter(report => report.patientId === selectedPatient.id);
  }, [selectedPatient]);

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      <Sidebar 
        user={currentUser}
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={currentUser} onLogout={handleLogout} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-background p-4 md:p-6 lg:p-8">
          <Dashboard
            activeView={activeView}
            patients={PATIENTS}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            labReports={patientLabReports}
            handoffs={handoffs}
            addHandoff={addHandoff}
            currentUser={currentUser}
            mentalHealthLogs={mentalHealthLogs}
            addMentalHealthLog={addMentalHealthLog}
          />
        </main>
      </div>
    </div>
  );
};

export default App;