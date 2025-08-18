export interface Vector2D {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface PhysicsBody {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  bounds: Rectangle;
  grounded: boolean;
  mass: number;
  friction: number;
  restitution: number;
  isStatic: boolean;
}

export class Physics {
  static readonly GRAVITY = 980; // pixels per second squared
  static readonly TERMINAL_VELOCITY = 600;
  static readonly FRICTION = 0.8;
  static readonly AIR_RESISTANCE = 0.98;

  // Instance methods for Game.ts compatibility
  public checkCollision(rect1: Rectangle, rect2: Rectangle): boolean {
    return Physics.checkCollision(rect1, rect2);
  }

  public resolveCollisions(player: any, levelCollisions: any[]): void {
    // Simple collision resolution for now
    for (const collision of levelCollisions) {
      const side = Physics.getCollisionSide(player.getBounds(), collision);
      // Apply collision resolution logic here
    }
  }

  static createBody(
    x: number,
    y: number,
    width: number,
    height: number,
    isStatic = false
  ): PhysicsBody {
    return {
      position: { x, y },
      velocity: { x: 0, y: 0 },
      acceleration: { x: 0, y: 0 },
      bounds: { x, y, width, height },
      grounded: false,
      mass: 1,
      friction: Physics.FRICTION,
      restitution: 0,
      isStatic
    };
  }

  static updatePhysics(body: PhysicsBody, deltaTime: number): void {
    if (body.isStatic) return;

    // Apply gravity
    body.acceleration.y = Physics.GRAVITY;

    // Update velocity based on acceleration
    body.velocity.x += body.acceleration.x * deltaTime;
    body.velocity.y += body.acceleration.y * deltaTime;

    // Apply air resistance
    body.velocity.x *= Physics.AIR_RESISTANCE;

    // Apply terminal velocity
    if (body.velocity.y > Physics.TERMINAL_VELOCITY) {
      body.velocity.y = Physics.TERMINAL_VELOCITY;
    }

    // Apply friction when grounded
    if (body.grounded) {
      body.velocity.x *= body.friction;
    }

    // Update position based on velocity
    body.position.x += body.velocity.x * deltaTime;
    body.position.y += body.velocity.y * deltaTime;

    // Update bounds
    body.bounds.x = body.position.x;
    body.bounds.y = body.position.y;

    // Reset acceleration
    body.acceleration.x = 0;
  }

  static checkCollision(rect1: Rectangle, rect2: Rectangle): boolean {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
    );
  }

  static getCollisionSide(moving: Rectangle, stationary: Rectangle): string {
    const overlapX = Math.min(
      moving.x + moving.width - stationary.x,
      stationary.x + stationary.width - moving.x
    );
    const overlapY = Math.min(
      moving.y + moving.height - stationary.y,
      stationary.y + stationary.height - moving.y
    );

    if (overlapX < overlapY) {
      return moving.x < stationary.x ? 'right' : 'left';
    } else {
      return moving.y < stationary.y ? 'bottom' : 'top';
    }
  }

  static resolveCollision(
    body: PhysicsBody,
    obstacle: Rectangle,
    side: string
  ): void {
    switch (side) {
      case 'top':
        body.position.y = obstacle.y - body.bounds.height;
        body.velocity.y = 0;
        body.grounded = true;
        break;
      case 'bottom':
        body.position.y = obstacle.y + obstacle.height;
        body.velocity.y = 0;
        break;
      case 'left':
        body.position.x = obstacle.x - body.bounds.width;
        body.velocity.x = 0;
        break;
      case 'right':
        body.position.x = obstacle.x + obstacle.width;
        body.velocity.x = 0;
        break;
    }

    // Update bounds after position change
    body.bounds.x = body.position.x;
    body.bounds.y = body.position.y;
  }

  static applyForce(body: PhysicsBody, force: Vector2D): void {
    if (body.isStatic) return;
    
    body.acceleration.x += force.x / body.mass;
    body.acceleration.y += force.y / body.mass;
  }

  static applyImpulse(body: PhysicsBody, impulse: Vector2D): void {
    if (body.isStatic) return;
    
    body.velocity.x += impulse.x / body.mass;
    body.velocity.y += impulse.y / body.mass;
  }

  static distance(point1: Vector2D, point2: Vector2D): number {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static normalize(vector: Vector2D): Vector2D {
    const magnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    if (magnitude === 0) return { x: 0, y: 0 };
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude
    };
  }

  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  static lerp(start: number, end: number, factor: number): number {
    return start + (end - start) * factor;
  }

  static checkPointInRect(point: Vector2D, rect: Rectangle): boolean {
    return (
      point.x >= rect.x &&
      point.x <= rect.x + rect.width &&
      point.y >= rect.y &&
      point.y <= rect.y + rect.height
    );
  }

  static getOverlap(rect1: Rectangle, rect2: Rectangle): Rectangle | null {
    const left = Math.max(rect1.x, rect2.x);
    const right = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
    const top = Math.max(rect1.y, rect2.y);
    const bottom = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);

    if (left < right && top < bottom) {
      return {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      };
    }

    return null;
  }

  static moveAndSlide(
    body: PhysicsBody,
    obstacles: Rectangle[],
    deltaTime: number
  ): void {
    body.grounded = false;
    
    // Store original position
    const originalX = body.position.x;
    const originalY = body.position.y;

    // Update physics
    Physics.updatePhysics(body, deltaTime);

    // Check collisions and resolve
    for (const obstacle of obstacles) {
      if (Physics.checkCollision(body.bounds, obstacle)) {
        const side = Physics.getCollisionSide(body.bounds, obstacle);
        Physics.resolveCollision(body, obstacle, side);
      }
    }
  }
}