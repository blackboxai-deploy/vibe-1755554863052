export interface PlayerState {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  onGround: boolean;
  facing: 'left' | 'right';
  powerState: 'small' | 'super' | 'fire';
  invulnerable: boolean;
  invulnerabilityTimer: number;
  animationFrame: number;
  animationTimer: number;
  isMoving: boolean;
  isJumping: boolean;
  isDucking: boolean;
  isRunning: boolean;
}

export interface PlayerSprite {
  small: {
    idle: string;
    walk: string[];
    jump: string;
    duck: string;
  };
  super: {
    idle: string;
    walk: string[];
    jump: string;
    duck: string;
  };
  fire: {
    idle: string;
    walk: string[];
    jump: string;
    duck: string;
    throw: string;
  };
}

export class Player {
  private state: PlayerState;
  private sprites: PlayerSprite;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  // Physics constants
  private readonly GRAVITY = 0.8;
  private readonly JUMP_FORCE = -16;
  private readonly WALK_SPEED = 3;
  private readonly RUN_SPEED = 5;
  private readonly FRICTION = 0.8;
  private readonly MAX_FALL_SPEED = 12;
  
  // Animation constants
  private readonly ANIMATION_SPEED = 8;
  private readonly INVULNERABILITY_TIME = 120; // 2 seconds at 60fps
  
  constructor(canvas: HTMLCanvasElement, startX: number = 100, startY: number = 400) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    
    this.state = {
      x: startX,
      y: startY,
      width: 32,
      height: 32,
      velocityX: 0,
      velocityY: 0,
      onGround: false,
      facing: 'right',
      powerState: 'small',
      invulnerable: false,
      invulnerabilityTimer: 0,
      animationFrame: 0,
      animationTimer: 0,
      isMoving: false,
      isJumping: false,
      isDucking: false,
      isRunning: false
    };
    
    this.sprites = {
      small: {
        idle: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fd1912ce-8676-4a58-9c61-4b16cf6273c7.png',
        walk: [
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0ccae97d-047f-4c4e-81a7-7ce128da0fe7.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ea57cc32-957d-4603-a14d-713b67401ddf.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e802855d-31e5-44ae-b69c-f9e226ba9153.png'
        ],
        jump: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e18ff557-8ec8-4e88-bbf1-223c5d0df033.png',
        duck: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/ce959320-6d5d-448c-8081-410fced67451.png'
      },
      super: {
        idle: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6398b4ee-8295-4ace-a4fd-df52b8d2593e.png',
        walk: [
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/638a4600-cd03-4d8f-b5bf-6e0100a1f6ee.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/127bf5c2-bdc7-4c38-9560-316c922bd0ad.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/71daca3e-e576-407f-b628-91e65dd0b3f6.png'
        ],
        jump: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3e642348-8804-483e-a38a-7c41af0d2ca6.png',
        duck: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a8ee3f2c-ca46-4029-bff1-0dfdfe624aa5.png'
      },
      fire: {
        idle: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/637aa69f-079f-4a23-849b-9237d0f41a53.png',
        walk: [
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4a580af9-16e7-4ddb-bc07-72cc9d5a0a9d.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7d60e85e-6ce3-47eb-9b9a-87bb1654229e.png',
          'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a0eea4ca-19ad-48a6-888d-5e5c31a6a594.png'
        ],
        jump: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3bc9c915-868e-433e-8057-357a93d79928.png',
        duck: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/419d9133-90d9-4148-b197-ae0365055493.png',
        throw: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8222b011-9196-4bf7-a361-83a78daa3da5.png'
      }
    };
    
