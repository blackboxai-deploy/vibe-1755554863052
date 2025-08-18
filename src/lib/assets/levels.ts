export interface LevelTile {
  x: number;
  y: number;
  type: 'ground' | 'brick' | 'question' | 'pipe' | 'platform' | 'castle' | 'flag';
  solid: boolean;
  breakable?: boolean;
  contains?: 'coin' | 'mushroom' | 'fireflower' | '1up';
}

export interface LevelEntity {
  x: number;
  y: number;
  type: 'goomba' | 'koopa' | 'piranha' | 'coin' | 'mushroom' | 'fireflower' | 'star';
}

export interface LevelData {
  id: string;
  name: string;
  width: number;
  height: number;
  startX: number;
  startY: number;
  timeLimit: number;
  background: 'overworld' | 'underground' | 'castle';
  tiles: LevelTile[];
  entities: LevelEntity[];
  flagX: number;
  flagY: number;
}

export const TILE_SIZE = 32;
export const LEVEL_HEIGHT = 15;

export const levels: LevelData[] = [
  {
    id: 'world-1-1',
    name: 'World 1-1',
    width: 200,
    height: LEVEL_HEIGHT,
    startX: 64,
    startY: 352,
    timeLimit: 400,
    background: 'overworld',
    flagX: 6304,
    flagY: 96,
    tiles: [
      // Ground tiles (bottom 2 rows)
      ...Array.from({ length: 69 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 13 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      ...Array.from({ length: 69 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 14 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      
      // Gap at x: 69-71
      ...Array.from({ length: 15 }, (_, i) => ({
        x: (i + 72) * TILE_SIZE,
        y: 13 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      ...Array.from({ length: 15 }, (_, i) => ({
        x: (i + 72) * TILE_SIZE,
        y: 14 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),

      // Question blocks
      { x: 16 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 20 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'mushroom' },
      { x: 21 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 22 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 23 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },

      // Brick blocks
      { x: 20 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 21 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 22 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 23 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 24 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 25 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 26 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 27 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },

      // Pipe
      { x: 28 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 28 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 29 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 29 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },

      // Platforms
      { x: 38 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 39 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 40 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },

      { x: 46 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 47 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 48 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },

      { x: 54 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 55 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 56 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },

      // More question blocks
      { x: 64 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 78 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'fireflower' },

      // Flag pole area
      { x: 197 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 3 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'flag', solid: false },
      { x: 197 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'flag', solid: false },

      // Castle
      { x: 202 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'castle', solid: true },
      { x: 203 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'castle', solid: true },
      { x: 204 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'castle', solid: true },
      { x: 205 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'castle', solid: true },
      { x: 202 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'castle', solid: true },
      { x: 203 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'castle', solid: true },
      { x: 204 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'castle', solid: true },
      { x: 205 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'castle', solid: true },
      { x: 202 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'castle', solid: true },
      { x: 203 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'castle', solid: true },
      { x: 204 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'castle', solid: true },
      { x: 205 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'castle', solid: true },
      { x: 203 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'castle', solid: true },
      { x: 204 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'castle', solid: true },
      { x: 203 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'castle', solid: true },
      { x: 204 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'castle', solid: true }
    ],
    entities: [
      // Goombas
      { x: 22 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 40 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 51 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 52 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 82 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },

      // Koopa Troopas
      { x: 60 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'koopa' },
      { x: 90 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'koopa' },

      // Coins
      { x: 39 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'coin' },
      { x: 47 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'coin' },
      { x: 55 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'coin' }
    ]
  },
  {
    id: 'world-1-2',
    name: 'World 1-2',
    width: 150,
    height: LEVEL_HEIGHT,
    startX: 64,
    startY: 352,
    timeLimit: 400,
    background: 'underground',
    flagX: 4704,
    flagY: 96,
    tiles: [
      // Ground tiles
      ...Array.from({ length: 147 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 13 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      ...Array.from({ length: 147 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 14 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),

      // Ceiling
      ...Array.from({ length: 147 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 0,
        type: 'ground' as const,
        solid: true
      })),

      // Question blocks
      { x: 10 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 14 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'mushroom' },
      { x: 16 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 20 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 22 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },

      // Brick blocks
      { x: 11 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 12 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 13 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 15 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 17 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 18 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 19 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },
      { x: 21 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'brick', solid: true, breakable: true },

      // Platforms
      { x: 30 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'platform', solid: true },
      { x: 31 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'platform', solid: true },
      { x: 32 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'platform', solid: true },
      { x: 33 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'platform', solid: true },

      { x: 38 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'platform', solid: true },
      { x: 39 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'platform', solid: true },
      { x: 40 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'platform', solid: true },

      // Pipes
      { x: 46 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 46 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 47 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 47 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },

      { x: 57 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 57 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 57 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 58 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 58 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 58 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },

      // Exit pipe
      { x: 145 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 145 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 145 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 145 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 146 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 146 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 146 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'pipe', solid: true },
      { x: 146 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'pipe', solid: true }
    ],
    entities: [
      // Goombas
      { x: 25 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 35 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 50 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 65 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },

      // Piranha Plants
      { x: 46.5 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'piranha' },
      { x: 57.5 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'piranha' },

      // Coins
      { x: 31 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'coin' },
      { x: 32 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'coin' },
      { x: 39 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'coin' },
      { x: 70 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'coin' },
      { x: 80 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'coin' },
      { x: 90 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'coin' }
    ]
  },
  {
    id: 'world-1-3',
    name: 'World 1-3',
    width: 180,
    height: LEVEL_HEIGHT,
    startX: 64,
    startY: 352,
    timeLimit: 300,
    background: 'overworld',
    flagX: 5664,
    flagY: 96,
    tiles: [
      // Ground tiles (shorter sections with gaps)
      ...Array.from({ length: 15 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 13 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      ...Array.from({ length: 15 }, (_, i) => ({
        x: i * TILE_SIZE,
        y: 14 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),

      // Floating platforms level
      { x: 20 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 21 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 22 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },

      { x: 28 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 29 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 30 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },

      { x: 36 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 37 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 38 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },

      { x: 44 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'platform', solid: true },
      { x: 45 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'platform', solid: true },
      { x: 46 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'platform', solid: true },

      { x: 52 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 53 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },
      { x: 54 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'platform', solid: true },

      { x: 60 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 61 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },
      { x: 62 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'platform', solid: true },

      { x: 68 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 69 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },
      { x: 70 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'platform', solid: true },

      // Question blocks on platforms
      { x: 21 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 29 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'question', solid: true, contains: 'mushroom' },
      { x: 37 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 45 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'question', solid: true, contains: 'fireflower' },
      { x: 53 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 61 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'question', solid: true, contains: 'coin' },
      { x: 69 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'question', solid: true, contains: '1up' },

      // Final ground section
      ...Array.from({ length: 20 }, (_, i) => ({
        x: (i + 160) * TILE_SIZE,
        y: 13 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),
      ...Array.from({ length: 20 }, (_, i) => ({
        x: (i + 160) * TILE_SIZE,
        y: 14 * TILE_SIZE,
        type: 'ground' as const,
        solid: true
      })),

      // Flag pole
      { x: 177 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 3 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 5 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 7 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'flag', solid: false },
      { x: 177 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'flag', solid: false }
    ],
    entities: [
      // Koopa Troopas on platforms
      { x: 22 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'koopa' },
      { x: 38 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'koopa' },
      { x: 54 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'koopa' },
      { x: 70 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'koopa' },

      // Goombas
      { x: 165 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },
      { x: 170 * TILE_SIZE, y: 12 * TILE_SIZE, type: 'goomba' },

      // Coins in air
      { x: 24 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'coin' },
      { x: 32 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'coin' },
      { x: 40 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'coin' },
      { x: 48 * TILE_SIZE, y: 2 * TILE_SIZE, type: 'coin' },
      { x: 56 * TILE_SIZE, y: 4 * TILE_SIZE, type: 'coin' },
      { x: 64 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'coin' },
      { x: 72 * TILE_SIZE, y: 8 * TILE_SIZE, type: 'coin' }
    ]
  }
];

export function getLevelById(id: string): LevelData | undefined {
  return levels.find(level => level.id === id);
}

export function getNextLevel(currentLevelId: string): LevelData | undefined {
  const currentIndex = levels.findIndex(level => level.id === currentLevelId);
  if (currentIndex >= 0 && currentIndex < levels.length - 1) {
    return levels[currentIndex + 1];
  }
  return undefined;
}

export function getTileAt(level: LevelData, x: number, y: number): LevelTile | undefined {
  return level.tiles.find(tile => 
    tile.x === Math.floor(x / TILE_SIZE) * TILE_SIZE && 
    tile.y === Math.floor(y / TILE_SIZE) * TILE_SIZE
  );
}

export function getEntitiesInRange(level: LevelData, startX: number, endX: number): LevelEntity[] {
  return level.entities.filter(entity => 
    entity.x >= startX && entity.x <= endX
  );
}