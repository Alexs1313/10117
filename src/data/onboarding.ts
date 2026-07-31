import type { ImageSourcePropType } from 'react-native';

import { onboardingImages } from './assets';

export type OnboardingStep = {
  image: ImageSourcePropType;
  title: string;
  description: string;
  buttonLabel: string;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: onboardingImages.step1,
    title: 'Explore Nordic Wilderness',
    description:
      'Discover breathtaking Scandinavian mountains, forests, and fjords while your Viking gorilla guide leads every adventure.',
    buttonLabel: 'Continue',
  },
  {
    image: onboardingImages.step2,
    title: 'Find Amazing Locations',
    description:
      'Browse curated destinations, explore them on the map, view GPS coordinates, and open every location in your navigation app.',
    buttonLabel: 'Next',
  },
  {
    image: onboardingImages.step3,
    title: 'Useful Outdoor Tools',
    description:
      'Stay prepared with a screen flashlight, real-time compass, mosquito repeller, and emergency animal alarm.',
    buttonLabel: 'Continue',
  },
  {
    image: onboardingImages.step4,
    title: 'Adventure Starts Here',
    description:
      'Everything you need for exploring Nordic landscapes is gathered in one simple and reliable travel companion.',
    buttonLabel: 'Start Exploring',
  },
];
