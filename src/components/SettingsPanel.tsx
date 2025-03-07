import React, { useState, useEffect } from 'react';
import { X, Save, RefreshCw, Monitor, ChevronsUpDown, Zap, Volume2, Volume, Eye, EyeOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { toast } from "sonner";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Settings {
  autoAttach: boolean;
  topmostWindow: boolean;
  unlockFps: boolean;
  opacity: number;
  executionSpeed: number;
  muteConsole: boolean;
  darkTheme: boolean;
}

const defaultSettings: Settings = {
  autoAttach: true,
  topmostWindow: false,
  unlockFps: true,
  opacity: 75,
  executionSpeed: 50,
  muteConsole: false,
  darkTheme: true
};

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('executor-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({...defaultSettings, ...parsedSettings});
      } catch (error) {
        console.error('Failed to parse settings:', error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-theme', settings.darkTheme);
    document.documentElement.style.setProperty('--window-opacity', `${settings.opacity}%`);
  }, [settings.darkTheme, settings.opacity]);

  if (!isOpen) return null;

  const handleSave = () => {
    localStorage.setItem('executor-settings', JSON.stringify(settings));
    applySettings(settings);
    toast.success("Settings saved successfully");
    onClose();
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    toast.info("Settings reset to default");
  };

  const getSpeedLabel = (value: number) => {
    if (value < 25) return "Slow";
    if (value < 50) return "Normal";
    if (value < 75) return "Fast";
    return "Very Fast";
  };

  const applySettings = (settings: Settings) => {
    document.documentElement.style.setProperty('--window-opacity', `${settings.opacity}%`);
    document.documentElement.classList.toggle('dark-theme', settings.darkTheme);
    
    if (settings.muteConsole) {
      console.log = function() {};
    } else {
      console.log = window.console.log;
    }
    
    window.localStorage.setItem('execution-speed', settings.executionSpeed.toString());
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
                    checked={settings.autoAttach} 
                    onCheckedChange={(value) => setSettings({...settings, autoAttach: value})} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ChevronsUpDown className="text-mocha-blue h-4 w-4" />
                    <span className="text-executor-light text-sm">Topmost Window</span>
                  </div>
                  <Switch 
                    checked={settings.topmostWindow} 
                    onCheckedChange={(value) => setSettings({...settings, topmostWindow: value})} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Monitor className="text-mocha-green h-4 w-4" />
                    <span className="text-executor-light text-sm">Unlock FPS</span>
                  </div>
                  <Switch 
                    checked={settings.unlockFps} 
                    onCheckedChange={(value) => setSettings({...settings, unlockFps: value})} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.muteConsole ? (
                      <Volume className="text-mocha-red h-4 w-4" />
                    ) : (
                      <Volume2 className="text-mocha-green h-4 w-4" />
                    )}
                    <span className="text-executor-light text-sm">Mute Console</span>
                  </div>
                  <Switch 
                    checked={settings.muteConsole} 
                    onCheckedChange={(value) => setSettings({...settings, muteConsole: value})} 
                    className="data-[state=checked]:bg-mocha-mauve"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {settings.darkTheme ? (
                      <Eye className="text-mocha-lavender h-4 w-4" />
                    ) : (
                      <EyeOff className="text-mocha-lavender h-4 w-4" />
                    )}
                    <span className="text-executor-light text-sm">Dark Theme</span>
                  </div>
                  <Switch 
                    checked={settings.darkTheme} 
                    onCheckedChange={(value) => setSettings({...settings, darkTheme: value})} 
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
                    <span className="text-executor-light text-xs bg-executor-dark px-2 py-1 rounded">{settings.opacity}%</span>
                  </div>
                  <Slider 
                    value={[settings.opacity]} 
                    max={100} 
                    step={5} 
                    onValueChange={(value) => setSettings({...settings, opacity: value[0]})} 
                    className="py-2"
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-executor-light text-sm">Execution Speed</span>
                    <span className="text-executor-light text-xs bg-executor-dark px-2 py-1 rounded">
                      {getSpeedLabel(settings.executionSpeed)}
                    </span>
                  </div>
                  <Slider 
                    value={[settings.executionSpeed]} 
                    max={100} 
                    step={1} 
                    onValueChange={(value) => setSettings({...settings, executionSpeed: value[0]})} 
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
              <RefreshCw size={16} />
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
