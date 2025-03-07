
import React from 'react';
import CodeEditor from '@/components/CodeEditor';
import Console from '@/components/Console';

interface MainContentProps {
  handleExecute: (code: string) => void;
  consoleMessages: { text: string; type: 'info' | 'error' | 'success' }[];
  handleClearConsole: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  handleExecute,
  consoleMessages,
  handleClearConsole,
}) => {
  return (
    <div className="grid grid-rows-[1fr,auto] gap-4 h-full">
      <CodeEditor onExecute={handleExecute} />
      <Console messages={consoleMessages} onClear={handleClearConsole} />
    </div>
  );
};

export default MainContent;
