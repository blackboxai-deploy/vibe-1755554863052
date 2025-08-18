import { Player } from './Player';
import { Level } from './Level';
import { Input } from './Input';
import { Audio } from './Audio';
import { Physics } from './Physics';

export enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'game_over',
  LEVEL_COMPLETE = 'level_complete'
}

export interface GameStats {
  score: number;
  lives: number;
  coins: number;
  world: number;
  level: number;
  time: number;
}

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private state: GameState = GameState.MENU;
  private lastTime: number = 0;
  private animationId: number = 0;
  
  // Game objects
  private player: Player;
  private currentLevel: Level;
  private input: Input;
  private audio: Audio;
  private physics: Physics;
  
  // Game state
  private stats: GameStats = {
    score: 0,
    lives: 3,
    coins: 0,
    world: 1,
    level: 1,
    time: 400
  };
  
  private camera = { x: 0, y: 0 };
  private levelTimer: number = 0;
  private gameSpeed: number = 1;
  
  // Event callbacks
  private onStateChange?: (state: GameState, stats: GameStats) => void;
  private onStatsUpdate?: (stats: GameStats) => void;

  constructor(ctxOrCanvas: CanvasRenderingContext2D | HTMLCanvasElement, width?: number, height?: number) {
    if (ctxOrCanvas instanceof CanvasRenderingContext2D) {
      this.ctx = ctxOrCanvas;
      this.canvas = ctxOrCanvas.canvas;
    } else {
      this.canvas = ctxOrCanvas;
      const ctx = ctxOrCanvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get 2D context from canvas');
      }
      this.ctx = ctx;
    }
    
    // Initialize game systems
    this.input = new Input();
    this.audio = new Audio();
    this.physics = new Physics();
    
    // Initialize game objects
    this.player = new Player(this.canvas, 100, 400);
    this.currentLevel = new Level(1, 1);
    
    // Set up canvas
    this.setupCanvas();
    
    // Bind methods
    this.gameLoop = this.gameLoop.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    // Add event listeners
    window.addEventListener('resize', this.handleResize);
    
    // Start game loop
    this.start();
  }

  private setupCanvas(): void {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.ctx.imageSmoothingEnabled = false; // Pixel art style
  }

  private handleResize(): void {
    const container = this.canvas.parentElement;
    if (container) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const aspectRatio = 800 / 600;
      
      let newWidth = containerWidth;
      let newHeight = containerWidth / aspectRatio;
      
      if (newHeight > containerHeight) {
        newHeight = containerHeight;
        newWidth = containerHeight * aspectRatio;
      }
      
      this.canvas.style.width = `${newWidth}px`;
      this.canvas.style.height = `${newHeight}px`;
    }
  }

  public start(): void {
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  public setState(newState: GameState): void {
    const oldState = this.state;
    this.state = newState;
    
    // Handle state transitions
    switch (newState) {
      case GameState.PLAYING:
        if (oldState === GameState.MENU) {
          this.resetGame();
        }
        this.audio.playBackgroundMusic('overworld');
        break;
      case GameState.PAUSED:
        this.audio.pauseBackgroundMusic();
        break;
      case GameState.GAME_OVER:
        this.audio.stopBackgroundMusic();
        this.audio.playSound('game_over');
        break;
      case GameState.LEVEL_COMPLETE:
        this.audio.stopBackgroundMusic();
        this.audio.playSound('level_complete');
        break;
      case GameState.MENU:
        this.audio.stopBackgroundMusic();
        break;
    }
    
    if (this.onStateChange) {
      this.onStateChange(newState, this.stats);
    }
  }

  public getState(): GameState {
    return this.state;
  }

  public getStats(): GameStats {
    return { ...this.stats };
  }

  public setStateChangeCallback(callback: (state: GameState, stats: GameStats) => void): void {
    this.onStateChange = callback;
  }

  public setStatsUpdateCallback(callback: (stats: GameStats) => void): void {
    this.onStatsUpdate = callback;
  }

  private resetGame(): void {
    this.stats = {
      score: 0,
      lives: 3,
      coins: 0,
      world: 1,
      level: 1,
      time: 400
    };
    
    this.player.reset(100, 400);
    this.currentLevel = new Level(1, 1);
    this.camera = { x: 0, y: 0 };
    this.levelTimer = 0;
    
    this.updateStats();
  }

  private gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    // Update game based on current state
    switch (this.state) {
      case GameState.PLAYING:
        this.update(deltaTime);
        break;
      case GameState.PAUSED:
        // Don't update game logic when paused
        break;
    }

    // Always render
    this.render();

    // Continue game loop
    this.animationId = requestAnimationFrame(this.gameLoop);
  }

  public update(deltaTime: number = 1/60): void {
    // Update level timer
    this.levelTimer += deltaTime;
    if (this.levelTimer >= 1) {
      this.stats.time = Math.max(0, this.stats.time - 1);
      this.levelTimer = 0;
      
      if (this.stats.time <= 0) {
        this.playerDied();
        return;
      }
    }

    // Handle input
    this.handleGameInput();

    // Update player
    this.player.updateWithDelta(deltaTime, this.input);

    // Update camera to follow player
    this.updateCamera();

    // Check collisions
    this.checkCollisions();

    // Update level (enemies, platforms, etc.)
    this.currentLevel.update(deltaTime);

    // Check win/lose conditions
    this.checkGameConditions();

    // Update stats display
    this.updateStats();
  }

  private handleGameInput(): void {
    // Pause game
    if (this.input.isKeyDown('Escape') || this.input.isKeyDown('KeyP')) {
      if (this.state === GameState.PLAYING) {
        this.setState(GameState.PAUSED);
      } else if (this.state === GameState.PAUSED) {
        this.setState(GameState.PLAYING);
      }
    }

    // Restart game
    if (this.input.isKeyDown('KeyR') && this.state === GameState.GAME_OVER) {
      this.setState(GameState.PLAYING);
    }
  }

  private updateCamera(): void {
    const playerX = this.player.getPosition().x;
    const playerY = this.player.getPosition().y;
    
    // Follow player horizontally with some offset
    this.camera.x = playerX - this.canvas.width / 3;
    
    // Keep camera within level bounds
    this.camera.x = Math.max(0, this.camera.x);
    this.camera.x = Math.min(this.currentLevel.getWidth() - this.canvas.width, this.camera.x);
    
    // Vertical camera (usually fixed for Mario-style games)
    this.camera.y = 0;
  }

  private checkCollisions(): void {
    const playerBounds = this.player.getBounds();
    
    // Check level collisions (platforms, blocks, etc.)
    const levelCollisions = this.currentLevel.checkCollisions(playerBounds);
    this.physics.resolveCollisions(this.player, levelCollisions);

    // Check enemy collisions
    const enemies = this.currentLevel.getEnemies();
    for (const enemy of enemies) {
      if (this.physics.checkCollision(playerBounds, enemy.getBounds())) {
        if (this.player.getVelocity().y > 0 && playerBounds.y < enemy.getBounds().y) {
          // Player jumped on enemy
          enemy.defeat();
          this.player.bounce();
          this.addScore(100);
          this.audio.playSound('stomp');
        } else if (!this.player.isInvincible()) {
          // Player hit enemy
          this.playerHit();
        }
      }
    }

    // Check collectible collisions
    const collectibles = this.currentLevel.getCollectibles();
    for (const collectible of collectibles) {
      if (this.physics.checkCollision(playerBounds, collectible.getBounds())) {
        this.collectItem(collectible);
      }
    }

    // Check if player fell off the level
    if (playerBounds.y > this.currentLevel.getHeight() + 100) {
      this.playerDied();
    }

    // Check level completion (flagpole, etc.)
    if (this.currentLevel.checkLevelComplete(playerBounds)) {
      this.levelComplete();
    }
  }

  private checkGameConditions(): void {
    // Additional game condition checks can be added here
  }

  private playerHit(): void {
    if (this.player.takeDamage()) {
      // Player shrunk but didn't die
      this.audio.playSound('power_down');
    } else {
      // Player died
      this.playerDied();
    }
  }

  private playerDied(): void {
    this.stats.lives--;
    this.audio.playSound('death');
    
    if (this.stats.lives <= 0) {
      this.setState(GameState.GAME_OVER);
    } else {
      // Respawn player
      this.player.reset(100, 400);
      this.camera.x = 0;
      this.stats.time = 400;
    }
  }

  private levelComplete(): void {
    this.setState(GameState.LEVEL_COMPLETE);
    
    // Add time bonus
    this.addScore(this.stats.time * 50);
    
    // Advance to next level after delay
    setTimeout(() => {
      this.nextLevel();
    }, 3000);
  }

  public nextLevel(): void {
    this.stats.level++;
    if (this.stats.level > 4) {
      this.stats.world++;
      this.stats.level = 1;
    }
    
    this.currentLevel = new Level(this.stats.world, this.stats.level);
    this.player.reset(100, 400);
    this.camera.x = 0;
    this.stats.time = 400;
    
    this.setState(GameState.PLAYING);
  }

  private collectItem(collectible: any): void {
    switch (collectible.type) {
      case 'coin':
        this.addCoin();
        this.addScore(200);
        this.audio.playSound('coin');
        break;
      case 'mushroom':
        this.player.powerUpWithType('super');
        this.addScore(1000);
        this.audio.playSound('power_up');
        break;
      case 'fire_flower':
        this.player.powerUpWithType('fire');
        this.addScore(1000);
        this.audio.playSound('power_up');
        break;
      case '1up':
        this.stats.lives++;
        this.audio.playSound('1up');
        break;
    }
    
    collectible.collect();
  }

  private addScore(points: number): void {
    this.stats.score += points;
  }

  private addCoin(): void {
    this.stats.coins++;
    if (this.stats.coins >= 100) {
      this.stats.coins = 0;
      this.stats.lives++;
      this.audio.playSound('1up');
    }
  }

  private updateStats(): void {
    if (this.onStatsUpdate) {
      this.onStatsUpdate(this.stats);
    }
  }

  public render(): void {
    // Clear canvas
    this.ctx.fillStyle = '#5C94FC'; // Mario sky blue
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Save context for camera transform
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    // Render level
    this.currentLevel.renderWithCamera(this.ctx, this.camera);

    // Render player
    this.player.renderWithContext(this.ctx);

    // Restore context
    this.ctx.restore();

    // Render UI elements (not affected by camera)
    this.renderUI();
  }

  private renderUI(): void {
    // Render pause overlay
    if (this.state === GameState.PAUSED) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = 'white';
      this.ctx.font = '48px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('PAUSED', this.canvas.width / 2, this.canvas.height / 2);
      this.ctx.font = '24px monospace';
      this.ctx.fillText('Press ESC or P to resume', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }
  }

  public destroy(): void {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    this.input.destroy();
    this.audio.destroy();
  }

  // Methods expected by GameCanvas component
  public getScore(): number {
    return this.stats.score;
  }

  public getLives(): number {
    return this.stats.lives;
  }

  public getCoins(): number {
    return this.stats.coins;
  }

  public getTime(): number {
    return this.stats.time;
  }

  public getCurrentLevel(): number {
    return this.stats.level;
  }

  public isGameOver(): boolean {
    return this.state === GameState.GAME_OVER;
  }

  public isLevelComplete(): boolean {
    return this.state === GameState.LEVEL_COMPLETE;
  }

  public handleInput(keyCode: string, pressed: boolean): void {
    this.input.handleKey(keyCode, pressed);
  }

  public restart(): void {
    this.resetGame();
    this.setState(GameState.PLAYING);
  }
}