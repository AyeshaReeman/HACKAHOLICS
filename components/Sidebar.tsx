
import React from 'react';
import { View, User } from '../types';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { UsersIcon } from './icons/UsersIcon';
import { DocumentReportIcon } from './icons/DocumentReportIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';
import { HeartHandIcon } from './icons/HeartHandIcon';
import FatigueWidget from './FatigueWidget';

interface SidebarProps {
  user: User | null;
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
      isActive
        ? 'bg-gradient-to-r from-brand-blue to-brand-green text-white shadow-lg'
        : 'text-gray-200 hover:bg-brand-blue-dark/50'
    }`}
  >
    <Icon className="w-6 h-6" />
    <span className="font-medium">{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ user, activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-brand-blue-dark text-white flex flex-col p-4 shadow-lg">
      <div className="flex items-center space-x-2 mb-8 px-2">
        <ShieldCheckIcon className="w-10 h-10" />
        <span className="text-2xl font-bold">SAFE SHIFT AI</span>
      </div>
      <nav className="flex-1 space-y-2">
        <NavItem
          icon={UsersIcon}
          label="Patients"
          isActive={activeView === 'patients'}
          onClick={() => setActiveView('patients')}
        />
        <NavItem
          icon={ClipboardListIcon}
          label="Handoffs"
          isActive={activeView === 'handoffs'}
          onClick={() => setActiveView('handoffs')}
        />
        <NavItem
          icon={DocumentReportIcon}
          label="Lab Reports"
          isActive={activeView === 'lab_reports'}
          onClick={() => setActiveView('lab_reports')}
        />
        {user?.role === 'nurse' && (
             <NavItem
                icon={HeartHandIcon}
                label="Mental Health"
                isActive={activeView === 'mental_health'}
                onClick={() => setActiveView('mental_health')}
            />
        )}
      </nav>
      {user?.role === 'nurse' && <FatigueWidget nurseId={user.id} />}
    </aside>
  );
};

export default Sidebar;