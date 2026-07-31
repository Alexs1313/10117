import React, { type ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBar } from '../components/nav/TabBar';
import { APP_DISPLAY_NAME } from '../constants/brand';
import { colors, fonts } from '../constants/theme';
import { useAppNavigation } from './NavigationContext';
import type { GuestTab } from './types';

function PlaceholderScreen({ title }: { title: string }) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.PlaceholderFacetChassis,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <Text style={styles.PlaceholderTitleFiligree}>{title}</Text>
      <Text style={styles.PlaceholderBodyFiligree}>{APP_DISPLAY_NAME}</Text>
    </View>
  );
}

function loadNamedScreen(
  loader: () => Record<string, unknown>,
  exportName: string,
  fallbackTitle: string,
): ComponentType<any> {
  try {
    const mod = loader();
    const Screen = mod?.[exportName];
    if (typeof Screen === 'function') {
      return Screen as ComponentType<any>;
    }
    console.warn(`Screen export "${exportName}" is missing`);
  } catch (error) {
    console.warn(`Failed to load screen "${exportName}"`, error);
  }

  return function MissingScreen() {
    return <PlaceholderScreen title={fallbackTitle} />;
  };
}

const LoaderScreen = loadNamedScreen(
  () => require('../screens/LoaderScreen'),
  'LoaderScreen',
  'Loader',
);
const OnboardingScreen = loadNamedScreen(
  () => require('../screens/OnboardingScreen'),
  'OnboardingScreen',
  'Onboarding',
);
const HomeScreen = loadNamedScreen(
  () => require('../screens/HomeScreen'),
  'HomeScreen',
  'Home',
);
const LocationsScreen = loadNamedScreen(
  () => require('../screens/LocationsScreen'),
  'LocationsScreen',
  'Locations',
);
const MapScreen = loadNamedScreen(
  () => require('../screens/MapScreen'),
  'MapScreen',
  'Map',
);
const FlashlightScreen = loadNamedScreen(
  () => require('../screens/FlashlightScreen'),
  'FlashlightScreen',
  'Flashlight',
);
const CompassScreen = loadNamedScreen(
  () => require('../screens/CompassScreen'),
  'CompassScreen',
  'Compass',
);
const SafetyScreen = loadNamedScreen(
  () => require('../screens/SafetyScreen'),
  'SafetyScreen',
  'Safety',
);
const LocationDetailScreen = loadNamedScreen(
  () => require('../screens/LocationDetailScreen'),
  'LocationDetailScreen',
  'Location',
);

function TabContent({ activeTab }: { activeTab: GuestTab }) {
  switch (activeTab) {
    case 'HomeTab':
      return <HomeScreen />;
    case 'LocationsTab':
      return <LocationsScreen />;
    case 'MapTab':
      return <MapScreen />;
    case 'FlashlightTab':
      return <FlashlightScreen />;
    case 'CompassTab':
      return <CompassScreen />;
    case 'SafetyTab':
      return <SafetyScreen />;
    default:
      return <LocationsScreen />;
  }
}

function OverlayContent() {
  const { overlay } = useAppNavigation();

  switch (overlay.type) {
    case 'LocationDetail':
      return <LocationDetailScreen locationId={overlay.locationId} />;
    default:
      return null;
  }
}

function MainShell() {
  const { overlay, activeTab, selectTab } = useAppNavigation();

  return (
    <View style={styles.AppShellFacetChassis}>
      <View style={styles.AppShellContent}>
        <TabContent activeTab={activeTab} />
        {overlay.type !== 'none' ? (
          <View style={styles.AppShellOverlay}>
            <OverlayContent />
          </View>
        ) : null}
      </View>
      <TabBar activeTab={activeTab} onSelectTab={selectTab} />
    </View>
  );
}

export function AppShell() {
  const { phase, finishLoader, finishOnboarding } = useAppNavigation();

  if (phase === 'Loader') {
    return <LoaderScreen onComplete={finishLoader} />;
  }

  if (phase === 'Onboarding') {
    return <OnboardingScreen onComplete={finishOnboarding} />;
  }

  return <MainShell />;
}

const styles = StyleSheet.create({
  AppShellFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  AppShellContent: {
    flex: 1,
  },
  AppShellOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface,
  },
  PlaceholderFacetChassis: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  PlaceholderTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  PlaceholderBodyFiligree: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
  },
});
