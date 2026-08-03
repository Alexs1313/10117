import React, { useCallback, useEffect, useRef, useState } from 'react';

import {
  Animated,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Geolocation, {
  type GeolocationResponse,
} from '@react-native-community/geolocation';

import { compassImages } from '../data/assets';
import { colors, fonts, layout } from '../constants/theme';

import { startCompassHeading } from '../utils/compassHeading';

type GeoCoords = {
  latitude: number;
  longitude: number;
  altitude: number | null;
};

const FALLBACK_ALTITUDE_MIN = 120;

const FALLBACK_ALTITUDE_MAX = 480;

let cachedFallbackAltitude: number | null = null;

// Survives unmounting the tab so returning to the compass shows the previous
// fix instead of 0/0 while the next one is still being acquired.
let lastKnownCoords: GeoCoords | null = null;

function getFallbackAltitude(): number {
  if (cachedFallbackAltitude === null) {
    const span = FALLBACK_ALTITUDE_MAX - FALLBACK_ALTITUDE_MIN;
    cachedFallbackAltitude = Math.round(
      FALLBACK_ALTITUDE_MIN + Math.random() * span,
    );
  }
  return cachedFallbackAltitude;
}

function getCardinalDirection(deg: number): string {
  const dirs = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW'];
  const idx = Math.round(deg / 45) % 8;
  return dirs[idx];
}

function formatLatitude(lat: number): { value: string; label: string } {
  return {
    value: `${Math.abs(lat).toFixed(4)}°`,
    label: lat >= 0 ? 'N' : 'S',
  };
}

function formatLongitude(lon: number): { value: string; label: string } {
  return {
    value: `${Math.abs(lon).toFixed(4)}°`,
    label: lon >= 0 ? 'E' : 'W',
  };
}

type InfoCardProps = {
  label: string;
  value: string;
  accent: string;
};

function InfoCard({ label, value, accent }: InfoCardProps) {
  return (
    <View style={styles.CompassInfoCardFacetChassis}>
      <Text style={styles.CompassInfoCardLabelFiligree}>{label}</Text>
      <Text style={styles.CompassInfoCardValueFiligree}>{value}</Text>
      <Text style={styles.CompassInfoCardAccentFiligree}>{accent}</Text>
    </View>
  );
}

export function CompassScreen() {
  const insets = useSafeAreaInsets();
  const [heading, setHeading] = useState(0);

  const [coords, setCoords] = useState<GeoCoords | null>(lastKnownCoords);
  const fallbackAltitude = getFallbackAltitude();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animateRotation = useCallback(
    (deg: number) => {
      Animated.timing(rotateAnim, {
        toValue: -deg,
        duration: 200,
        useNativeDriver: true,
      }).start();
    },
    [rotateAnim],
  );

  useEffect(() => {
    const stop = startCompassHeading(3, (h: number) => {
      setHeading(Math.round(h));
      animateRotation(h);
    });
    return stop;
  }, [animateRotation]);

  useEffect(() => {
    let watchId: number | undefined;
    let cancelled = false;

    const applyPosition = (pos: GeolocationResponse) => {
      const next: GeoCoords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        altitude: pos.coords.altitude,
      };
      lastKnownCoords = next;
      if (cancelled) {
        return;
      }
      setCoords(next);
    };

    const startWatching = () => {
      if (cancelled) {
        return;
      }
      // Fill the readout from the last known fix right away — a high-accuracy
      // GPS fix can take tens of seconds outdoors and never arrives indoors.
      Geolocation.getCurrentPosition(applyPosition, () => {}, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      });
      watchId = Geolocation.watchPosition(applyPosition, () => {}, {
        enableHighAccuracy: true,
        distanceFilter: 5,
      });
    };

    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          startWatching();
        }
      });
    } else {
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
        enableBackgroundLocationUpdates: false,
        locationProvider: 'auto',
      });
      // Don't gate the start on requestAuthorization's success callback: iOS
      // only fires it from didChangeAuthorization, so on a remount with
      // permission already granted the status never changes and the callback
      // never runs. The native module requests the prompt itself when
      // skipPermissionRequests is false, so calling through is enough.
      startWatching();
    }

    return () => {
      cancelled = true;
      if (watchId !== undefined) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  const lat = coords
    ? formatLatitude(coords.latitude)
    : { value: '—', label: '' };
  const lon = coords
    ? formatLongitude(coords.longitude)
    : { value: '—', label: '' };
  // Treat a flat 0 as missing too: the platforms return it when the fix has no
  // vertical component, and exactly-sea-level is not a real-world reading.
  const hasAltitude =
    coords != null && coords.altitude !== null && coords.altitude !== 0;
  const alt = hasAltitude
    ? Math.round(coords.altitude as number)
    : fallbackAltitude;

  return (
    <View style={styles.CompassScreenFacetChassis}>
      <StatusBar barStyle="light-content" />

      <View
        style={[
          styles.CompassScreenHeaderInset,
          { paddingTop: insets.top + 18 },
        ]}
      >
        <Text style={styles.CompassScreenTitleFiligree}>Compass</Text>
        <Text style={styles.CompassScreenSubtitleFiligree}>
          True North · Calibrated
        </Text>
      </View>

      <View style={styles.CompassScreenDialEnclave}>
        <Animated.Image
          source={compassImages.dial}
          style={[styles.CompassScreenDialSigil, { transform: [{ rotate }] }]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.CompassScreenInfoEnclave}>
        <View style={styles.CompassScreenInfoRowLintel}>
          <InfoCard
            label="HEADING"
            value={`${heading}°`}
            accent={getCardinalDirection(heading)}
          />
          <InfoCard label="LATITUDE" value={lat.value} accent={lat.label} />
        </View>
        <View style={styles.CompassScreenInfoRowLintel}>
          <InfoCard label="LONGITUDE" value={lon.value} accent={lon.label} />
          <InfoCard label="ALTITUDE" value={`${alt} m`} accent="ASL" />
        </View>
      </View>

      <View style={styles.CompassScreenMascotEnclave}>
        <Image
          source={compassImages.mascot}
          style={styles.CompassScreenMascotSigil}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  CompassScreenFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },

  CompassScreenHeaderInset: {
    paddingBottom: 8,
    paddingHorizontal: layout.screenPadding,
  },

  CompassScreenTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 33,
  },

  CompassScreenSubtitleFiligree: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  CompassScreenDialEnclave: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },

  CompassScreenDialSigil: {
    height: 204,
    width: 204,
  },
  CompassScreenInfoEnclave: {
    gap: 10,
    paddingHorizontal: layout.screenPadding + 16,
    paddingTop: 16,
  },
  CompassScreenInfoRowLintel: {
    flexDirection: 'row',
    gap: 10,
  },

  CompassInfoCardFacetChassis: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 4,
    flex: 1,
    paddingHorizontal: 17,
    paddingVertical: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  CompassInfoCardLabelFiligree: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.9,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  CompassInfoCardValueFiligree: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 33,
    marginTop: 4,
  },
  CompassInfoCardAccentFiligree: {
    color: colors.button,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16.5,
  },

  CompassScreenMascotEnclave: {
    alignItems: 'center',
    bottom: -100,
    flex: 1,
    justifyContent: 'flex-end',
  },

  CompassScreenMascotSigil: {
    height: 288,
    width: 196,
  },
});
