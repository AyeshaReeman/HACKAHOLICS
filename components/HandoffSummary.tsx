
import React, { useState, useCallback } from 'react';
import { Patient, User, Handoff } from '../types';
import { generateHandoffSummary } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { DocumentAddIcon } from './icons/DocumentAddIcon';

interface HandoffSummaryProps {
  patient: Patient;
  currentUser: User;
  addHandoff: (handoff: Handoff) => void;
}

const HandoffSummary: React.FC<HandoffSummaryProps> = ({ patient, currentUser, addHandoff }) => {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setSummary('');
    try {
      const result = await generateHandoffSummary(patient);
      setSummary(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate summary: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [patient]);

  const handleSaveHandoff = () => {
    if (!summary) return;
    const newHandoff: Handoff = {
        id: `h-${Date.now()}`,
        patientId: patient.id,
        fromNurse: currentUser.name,
        toNurse: 'Next Shift Nurse',
        summary: summary,
        timestamp: new Date().toISOString(),
    };
    addHandoff(newHandoff);
    // Maybe show a success toast here
    setSummary(''); // Clear after saving
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">AI Handoff Summary</h3>
        <button
          onClick={handleGenerateSummary}
          disabled={isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue-dark text-white font-semibold rounded-lg shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>{isLoading ? 'Generating...' : 'Generate Summary'}</span>
        </button>
      </div>
      
      {isLoading && (
        <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </div>
      )}

      {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}

      {summary && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: summary.replace(/\n/g, '<br />') }} />
           <div className="flex justify-end mt-4">
            <button
                onClick={handleSaveHandoff}
                className="flex items-center space-x-2 px-4 py-2 bg-brand-green hover:bg-emerald-500 text-brand-blue-dark font-semibold rounded-lg shadow-sm transition-all duration-300"
            >
                <DocumentAddIcon className="w-5 h-5"/>
                <span>Save Handoff</span>
            </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default HandoffSummary;
