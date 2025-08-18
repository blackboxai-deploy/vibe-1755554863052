export interface Tile {
  id: number;
  type: 'solid' | 'platform' | 'background' | 'collectible' | 'enemy_spawn' | 'pipe' | 'question_block' | 'brick_block';
  x: number;
  y: number;
  width: number;
  height: number;
  spriteX?: number;
  spriteY?: number;
  collision: boolean;
  breakable?: boolean;
  hasItem?: string;
}

export interface LevelData {
  id: string;
  name: string;
  width: number;
  height: number;
  tileSize: number;
  backgroundColor: string;
  music?: string;
  timeLimit: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  tiles: Tile[];
  enemies: EnemySpawn[];
  collectibles: CollectibleSpawn[];
  backgroundLayers: BackgroundLayer[];
}

export interface EnemySpawn {
  type: 'goomba' | 'koopa' | 'piranha_plant';
  x: number;
  y: number;
  direction?: number;
  patrolDistance?: number;
}

export interface CollectibleSpawn {
  type: 'coin' | 'mushroom' | 'fire_flower' | 'star' | '1up';
  x: number;
  y: number;
  hidden?: boolean;
}

export interface BackgroundLayer {
  image: string;
  x: number;
  y: number;
  width: number;
  height: number;
  scrollSpeed: number;
  repeat: boolean;
}

export class Level {
  private data: LevelData;
  private camera: { x: number; y: number };
  private tileSprite: HTMLImageElement;
  private backgroundSprites: Map<string, HTMLImageElement>;
  private loadedImages: Set<string>;

  constructor(world: number, level: number) {
    // Create a default level for now
    this.data = this.createDefaultLevel(world, level);
    this.camera = { x: 0, y: 0 };
    this.tileSprite = new Image();
    this.backgroundSprites = new Map();
    this.loadedImages = new Set();
    this.loadAssets();
  }

  private createDefaultLevel(world: number, level: number): LevelData {
    return {
      id: `${world}-${level}`,
      name: `World ${world}-${level}`,
      width: 50, // 50 tiles wide
      height: 15, // 15 tiles high
      tileSize: 32,
      backgroundColor: '#5C94FC',
      timeLimit: 400,
      startX: 100,
      startY: 400,
      endX: 1500,
      endY: 400,
      tiles: this.generateDefaultTiles(),
      enemies: [],
      collectibles: [],
      backgroundLayers: []
    };
  }

  private generateDefaultTiles(): Tile[] {
    const tiles: Tile[] = [];
    const tileSize = 32;

    // Create ground tiles
    for (let x = 0; x < 50; x++) {
      for (let y = 13; y < 15; y++) {
        tiles.push({
          id: tiles.length,
          type: 'solid',
          x: x * tileSize,
          y: y * tileSize,
          width: tileSize,
          height: tileSize,
          collision: true,
          spriteX: 0,
          spriteY: 0
        });
      }
    }

    return tiles;
  }

  private async loadAssets(): Promise<void> {
    // Load tile sprite sheet
    this.tileSprite.src = 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f3a516db-1925-4b6d-923d-d1c0b7810627.png';
    
    // Load background images
    for (const layer of this.data.backgroundLayers) {
      if (!this.backgroundSprites.has(layer.image)) {
        const img = new Image();
        img.src = layer.image;
        this.backgroundSprites.set(layer.image, img);
      }
    }

    // Wait for all images to load
    const imagePromises = [
      new Promise((resolve) => {
        this.tileSprite.onload = resolve;
      }),
      ...Array.from(this.backgroundSprites.values()).map(img => 
        new Promise((resolve) => {
          img.onload = resolve;
        })
      )
    ];

    await Promise.all(imagePromises);
    this.loadedImages.add('tiles');
    this.data.backgroundLayers.forEach(layer => this.loadedImages.add(layer.image));
  }

  public updateCamera(playerX: number, playerY: number, canvasWidth: number = 800, canvasHeight: number = 600): void {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Follow player horizontally with boundaries
    this.camera.x = Math.max(0, Math.min(
      this.data.width * this.data.tileSize - canvasWidth,
      playerX - centerX
    ));

    // Vertical camera with some offset
    this.camera.y = Math.max(0, Math.min(
      this.data.height * this.data.tileSize - canvasHeight,
      playerY - centerY - 100
    ));
  }

  public render(ctx?: CanvasRenderingContext2D, canvasWidth: number = 800, canvasHeight: number = 600): void {
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Render background color
    ctx.fillStyle = this.data.backgroundColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Render background layers with parallax
    this.renderBackgroundLayers(ctx, canvasWidth, canvasHeight);

    // Render tiles
    this.renderTiles(ctx, canvasWidth, canvasHeight);
  }

  private renderBackgroundLayers(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
    for (const layer of this.data.backgroundLayers) {
      const img = this.backgroundSprites.get(layer.image);
      if (!img || !this.loadedImages.has(layer.image)) continue;

      const parallaxX = this.camera.x * layer.scrollSpeed;
      const parallaxY = this.camera.y * layer.scrollSpeed * 0.5;

      if (layer.repeat) {
        // Repeating background
        const startX = Math.floor((parallaxX - layer.x) / layer.width) * layer.width + layer.x;
        const endX = startX + canvasWidth + layer.width;

        for (let x = startX; x < endX; x += layer.width) {
          ctx.drawImage(
            img,
            x - parallaxX,
            layer.y - parallaxY,
            layer.width,
            layer.height
          );
        }
      } else {
        // Single background image
        ctx.drawImage(
          img,
          layer.x - parallaxX,
          layer.y - parallaxY,
          layer.width,
          layer.height
        );
      }
    }
  }

