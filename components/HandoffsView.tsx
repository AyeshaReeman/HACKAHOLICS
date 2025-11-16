
import React from 'react';
import { Handoff, Patient } from '../types';

interface HandoffsViewProps {
    handoffs: Handoff[];
    patients: Patient[];
}

const HandoffsView: React.FC<HandoffsViewProps> = ({ handoffs, patients }) => {
    // FIX: Changed patientId type from number to string to match the Patient.id type.
    const getPatientName = (patientId: string) => {
        return patients.find(p => p.id === patientId)?.name || 'Unknown Patient';
    }

    return (
        <div className="bg-white rounded-xl shadow-lg h-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Handoff Reports</h2>
                <p className="text-gray-500">A log of all generated handoff summaries.</p>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {handoffs.length > 0 ? (
                    handoffs.map(handoff => (
                        <div key={handoff.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg text-brand-blue-dark">Patient: {getPatientName(handoff.patientId)}</h3>
                                <p className="text-sm text-gray-500">{new Date(handoff.timestamp).toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">
                                <span className="font-semibold">From:</span> {handoff.fromNurse} | <span className="font-semibold">To:</span> {handoff.toNurse}
                            </p>
                            <div className="prose prose-sm max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: handoff.summary.replace(/\n/g, '<br />') }}/>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No handoff reports have been saved yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HandoffsView;
