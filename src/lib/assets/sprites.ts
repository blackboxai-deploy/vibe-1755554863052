export interface SpriteFrame {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface SpriteAnimation {
  frames: SpriteFrame[];
  duration: number;
  loop: boolean;
}

export interface SpriteSheet {
  src: string;
  width: number;
  height: number;
  animations: { [key: string]: SpriteAnimation };
}

export const MARIO_SPRITES: SpriteSheet = {
  src: "https://placehold.co/256x256/FF0000/FFFFFF?text=Mario",
  width: 256,
  height: 256,
  animations: {
    idle_small: {
      frames: [{ x: 0, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: true
    },
    walk_small: {
      frames: [
        { x: 16, y: 0, width: 16, height: 16 },
        { x: 32, y: 0, width: 16, height: 16 },
        { x: 48, y: 0, width: 16, height: 16 }
      ],
      duration: 300,
      loop: true
    },
    jump_small: {
      frames: [{ x: 64, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    idle_super: {
      frames: [{ x: 0, y: 32, width: 16, height: 32 }],
      duration: 1000,
      loop: true
    },
    walk_super: {
      frames: [
        { x: 16, y: 32, width: 16, height: 32 },
        { x: 32, y: 32, width: 16, height: 32 },
        { x: 48, y: 32, width: 16, height: 32 }
      ],
      duration: 300,
      loop: true
    },
    jump_super: {
      frames: [{ x: 64, y: 32, width: 16, height: 32 }],
      duration: 1000,
      loop: false
    },
    crouch_super: {
      frames: [{ x: 80, y: 32, width: 16, height: 32 }],
      duration: 1000,
      loop: false
    },
    idle_fire: {
      frames: [{ x: 0, y: 64, width: 16, height: 32 }],
      duration: 1000,
      loop: true
    },
    walk_fire: {
      frames: [
        { x: 16, y: 64, width: 16, height: 32 },
        { x: 32, y: 64, width: 16, height: 32 },
        { x: 48, y: 64, width: 16, height: 32 }
      ],
      duration: 300,
      loop: true
    },
    jump_fire: {
      frames: [{ x: 64, y: 64, width: 16, height: 32 }],
      duration: 1000,
      loop: false
    },
    throw_fire: {
      frames: [{ x: 80, y: 64, width: 16, height: 32 }],
      duration: 200,
      loop: false
    }
  }
};

export const GOOMBA_SPRITES: SpriteSheet = {
  src: "https://placehold.co/64x32/8B4513/FFFFFF?text=Goomba",
  width: 64,
  height: 32,
  animations: {
    walk: {
      frames: [
        { x: 0, y: 0, width: 16, height: 16 },
        { x: 16, y: 0, width: 16, height: 16 }
      ],
      duration: 500,
      loop: true
    },
    squashed: {
      frames: [{ x: 32, y: 0, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    }
  }
};

export const KOOPA_SPRITES: SpriteSheet = {
  src: "https://placehold.co/128x64/00FF00/FFFFFF?text=Koopa",
  width: 128,
  height: 64,
  animations: {
    walk: {
      frames: [
        { x: 0, y: 0, width: 16, height: 24 },
        { x: 16, y: 0, width: 16, height: 24 }
      ],
      duration: 400,
      loop: true
    },
    shell: {
      frames: [{ x: 32, y: 8, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    shell_spin: {
      frames: [
        { x: 32, y: 8, width: 16, height: 16 },
        { x: 48, y: 8, width: 16, height: 16 },
        { x: 64, y: 8, width: 16, height: 16 },
        { x: 80, y: 8, width: 16, height: 16 }
      ],
      duration: 100,
      loop: true
    }
  }
};

export const PIRANHA_PLANT_SPRITES: SpriteSheet = {
  src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4021df9c-f2f8-4c41-9a9d-2bd77220e0dd.png",
  width: 64,
  height: 64,
  animations: {
    chomp: {
      frames: [
        { x: 0, y: 0, width: 16, height: 24 },
        { x: 16, y: 0, width: 16, height: 24 }
      ],
      duration: 600,
      loop: true
    },
    hidden: {
      frames: [{ x: 32, y: 0, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    }
  }
};

export const POWERUP_SPRITES: SpriteSheet = {
  src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6d98994f-b1a9-47e9-bf2c-54dc5932fcd3.png",
  width: 128,
  height: 64,
  animations: {
    mushroom: {
      frames: [{ x: 0, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    fire_flower: {
      frames: [
        { x: 16, y: 0, width: 16, height: 16 },
        { x: 32, y: 0, width: 16, height: 16 },
        { x: 48, y: 0, width: 16, height: 16 },
        { x: 64, y: 0, width: 16, height: 16 }
      ],
      duration: 200,
      loop: true
    },
    one_up: {
      frames: [{ x: 80, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    star: {
      frames: [
        { x: 0, y: 16, width: 16, height: 16 },
        { x: 16, y: 16, width: 16, height: 16 },
        { x: 32, y: 16, width: 16, height: 16 },
        { x: 48, y: 16, width: 16, height: 16 }
      ],
      duration: 150,
      loop: true
    },
    coin: {
      frames: [
        { x: 64, y: 16, width: 16, height: 16 },
        { x: 80, y: 16, width: 16, height: 16 },
        { x: 96, y: 16, width: 16, height: 16 },
        { x: 112, y: 16, width: 16, height: 16 }
      ],
      duration: 200,
      loop: true
    }
  }
};

export const BLOCK_SPRITES: SpriteSheet = {
  src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e682784a-77d7-4106-8241-ac857c0bd766.png",
  width: 128,
  height: 128,
  animations: {
    brick: {
      frames: [{ x: 0, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    question_block: {
      frames: [
        { x: 16, y: 0, width: 16, height: 16 },
        { x: 32, y: 0, width: 16, height: 16 },
        { x: 48, y: 0, width: 16, height: 16 }
      ],
      duration: 400,
      loop: true
    },
    empty_block: {
      frames: [{ x: 64, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    pipe_top: {
      frames: [{ x: 0, y: 16, width: 32, height: 16 }],
      duration: 1000,
      loop: false
    },
    pipe_body: {
      frames: [{ x: 0, y: 32, width: 32, height: 16 }],
      duration: 1000,
      loop: false
    },
    ground: {
      frames: [{ x: 80, y: 0, width: 16, height: 16 }],
      duration: 1000,
      loop: false
    },
    platform: {
      frames: [{ x: 96, y: 0, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    }
  }
};

export const BACKGROUND_SPRITES: SpriteSheet = {
  src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/cfdfcba3-49fa-4d00-9abc-e084989d3c47.png",
  width: 256,
  height: 256,
  animations: {
    cloud_small: {
      frames: [{ x: 0, y: 0, width: 32, height: 24 }],
      duration: 1000,
      loop: false
    },
    cloud_medium: {
      frames: [{ x: 32, y: 0, width: 48, height: 24 }],
      duration: 1000,
      loop: false
    },
    cloud_large: {
      frames: [{ x: 80, y: 0, width: 64, height: 24 }],
      duration: 1000,
      loop: false
    },
    hill_small: {
      frames: [{ x: 0, y: 32, width: 48, height: 35 }],
      duration: 1000,
      loop: false
    },
    hill_large: {
      frames: [{ x: 48, y: 32, width: 80, height: 35 }],
      duration: 1000,
      loop: false
    },
    bush_small: {
      frames: [{ x: 0, y: 80, width: 32, height: 16 }],
      duration: 1000,
      loop: false
    },
    bush_medium: {
      frames: [{ x: 32, y: 80, width: 48, height: 16 }],
      duration: 1000,
      loop: false
    },
    bush_large: {
      frames: [{ x: 80, y: 80, width: 64, height: 16 }],
      duration: 1000,
      loop: false
    },
    castle: {
      frames: [{ x: 144, y: 32, width: 80, height: 80 }],
      duration: 1000,
      loop: false
    },
    flag_pole: {
      frames: [{ x: 224, y: 0, width: 16, height: 160 }],
      duration: 1000,
      loop: false
    },
    flag: {
      frames: [
        { x: 240, y: 0, width: 16, height: 16 },
        { x: 240, y: 16, width: 16, height: 16 }
      ],
      duration: 500,
      loop: true
    }
  }
};

export const EFFECT_SPRITES: SpriteSheet = {
  src: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/be13d971-c549-4d43-8a77-b7c98c4eb1e9.png",
  width: 128,
  height: 64,
  animations: {
    fireball: {
      frames: [
        { x: 0, y: 0, width: 8, height: 8 },
        { x: 8, y: 0, width: 8, height: 8 },
        { x: 16, y: 0, width: 8, height: 8 },
        { x: 24, y: 0, width: 8, height: 8 }
      ],
      duration: 100,
      loop: true
    },
    explosion: {
      frames: [
        { x: 32, y: 0, width: 16, height: 16 },
        { x: 48, y: 0, width: 16, height: 16 },
        { x: 64, y: 0, width: 16, height: 16 }
      ],
      duration: 150,
      loop: false
    },
    points_100: {
      frames: [{ x: 0, y: 16, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    },
    points_200: {
      frames: [{ x: 16, y: 16, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    },
    points_400: {
      frames: [{ x: 32, y: 16, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    },
    points_800: {
      frames: [{ x: 48, y: 16, width: 16, height: 8 }],
      duration: 1000,
      loop: false
    },
    points_1000: {
      frames: [{ x: 64, y: 16, width: 24, height: 8 }],
      duration: 1000,
      loop: false
    },
    points_1up: {
      frames: [{ x: 88, y: 16, width: 24, height: 8 }],
      duration: 1000,
      loop: false
    }
  }
};

export const ALL_SPRITES = {
  mario: MARIO_SPRITES,
  goomba: GOOMBA_SPRITES,
  koopa: KOOPA_SPRITES,
  piranha: PIRANHA_PLANT_SPRITES,
  powerups: POWERUP_SPRITES,
  blocks: BLOCK_SPRITES,
  background: BACKGROUND_SPRITES,
  effects: EFFECT_SPRITES
};

export class SpriteManager {
  private static instance: SpriteManager;
  private loadedImages: Map<string, HTMLImageElement> = new Map();
  private loadingPromises: Map<string, Promise<HTMLImageElement>> = new Map();

  static getInstance(): SpriteManager {
    if (!SpriteManager.instance) {
      SpriteManager.instance = new SpriteManager();
    }
    return SpriteManager.instance;
  }

  async loadSprite(spriteSheet: SpriteSheet): Promise<HTMLImageElement> {
    if (this.loadedImages.has(spriteSheet.src)) {
      return this.loadedImages.get(spriteSheet.src)!;
    }

    if (this.loadingPromises.has(spriteSheet.src)) {
      return this.loadingPromises.get(spriteSheet.src)!;
    }

    const promise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages.set(spriteSheet.src, img);
        this.loadingPromises.delete(spriteSheet.src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingPromises.delete(spriteSheet.src);
        reject(new Error(`Failed to load sprite: ${spriteSheet.src}`));
      };
      img.src = spriteSheet.src;
    });

    this.loadingPromises.set(spriteSheet.src, promise);
    return promise;
  }

  async loadAllSprites(): Promise<void> {
    const loadPromises = Object.values(ALL_SPRITES).map(sprite => 
      this.loadSprite(sprite)
    );
    await Promise.all(loadPromises);
  }

  getLoadedImage(src: string): HTMLImageElement | null {
    return this.loadedImages.get(src) || null;
  }

  drawSprite(
    ctx: CanvasRenderingContext2D,
    spriteSheet: SpriteSheet,
    frame: SpriteFrame,
    x: number,
    y: number,
    flipX: boolean = false,
    scale: number = 1
  ): void {
    const img = this.getLoadedImage(spriteSheet.src);
    if (!img) return;

    ctx.save();
    
    if (flipX) {
      ctx.scale(-1, 1);
      x = -x - frame.width * scale;
    }
    
    if (scale !== 1) {
      ctx.scale(scale, scale);
      x /= scale;
      y /= scale;
    }

    ctx.drawImage(
      img,
      frame.x, frame.y, frame.width, frame.height,
      x, y, frame.width, frame.height
    );
    
    ctx.restore();
  }
}