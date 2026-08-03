import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../constants/theme';

type AppSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue?: number;
  maximumValue?: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  style?: StyleProp<ViewStyle>;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snapToStep(value: number, min: number, max: number, step?: number) {
  if (!step || step <= 0) {
    return clamp(value, min, max);
  }
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(Number(snapped.toFixed(6)), min, max);
}

export function AppSlider({
  value,
  onValueChange,
  minimumValue = 0,
  maximumValue = 1,
  step,
  minimumTrackTintColor = colors.button,
  maximumTrackTintColor = colors.cardBorder,
  thumbTintColor = colors.button,
  style,
}: AppSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);

  const trackRef = useRef<View>(null);
  const trackWidthRef = useRef(0);

  const trackPageXRef = useRef(0);
  const range = Math.max(maximumValue - minimumValue, Number.EPSILON);

  const updateFromPageX = useCallback(
    (pageX: number) => {
      const width = trackWidthRef.current;
      if (width <= 0) {
        return;
      }
      const ratio = clamp((pageX - trackPageXRef.current) / width, 0, 1);
      const next = snapToStep(
        minimumValue + ratio * range,
        minimumValue,
        maximumValue,
        step,
      );
      onValueChange(next);
    },
    [maximumValue, minimumValue, onValueChange, range, step],
  );

  const measureTrack = useCallback(() => {
    trackRef.current?.measureInWindow((x, _y, width) => {
      trackPageXRef.current = x;
      trackWidthRef.current = width;
      setTrackWidth(width);
    });
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: event => {
          measureTrack();
          updateFromPageX(event.nativeEvent.pageX);
        },
        onPanResponderMove: event => {
          updateFromPageX(event.nativeEvent.pageX);
        },
      }),
    [measureTrack, updateFromPageX],
  );

  const handleLayout = (_event: LayoutChangeEvent) => {
    measureTrack();
  };

  const progress = clamp((value - minimumValue) / range, 0, 1);
  const thumbSize = 20;
  const thumbLeft =
    trackWidth > 0 ? progress * trackWidth - thumbSize / 2 : -thumbSize / 2;

  return (
    <View
      style={[styles.AppSliderFacetChassis, style]}
      {...panResponder.panHandlers}
    >
      <View
        ref={trackRef}
        style={styles.AppSliderTrackEnclave}
        onLayout={handleLayout}
      >
        <View
          style={[
            styles.AppSliderTrack,
            { backgroundColor: maximumTrackTintColor },
          ]}
        />
        <View
          style={[
            styles.AppSliderFill,
            {
              backgroundColor: minimumTrackTintColor,
              width: `${progress * 100}%`,
            },
          ]}
        />
        <View
          style={[
            styles.AppSliderThumb,
            {
              backgroundColor: thumbTintColor,
              left: thumbLeft,
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AppSliderFacetChassis: {
    height: 40,
    justifyContent: 'center',
  },

  AppSliderTrackEnclave: {
    height: 24,
    justifyContent: 'center',
  },

  AppSliderTrack: {
    borderRadius: 2,
    height: 4,
    width: '100%',
  },
  AppSliderFill: {
    borderRadius: 2,
    height: 4,
    left: 0,
    position: 'absolute',
  },

  AppSliderThumb: {
    elevation: 3,
    position: 'absolute',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    top: 2,
  },
});
