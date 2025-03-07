
import { useState } from 'react';
import { executeRobloxScript } from '@/utils/scriptExecution';
import { toast } from "sonner";

export const useScriptExecution = (
  isAttached: boolean,
  addConsoleMessage: (message: { text: string; type: 'info' | 'error' | 'success' }) => void
) => {
  const [currentScript, setCurrentScript] = useState<string>('-- Enter your Lua script here\n\nprint("Hello, Roblox!")\n');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async (code: string) => {
    if (!isAttached) {
      toast.error("Not attached to Roblox");
      addConsoleMessage({ 
        text: "Error: Not attached to Roblox. Please attach first.", 
        type: 'error' 
      });
      return;
    }

    if (isExecuting) {
      toast.error("Already executing a script");
      return;
    }

    setCurrentScript(code);
    setIsExecuting(true);
    
    addConsoleMessage({ 
      text: "Executing script...", 
      type: 'info' 
    });
    
    try {
      const result = await executeRobloxScript(code);
      
      if (result.success) {
        addConsoleMessage({
          text: result.message,
          type: 'success'
        });
        toast.success("Script executed successfully!");
      } else {
        addConsoleMessage({
          text: "Error executing script: " + result.message,
          type: 'error'
        });
        toast.error("Script execution failed");
      }
    } catch (error) {
      addConsoleMessage({
        text: "Error executing script: " + (error instanceof Error ? error.message : String(error)),
        type: 'error'
      });
      toast.error("Script execution failed");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleQuickExecute = () => {
    handleExecute(currentScript);
  };

  return {
    currentScript,
    setCurrentScript,
    isExecuting,
    handleExecute,
    handleQuickExecute
  };
};
