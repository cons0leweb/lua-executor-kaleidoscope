
import React from 'react';
import { Play, Settings, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-executor-dark border-b border-executor-purple border-opacity-30 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Zap className="h-6 w-6 text-executor-purple mr-2" />
        <h1 className="text-xl font-bold text-executor-light flex items-center">
          Easy<span className="text-executor-purple">Exploits</span>
          <span className="ml-2 bg-executor-purple text-white text-xs py-0.5 px-2 rounded-full">
            Free 6-LVL
          </span>
        </h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4 flex items-center">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-light mr-2"></div>
          <span className="text-green-500 text-sm">Connected</span>
        </div>
        <button className="bg-executor-secondary p-2 rounded-md hover:bg-opacity-80 transition-colors">
          <Settings className="h-5 w-5 text-executor-light" />
        </button>
      </div>
    </header>
  );
};

export default Header;
