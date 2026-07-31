import React, {useEffect, useRef} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';

import {colors} from '../../constants/theme';

const BAR_COUNT = 12;

type LoaderSpinnerProps = {
  size?: number;
};

export function LoaderSpinner({size = 80}: LoaderSpinnerProps) {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [rotation]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const barWidth = size * 0.075;
  const barHeight = size * 0.225;

  return (
    <Animated.View
      style={[
        styles.LoaderSpinnerFacetChassis,
        {height: size, width: size, transform: [{rotate}]},
      ]}>
      {Array.from({length: BAR_COUNT}).map((_, index) => {
        const angle = (360 / BAR_COUNT) * index;
        const opacity = 0.15 + (index / BAR_COUNT) * 0.85;

        return (
          <View
            key={`bar-${index}`}
            style={[
              styles.LoaderSpinnerBarEnclave,
              {
                height: size,
                width: size,
                transform: [{rotate: `${angle}deg`}],
              },
            ]}>
            <View
              style={[
                styles.LoaderSpinnerBarSigil,
                {
                  backgroundColor: colors.white,
                  borderRadius: barWidth / 2,
                  height: barHeight,
                  opacity,
                  top: size * 0.04,
                  width: barWidth,
                },
              ]}
            />
          </View>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  LoaderSpinnerFacetChassis: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoaderSpinnerBarEnclave: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
  },
  LoaderSpinnerBarSigil: {
    position: 'absolute',
  },
});
