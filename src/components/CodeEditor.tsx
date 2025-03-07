
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';

interface CodeEditorProps {
  onExecute: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onExecute }) => {
  const [code, setCode] = useState<string>('-- Enter your Lua script here\n\nprint("Hello, Roblox!")\n');

  const handleExecute = () => {
    onExecute(code);
  };

  const handleClear = () => {
    setCode('-- Enter your Lua script here\n\n');
  };

  return (
    <Card className="w-full bg-executor-secondary border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30">
        <span className="text-executor-light font-medium">Script Editor</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-60 bg-executor-dark text-executor-light p-4 outline-none code-editor resize-none custom-scrollbar"
        spellCheck="false"
      />
      <div className="flex justify-between p-2 bg-executor-secondary">
        <button 
          onClick={handleClear}
          className="px-4 py-2 bg-gray-700 text-executor-light rounded-md hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
        <button 
          onClick={handleExecute}
          className="px-4 py-2 bg-executor-purple text-white rounded-md hover:bg-opacity-80 transition-colors glow-effect"
        >
          Execute
        </button>
      </div>
    </Card>
  );
};

export default CodeEditor;
