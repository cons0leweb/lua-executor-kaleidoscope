
import React from 'react';
import { Button } from '@/components/ui/button';
import { Wifi, WifiOff } from 'lucide-react';

interface HeaderProps {
  onAttach: () => void;
  isAttached: boolean;
}

const Header: React.FC<HeaderProps> = ({ onAttach, isAttached }) => {
  return (
    <header className="bg-executor-dark text-executor-light border-b border-executor-purple border-opacity-30 py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg text-executor-purple glow-text">Roblox Executor</span>
          <span className="text-xs bg-executor-secondary rounded-md px-2 py-0.5">
            v1.0.0
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onAttach}
            className={`text-xs gap-1.5 ${isAttached ? 'bg-mocha-green/20 text-mocha-green hover:text-mocha-green hover:bg-mocha-green/30' : 'bg-mocha-red/20 text-mocha-red hover:text-mocha-red hover:bg-mocha-red/30'}`}
          >
            {isAttached ? (
              <>
                <Wifi size={14} />
                Connected
              </>
            ) : (
              <>
                <WifiOff size={14} />
                Connect
              </>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
