"use client";

import React from 'react';
import { Button } from '@/components/ui/button';

interface StartScreenProps {
  onStartGame: () => void;
  highScore: number;
}

export default function StartScreen({ onStartGame, highScore }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 text-white relative overflow-hidden">
      {/* Animated clouds background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-10 bg-white rounded-full opacity-80 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-20 h-12 bg-white rounded-full opacity-60 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/3 w-12 h-8 bg-white rounded-full opacity-70 animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-10 w-18 h-11 bg-white rounded-full opacity-50 animate-pulse delay-1500"></div>
      </div>

      {/* Main content */}
      <div className="z-10 text-center space-y-8 px-4">
        {/* Game title */}
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-yellow-300 drop-shadow-lg tracking-wider">
            SUPER
          </h1>
          <h1 className="text-6xl md:text-8xl font-bold text-red-500 drop-shadow-lg tracking-wider -mt-4">
            MARIO
          </h1>
          <div className="text-2xl md:text-3xl font-semibold text-white drop-shadow-md">
            BROS
          </div>
        </div>

        {/* Mario character placeholder */}
        <div className="flex justify-center my-8">
          <div className="w-24 h-24 bg-red-500 rounded-lg border-4 border-yellow-400 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            M
          </div>
        </div>

        {/* High score display */}
        {highScore > 0 && (
          <div className="bg-black bg-opacity-50 rounded-lg p-4 border-2 border-yellow-400">
            <div className="text-yellow-300 text-lg font-bold">HIGH SCORE</div>
            <div className="text-white text-2xl font-mono">{highScore.toLocaleString()}</div>
          </div>
        )}

        {/* Start button */}
        <div className="space-y-4">
          <Button
            onClick={onStartGame}
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl px-8 py-4 rounded-lg border-4 border-green-700 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            START GAME
          </Button>
          
          <div className="text-sm text-gray-200 opacity-80">
            Use ARROW KEYS to move • SPACEBAR to jump
          </div>
        </div>

        {/* Decorative elements */}
        <div className="flex justify-center space-x-8 mt-8">
          {/* Coin */}
          <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-xs font-bold animate-spin">
            $
          </div>
          {/* Mushroom */}
          <div className="w-8 h-8 bg-red-500 rounded-t-full border-2 border-red-700 flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          {/* Star */}
          <div className="w-8 h-8 bg-yellow-300 transform rotate-12 flex items-center justify-center text-xs animate-pulse">
            ★
          </div>
        </div>
      </div>

      {/* Ground/platform at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600 border-t-4 border-green-800">
        <div className="h-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center space-x-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-2 h-2 bg-green-800 rounded-full opacity-60"></div>
          ))}
        </div>
      </div>

      {/* Copyright */}
      <div className="absolute bottom-2 right-4 text-xs text-gray-300 opacity-60">
        © 2024 Super Mario Game
      </div>
    </div>
  );
}