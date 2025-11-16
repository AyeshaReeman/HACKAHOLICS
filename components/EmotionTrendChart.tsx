import React from 'react';
import { MentalHealthLog } from '../types';

interface EmotionTrendChartProps {
    logs: MentalHealthLog[];
}

const EmotionTrendChart: React.FC<EmotionTrendChartProps> = ({ logs }) => {

    const processChartData = (logs: MentalHealthLog[]): { date: string, intensity: number }[] => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const recentLogs = logs.filter(log => new Date(log.timestamp) >= sevenDaysAgo);

        const dailyData = new Map<string, { totalIntensity: number, count: number }>();

        recentLogs.forEach(log => {
            const dateStr = new Date(log.timestamp).toISOString().split('T')[0];
            if (!dailyData.has(dateStr)) {
                dailyData.set(dateStr, { totalIntensity: 0, count: 0 });
            }
            const day = dailyData.get(dateStr)!;
            day.totalIntensity += log.intensity;
            day.count += 1;
        });

        const dataPoints = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            const dayData = dailyData.get(dateStr);
            
            dataPoints.push({
                date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                intensity: dayData ? Math.round(dayData.totalIntensity / dayData.count) : 0,
            });
        }
        return dataPoints;
    };

    const data = processChartData(logs);
    const width = 300;
    const height = 150;
    const padding = 20;

    const getPaths = () => {
        if (data.length < 2) return { path: '', areaPath: '' };
        
        const points = data.map((point, i) => {
            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
            const y = height - padding - (point.intensity / 100) * (height - 2 * padding);
            return `${x},${y}`;
        });
    
        const path = `M ${points.join(' L ')}`;
    
        // Create the area path by closing the shape along the bottom axis
        const firstPointX = padding;
        const lastPointX = width - padding;
        const areaPath = `${path} L ${lastPointX},${height - padding} L ${firstPointX},${height - padding} Z`;
        
        return { path, areaPath };
    };

    const { path, areaPath } = getPaths();
    
    return (
        <div className="bg-white p-4 rounded-xl shadow-lg flex-1">
            <h3 className="text-lg font-bold text-gray-800 mb-2">7-Day Emotional Trend</h3>
            <p className="text-sm text-gray-500 mb-4">Average emotional intensity (0-100)</p>

            {data && data.length > 0 ? (
                <div className="w-full">
                    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                        <defs>
                            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4A90E2" stopOpacity={0.4} />
                                <stop offset="100%" stopColor="#4A90E2" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        {/* Y-Axis Labels */}
                        <text x={padding - 5} y={padding + 3} textAnchor="end" fontSize="10" fill="#9ca3af">100</text>
                        <text x={padding - 5} y={height - padding} textAnchor="end" fontSize="10" fill="#9ca3af">0</text>
                        
                        {/* Grid Lines */}
                        <line x1={padding} y1={padding} x2={width-padding} y2={padding} stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1={padding} y1={height / 2} x2={width-padding} y2={height / 2} stroke="#e5e7eb" strokeWidth="0.5" />
                        <line x1={padding} y1={height-padding} x2={width-padding} y2={height-padding} stroke="#e5e7eb" strokeWidth="0.5" />

                        {/* Gradient Area Fill */}
                        <path d={areaPath} fill="url(#areaGradient)" />

                        {/* Line Chart */}
                        <path d={path} fill="none" stroke="#357ABD" strokeWidth="2" />

                         {/* Data Points */}
                        {data.map((point, i) => {
                            const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                            const y = height - padding - (point.intensity / 100) * (height - 2 * padding);
                            return <circle key={i} cx={x} cy={y} r="3" fill="#357ABD" stroke="white" strokeWidth="1" />;
                        })}

                        {/* X-Axis Labels */}
                        {data.map((point, i) => (
                            <text key={i} x={padding + (i / (data.length - 1)) * (width - 2 * padding)} y={height - 5} textAnchor="middle" fontSize="9" fill="#6b7280">
                                {point.date.split('/')[1]}
                            </text>
                        ))}
                    </svg>
                </div>
            ) : (
                <div className="flex items-center justify-center h-32">
                    <p className="text-gray-400">Not enough data to display trend.</p>
                </div>
            )}
        </div>
    );
};

export default EmotionTrendChart;