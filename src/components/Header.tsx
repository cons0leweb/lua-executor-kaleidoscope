
import React from 'react';
import { Zap, Package, Cpu, Shield } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-executor-dark border-b border-executor-purple border-opacity-30 py-3 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <div className="bg-gradient-to-br from-mocha-mauve to-mocha-pink p-2 rounded-lg mr-3 shadow-glow">
          <Zap className="h-6 w-6 text-executor-dark" />
        </div>
        <h1 className="text-xl font-bold text-executor-light flex items-center">
          Easy<span className="text-executor-purple">Exploits</span>
          <span className="ml-2 bg-executor-purple text-executor-dark text-xs py-0.5 px-2 rounded-full font-medium">
            6-LVL
          </span>
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full bg-executor-secondary px-3 py-1 text-xs">
          <div className="h-2 w-2 rounded-full bg-mocha-green animate-pulse-light mr-2"></div>
          <span className="text-mocha-green">Injected</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <Cpu size={16} className="text-mocha-blue mb-1" />
            <span className="text-mocha-blue text-xs">5.4ms</span>
          </div>
          <div className="flex flex-col items-center">
            <Shield size={16} className="text-mocha-green mb-1" />
            <span className="text-mocha-green text-xs">Safe</span>
          </div>
          <div className="flex flex-col items-center">
            <Package size={16} className="text-mocha-yellow mb-1" />
            <span className="text-mocha-yellow text-xs">v1.2.0</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
