import React from 'react';
import { StyleSheet, View } from 'react-native';

import { TabBar } from '../components/nav/TabBar';
import { colors } from '../constants/theme';
import { CompassScreen } from '../screens/CompassScreen';
import { FlashlightScreen } from '../screens/FlashlightScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LoaderScreen } from '../screens/LoaderScreen';
import { LocationDetailScreen } from '../screens/LocationDetailScreen';
import { LocationsScreen } from '../screens/LocationsScreen';
import { MapScreen } from '../screens/MapScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { SafetyScreen } from '../screens/SafetyScreen';
import { useAppNavigation } from './NavigationContext';
import type { GuestTab } from './types';

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
});
