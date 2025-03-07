
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import SettingsPanel from '@/components/SettingsPanel';
import { Settings, Menu, X } from 'lucide-react';
import { useRobloxAttachment } from '@/hooks/useRobloxAttachment';
import { useScriptExecution } from '@/hooks/useScriptExecution';
import { useFileOperations } from '@/hooks/useFileOperations';
import { toast } from "sonner";

const Index = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Initialize hooks
  const { 
    isAttached, 
    consoleMessages, 
    handleAttach, 
    addConsoleMessage, 
    clearConsole 
  } = useRobloxAttachment();

  const { 
    currentScript, 
    setCurrentScript, 
    isExecuting, 
    handleExecute, 
    handleQuickExecute 
  } = useScriptExecution(isAttached, addConsoleMessage);

  const { 
    handleUpload, 
    handleDownload 
  } = useFileOperations(currentScript, setCurrentScript);

  const handleClearConsole = () => {
    clearConsole();
    toast.info("Console cleared");
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
      <Header onAttach={handleAttach} isAttached={isAttached} />
      
      <div className="flex flex-1 overflow-hidden">
        <button 
          className="md:hidden fixed top-16 left-0 z-10 p-2 m-2 bg-executor-secondary rounded-md border border-executor-purple border-opacity-30" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} className="text-executor-light" /> : <Menu size={20} className="text-executor-light" />}
        </button>

        <div className={`w-full md:w-80 bg-executor-secondary border-r border-executor-purple border-opacity-30 overflow-hidden transition-all duration-300 flex flex-col ${isSidebarOpen ? 'block absolute md:relative z-10 h-full md:h-auto' : 'hidden md:block'}`}>
          <Sidebar 
            handleUpload={handleUpload}
            handleDownload={handleDownload}
            handleQuickExecute={handleQuickExecute}
            isExecuting={isExecuting}
            isAttached={isAttached}
            setCurrentScript={setCurrentScript}
            handleSelectScript={handleSelectScript}
          />
        </div>
        
        <div className={`flex-1 p-4 overflow-hidden ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
          <MainContent 
            handleExecute={handleExecute}
            consoleMessages={consoleMessages}
            handleClearConsole={handleClearConsole}
          />
        </div>
      </div>
      
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className="fixed bottom-4 right-4 bg-executor-purple p-3 rounded-full hover:bg-opacity-80 transition-colors shadow-lg glow-effect z-10"
      >
        <Settings className="h-5 w-5 text-white" />
      </button>
      
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Index;
