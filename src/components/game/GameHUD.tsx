'use client';

import React from 'react';

interface GameHUDProps {
  score: number;
  coins: number;
  lives: number;
  time: number;
  world: string;
  level: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  coins,
  lives,
  time,
  world,
  level
}) => {
  const formatScore = (score: number): string => {
    return score.toString().padStart(6, '0');
  };

  const formatTime = (time: number): string => {
    return Math.max(0, Math.floor(time)).toString();
  };

  const formatCoins = (coins: number): string => {
    return coins.toString().padStart(2, '0');
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-black text-white font-mono text-sm select-none">
      <div className="flex justify-between items-center px-4 py-2 max-w-4xl mx-auto">
        {/* Left Section - Score and Coins */}
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-300">MARIO</span>
            <span className="text-lg font-bold">{formatScore(score)}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-300">COINS</span>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">●</span>
              <span className="text-lg font-bold">×{formatCoins(coins)}</span>
            </div>
          </div>
        </div>

        {/* Center Section - World Info */}
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-300">WORLD</span>
          <span className="text-lg font-bold">{world}-{level}</span>
        </div>

        {/* Right Section - Time and Lives */}
        <div className="flex space-x-8">
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-300">TIME</span>
            <span className={`text-lg font-bold ${time <= 100 ? 'text-red-400 animate-pulse' : ''}`}>
              {formatTime(time)}
            </span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-xs text-gray-300">LIVES</span>
            <div className="flex items-center space-x-1">
              <span className="text-red-400">♥</span>
              <span className="text-lg font-bold">×{lives}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom border */}
      <div className="h-0.5 bg-white"></div>
    </div>
  );
};

export default GameHUD;