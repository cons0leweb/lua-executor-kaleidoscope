
import React, { useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface ConsoleProps {
  messages: { text: string; type: 'info' | 'error' | 'success' }[];
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ messages, onClear }) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getMessageColor = (type: 'info' | 'error' | 'success') => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      case 'info':
      default:
        return 'text-blue-300';
    }
  };

  return (
    <Card className="bg-executor-secondary border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30">
        <span className="text-executor-light font-medium">Console</span>
        <button 
          onClick={onClear}
          className="text-executor-light text-xs hover:text-executor-purple"
        >
          Clear
        </button>
      </div>
      <div className="h-32 bg-[#1A1A1A] text-executor-light p-2 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-sm italic">Console output will appear here...</div>
        ) : (
          <>
            {messages.map((message, index) => (
              <div key={index} className={`mb-1 text-sm ${getMessageColor(message.type)}`}>
                {message.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </>
        )}
      </div>
    </Card>
  );
};

export default Console;
