export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  jump: boolean;
  run: boolean;
  pause: boolean;
}

export class Input {
  private keys: Set<string> = new Set();
  private inputState: InputState = {
    left: false,
    right: false,
    up: false,
    down: false,
    jump: false,
    run: false,
    pause: false
  };

  private keyMappings = {
    // Arrow keys
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    
    // WASD
    'KeyA': 'left',
    'KeyD': 'right',
    'KeyW': 'up',
    'KeyS': 'down',
    
    // Action keys
    'Space': 'jump',
    'ShiftLeft': 'run',
    'ShiftRight': 'run',
    'KeyX': 'run',
    'KeyZ': 'jump',
    
    // Game control
    'KeyP': 'pause',
    'Escape': 'pause'
  };

  private previousInputState: InputState = { ...this.inputState };

  constructor() {
    this.bindEvents();
  }

  private bindEvents(): void {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
    
    // Prevent default behavior for game keys
    document.addEventListener('keydown', (e) => {
      if (Object.keys(this.keyMappings).includes(e.code)) {
        e.preventDefault();
      }
    });
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.keys.add(event.code);
    this.updateInputState();
  }

  private handleKeyUp(event: KeyboardEvent): void {
    this.keys.delete(event.code);
    this.updateInputState();
  }

  private updateInputState(): void {
    this.previousInputState = { ...this.inputState };
    
    this.inputState.left = this.keys.has('ArrowLeft') || this.keys.has('KeyA');
    this.inputState.right = this.keys.has('ArrowRight') || this.keys.has('KeyD');
    this.inputState.up = this.keys.has('ArrowUp') || this.keys.has('KeyW');
    this.inputState.down = this.keys.has('ArrowDown') || this.keys.has('KeyS');
    this.inputState.jump = this.keys.has('Space') || this.keys.has('KeyZ');
    this.inputState.run = this.keys.has('ShiftLeft') || this.keys.has('ShiftRight') || this.keys.has('KeyX');
    this.inputState.pause = this.keys.has('KeyP') || this.keys.has('Escape');
  }

  public getInputState(): InputState {
    return { ...this.inputState };
  }

  public isKeyPressed(key: keyof InputState): boolean {
    return this.inputState[key];
  }

  public isKeyJustPressed(key: keyof InputState): boolean {
    return this.inputState[key] && !this.previousInputState[key];
  }

  public isKeyJustReleased(key: keyof InputState): boolean {
    return !this.inputState[key] && this.previousInputState[key];
  }

  public reset(): void {
    this.keys.clear();
    this.inputState = {
      left: false,
      right: false,
      up: false,
      down: false,
      jump: false,
      run: false,
      pause: false
    };
    this.previousInputState = { ...this.inputState };
  }

  public destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
    this.reset();
  }

  public handleKey(keyCode: string, pressed: boolean): void {
    if (pressed) {
      this.keys.add(keyCode);
    } else {
      this.keys.delete(keyCode);
    }
    this.updateInputState();
  }

  public isKeyDown(keyCode: string): boolean {
    return this.keys.has(keyCode);
  }
}