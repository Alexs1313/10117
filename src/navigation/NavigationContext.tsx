import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type {AppPhase, GuestOverlay, GuestTab} from './types';

type NavigationContextValue = {
  phase: AppPhase;
  activeTab: GuestTab;
  overlay: GuestOverlay;
  focusedLocationId: string | null;
  finishLoader: () => void;
  finishOnboarding: () => void;
  selectTab: (tab: GuestTab) => void;
  openLocationDetail: (locationId: string) => void;
  openLocationOnMap: (locationId: string) => void;
  clearFocusedLocation: () => void;
  closeOverlay: () => void;
  goBack: () => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({children}: {children: React.ReactNode}) {
  const [phase, setPhase] = useState<AppPhase>('Loader');
  const [activeTab, setActiveTab] = useState<GuestTab>('HomeTab');
  const [overlay, setOverlay] = useState<GuestOverlay>({type: 'none'});

  const finishLoader = useCallback(() => {
    setPhase('Onboarding');
  }, []);

  const finishOnboarding = useCallback(() => {
    setPhase('Main');
  }, []);

  const selectTab = useCallback((tab: GuestTab) => {
    setActiveTab(tab);
    setOverlay({type: 'none'});
  }, []);

  const [focusedLocationId, setFocusedLocationId] = useState<string | null>(null);

  const openLocationDetail = useCallback((locationId: string) => {
    setOverlay({type: 'LocationDetail', locationId});
  }, []);

  const openLocationOnMap = useCallback((locationId: string) => {
    setOverlay({type: 'none'});
    setFocusedLocationId(locationId);
    setActiveTab('MapTab');
  }, []);

  const clearFocusedLocation = useCallback(() => {
    setFocusedLocationId(null);
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay({type: 'none'});
  }, []);

  const goBack = useCallback(() => {
    setOverlay({type: 'none'});
  }, []);

  const value = useMemo(
    () => ({
      phase,
      activeTab,
      overlay,
      focusedLocationId,
      finishLoader,
      finishOnboarding,
      selectTab,
      openLocationDetail,
      openLocationOnMap,
      clearFocusedLocation,
      closeOverlay,
      goBack,
    }),
    [
      phase,
      activeTab,
      overlay,
      focusedLocationId,
      finishLoader,
      finishOnboarding,
      selectTab,
      openLocationDetail,
      openLocationOnMap,
      clearFocusedLocation,
      closeOverlay,
      goBack,
    ],
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useAppNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useAppNavigation must be used within NavigationProvider');
  }
  return context;
}
