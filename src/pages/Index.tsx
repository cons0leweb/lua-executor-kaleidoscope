
import React, { useState } from 'react';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import ScriptLibrary from '@/components/ScriptLibrary';
import Console from '@/components/Console';
import SettingsPanel from '@/components/SettingsPanel';
import { Settings, Upload, Download, Play, FileText, Menu, X } from 'lucide-react';
import { toast } from "sonner";

const Index = () => {
  const [consoleMessages, setConsoleMessages] = useState<{ text: string; type: 'info' | 'error' | 'success' }[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentScript, setCurrentScript] = useState<string>('-- Enter your Lua script here\n\nprint("Hello, Roblox!")\n');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleExecute = (code: string) => {
    setCurrentScript(code);
    // Simulate script execution
    setConsoleMessages(prev => [
      ...prev, 
      { text: "Executing script...", type: 'info' },
      { text: "Script executed successfully!", type: 'success' }
    ]);
    
    toast.success("Script executed successfully!");
  };

  const handleClearConsole = () => {
    setConsoleMessages([]);
  };

  const handleSelectScript = (script: string) => {
    setCurrentScript(script);
    toast.info("Script loaded to editor");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-executor-dark">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <button 
          className="md:hidden fixed top-16 left-0 z-10 p-2 m-2 bg-executor-secondary rounded-md" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} className="text-executor-light" /> : <Menu size={20} className="text-executor-light" />}
        </button>

        {/* Sidebar with script library */}
        <div className={`w-full md:w-72 bg-executor-secondary border-r border-executor-purple border-opacity-30 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? 'block' : 'hidden md:block'}`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-executor-light font-medium">Quick Actions</h2>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="text-executor-light hover:text-executor-purple"
              >
                <Settings size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              <button className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors">
                <Upload size={18} className="text-executor-light mb-1" />
                <span className="text-executor-light text-xs">Upload</span>
              </button>
              <button className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors">
                <Download size={18} className="text-executor-light mb-1" />
                <span className="text-executor-light text-xs">Save</span>
              </button>
              <button className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors">
                <Play size={18} className="text-executor-light mb-1" />
                <span className="text-executor-light text-xs">Execute</span>
              </button>
              <button className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors">
                <FileText size={18} className="text-executor-light mb-1" />
                <span className="text-executor-light text-xs">New</span>
              </button>
            </div>
            
            <ScriptLibrary onSelectScript={handleSelectScript} />
          </div>
        </div>
        
        {/* Main editor area */}
        <div className={`flex-1 p-4 ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
          <div className="grid grid-rows-[auto,1fr] gap-4 h-full">
            <CodeEditor onExecute={handleExecute} />
            <Console messages={consoleMessages} onClear={handleClearConsole} />
          </div>
        </div>
      </div>
      
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Index;
