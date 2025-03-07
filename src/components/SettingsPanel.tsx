
import React, { useState } from 'react';
import { X, Save, Refresh, Monitor, ChevronsUpDown, Zap, Volume2, Volume, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [autoAttach, setAutoAttach] = useState(true);
  const [topmostWindow, setTopmostWindow] = useState(false);
  const [unlockFps, setUnlockFps] = useState(true);
  const [opacity, setOpacity] = useState(75);
  const [executionSpeed, setExecutionSpeed] = useState(50);
  const [muteConsole, setMuteConsole] = useState(false);
  const [darkTheme, setDarkTheme] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    toast.success("Settings saved successfully");
    onClose();
  };

  const handleReset = () => {
    setAutoAttach(true);
    setTopmostWindow(false);
    setUnlockFps(true);
    setOpacity(75);
    setExecutionSpeed(50);
    setMuteConsole(false);
    setDarkTheme(true);
    toast.info("Settings reset to default");
  };

  const getSpeedLabel = (value: number) => {
    if (value < 25) return "Slow";
    if (value < 50) return "Normal";
    if (value < 75) return "Fast";
    return "Very Fast";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-executor-dark border border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg animate-fade-in">
        <div className="flex items-center justify-between bg-executor-secondary px-4 py-3 border-b border-executor-purple border-opacity-30">
          <span className="text-executor-light font-medium">Settings</span>
          <button 
            onClick={onClose}
            className="text-executor-light hover:text-executor-purple transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <div className="grid gap-5">
            <div className="bg-executor-secondary border border-executor-purple border-opacity-10 rounded-md p-4">
              <h3 className="text-mocha-lavender text-sm font-medium mb-3">Execution Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="text-mocha-yellow h-4 w-4" />
                    <span className="text-executor-light text-sm">Auto Attach</span>
                  </div>
                  <Switch 
                    checked={autoAttach} 
                    onCheckedChange={setAutoAttach} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChevronsUpDown className="text-mocha-blue h-4 w-4" />
                    <span className="text-executor-light text-sm">Topmost Window</span>
                  </div>
                  <Switch 
                    checked={topmostWindow} 
                    onCheckedChange={setTopmostWindow} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="text-mocha-green h-4 w-4" />
                    <span className="text-executor-light text-sm">Unlock FPS</span>
                  </div>
                  <Switch 
                    checked={unlockFps} 
                    onCheckedChange={setUnlockFps} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {muteConsole ? (
                      <Volume className="text-mocha-red h-4 w-4" />
                    ) : (
                      <Volume2 className="text-mocha-green h-4 w-4" />
                    )}
                    <span className="text-executor-light text-sm">Mute Console</span>
                  </div>
                  <Switch 
                    checked={muteConsole} 
                    onCheckedChange={setMuteConsole} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkTheme ? (
                      <Eye className="text-mocha-lavender h-4 w-4" />
                    ) : (
                      <EyeOff className="text-mocha-lavender h-4 w-4" />
                    )}
                    <span className="text-executor-light text-sm">Dark Theme</span>
                  </div>
                  <Switch 
                    checked={darkTheme} 
                    onCheckedChange={setDarkTheme} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-executor-secondary border border-executor-purple border-opacity-10 rounded-md p-4">
              <h3 className="text-mocha-lavender text-sm font-medium mb-3">UI Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-executor-light text-sm">Window Opacity</span>
                    <span className="text-executor-light text-xs bg-executor-dark px-2 py-1 rounded">{opacity}%</span>
                  </div>
                  <Slider 
                    value={[opacity]} 
                    max={100} 
                    step={5} 
                    onValueChange={(value) => setOpacity(value[0])} 
                    className="py-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-executor-light text-sm">Execution Speed</span>
                    <span className="text-executor-light text-xs bg-executor-dark px-2 py-1 rounded">
                      {getSpeedLabel(executionSpeed)}
                    </span>
                  </div>
                  <Slider 
                    value={[executionSpeed]} 
                    max={100} 
                    step={1} 
                    onValueChange={(value) => setExecutionSpeed(value[0])} 
                    className="py-2"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-5 flex justify-between">
            <button 
              onClick={handleReset}
              className="px-4 py-2 bg-mocha-surface1 text-executor-light rounded-md hover:bg-mocha-surface2 transition-colors flex items-center gap-2"
            >
              <Refresh size={16} />
              Reset
            </button>
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-executor-purple text-white rounded-md hover:bg-opacity-80 transition-colors flex items-center gap-2 glow-effect"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
