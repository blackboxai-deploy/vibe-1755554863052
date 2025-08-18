export enum EnemyType {
  GOOMBA = 'goomba',
  KOOPA = 'koopa',
  PIRANHA_PLANT = 'piranha_plant'
}

export enum EnemyState {
  WALKING = 'walking',
  DEFEATED = 'defeated',
  SHELL = 'shell',
  SHELL_MOVING = 'shell_moving',
  HIDING = 'hiding',
  EMERGING = 'emerging'
}

export interface EnemyConfig {
  type: EnemyType;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  points: number;
  spriteSheet: string;
  animations: {
    [key: string]: {
      frames: number[];
      duration: number;
      loop: boolean;
    };
  };
}

export class Enemy {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public velocityX: number;
  public velocityY: number;
  public speed: number;
  public health: number;
  public maxHealth: number;
  public points: number;
  public type: EnemyType;
  public state: EnemyState;
  public direction: number; // -1 for left, 1 for right
  public onGround: boolean;
  public alive: boolean;
  public spriteSheet: string;
  public animations: any;
  public currentAnimation: string;
  public animationFrame: number;
  public animationTimer: number;
  public defeatTimer: number;
  public shellKickTimer: number;
  public emergingTimer: number;
  public originalY: number;

  constructor(config: EnemyConfig) {
    this.x = config.x;
    this.y = config.y;
    this.originalY = config.y;
    this.width = config.width;
    this.height = config.height;
    this.velocityX = 0;
    this.velocityY = 0;
    this.speed = config.speed;
    this.health = config.health;
    this.maxHealth = config.health;
    this.points = config.points;
    this.type = config.type;
    this.state = EnemyState.WALKING;
    this.direction = -1;
    this.onGround = false;
    this.alive = true;
    this.spriteSheet = config.spriteSheet;
    this.animations = config.animations;
    this.currentAnimation = 'walk';
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.defeatTimer = 0;
    this.shellKickTimer = 0;
    this.emergingTimer = 0;
  }

  update(deltaTime: number, level: any): void {
    if (!this.alive && this.state !== EnemyState.DEFEATED) return;

    this.updateAnimation(deltaTime);
    this.updateMovement(deltaTime);
    this.updateState(deltaTime);
    this.applyPhysics(deltaTime);
    this.checkBounds(level);
  }

  private updateAnimation(deltaTime: number): void {
    this.animationTimer += deltaTime;
    const currentAnim = this.animations[this.currentAnimation];
    
    if (currentAnim && this.animationTimer >= currentAnim.duration) {
      this.animationFrame++;
      if (this.animationFrame >= currentAnim.frames.length) {
        if (currentAnim.loop) {
          this.animationFrame = 0;
        } else {
          this.animationFrame = currentAnim.frames.length - 1;
        }
      }
      this.animationTimer = 0;
    }
  }

  private updateMovement(deltaTime: number): void {
    switch (this.type) {
      case EnemyType.GOOMBA:
        this.updateGoombaMovement(deltaTime);
        break;
      case EnemyType.KOOPA:
        this.updateKoopaMovement(deltaTime);
        break;
      case EnemyType.PIRANHA_PLANT:
        this.updatePiranhaPlantMovement(deltaTime);
        break;
    }
  }

  private updateGoombaMovement(deltaTime: number): void {
    if (this.state === EnemyState.WALKING) {
      this.velocityX = this.speed * this.direction;
      this.currentAnimation = 'walk';
    } else if (this.state === EnemyState.DEFEATED) {
      this.velocityX = 0;
      this.currentAnimation = 'defeated';
    }
  }

  private updateKoopaMovement(deltaTime: number): void {
    switch (this.state) {
      case EnemyState.WALKING:
        this.velocityX = this.speed * this.direction;
        this.currentAnimation = 'walk';
        break;
      case EnemyState.SHELL:
        this.velocityX = 0;
        this.currentAnimation = 'shell';
        break;
      case EnemyState.SHELL_MOVING:
        this.velocityX = this.speed * 2 * this.direction;
        this.currentAnimation = 'shell';
        this.shellKickTimer -= deltaTime;
        if (this.shellKickTimer <= 0) {
          this.state = EnemyState.SHELL;
        }
        break;
    }
  }

  private updatePiranhaPlantMovement(deltaTime: number): void {
    switch (this.state) {
      case EnemyState.HIDING:
        this.emergingTimer -= deltaTime;
        if (this.emergingTimer <= 0) {
          this.state = EnemyState.EMERGING;
          this.emergingTimer = 1000; // 1 second to emerge
        }
        break;
      case EnemyState.EMERGING:
        this.y = this.originalY - (1000 - this.emergingTimer) / 1000 * this.height;
        this.emergingTimer -= deltaTime;
        if (this.emergingTimer <= 0) {
          this.state = EnemyState.WALKING;
          this.emergingTimer = 2000; // Stay up for 2 seconds
        }
        break;
      case EnemyState.WALKING:
        this.emergingTimer -= deltaTime;
        if (this.emergingTimer <= 0) {
          this.state = EnemyState.HIDING;
          this.emergingTimer = 2000; // Hide for 2 seconds
        }
        break;
    }
    this.velocityX = 0;
  }

