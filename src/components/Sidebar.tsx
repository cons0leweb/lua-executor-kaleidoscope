
import React from 'react';
import ScriptLibrary from '@/components/ScriptLibrary';
import { Upload, Download, Play, FileText, Rocket } from 'lucide-react';

interface SidebarProps {
  handleUpload: () => void;
  handleDownload: () => void;
  handleQuickExecute: () => void;
  isExecuting: boolean;
  isAttached: boolean;
  setCurrentScript: (script: string) => void;
  handleSelectScript: (script: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  handleUpload,
  handleDownload,
  handleQuickExecute,
  isExecuting,
  isAttached,
  setCurrentScript,
  handleSelectScript,
}) => {
  return (
    <div className="p-4 flex flex-col h-full overflow-hidden">
      <div className="mb-4">
        <h2 className="text-executor-light font-medium mb-3 flex items-center">
          <Rocket size={16} className="text-mocha-lavender mr-2" />
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={handleUpload}
            className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors"
          >
            <Upload size={18} className="text-mocha-blue mb-1" />
            <span className="text-executor-light text-xs">Upload</span>
          </button>
          <button 
            onClick={handleDownload}
            className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors"
          >
            <Download size={18} className="text-mocha-green mb-1" />
            <span className="text-executor-light text-xs">Save</span>
          </button>
          <button 
            onClick={handleQuickExecute}
            disabled={isExecuting || !isAttached}
            className={`bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
              isExecuting || !isAttached ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-80 glow-effect'
            }`}
          >
            <Play size={18} className={`${isExecuting ? 'text-mocha-red' : 'text-mocha-mauve'} mb-1`} />
            <span className="text-executor-light text-xs">
              {isExecuting ? 'Executing...' : 'Execute'}
            </span>
          </button>
          <button 
            onClick={() => setCurrentScript('-- Enter your Lua script here\n\n')}
            className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors"
          >
            <FileText size={18} className="text-mocha-peach mb-1" />
            <span className="text-executor-light text-xs">New</span>
          </button>
        </div>
      </div>
      
      <div className="flex-grow overflow-hidden flex flex-col">
        <ScriptLibrary onSelectScript={handleSelectScript} />
      </div>
    </div>
  );
};

export default Sidebar;
