export interface SoundAsset {
  name: string;
  url: string;
  volume: number;
  loop: boolean;
}

export const SOUND_EFFECTS: Record<string, SoundAsset> = {
  jump: {
    name: 'jump',
    url: '/audio/jump.wav',
    volume: 0.6,
    loop: false
  },
  coin: {
    name: 'coin',
    url: '/audio/coin.wav',
    volume: 0.5,
    loop: false
  },
  powerup: {
    name: 'powerup',
    url: '/audio/powerup.wav',
    volume: 0.7,
    loop: false
  },
  stomp: {
    name: 'stomp',
    url: '/audio/stomp.wav',
    volume: 0.6,
    loop: false
  },
  pipe: {
    name: 'pipe',
    url: '/audio/pipe.wav',
    volume: 0.5,
    loop: false
  },
  fireball: {
    name: 'fireball',
    url: '/audio/fireball.wav',
    volume: 0.4,
    loop: false
  },
  oneup: {
    name: 'oneup',
    url: '/audio/oneup.wav',
    volume: 0.8,
    loop: false
  },
  death: {
    name: 'death',
    url: '/audio/death.wav',
    volume: 0.7,
    loop: false
  },
  flagpole: {
    name: 'flagpole',
    url: '/audio/flagpole.wav',
    volume: 0.6,
    loop: false
  },
  break_block: {
    name: 'break_block',
    url: '/audio/break_block.wav',
    volume: 0.5,
    loop: false
  },
  bump: {
    name: 'bump',
    url: '/audio/bump.wav',
    volume: 0.4,
    loop: false
  },
  kick: {
    name: 'kick',
    url: '/audio/kick.wav',
    volume: 0.5,
    loop: false
  }
};

export const BACKGROUND_MUSIC: Record<string, SoundAsset> = {
  overworld: {
    name: 'overworld',
    url: '/audio/overworld.mp3',
    volume: 0.3,
    loop: true
  },
  underground: {
    name: 'underground',
    url: '/audio/underground.mp3',
    volume: 0.3,
    loop: true
  },
  castle: {
    name: 'castle',
    url: '/audio/castle.mp3',
    volume: 0.3,
    loop: true
  },
  star: {
    name: 'star',
    url: '/audio/star.mp3',
    volume: 0.4,
    loop: true
  },
  game_over: {
    name: 'game_over',
    url: '/audio/game_over.mp3',
    volume: 0.5,
    loop: false
  },
  level_complete: {
    name: 'level_complete',
    url: '/audio/level_complete.mp3',
    volume: 0.5,
    loop: false
  }
};

export const ALL_SOUNDS = {
  ...SOUND_EFFECTS,
  ...BACKGROUND_MUSIC
};

export type SoundName = keyof typeof ALL_SOUNDS;