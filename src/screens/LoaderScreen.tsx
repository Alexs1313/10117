import React, { useEffect } from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { LoaderSpinner } from '../components/nav/LoaderSpinner';
import { icons } from '../data/assets';
import { useAdaptive } from '../hooks/useAdaptive';
import { colors, layout } from '../constants/theme';

const LOADER_DURATION_MS = 3000;
const SPINNER_SIZE = layout.spinnerSize;

type LoaderScreenProps = {
  onComplete: () => void;
};

export function LoaderScreen({ onComplete }: LoaderScreenProps) {
  const adaptive = useAdaptive();
  const insets = useSafeAreaInsets();
  const isPortrait = adaptive.height >= adaptive.width;

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, LOADER_DURATION_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <View style={styles.LoaderScreenFacetChassis}>
      <ImageBackground
        source={icons.loaderBg}
        style={styles.LoaderScreenBackground}
        resizeMode="cover"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.LoaderScreenContent,
              { paddingTop: insets.top + 12 },
            ]}
          >
            <Image
              source={icons.loaderLogo}
              style={[
                styles.LoaderScreenLogoSigil,
                {
                  width: adaptive.logoWidth,
                  height: adaptive.logoHeight,
                },
              ]}
              resizeMode="contain"
            />
            <View
              style={[
                styles.LoaderScreenSpinnerEnclave,
                isPortrait
                  ? {
                      bottom: Math.max(insets.bottom, 16) + 24,
                      left: 0,
                      position: 'absolute',
                      right: 0,
                    }
                  : { marginTop: 28 },
              ]}
            >
              <LoaderSpinner size={SPINNER_SIZE} />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  LoaderScreenFacetChassis: {
    backgroundColor: colors.black,
    flex: 1,
  },
  LoaderScreenBackground: {
    flex: 1,
  },
  LoaderScreenContent: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  LoaderScreenLogoSigil: {
    alignSelf: 'center',
  },
  LoaderScreenSpinnerEnclave: {
    alignItems: 'center',
  },
});
