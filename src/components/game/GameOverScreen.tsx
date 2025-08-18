import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  level: number;
  coins: number;
  onRestart: () => void;
  onMainMenu: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  highScore,
  level,
  coins,
  onRestart,
  onMainMenu
}) => {
  const isNewHighScore = score > highScore;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <Card className="w-96 bg-gradient-to-b from-blue-900 to-blue-700 border-4 border-yellow-400 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold text-yellow-300 mb-2">
            GAME OVER
          </CardTitle>
          {isNewHighScore && (
            <div className="text-2xl text-yellow-200 animate-pulse">
              NEW HIGH SCORE!
            </div>
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <div className="text-xl">
              <span className="text-yellow-300">SCORE:</span>
              <span className="ml-2 font-mono text-2xl">{score.toLocaleString()}</span>
            </div>
            
            <div className="text-lg">
              <span className="text-yellow-300">HIGH SCORE:</span>
              <span className="ml-2 font-mono">{highScore.toLocaleString()}</span>
            </div>
            
            <div className="text-lg">
              <span className="text-yellow-300">LEVEL REACHED:</span>
              <span className="ml-2 font-mono">{level}</span>
            </div>
            
            <div className="text-lg">
              <span className="text-yellow-300">COINS COLLECTED:</span>
              <span className="ml-2 font-mono">{coins}</span>
            </div>
          </div>
          
          <div className="border-t border-yellow-400 pt-4">
            <div className="text-center text-sm text-yellow-200 mb-4">
              Press ENTER to restart or ESC for main menu
            </div>
            
            <div className="flex gap-3 justify-center">
              <Button
                onClick={onRestart}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 border-2 border-green-400"
              >
                RESTART
              </Button>
              
              <Button
                onClick={onMainMenu}
                variant="outline"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 border-2 border-red-400"
              >
                MAIN MENU
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameOverScreen;