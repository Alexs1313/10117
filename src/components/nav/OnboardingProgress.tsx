import React from 'react';
import {StyleSheet, View} from 'react-native';

import {colors, radius} from '../../constants/theme';

type OnboardingProgressProps = {
  total: number;
  activeCount: number;
};

export function OnboardingProgress({
  total,
  activeCount,
}: OnboardingProgressProps) {
  return (
    <View style={styles.OnboardingProgressFacetChassis}>
      {Array.from({length: total}).map((_, index) => {
        const isActive = index < activeCount;

        return (
          <View
            key={`progress-${index}`}
            style={[
              styles.OnboardingProgressSegment,
              isActive
                ? styles.OnboardingProgressSegmentActive
                : styles.OnboardingProgressSegmentInactive,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingProgressFacetChassis: {
    flexDirection: 'row',
    gap: 18,
    width: '100%',
  },
  OnboardingProgressSegment: {
    borderRadius: radius.progress,
    flex: 1,
    height: 3,
  },
  OnboardingProgressSegmentActive: {
    backgroundColor: colors.progressActive,
    opacity: 1,
  },
  OnboardingProgressSegmentInactive: {
    backgroundColor: colors.progressInactive,
    opacity: 0.35,
  },
});
