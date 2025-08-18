"use client";

import React, { useRef, useEffect, useCallback } from 'react';
import { Game } from '@/lib/game/Game';

interface GameCanvasProps {
  gameState: 'playing' | 'paused';
  onGameStateChange: (state: 'menu' | 'playing' | 'paused' | 'gameOver') => void;
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onCoinsUpdate: (coins: number) => void;
  onTimeUpdate: (time: number) => void;
  onLevelUpdate: (level: number) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  gameState,
  onGameStateChange,
  onScoreUpdate,
  onLivesUpdate,
  onCoinsUpdate,
  onTimeUpdate,
  onLevelUpdate,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const gameLoop = useCallback(() => {
    if (!gameRef.current || gameState !== 'playing') return;

    const game = gameRef.current;
    game.update();
    game.render();

    // Update UI with current game state
    onScoreUpdate(game.getScore());
    onLivesUpdate(game.getLives());
    onCoinsUpdate(game.getCoins());
    onTimeUpdate(game.getTime());
    onLevelUpdate(game.getCurrentLevel());

    // Check for game over
    if (game.isGameOver()) {
      onGameStateChange('gameOver');
      return;
    }

    // Check for level completion
    if (game.isLevelComplete()) {
      game.nextLevel();
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop);
  }, [gameState, onScoreUpdate, onLivesUpdate, onCoinsUpdate, onTimeUpdate, onLevelUpdate, onGameStateChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Initialize game
    gameRef.current = new Game(ctx, canvas.width, canvas.height);

    // Start game loop when playing
    if (gameState === 'playing') {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(gameLoop);
    } else if (gameState === 'paused' && animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameRef.current) return;

      switch (event.code) {
        case 'Space':
          event.preventDefault();
          if (gameState === 'playing') {
            onGameStateChange('paused');
          } else if (gameState === 'paused') {
            onGameStateChange('playing');
          }
          break;
        case 'KeyR':
          if (gameState === 'paused') {
            gameRef.current.restart();
            onGameStateChange('playing');
          }
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      // Handle key up events if needed
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, onGameStateChange]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-blue-400 to-blue-600 p-4">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border-4 border-gray-800 rounded-lg shadow-2xl bg-gradient-to-b from-blue-300 to-blue-500"
          style={{
            imageRendering: 'pixelated' as any,
          }}
        />
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">PAUSED</h2>
              <p className="text-gray-600 mb-2">Press SPACE to resume</p>
              <p className="text-gray-600">Press R to restart</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameCanvas;