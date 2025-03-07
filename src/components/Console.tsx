
import React, { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Terminal, Trash2, ChevronUp, ChevronDown, Copy } from 'lucide-react';
import { toast } from "sonner";

interface ConsoleProps {
  messages: { text: string; type: 'info' | 'error' | 'success' }[];
  onClear: () => void;
}

const Console: React.FC<ConsoleProps> = ({ messages, onClear }) => {
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    if (consoleEndRef.current && !isCollapsed) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isCollapsed]);

  const getMessageColor = (type: 'info' | 'error' | 'success') => {
    switch (type) {
      case 'error':
        return 'text-mocha-red';
      case 'success':
        return 'text-mocha-green';
      case 'info':
      default:
        return 'text-mocha-blue';
    }
  };

  const handleCopyLogs = () => {
    const text = messages.map(msg => msg.text).join('\n');
    navigator.clipboard.writeText(text);
    toast.success("Console logs copied to clipboard");
  };

  return (
    <Card className="bg-executor-secondary border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg transition-all">
      <div className="flex items-center justify-between bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-mocha-blue" />
          <span className="text-executor-light font-medium">Console</span>
          <span className="bg-executor-secondary text-xs rounded-full px-2 py-0.5 text-mocha-text">
            {messages.length} logs
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleCopyLogs}
            className="text-executor-light text-xs hover:text-executor-purple flex items-center gap-1"
            title="Copy logs"
          >
            <Copy size={14} />
          </button>
          <button 
            onClick={onClear}
            className="text-executor-light text-xs hover:text-executor-purple flex items-center gap-1"
            title="Clear console"
          >
            <Trash2 size={14} />
          </button>
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-executor-light text-xs hover:text-executor-purple"
          >
            {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>
      <div className={`${isCollapsed ? 'h-0' : 'h-40'} bg-[#1A1A1A] text-executor-light overflow-y-auto custom-scrollbar transition-all duration-300`}>
        {!isCollapsed && (
          <div className="p-3">
            {messages.length === 0 ? (
              <div className="text-gray-500 text-sm italic">Console output will appear here...</div>
            ) : (
              <>
                {messages.map((message, index) => (
                  <div key={index} className={`mb-1.5 text-sm font-mono ${getMessageColor(message.type)} flex items-start`}>
                    <span className="text-gray-500 mr-2">[{index + 1}]</span>
                    {message.text}
                  </div>
                ))}
                <div ref={consoleEndRef} />
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Console;
