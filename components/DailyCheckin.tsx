import React, { useState } from 'react';

interface DailyCheckinProps {
    onCheckin: (mood: number, feeling: string) => void;
}

const DailyCheckin: React.FC<DailyCheckinProps> = ({ onCheckin }) => {
    const [mood, setMood] = useState(5);
    const [feeling, setFeeling] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!feeling.trim()) return;
        onCheckin(mood, feeling);
        setSubmitted(true);
        setFeeling('');
        setMood(5);
        // Hide the success message after a few seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Daily Check-in</h3>
            <p className="text-sm text-gray-500 mb-4">Take a moment to reflect on your well-being.</p>
            
            {submitted ? (
                <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
                    <p className="font-semibold">Thank you for checking in!</p>
                    <p className="text-sm">Your reflection has been noted.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
                           How are you feeling today? ({mood}/10)
                        </label>
                        <input
                            id="mood"
                            type="range"
                            min="1"
                            max="10"
                            value={mood}
                            onChange={(e) => setMood(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label htmlFor="feeling" className="block text-sm font-medium text-gray-700">
                            Briefly, how was your shift?
                        </label>
                        <input
                            id="feeling"
                            type="text"
                            value={feeling}
                            onChange={(e) => setFeeling(e.target.value)}
                            placeholder="e.g., a bit stressful but manageable"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
                    >
                        Submit Check-in
                    </button>
                </form>
            )}
        </div>
    );
};

export default DailyCheckin;
