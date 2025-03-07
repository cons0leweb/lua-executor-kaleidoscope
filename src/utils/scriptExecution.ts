
export const executeRobloxScript = (script: string): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (script.includes("error") || script.includes("fail")) {
        resolve({ 
          success: false, 
          message: script.includes("error") ? "Syntax error" : "Execution failed" 
        });
      } else {
        resolve({ 
          success: true, 
          message: "Script executed successfully!" 
        });
      }
    }, 500);
  });
};
