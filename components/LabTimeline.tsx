
import React from 'react';
import { LabReport, LabStatus } from '../types';
import { BeakerIcon } from './icons/BeakerIcon';

interface LabTimelineProps {
  labReports: LabReport[];
}

const getStatusClasses = (status: LabStatus): { bg: string; border: string; icon: string } => {
  switch (status) {
    case LabStatus.Critical:
      return { bg: 'bg-red-500', border: 'border-red-500', icon: 'text-red-500' };
    case LabStatus.Pending:
      return { bg: 'bg-yellow-500', border: 'border-yellow-500', icon: 'text-yellow-500' };
    case LabStatus.Reviewed:
      return { bg: 'bg-green-500', border: 'border-green-500', icon: 'text-green-500' };
    default:
      return { bg: 'bg-gray-500', border: 'border-gray-500', icon: 'text-gray-500' };
  }
};

const LabTimeline: React.FC<LabTimelineProps> = ({ labReports }) => {
  const sortedReports = [...labReports].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {sortedReports.map((report, reportIdx) => {
            const { bg, border, icon } = getStatusClasses(report.status);
            return (
                <li key={report.id}>
                  <div className="relative pb-8">
                    {reportIdx !== sortedReports.length - 1 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${bg}`}>
                          <BeakerIcon className="h-5 w-5 text-white" />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            {report.testName} <span className="font-medium text-gray-900">{report.value}</span>
                          </p>
                           <p className={`text-sm font-semibold ${icon}`}>{report.status}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={report.date}>{new Date(report.date).toLocaleDateString()}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
            )
        })}
      </ul>
    </div>
  );
};

export default LabTimeline;
