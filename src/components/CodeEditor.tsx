
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Play, X, Save, Trash2, Copy, History } from 'lucide-react';
import { toast } from "sonner";

interface CodeEditorProps {
  onExecute: (code: string) => void;
}

const MAX_HISTORY_SIZE = 10;

const CodeEditor: React.FC<CodeEditorProps> = ({ onExecute }) => {
  const [code, setCode] = useState<string>('-- Enter your Lua script here\n\nprint("Hello, Roblox!")\n');
  const [scriptHistory, setScriptHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load script history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('script-history');
      if (savedHistory) {
        setScriptHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Failed to load script history:', error);
    }
  }, []);

  const handleExecute = () => {
    // Skip empty scripts
    if (code.trim() === '' || code.trim() === '-- Enter your Lua script here') {
      toast.error("Cannot execute empty script");
      return;
    }

    // Add to history if not already present or different from last entry
    if (scriptHistory.length === 0 || scriptHistory[0] !== code) {
      const newHistory = [code, ...scriptHistory.slice(0, MAX_HISTORY_SIZE - 1)];
      setScriptHistory(newHistory);
      localStorage.setItem('script-history', JSON.stringify(newHistory));
    }

    // Execute the script
    onExecute(code);

    // Get execution speed from settings
    const executionSpeed = localStorage.getItem('execution-speed') || '50';
    console.log(`Executing script at speed: ${executionSpeed}`);
  };

  const handleClear = () => {
    setCode('-- Enter your Lua script here\n\n');
    toast.info("Script cleared");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success("Script copied to clipboard");
  };

  const handleSave = () => {
    // Create blob with the code content
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a link to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.lua';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success("Script saved to file");
  };

  const handleHistorySelect = (selectedCode: string) => {
    setCode(selectedCode);
    setShowHistory(false);
    toast.info("Script loaded from history");
  };

  return (
    <Card className="w-full bg-executor-secondary border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg">
      <div className="flex items-center justify-between bg-executor-dark px-4 py-2 border-b border-executor-purple border-opacity-30">
        <span className="text-executor-light font-medium">Script Editor</span>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-mocha-red cursor-pointer" onClick={handleClear}></div>
          <div className="w-3 h-3 rounded-full bg-mocha-yellow"></div>
          <div className="w-3 h-3 rounded-full bg-mocha-green"></div>
        </div>
      </div>
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-[420px] bg-executor-dark text-executor-light p-4 outline-none code-editor resize-none custom-scrollbar font-mono"
          spellCheck="false"
          placeholder="-- Enter your Lua script here"
        />
        <div className="absolute top-2 right-2 flex flex-col space-y-2">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="p-1.5 rounded-md bg-executor-secondary text-executor-light hover:bg-executor-purple/70 transition-colors"
            title="Script History"
          >
            <History size={16} />
          </button>
          <button 
            onClick={handleCopy}
            className="p-1.5 rounded-md bg-executor-secondary text-executor-light hover:bg-executor-purple/70 transition-colors"
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </button>
          <button 
            onClick={handleSave}
            className="p-1.5 rounded-md bg-executor-secondary text-executor-light hover:bg-executor-purple/70 transition-colors"
            title="Save to file"
          >
            <Save size={16} />
          </button>
        </div>
        
        {/* Script History Dropdown */}
        {showHistory && scriptHistory.length > 0 && (
          <div className="absolute top-12 right-2 w-64 bg-executor-dark border border-executor-purple border-opacity-30 rounded-md shadow-lg z-10">
            <div className="p-2 border-b border-executor-purple border-opacity-30">
              <h3 className="text-executor-light text-sm font-medium">Recent Scripts</h3>
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {scriptHistory.map((script, index) => {
                // Get first non-empty line for the title
                const firstLine = script.split('\n').find(line => line.trim() !== '' && !line.trim().startsWith('--')) || 'Untitled Script';
                const displayTitle = firstLine.length > 25 ? firstLine.substring(0, 25) + '...' : firstLine;
                
                return (
                  <div 
                    key={index}
                    className="p-2 hover:bg-executor-secondary cursor-pointer border-b border-executor-purple border-opacity-10 text-executor-light text-sm"
                    onClick={() => handleHistorySelect(script)}
                  >
                    {displayTitle}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between p-3 bg-executor-secondary">
        <button 
          onClick={handleClear}
          className="px-4 py-2 bg-mocha-surface1 text-executor-light rounded-md hover:bg-mocha-surface2 transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} />
          Clear
        </button>
        <button 
          onClick={handleExecute}
          className="px-4 py-2 bg-executor-purple text-white rounded-md hover:bg-opacity-80 transition-colors glow-effect flex items-center gap-2"
        >
          <Play size={16} />
          Execute
        </button>
      </div>
    </Card>
  );
};

export default CodeEditor;
