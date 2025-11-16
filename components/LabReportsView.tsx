
import React, { useState, useMemo } from 'react';
import { LabReport, Patient, LabStatus } from '../types';
import LabTimeline from './LabTimeline';

interface LabReportsViewProps {
    labReports: LabReport[];
    patients: Patient[];
    selectedPatient: Patient | null;
}

const getStatusColor = (status: LabStatus) => {
    switch (status) {
        case LabStatus.Critical: return 'bg-red-100 text-red-800';
        case LabStatus.Pending: return 'bg-yellow-100 text-yellow-800';
        case LabStatus.Reviewed: return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
    }
};

const LabReportsView: React.FC<LabReportsViewProps> = ({ labReports, patients, selectedPatient }) => {
    
    const [patientFilter, setPatientFilter] = useState<string>('all');

    const getPatientName = (patientId: string) => {
        return patients.find(p => p.id === patientId)?.name || 'N/A';
    }

    const filteredReports = useMemo(() => {
        if (patientFilter === 'all') {
            return labReports;
        }
        return labReports.filter(report => report.patientId === patientFilter);
    }, [labReports, patientFilter]);
    
    const patientTimelineReports = useMemo(() => {
        if (!selectedPatient) return [];
        return labReports.filter(report => report.patientId === selectedPatient.id);
    }, [labReports, selectedPatient]);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full">
            <div className="lg:col-span-3 bg-white rounded-xl shadow-lg h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-gray-800">All Lab Reports</h2>
                        <div className="w-1/3">
                             <select
                                id="patient-filter"
                                value={patientFilter}
                                onChange={(e) => setPatientFilter(e.target.value)}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm rounded-md"
                            >
                                <option value="all">All Patients</option>
                                {patients.map(p => (
                                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gradient-to-r from-brand-blue to-brand-blue-dark">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Patient Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Report Type</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Uploaded By</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Date & Time</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredReports.map(report => (
                                <tr key={report.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getPatientName(report.patientId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.testName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.uploadedBy}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(report.date).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-brand-blue hover:text-brand-blue-dark font-medium">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {filteredReports.length === 0 && (
                        <div className="text-center p-8 text-gray-500">
                            No lab reports found for the selected filter.
                        </div>
                    )}
                </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg h-full flex flex-col">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">Patient Lab Timeline</h2>
                     <p className="text-sm text-gray-500">{selectedPatient ? `Showing timeline for ${selectedPatient.name}` : 'Select a patient to see their timeline'}</p>
                </div>
                 <div className="flex-grow overflow-y-auto p-4">
                    {selectedPatient ? <LabTimeline labReports={patientTimelineReports} /> : 
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">No patient selected.</p>
                        </div>
                    }
                 </div>
            </div>
        </div>
    );
};

export default LabReportsView;
