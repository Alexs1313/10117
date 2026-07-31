export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type GuestTab =
  | 'HomeTab'
  | 'LocationsTab'
  | 'MapTab'
  | 'FlashlightTab'
  | 'SafetyTab';

export type GuestOverlay =
  | {type: 'none'}
  | {type: 'LocationDetail'; locationId: string};