  private updateState(deltaTime: number): void {
    if (this.state === EnemyState.DEFEATED) {
      this.defeatTimer -= deltaTime;
      if (this.defeatTimer <= 0) {
        this.alive = false;
      }
    }
  }

  private applyPhysics(deltaTime: number): void {
    if (this.type !== EnemyType.PIRANHA_PLANT) {
      // Apply gravity
      this.velocityY += 980 * deltaTime / 1000; // 980 pixels/second^2 gravity
      
      // Update position
      this.x += this.velocityX * deltaTime / 1000;
      this.y += this.velocityY * deltaTime / 1000;
    }
  }

  private checkBounds(level: any): void {
    // Check if enemy fell off the level
    if (this.y > level.height + 100) {
      this.alive = false;
    }
  }

  takeDamage(damage: number = 1): boolean {
    this.health -= damage;
    
    if (this.health <= 0) {
      this.defeat();
      return true;
    }
    return false;
  }

  defeat(): void {
    switch (this.type) {
      case EnemyType.GOOMBA:
        this.state = EnemyState.DEFEATED;
        this.defeatTimer = 500; // Remove after 0.5 seconds
        this.height = this.height / 2; // Squash effect
        break;
      case EnemyType.KOOPA:
        if (this.state === EnemyState.WALKING) {
          this.state = EnemyState.SHELL;
          this.height = this.height * 0.6; // Shell is smaller
        } else if (this.state === EnemyState.SHELL) {
          this.alive = false;
        }
        break;
      case EnemyType.PIRANHA_PLANT:
        this.alive = false;
        break;
    }
  }

  stomp(): void {
    this.defeat();
  }

  kick(): void {
    if (this.type === EnemyType.KOOPA && this.state === EnemyState.SHELL) {
      this.state = EnemyState.SHELL_MOVING;
      this.shellKickTimer = 5000; // Move for 5 seconds
    }
  }

  reverseDirection(): void {
    this.direction *= -1;
  }

  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    };
  }

  getCenter(): { x: number; y: number } {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }

  isCollidingWith(other: { x: number; y: number; width: number; height: number }): boolean {
    return (
      this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y
    );
  }

  render(ctx: CanvasRenderingContext2D, camera: { x: number; y: number }): void {
    if (!this.alive && this.state !== EnemyState.DEFEATED) return;

    const screenX = this.x - camera.x;
    const screenY = this.y - camera.y;

    // Only render if on screen
    if (screenX + this.width < 0 || screenX > ctx.canvas.width) return;

    // Draw enemy placeholder (colored rectangle for now)
    ctx.fillStyle = this.getEnemyColor();
    ctx.fillRect(screenX, screenY, this.width, this.height);

    // Draw direction indicator
    ctx.fillStyle = 'white';
    ctx.fillRect(
      screenX + (this.direction > 0 ? this.width - 4 : 0),
      screenY + 2,
      4,
      4
    );

    // Draw health indicator for debugging
    if (this.health < this.maxHealth) {
      ctx.fillStyle = 'red';
      ctx.fillRect(screenX, screenY - 8, this.width, 4);
      ctx.fillStyle = 'green';
      ctx.fillRect(screenX, screenY - 8, (this.width * this.health) / this.maxHealth, 4);
    }
  }

  private getEnemyColor(): string {
    switch (this.type) {
      case EnemyType.GOOMBA:
        return this.state === EnemyState.DEFEATED ? '#8B4513' : '#D2691E';
      case EnemyType.KOOPA:
        if (this.state === EnemyState.SHELL || this.state === EnemyState.SHELL_MOVING) {
          return '#228B22';
        }
        return '#32CD32';
      case EnemyType.PIRANHA_PLANT:
        return this.state === EnemyState.HIDING ? '#006400' : '#FF4500';
      default:
        return '#FF0000';
    }
  }
}

export class EnemyFactory {
  static createGoomba(x: number, y: number): Enemy {
    return new Enemy({
      type: EnemyType.GOOMBA,
      x,
      y,
      width: 32,
      height: 32,
      speed: 50,
      health: 1,
      points: 100,
      spriteSheet: 'goomba.png',
      animations: {
        walk: { frames: [0, 1], duration: 500, loop: true },
        defeated: { frames: [2], duration: 100, loop: false }
      }
    });
  }

  static createKoopa(x: number, y: number): Enemy {
    return new Enemy({
      type: EnemyType.KOOPA,
      x,
      y,
      width: 32,
      height: 48,
      speed: 40,
      health: 2,
      points: 200,
      spriteSheet: 'koopa.png',
      animations: {
        walk: { frames: [0, 1], duration: 400, loop: true },
        shell: { frames: [2], duration: 100, loop: false }
      }
    });
  }

  static createPiranhaPlant(x: number, y: number): Enemy {
    const enemy = new Enemy({
      type: EnemyType.PIRANHA_PLANT,
      x,
      y,
      width: 32,
      height: 48,
      speed: 0,
      health: 1,
      points: 300,
      spriteSheet: 'piranha.png',
      animations: {
        idle: { frames: [0, 1], duration: 300, loop: true }
      }
    });
    enemy.state = EnemyState.HIDING;
    enemy.emergingTimer = 1000;
    return enemy;
  }
}