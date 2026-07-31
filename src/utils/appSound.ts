import {Image, Platform} from 'react-native';

type SoundCallback = (error: unknown) => void;

export type AppSound = {
  play: (onEnd?: () => void) => void;
  stop: () => void;
  release: () => void;
  setVolume: (volume: number) => void;
  setNumberOfLoops: (loops: number) => void;
  isLoaded: () => boolean;
};

type NativeSoundInstance = {
  play: (onEnd?: (success: boolean) => void) => NativeSoundInstance;
  stop: (callback?: () => void) => NativeSoundInstance;
  release: () => NativeSoundInstance;
  setVolume: (volume: number) => NativeSoundInstance;
  setNumberOfLoops: (loops: number) => NativeSoundInstance;
  isLoaded: () => boolean;
};

type SoundConstructor = {
  MAIN_BUNDLE: string;
  setCategory: (category: string, mixWithOthers?: boolean) => void;
  new (
    filename: string,
    basePath: string,
    onError?: SoundCallback,
  ): NativeSoundInstance;
};

type SoundSource = number | string;

let SoundClass: SoundConstructor | null | undefined;

function loadSoundClass(): SoundConstructor | null {
  if (SoundClass !== undefined) {
    return SoundClass;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Sound = require('react-native-sound').default as SoundConstructor;
    Sound.setCategory('Playback', true);
    SoundClass = Sound;
    return SoundClass;
  } catch (error) {
    console.warn('react-native-sound is unavailable:', error);
    SoundClass = null;
    return null;
  }
}

function toAndroidRawName(filename: string): string {
  return filename.toLowerCase().replace(/\.[^.]+$/, '');
}

function resolveSoundPath(source: SoundSource): {path: string; basePath: string} {
  if (typeof source === 'number') {
    const asset = Image.resolveAssetSource(source);
    if (!asset?.uri) {
      throw new Error('Unable to resolve sound asset URI');
    }
    // Metro / bundled asset URI (http in debug, file/asset in release).
    return {path: asset.uri, basePath: ''};
  }

  if (/^(https?:|file:|asset:)/.test(source)) {
    return {path: source, basePath: ''};
  }

  // Legacy filename lookup: Android res/raw (no extension), iOS main bundle.
  if (Platform.OS === 'android') {
    return {path: toAndroidRawName(source), basePath: ''};
  }

  const Sound = loadSoundClass();
  return {path: source, basePath: Sound?.MAIN_BUNDLE ?? ''};
}

function createNoopSound(): AppSound {
  return {
    play: onEnd => {
      onEnd?.();
    },
    stop: () => undefined,
    release: () => undefined,
    setVolume: () => undefined,
    setNumberOfLoops: () => undefined,
    isLoaded: () => false,
  };
}

export function createAppSound(
  source: SoundSource,
  onError?: SoundCallback,
): AppSound {
  const Sound = loadSoundClass();
  if (!Sound) {
    onError?.('Sound module not linked');
    return createNoopSound();
  }

  let loaded = false;
  let pendingPlay: (() => void) | null = null;
  let pendingLoops: number | null = null;
  let pendingVolume: number | null = null;
  let released = false;

  let path: string;
  let basePath: string;
  try {
    ({path, basePath} = resolveSoundPath(source));
  } catch (error) {
    console.warn('Failed to resolve sound source:', source, error);
    onError?.(error);
    return createNoopSound();
  }

  const sound = new Sound(path, basePath, (error: unknown) => {
    if (error) {
      console.warn('Failed to load sound:', path, error);
      onError?.(error);
      return;
    }
    if (released) {
      return;
    }
    loaded = true;
    if (pendingVolume !== null) {
      sound.setVolume(pendingVolume);
    }
    if (pendingLoops !== null) {
      sound.setNumberOfLoops(pendingLoops);
    }
    pendingPlay?.();
    pendingPlay = null;
  });

  return {
    play: onEnd => {
      const start = () => {
        sound.play(success => {
          if (!success) {
            console.warn('Sound playback failed:', path);
          }
          onEnd?.();
        });
      };

      if (loaded || sound.isLoaded()) {
        loaded = true;
        start();
        return;
      }

      pendingPlay = start;
    },
    stop: () => {
      pendingPlay = null;
      sound.stop();
    },
    release: () => {
      released = true;
      pendingPlay = null;
      sound.release();
    },
    setVolume: volume => {
      pendingVolume = volume;
      if (loaded || sound.isLoaded()) {
        sound.setVolume(volume);
      }
    },
    setNumberOfLoops: loops => {
      pendingLoops = loops;
      if (loaded || sound.isLoaded()) {
        sound.setNumberOfLoops(loops);
      }
    },
    isLoaded: () => loaded || sound.isLoaded(),
  };
}
