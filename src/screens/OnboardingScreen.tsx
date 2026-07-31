import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { OnboardingProgress } from '../components/nav/OnboardingProgress';
import { ONBOARDING_STEPS } from '../data/onboarding';
import { useAdaptive } from '../hooks/useAdaptive';
import { colors, fonts, radius } from '../constants/theme';

type OnboardingScreenProps = {
  onComplete: () => void;
};

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const insets = useSafeAreaInsets();
  const adaptive = useAdaptive();
  const [stepIndex, setStepIndex] = useState(0);

  const step = ONBOARDING_STEPS[stepIndex];
  const isLastStep = stepIndex >= ONBOARDING_STEPS.length - 1;

  const handleOpen = () => {
    if (isLastStep) {
      onComplete();
      return;
    }

    setStepIndex(current => current + 1);
  };

  return (
    <View style={styles.OnboardingScreenFacetChassis}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.OnboardingScreenContent,
            {
              paddingBottom: Math.max(insets.bottom, 16),
              paddingHorizontal: adaptive.horizontalPadding,
              paddingTop: insets.top + 24,
            },
          ]}
        >
          <View style={styles.OnboardingScreenHeroEnclave}>
            <Image
              source={step.image}
              style={[styles.OnboardingScreenHeroImage]}
              resizeMode="cover"
            />

            <OnboardingProgress
              total={ONBOARDING_STEPS.length}
              activeCount={stepIndex + 1}
            />

            <View style={styles.OnboardingScreenTextEnclave}>
              <Text style={styles.OnboardingScreenTitleFiligree}>
                {step.title}
              </Text>
              <Text style={styles.OnboardingScreenBodyFiligree}>
                {step.description}
              </Text>
            </View>
          </View>

          <View style={styles.OnboardingScreenActionPortico}>
            <PrimaryButton
              label={step.buttonLabel}
              onPress={handleOpen}
              width={adaptive.buttonWidth}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  OnboardingScreenFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  OnboardingScreenContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  OnboardingScreenHeroEnclave: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  OnboardingScreenHeroImage: {
    borderRadius: radius.image,
  },
  OnboardingScreenTextEnclave: {
    alignSelf: 'stretch',
    gap: 8,
    paddingHorizontal: 4,
  },
  OnboardingScreenTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  OnboardingScreenBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24.75,
  },
  OnboardingScreenActionPortico: {
    alignItems: 'center',
    paddingBottom: 8,
    paddingTop: 16,
  },
});
