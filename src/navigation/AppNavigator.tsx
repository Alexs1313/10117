import React from 'react';

import {AppShell} from './AppShell';
import {NavigationProvider} from './NavigationContext';

export function AppNavigator() {
  return (
    <NavigationProvider>
      <AppShell />
    </NavigationProvider>
  );
}