    this.updateDimensions();
  }
  
  private updateDimensions(): void {
    if (this.state.powerState === 'small') {
      this.state.width = 32;
      this.state.height = 32;
    } else {
      this.state.width = 32;
      this.state.height = 48;
    }
  }
  
  public update(input: any, levelCollisions: any[]): void {
    this.handleInput(input);
    this.updatePhysics();
    this.handleCollisions(levelCollisions);
    this.updateAnimation();
    this.updateInvulnerability();
  }
  
  private handleInput(input: any): void {
    this.state.isMoving = false;
    this.state.isRunning = input.run;
    
    // Horizontal movement
    if (input.left && !this.state.isDucking) {
      this.state.facing = 'left';
      this.state.isMoving = true;
      const speed = this.state.isRunning ? this.RUN_SPEED : this.WALK_SPEED;
      this.state.velocityX = Math.max(this.state.velocityX - 0.5, -speed);
    } else if (input.right && !this.state.isDucking) {
      this.state.facing = 'right';
      this.state.isMoving = true;
      const speed = this.state.isRunning ? this.RUN_SPEED : this.WALK_SPEED;
      this.state.velocityX = Math.min(this.state.velocityX + 0.5, speed);
    } else {
      // Apply friction
      this.state.velocityX *= this.FRICTION;
      if (Math.abs(this.state.velocityX) < 0.1) {
        this.state.velocityX = 0;
      }
    }
    
    // Jumping
    if (input.jump && this.state.onGround && !this.state.isDucking) {
      this.state.velocityY = this.JUMP_FORCE;
      this.state.onGround = false;
      this.state.isJumping = true;
    }
    
    // Ducking (only for super/fire Mario)
    if (input.down && this.state.powerState !== 'small' && this.state.onGround) {
      this.state.isDucking = true;
      this.state.velocityX = 0;
    } else {
      this.state.isDucking = false;
    }
    
    // Fire throwing (only for fire Mario)
    if (input.fire && this.state.powerState === 'fire') {
      this.throwFireball();
    }
  }
  
  private updatePhysics(): void {
    // Apply gravity
    if (!this.state.onGround) {
      this.state.velocityY += this.GRAVITY;
      this.state.velocityY = Math.min(this.state.velocityY, this.MAX_FALL_SPEED);
    }
    
    // Update position
    this.state.x += this.state.velocityX;
    this.state.y += this.state.velocityY;
    
    // Keep player in bounds
    if (this.state.x < 0) {
      this.state.x = 0;
      this.state.velocityX = 0;
    }
    
    // Reset jumping state when falling
    if (this.state.velocityY > 0) {
      this.state.isJumping = false;
    }
  }
  
  private handleCollisions(levelCollisions: any[]): void {
    // Ground collision (simplified)
    const groundY = this.canvas.height - 100; // Temporary ground level
    if (this.state.y + this.state.height >= groundY) {
      this.state.y = groundY - this.state.height;
      this.state.velocityY = 0;
      this.state.onGround = true;
      this.state.isJumping = false;
    } else {
      this.state.onGround = false;
    }
    
    // TODO: Implement proper tile-based collision detection
    // This will be expanded when Level.ts is implemented
  }
  
  private updateAnimation(): void {
    this.state.animationTimer++;
    
    if (this.state.animationTimer >= this.ANIMATION_SPEED) {
      this.state.animationTimer = 0;
      
      if (this.state.isMoving && this.state.onGround) {
        const walkFrames = this.sprites[this.state.powerState].walk.length;
        this.state.animationFrame = (this.state.animationFrame + 1) % walkFrames;
      } else {
        this.state.animationFrame = 0;
      }
    }
  }
  
  private updateInvulnerability(): void {
    if (this.state.invulnerable) {
      this.state.invulnerabilityTimer--;
      if (this.state.invulnerabilityTimer <= 0) {
        this.state.invulnerable = false;
      }
    }
  }
  
  private throwFireball(): void {
    // TODO: Implement fireball creation and management
    // This will be connected to a projectile system
    console.log('Fireball thrown!');
  }
  
  public takeDamage(): boolean {
    if (this.state.invulnerable) {
      return false;
    }
    
    if (this.state.powerState === 'fire') {
      this.state.powerState = 'super';
      this.makeInvulnerable();
      this.updateDimensions();
      return false;
    } else if (this.state.powerState === 'super') {
      this.state.powerState = 'small';
      this.makeInvulnerable();
      this.updateDimensions();
      return false;
    } else {
      // Small Mario dies
      return true;
    }
  }
  
  public powerUp(powerType: 'mushroom' | 'fireflower'): void {
    if (powerType === 'mushroom' && this.state.powerState === 'small') {
      this.state.powerState = 'super';
      this.updateDimensions();
    } else if (powerType === 'fireflower' && this.state.powerState === 'super') {
      this.state.powerState = 'fire';
    }
  }
  
  private makeInvulnerable(): void {
    this.state.invulnerable = true;
    this.state.invulnerabilityTimer = this.INVULNERABILITY_TIME;
  }
  
  public render(cameraX: number = 0): void {
    const renderX = this.state.x - cameraX;
    const renderY = this.state.y;
    
    // Skip rendering if off-screen
    if (renderX < -this.state.width || renderX > this.canvas.width) {
      return;
    }
    
    // Determine current sprite
    let currentSprite: string;
    const powerSprites = this.sprites[this.state.powerState];
    
    if (this.state.isDucking) {
      currentSprite = powerSprites.duck;
    } else if (!this.state.onGround) {
      currentSprite = powerSprites.jump;
    } else if (this.state.isMoving) {
      currentSprite = powerSprites.walk[this.state.animationFrame];
    } else {
      currentSprite = powerSprites.idle;
    }
    
    // Apply invulnerability flashing effect
    if (this.state.invulnerable && Math.floor(this.state.invulnerabilityTimer / 5) % 2 === 0) {
      this.ctx.globalAlpha = 0.5;
    }
    
    // Save context for transformations
    this.ctx.save();
    
    // Flip sprite if facing left
    if (this.state.facing === 'left') {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-renderX - this.state.width, 0);
    } else {
      this.ctx.translate(renderX, 0);
    }
    
    // Draw sprite (placeholder colored rectangle for now)
    this.drawSpritePlaceholder(currentSprite, 0, renderY, this.state.width, this.state.height);
    
    // Restore context
    this.ctx.restore();
    this.ctx.globalAlpha = 1;
  }
  
  private drawSpritePlaceholder(spriteUrl: string, x: number, y: number, width: number, height: number): void {
    // Extract color from placeholder URL for now
    let color = '#FF0000'; // Default red
    if (spriteUrl.includes('FF4500')) color = '#FF4500'; // Fire Mario orange
    
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, width, height);
    
    // Add simple details
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.fillRect(x + 8, y + 8, 4, 4); // Eye
    this.ctx.fillRect(x + 4, y + 16, 24, 4); // Shirt stripe
  }
  
  // Getters for game state access
  public getState(): PlayerState {
    return { ...this.state };
  }
  
  public getPosition(): { x: number; y: number } {
    return { x: this.state.x, y: this.state.y };
  }
  
  public getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height
    };
  }
  
  public isOnGround(): boolean {
    return this.state.onGround;
  }
  
  public getPowerState(): string {
    return this.state.powerState;
  }
  
  public setPosition(x: number, y: number): void {
    this.state.x = x;
    this.state.y = y;
  }
  
  public reset(x: number = 100, y: number = 400): void {
    this.state.x = x;
    this.state.y = y;
    this.state.velocityX = 0;
    this.state.velocityY = 0;
    this.state.onGround = false;
    this.state.powerState = 'small';
    this.state.invulnerable = false;
    this.state.invulnerabilityTimer = 0;
    this.state.facing = 'right';
    this.updateDimensions();
  }

  public updateWithDelta(deltaTime: number, input: any): void {
    this.handleInput(input);
    this.updatePhysics();
    this.handleCollisions([]);
    this.updateAnimation();
    this.updateInvulnerability();
  }

  public renderWithContext(ctx: CanvasRenderingContext2D): void {
    this.render(0); // Call existing render method with default camera
  }

  public getVelocity(): { x: number; y: number } {
    return { x: this.state.velocityX, y: this.state.velocityY };
  }

  public isInvincible(): boolean {
    return this.state.invulnerable;
  }

  public bounce(): void {
    this.state.velocityY = this.JUMP_FORCE * 0.5; // Smaller bounce
  }

  public powerUpWithType(powerType: 'super' | 'fire'): void {
    if (powerType === 'super' && this.state.powerState === 'small') {
      this.state.powerState = 'super';
      this.updateDimensions();
    } else if (powerType === 'fire' && this.state.powerState === 'super') {
      this.state.powerState = 'fire';
    }
  }
}