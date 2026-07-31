import {Platform} from 'react-native';

import {fonts} from './fonts';

export const DESIGN_WIDTH = 393;
export const DESIGN_HEIGHT = 852;

export const colors = {
  background: '#0b0f26',
  surface: '#0b0f26',
  title: '#ede8d8',
  body: '#8baec7',
  bodyMuted: '#6a7ca0',
  bodyBright: '#ede8d8',
  button: '#c9a427',
  buttonText: '#06091a',
  progressActive: '#2470c7',
  progressInactive: '#163a63',
  card: '#131a3c',
  cardBorder: '#1a2248',
  chip: '#131a3c',
  chipBorder: '#1a2248',
  chipText: '#6a7ca0',
  tagBg: 'rgba(201, 164, 39, 0.12)',
  tabBar: '#06091a',
  tabInactive: '#334166',
  white: '#ffffff',
  black: '#000000',
  homeIndicator: 'rgba(244, 246, 248, 0.3)',
};

export const spacing = {
  s: 8,
  m: 12,
  l: 16,
  xl: 20,
  xxl: 28,
};

export const radius = {
  image: 10,
  button: 10,
  card: 16,
  chip: 20,
  tag: 6,
  action: 9,
  maps: 12,
  progress: 2,
};

export const fontSize = {
  tab: 9,
  tag: 10,
  coords: 11,
  chip: 12,
  body: 13,
  cardTitle: 15,
  button: 14,
  screenTitle: 22,
  title: 28,
};

export const layout = {
  screenPadding: 16,
  buttonHeight: 50,
  buttonWidth: 300,
  onboardImageSize: 340,
  progressSegmentHeight: 3,
  logoWidth: 210,
  logoHeight: 117,
  spinnerSize: 80,
  tabHeight: 76,
  cardImageHeight: 114,
  detailImageHeight: 196,
};

export const topInset = (value: number) =>
  Platform.OS === 'android' ? Math.max(value, 30) : value;

export {fonts};
