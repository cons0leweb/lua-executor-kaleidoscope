
import React from 'react';
import { X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-executor-dark border border-executor-purple border-opacity-30 rounded-md overflow-hidden shadow-lg">
        <div className="flex items-center justify-between bg-executor-secondary px-4 py-3 border-b border-executor-purple border-opacity-30">
          <span className="text-executor-light font-medium">Settings</span>
          <button 
            onClick={onClose}
            className="text-executor-light hover:text-executor-purple"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-executor-light">Auto Attach</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-executor-light">Topmost Window</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-executor-light">Unlock FPS</span>
              <Switch />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-executor-light">Opacity</span>
                <span className="text-executor-light text-sm">75%</span>
              </div>
              <Slider defaultValue={[75]} max={100} step={1} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-executor-light">Script Execution Speed</span>
                <span className="text-executor-light text-sm">Normal</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-executor-purple text-white rounded-md hover:bg-opacity-80 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SettingsPanel;
