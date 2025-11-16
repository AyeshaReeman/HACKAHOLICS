import React, { useState, useMemo } from 'react';
import { User, MentalHealthLog } from '../types';
import ChatWindow from './ChatWindow';
import DailyCheckin from './DailyCheckin';
import EmotionTrendChart from './EmotionTrendChart';
import * as mentalHealthService from '../services/mentalHealthService';

interface MentalHealthViewProps {
  currentUser: User;
  logs: MentalHealthLog[];
  addLog: (log: MentalHealthLog) => void;
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const MentalHealthView: React.FC<MentalHealthViewProps> = ({ currentUser, logs, addLog }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: `Hi ${currentUser.name.split(',')[0]}, I'm here to offer a quiet space to reflect. How are you feeling?` }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Optimization: Memoize the filtered logs to prevent recalculation on every render.
  const userLogs = useMemo(() => {
    return logs.filter(log => log.nurseId === currentUser.id);
  }, [logs, currentUser.id]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text }]);
    setIsLoading(true);

    try {
      const [aiResponse, newLog] = await mentalHealthService.postChatMessage(currentUser.id, text);
      addLog(newLog); // Update global state
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages(prev => [...prev, { sender: 'ai', text: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCheckin = async (mood: number, feeling: string) => {
    try {
        const newLog = await mentalHealthService.postCheckin(currentUser.id, mood, feeling);
        addLog(newLog);
    // FIX: Added curly braces to the catch block to correctly define its scope. This resolves the 'Cannot find name error' and the component's return type error.
    } catch (error) {
        console.error("Failed to submit check-in:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Left Column: Chat */}
      <div className="lg:col-span-2 h-full">
        <ChatWindow
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </div>

      {/* Right Column: Check-in and Trends */}
      <div className="lg:col-span-1 h-full flex flex-col gap-6 overflow-y-auto">
        <DailyCheckin onCheckin={handleCheckin}/>
        <EmotionTrendChart logs={userLogs} />
      </div>
    </div>
  );
};

export default MentalHealthView;