'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameCanvas from '@/components/game/GameCanvas';
import StartScreen from '@/components/game/StartScreen';
import GameOverScreen from '@/components/game/GameOverScreen';
import PauseMenu from '@/components/game/PauseMenu';
import GameHUD from '@/components/game/GameHUD';

export type GameState = 'MENU' | 'PLAYING' | 'PAUSED' | 'GAME_OVER' | 'LEVEL_COMPLETE';

export interface GameStats {
  score: number;
  lives: number;
  coins: number;
  level: number;
  time: number;
}

export default function HomePage() {
  const [gameState, setGameState] = useState<GameState>('MENU');
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    lives: 3,
    coins: 0,
    level: 1,
    time: 400
  });
  const [highScore, setHighScore] = useState<number>(0);

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('mario-high-score');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  // Save high score to localStorage when score changes
  useEffect(() => {
    if (gameStats.score > highScore) {
      setHighScore(gameStats.score);
      localStorage.setItem('mario-high-score', gameStats.score.toString());
    }
  }, [gameStats.score, highScore]);

  // Global keyboard event handler
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'Escape':
        if (gameState === 'PLAYING') {
          setGameState('PAUSED');
        } else if (gameState === 'PAUSED') {
          setGameState('PLAYING');
        }
        break;
      case 'Space':
        if (gameState === 'PAUSED') {
          setGameState('PLAYING');
        }
        break;
      case 'Enter':
        if (gameState === 'MENU') {
          startNewGame();
        } else if (gameState === 'GAME_OVER') {
          startNewGame();
        }
        break;
    }
  }, [gameState]);

  // Set up global keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const startNewGame = () => {
    setGameStats({
      score: 0,
      lives: 3,
      coins: 0,
      level: 1,
      time: 400
    });
    setGameState('PLAYING');
  };

  const pauseGame = () => {
    setGameState('PAUSED');
  };

  const resumeGame = () => {
    setGameState('PLAYING');
  };

  const gameOver = () => {
    setGameState('GAME_OVER');
  };

  const nextLevel = () => {
    setGameStats(prev => ({
      ...prev,
      level: prev.level + 1,
      time: 400,
      score: prev.score + 1000 // Bonus for completing level
    }));
    setGameState('PLAYING');
  };

  const updateGameStats = (newStats: Partial<GameStats>) => {
    setGameStats(prev => ({ ...prev, ...newStats }));
  };

  const addScore = (points: number) => {
    setGameStats(prev => ({ ...prev, score: prev.score + points }));
  };

  const addCoin = () => {
    setGameStats(prev => {
      const newCoins = prev.coins + 1;
      const newLives = newCoins >= 100 ? prev.lives + 1 : prev.lives;
      const resetCoins = newCoins >= 100 ? 0 : newCoins;
      
      return {
        ...prev,
        coins: resetCoins,
        lives: newLives,
        score: prev.score + 200
      };
    });
  };

  const loseLife = () => {
    setGameStats(prev => {
      const newLives = prev.lives - 1;
      if (newLives <= 0) {
        setTimeout(() => gameOver(), 1000);
      }
      return { ...prev, lives: newLives };
    });
  };

  const returnToMenu = () => {
    setGameState('MENU');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        {/* Game HUD - Always visible during gameplay */}
        {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
          <GameHUD 
            score={gameStats.score}
            coins={gameStats.coins}
            lives={gameStats.lives}
            time={gameStats.time}
            world="1"
            level={gameStats.level}
          />
        )}

        {/* Main Game Canvas */}
        {(gameState === 'PLAYING' || gameState === 'PAUSED') && (
          <GameCanvas
            gameState={gameState.toLowerCase() as 'playing' | 'paused'}
            onGameStateChange={(state) => {
              switch(state) {
                case 'menu': setGameState('MENU'); break;
                case 'playing': setGameState('PLAYING'); break;
                case 'paused': setGameState('PAUSED'); break;
                case 'gameOver': setGameState('GAME_OVER'); break;
              }
            }}
            onScoreUpdate={(score) => updateGameStats({ score })}
            onLivesUpdate={(lives) => updateGameStats({ lives })}
            onCoinsUpdate={(coins) => updateGameStats({ coins })}
            onTimeUpdate={(time) => updateGameStats({ time })}
            onLevelUpdate={(level) => updateGameStats({ level })}
          />
        )}

        {/* Start Screen */}
        {gameState === 'MENU' && (
          <StartScreen
            highScore={highScore}
            onStartGame={startNewGame}
          />
        )}

        {/* Pause Menu Overlay */}
        {gameState === 'PAUSED' && (
          <PauseMenu
            onResume={resumeGame}
            onRestart={startNewGame}
            onMainMenu={returnToMenu}
          />
        )}

        {/* Game Over Screen */}
        {gameState === 'GAME_OVER' && (
          <GameOverScreen
            score={gameStats.score}
            highScore={highScore}
            level={gameStats.level}
            coins={gameStats.coins}
            onRestart={startNewGame}
            onMainMenu={returnToMenu}
          />
        )}

        {/* Controls Help */}
        <div className="absolute bottom-2 left-2 text-white text-xs opacity-75">
          <div>Arrow Keys: Move | Space: Jump | Enter: Start/Restart | Esc: Pause</div>
        </div>

        {/* Game Info */}
        <div className="absolute bottom-2 right-2 text-white text-xs opacity-75">
          <div>Super Mario Bros - React Edition</div>
        </div>
      </div>
    </div>
  );
}