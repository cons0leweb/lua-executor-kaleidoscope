
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export const useRobloxAttachment = () => {
  const [isAttached, setIsAttached] = useState(false);
  const [consoleMessages, setConsoleMessages] = useState<{ text: string; type: 'info' | 'error' | 'success' }[]>([]);

  useEffect(() => {
    setConsoleMessages([
      { text: "Executor initialized successfully", type: 'info' },
      { text: "System ready", type: 'success' },
    ]);

    try {
      const savedSettings = localStorage.getItem('executor-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.autoAttach) {
          handleAttach();
        }
      }
    } catch (error) {
      console.error('Failed to parse settings:', error);
    }
  }, []);

  const handleAttach = () => {
    setConsoleMessages(prev => [
      ...prev, 
      { text: "Attaching to Roblox...", type: 'info' }
    ]);

    setTimeout(() => {
      setIsAttached(true);
      setConsoleMessages(prev => [
        ...prev,
        { text: "Successfully attached to Roblox!", type: 'success' }
      ]);
      toast.success("Successfully attached to Roblox");
    }, 1000);
  };

  const addConsoleMessage = (message: { text: string; type: 'info' | 'error' | 'success' }) => {
    setConsoleMessages(prev => [...prev, message]);
  };

  const clearConsole = () => {
    setConsoleMessages([]);
  };

  return {
    isAttached,
    consoleMessages,
    handleAttach,
    addConsoleMessage,
    clearConsole
  };
};
