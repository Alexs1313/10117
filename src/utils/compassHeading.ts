import {NativeEventEmitter, NativeModules, type NativeModule} from 'react-native';

type HeadingData = {
  heading: number;
  accuracy?: number;
};

type CompassNativeModule = NativeModule & {
  start: (updateRate: number) => Promise<void> | void;
  stop: () => Promise<void> | void;
};

function getNativeCompass(): CompassNativeModule | null {
  const module = NativeModules.CompassHeading as CompassNativeModule | undefined;
  if (
    !module ||
    typeof module.start !== 'function' ||
    typeof module.stop !== 'function'
  ) {
    return null;
  }
  return module;
}

export function isCompassAvailable(): boolean {
  return getNativeCompass() !== null;
}

export function startCompassHeading(
  updateRate: number,
  onHeading: (heading: number) => void,
): () => void {
  const nativeCompass = getNativeCompass();
  if (!nativeCompass) {
    return () => undefined;
  }

  const emitter = new NativeEventEmitter(nativeCompass);
  const subscription = emitter.addListener(
    'HeadingUpdated',
    (data: HeadingData) => {
      onHeading(data.heading);
    },
  );

  Promise.resolve(nativeCompass.start(updateRate)).catch(() => undefined);

  return () => {
    subscription.remove();
    Promise.resolve(nativeCompass.stop()).catch(() => undefined);
  };
}