  private renderTiles(ctx: CanvasRenderingContext2D, canvasWidth: number, canvasHeight: number): void {
    const startTileX = Math.floor(this.camera.x / this.data.tileSize);
    const endTileX = Math.ceil((this.camera.x + canvasWidth) / this.data.tileSize);
    const startTileY = Math.floor(this.camera.y / this.data.tileSize);
    const endTileY = Math.ceil((this.camera.y + canvasHeight) / this.data.tileSize);

    for (const tile of this.data.tiles) {
      const tileX = tile.x / this.data.tileSize;
      const tileY = tile.y / this.data.tileSize;

      // Skip tiles outside viewport
      if (tileX < startTileX || tileX > endTileX || tileY < startTileY || tileY > endTileY) {
        continue;
      }

      const screenX = tile.x - this.camera.x;
      const screenY = tile.y - this.camera.y;

      // Render tile based on type
      this.renderTile(ctx, tile, screenX, screenY);
    }
  }

  private renderTile(ctx: CanvasRenderingContext2D, tile: Tile, x: number, y: number): void {
    // Simple colored rectangle for now since we don't have sprite loading
    ctx.fillStyle = this.getTileColor(tile.type);
    ctx.fillRect(x, y, tile.width, tile.height);
    
    // Add border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, tile.width, tile.height);

    // Add visual indicators for special tiles
    if (tile.type === 'question_block') {
      ctx.fillStyle = '#FFD700';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('?', x + tile.width / 2, y + tile.height / 2 + 6);
    }
  }

  private getTileColor(type: string): string {
    switch (type) {
      case 'solid': return '#8B4513';
      case 'question_block': return '#FFD700';
      case 'brick_block': return '#CD853F';
      case 'pipe': return '#228B22';
      default: return '#CCCCCC';
    }
  }

  public checkCollision(x: number, y: number, width: number, height: number): Tile[] {
    const collisions: Tile[] = [];

    for (const tile of this.data.tiles) {
      if (!tile.collision) continue;

      if (x < tile.x + tile.width &&
          x + width > tile.x &&
          y < tile.y + tile.height &&
          y + height > tile.y) {
        collisions.push(tile);
      }
    }

    return collisions;
  }

  public getTileAt(x: number, y: number): Tile | null {
    for (const tile of this.data.tiles) {
      if (x >= tile.x && x < tile.x + tile.width &&
          y >= tile.y && y < tile.y + tile.height) {
        return tile;
      }
    }
    return null;
  }

  public breakBlock(tile: Tile): boolean {
    if (!tile.breakable) return false;

    const index = this.data.tiles.indexOf(tile);
    if (index > -1) {
      this.data.tiles.splice(index, 1);
      return true;
    }
    return false;
  }

  public activateQuestionBlock(tile: Tile): string | null {
    if (tile.type !== 'question_block' || !tile.hasItem) return null;

    const item = tile.hasItem;
    tile.hasItem = undefined;
    tile.type = 'solid';
    tile.spriteX = 3; // Empty block sprite

    return item;
  }

  public getStartPosition(): { x: number; y: number } {
    return { x: this.data.startX, y: this.data.startY };
  }

  public getEndPosition(): { x: number; y: number } {
    return { x: this.data.endX, y: this.data.endY };
  }

  public isAtEnd(x: number, y: number): boolean {
    const endZone = 50; // Pixels around end position
    return Math.abs(x - this.data.endX) < endZone && Math.abs(y - this.data.endY) < endZone;
  }

  public getLevelData(): LevelData {
    return this.data;
  }

  public getCamera(): { x: number; y: number } {
    return { ...this.camera };
  }

  public getVisibleTiles(canvasWidth: number = 800, canvasHeight: number = 600): Tile[] {
    const startTileX = Math.floor(this.camera.x / this.data.tileSize);
    const endTileX = Math.ceil((this.camera.x + canvasWidth) / this.data.tileSize);
    const startTileY = Math.floor(this.camera.y / this.data.tileSize);
    const endTileY = Math.ceil((this.camera.y + canvasHeight) / this.data.tileSize);

    return this.data.tiles.filter(tile => {
      const tileX = tile.x / this.data.tileSize;
      const tileY = tile.y / this.data.tileSize;
      return tileX >= startTileX && tileX <= endTileX && tileY >= startTileY && tileY <= endTileY;
    });
  }

  public addTile(tile: Tile): void {
    this.data.tiles.push(tile);
  }

  public removeTile(tile: Tile): boolean {
    const index = this.data.tiles.indexOf(tile);
    if (index > -1) {
      this.data.tiles.splice(index, 1);
      return true;
    }
    return false;
  }

  public getEnemySpawns(): EnemySpawn[] {
    return this.data.enemies;
  }

  public getCollectibleSpawns(): CollectibleSpawn[] {
    return this.data.collectibles;
  }

  // Methods expected by Game.ts
  public update(deltaTime: number): void {
    // Update level animations, moving platforms, etc.
  }

  public renderWithCamera(ctx: CanvasRenderingContext2D, camera: { x: number; y: number }): void {
    this.camera = camera;
    this.render(ctx);
  }

  public checkCollisions(playerBounds: any): any[] {
    return this.checkCollision(
      playerBounds.x,
      playerBounds.y,
      playerBounds.width,
      playerBounds.height
    );
  }

  public getEnemies(): any[] {
    return []; // Return empty array for now
  }

  public getCollectibles(): any[] {
    return []; // Return empty array for now
  }

  public getWidth(): number {
    return this.data.width * this.data.tileSize;
  }

  public getHeight(): number {
    return this.data.height * this.data.tileSize;
  }

  public checkLevelComplete(playerBounds: any): boolean {
    return this.isAtEnd(playerBounds.x, playerBounds.y);
  }
}