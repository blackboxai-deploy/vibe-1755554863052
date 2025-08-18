export class Audio {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private musicSources: Map<string, AudioBufferSourceNode> = new Map();
  private soundEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private masterVolume: number = 0.7;
  private musicVolume: number = 0.5;
  private sfxVolume: number = 0.8;

  constructor() {
    this.initializeAudioContext();
    this.loadSounds();
  }

  private initializeAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private async loadSounds(): Promise<void> {
    const soundFiles = {
      jump: '/audio/jump.wav',
      coin: '/audio/coin.wav',
      powerup: '/audio/powerup.wav',
      stomp: '/audio/stomp.wav',
      pipe: '/audio/pipe.wav',
      fireball: '/audio/fireball.wav',
      death: '/audio/death.wav',
      gameOver: '/audio/game-over.wav',
      levelComplete: '/audio/level-complete.wav',
      oneUp: '/audio/1up.wav',
      breakBlock: '/audio/break-block.wav',
      bump: '/audio/bump.wav',
      flagpole: '/audio/flagpole.wav',
      overworld: '/audio/overworld.mp3',
      underground: '/audio/underground.mp3',
      castle: '/audio/castle.mp3',
      starPower: '/audio/star-power.mp3'
    };

    for (const [name, url] of Object.entries(soundFiles)) {
      try {
        const buffer = await this.loadAudioBuffer(url);
        if (buffer) {
          this.sounds.set(name, buffer);
        }
      } catch (error) {
        console.warn(`Failed to load sound ${name}:`, error);
      }
    }
  }

  private async loadAudioBuffer(url: string): Promise<AudioBuffer | null> {
    if (!this.audioContext) return null;

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await this.audioContext.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.warn(`Failed to load audio from ${url}:`, error);
      return null;
    }
  }

  public playSound(soundName: string, volume: number = 1): void {
    if (!this.soundEnabled || !this.audioContext || !this.sounds.has(soundName)) {
      return;
    }

    try {
      const buffer = this.sounds.get(soundName)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      gainNode.gain.value = volume * this.sfxVolume * this.masterVolume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error);
    }
  }

  public playMusic(musicName: string, loop: boolean = true): void {
    if (!this.musicEnabled || !this.audioContext || !this.sounds.has(musicName)) {
      return;
    }

    this.stopMusic();

    try {
      const buffer = this.sounds.get(musicName)!;
      const source = this.audioContext.createBufferSource();
      const gainNode = this.audioContext.createGain();

      source.buffer = buffer;
      source.loop = loop;
      gainNode.gain.value = this.musicVolume * this.masterVolume;

      source.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      source.start();
      this.musicSources.set(musicName, source);
    } catch (error) {
      console.warn(`Failed to play music ${musicName}:`, error);
    }
  }

  public stopMusic(): void {
    this.musicSources.forEach((source) => {
      try {
        source.stop();
      } catch (error) {
        // Source might already be stopped
      }
    });
    this.musicSources.clear();
  }

  public pauseMusic(): void {
    if (this.audioContext && this.audioContext.state === 'running') {
      this.audioContext.suspend();
    }
  }

  public resumeMusic(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public setSoundEnabled(enabled: boolean): void {
    this.soundEnabled = enabled;
  }

  public setMusicEnabled(enabled: boolean): void {
    this.musicEnabled = enabled;
    if (!enabled) {
      this.stopMusic();
    }
  }

  public setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  public setMusicVolume(volume: number): void {
    this.musicVolume = Math.max(0, Math.min(1, volume));
  }

  public setSfxVolume(volume: number): void {
    this.sfxVolume = Math.max(0, Math.min(1, volume));
  }

  public getMasterVolume(): number {
    return this.masterVolume;
  }

  public getMusicVolume(): number {
    return this.musicVolume;
  }

  public getSfxVolume(): number {
    return this.sfxVolume;
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public isMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public resumeAudioContext(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  public dispose(): void {
    this.stopMusic();
    if (this.audioContext) {
      this.audioContext.close();
    }
    this.sounds.clear();
    this.musicSources.clear();
  }

  public destroy(): void {
    this.dispose();
  }

  public playBackgroundMusic(musicName: string): void {
    this.playMusic(musicName, true);
  }

  public stopBackgroundMusic(): void {
    this.stopMusic();
  }

  public pauseBackgroundMusic(): void {
    this.pauseMusic();
  }
}

export const audioManager = new Audio();