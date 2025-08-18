export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Animation {
  frames: SpriteFrame[];
  duration: number;
  loop: boolean;
}

export interface Sprite {
  image: HTMLImageElement;
  animations: { [key: string]: Animation };
  currentAnimation: string;
  currentFrame: number;
  frameTime: number;
}

export enum GameState {
  MENU = 'menu',
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'game_over',
  LEVEL_COMPLETE = 'level_complete'
}

export enum PlayerState {
  SMALL = 'small',
  SUPER = 'super',
  FIRE = 'fire',
  STAR = 'star'
}

export enum Direction {
  LEFT = 'left',
  RIGHT = 'right'
}

export enum TileType {
  EMPTY = 0,
  GROUND = 1,
  BRICK = 2,
  QUESTION = 3,
  PIPE = 4,
  PLATFORM = 5,
  CASTLE = 6
}

export enum EnemyType {
  GOOMBA = 'goomba',
  KOOPA = 'koopa',
  PIRANHA = 'piranha'
}

export enum PowerUpType {
  MUSHROOM = 'mushroom',
  FIRE_FLOWER = 'fire_flower',
  ONE_UP = 'one_up',
  STAR = 'star'
}

export interface GameConfig {
  canvas: {
    width: number;
    height: number;
  };
  physics: {
    gravity: number;
    friction: number;
    jumpPower: number;
    maxSpeed: number;
  };
  player: {
    width: number;
    height: number;
    acceleration: number;
  };
  camera: {
    followOffset: number;
    smoothing: number;
  };
}

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  run: boolean;
  pause: boolean;
}

export interface GameStats {
  score: number;
  coins: number;
  lives: number;
  time: number;
  world: number;
  level: number;
}

export interface LevelData {
  width: number;
  height: number;
  tiles: number[][];
  entities: EntityData[];
  background: string;
  music: string;
  timeLimit: number;
}

export interface EntityData {
  type: string;
  x: number;
  y: number;
  properties?: { [key: string]: any };
}

export interface GameObject {
  position: Position;
  velocity: Velocity;
  dimensions: Dimensions;
  sprite: Sprite;
  active: boolean;
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D, camera: Camera): void;
  getBoundingBox(): BoundingBox;
}

export interface Player extends GameObject {
  state: PlayerState;
  direction: Direction;
  onGround: boolean;
  invulnerable: boolean;
  invulnerabilityTime: number;
  takeDamage(): void;
  powerUp(type: PowerUpType): void;
  jump(): void;
  shoot(): void;
}

export interface Enemy extends GameObject {
  type: EnemyType;
  defeated: boolean;
  direction: Direction;
  onDefeat(): void;
}

export interface Collectible extends GameObject {
  type: PowerUpType;
  collected: boolean;
  points: number;
  onCollect(): void;
}

export interface Projectile extends GameObject {
  damage: number;
  owner: string;
}

export interface Camera {
  x: number;
  y: number;
  width: number;
  height: number;
  target: GameObject | null;
  update(deltaTime: number): void;
  worldToScreen(worldPos: Position): Position;
  screenToWorld(screenPos: Position): Position;
}

export interface Level {
  data: LevelData;
  tiles: TileType[][];
  entities: GameObject[];
  camera: Camera;
  completed: boolean;
  load(levelData: LevelData): void;
  update(deltaTime: number): void;
  render(ctx: CanvasRenderingContext2D): void;
  checkCollisions(object: GameObject): BoundingBox[];
}

export interface AudioManager {
  sounds: { [key: string]: HTMLAudioElement };
  music: HTMLAudioElement | null;
  musicVolume: number;
  sfxVolume: number;
  playSound(name: string): void;
  playMusic(name: string, loop?: boolean): void;
  stopMusic(): void;
  setMusicVolume(volume: number): void;
  setSfxVolume(volume: number): void;
}

export interface GameEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  state: GameState;
  stats: GameStats;
  level: Level;
  player: Player;
  input: InputState;
  audio: AudioManager;
  config: GameConfig;
  lastTime: number;
  running: boolean;
  start(): void;
  stop(): void;
  pause(): void;
  resume(): void;
  update(deltaTime: number): void;
  render(): void;
  gameLoop(currentTime: number): void;
  loadLevel(levelIndex: number): void;
  resetGame(): void;
}

export interface HighScore {
  score: number;
  date: string;
  level: number;
}