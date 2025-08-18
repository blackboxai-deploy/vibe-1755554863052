import React from 'react';
import { Button } from '@/components/ui/button';

interface PauseMenuProps {
  onResume: () => void;
  onRestart: () => void;
  onMainMenu: () => void;
}

const PauseMenu: React.FC<PauseMenuProps> = ({
  onResume,
  onRestart,
  onMainMenu,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-blue-900 border-4 border-white p-8 rounded-lg text-center">
        <h2 className="text-4xl font-bold text-white mb-8 pixel-font">
          PAUSED
        </h2>
        
        <div className="space-y-4">
          <Button
            onClick={onResume}
            className="w-48 h-12 text-xl font-bold bg-green-600 hover:bg-green-700 text-white border-2 border-white"
          >
            RESUME
          </Button>
          
          <Button
            onClick={onRestart}
            className="w-48 h-12 text-xl font-bold bg-yellow-600 hover:bg-yellow-700 text-white border-2 border-white"
          >
            RESTART LEVEL
          </Button>
          
          <Button
            onClick={onMainMenu}
            className="w-48 h-12 text-xl font-bold bg-red-600 hover:bg-red-700 text-white border-2 border-white"
          >
            MAIN MENU
          </Button>
        </div>
        
        <div className="mt-6 text-white text-sm">
          <p>Press ESC or SPACE to resume</p>
        </div>
      </div>
    </div>
  );
};

export default PauseMenu;