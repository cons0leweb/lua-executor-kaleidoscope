
import React, { useState } from 'react';
import Header from '@/components/Header';
import CodeEditor from '@/components/CodeEditor';
import ScriptLibrary from '@/components/ScriptLibrary';
import Console from '@/components/Console';
import SettingsPanel from '@/components/SettingsPanel';
import { Settings, Upload, Download, Play, FileText, Menu, X, Home, Info, Rocket } from 'lucide-react';
import { toast } from "sonner";

const Index = () => {
  const [consoleMessages, setConsoleMessages] = useState<{ text: string; type: 'info' | 'error' | 'success' }[]>([
    { text: "EasyExploits initialized successfully", type: 'info' },
    { text: "System ready", type: 'success' },
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentScript, setCurrentScript] = useState<string>('-- Enter your Lua script here\n\nprint("Hello, Roblox!")\n');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleExecute = (code: string) => {
    setCurrentScript(code);
    // Simulate script execution
    setConsoleMessages(prev => [
      ...prev, 
      { text: "Executing script...", type: 'info' }
    ]);
    
    // Simulate a delay for execution
    setTimeout(() => {
      // Check if the script contains certain keywords to simulate different results
      if (code.includes("error") || code.includes("fail")) {
        setConsoleMessages(prev => [
          ...prev,
          { text: "Error executing script: " + (code.includes("error") ? "Syntax error" : "Execution failed"), type: 'error' }
        ]);
        toast.error("Script execution failed");
      } else {
        setConsoleMessages(prev => [
          ...prev,
          { text: "Script executed successfully!", type: 'success' }
        ]);
        toast.success("Script executed successfully!");
      }
    }, 500);
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

  const handleQuickExecute = () => {
    handleExecute(currentScript);
  };

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.lua,.txt';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          setCurrentScript(content);
          toast.success("Script uploaded successfully");
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleDownload = () => {
    const blob = new Blob([currentScript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Script saved to file");
  };

  return (
    <div className="flex flex-col h-screen bg-executor-dark">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar toggle */}
        <button 
          className="md:hidden fixed top-16 left-0 z-10 p-2 m-2 bg-executor-secondary rounded-md border border-executor-purple border-opacity-30" 
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <X size={20} className="text-executor-light" /> : <Menu size={20} className="text-executor-light" />}
        </button>

        {/* Sidebar with script library */}
        <div className={`w-full md:w-80 bg-executor-secondary border-r border-executor-purple border-opacity-30 overflow-hidden transition-all duration-300 flex flex-col ${isSidebarOpen ? 'block absolute md:relative z-10 h-full md:h-auto' : 'hidden md:block'}`}>
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
                  className="bg-executor-dark flex flex-col items-center justify-center p-3 rounded-md hover:bg-opacity-80 transition-colors glow-effect"
                >
                  <Play size={18} className="text-mocha-mauve mb-1" />
                  <span className="text-executor-light text-xs">Execute</span>
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
        </div>
        
        {/* Main editor area */}
        <div className={`flex-1 p-4 overflow-hidden ${isSidebarOpen ? 'hidden md:block' : 'block'}`}>
          <div className="grid grid-rows-[1fr,auto] gap-4 h-full">
            <CodeEditor onExecute={handleExecute} />
            <Console messages={consoleMessages} onClear={handleClearConsole} />
          </div>
        </div>
      </div>
      
      {/* Settings button (visible all times) */}
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
