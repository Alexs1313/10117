import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {compassImages} from '../data/assets';
import {colors, fonts, layout} from '../constants/theme';
import {startCompassHeading} from '../utils/compassHeading';

type GeoCoords = {
  latitude: number;
  longitude: number;
  altitude: number | null;
};

function getCardinalDirection(deg: number): string {
  const dirs = ['North', 'NE', 'East', 'SE', 'South', 'SW', 'West', 'NW'];
  const idx = Math.round(deg / 45) % 8;
  return dirs[idx];
}

function formatLatitude(lat: number): {value: string; label: string} {
  return {
    value: `${Math.abs(lat).toFixed(4)}°`,
    label: lat >= 0 ? 'N' : 'S',
  };
}

function formatLongitude(lon: number): {value: string; label: string} {
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

function InfoCard({label, value, accent}: InfoCardProps) {
  return (
    <View style={styles.InfoCardChassis}>
      <Text style={styles.InfoCardLabel}>{label}</Text>
      <Text style={styles.InfoCardValue}>{value}</Text>
      <Text style={styles.InfoCardAccent}>{accent}</Text>
    </View>
  );
}

export function CompassScreen() {
  const insets = useSafeAreaInsets();
  const [heading, setHeading] = useState(0);
  const [coords, setCoords] = useState<GeoCoords>({
    latitude: 0,
    longitude: 0,
    altitude: null,
  });
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
    const geo = (globalThis as any).navigator?.geolocation;
    if (!geo) {
      return;
    }

    const startWatching = () => {
      try {
        watchId = geo.watchPosition(
          (pos: any) => {
            setCoords({
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
              altitude: pos.coords.altitude,
            });
          },
          () => {},
          {enableHighAccuracy: true, distanceFilter: 10},
        );
      } catch {}
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
      startWatching();
    }

    return () => {
      if (watchId !== undefined) {
        try {
          geo.clearWatch(watchId);
        } catch {}
      }
    };
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [-360, 360],
    outputRange: ['-360deg', '360deg'],
  });

  const lat = formatLatitude(coords.latitude);
  const lon = formatLongitude(coords.longitude);
  const alt = coords.altitude !== null ? Math.round(coords.altitude) : 0;

  return (
    <View style={styles.ScreenChassis}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.Header, {paddingTop: insets.top + 18}]}>
        <Text style={styles.Title}>Compass</Text>
        <Text style={styles.Subtitle}>True North · Calibrated</Text>
      </View>

      <View style={styles.CompassContainer}>
        <Animated.Image
          source={compassImages.dial}
          style={[styles.CompassDial, {transform: [{rotate}]}]}
          resizeMode="contain"
        />
      </View>

      <View style={styles.InfoGrid}>
        <View style={styles.InfoRow}>
          <InfoCard
            label="HEADING"
            value={`${heading}°`}
            accent={getCardinalDirection(heading)}
          />
          <InfoCard label="LATITUDE" value={lat.value} accent={lat.label} />
        </View>
        <View style={styles.InfoRow}>
          <InfoCard label="LONGITUDE" value={lon.value} accent={lon.label} />
          <InfoCard label="ALTITUDE" value={`${alt} m`} accent="ASL" />
        </View>
      </View>

      <View style={styles.MascotContainer}>
        <Image
          source={compassImages.mascot}
          style={styles.MascotImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  Header: {
    paddingBottom: 8,
    paddingHorizontal: layout.screenPadding,
  },
  Title: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 33,
  },
  Subtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  CompassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  CompassDial: {
    height: 204,
    width: 204,
  },
  InfoGrid: {
    gap: 10,
    paddingHorizontal: layout.screenPadding + 16,
    paddingTop: 16,
  },
  InfoRow: {
    flexDirection: 'row',
    gap: 10,
  },
  InfoCardChassis: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 4,
    flex: 1,
    paddingHorizontal: 17,
    paddingVertical: 15,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  InfoCardLabel: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.9,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  InfoCardValue: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 33,
    marginTop: 4,
  },
  InfoCardAccent: {
    color: colors.button,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16.5,
  },
  MascotContainer: {
    alignItems: 'center',
    bottom: -100,
    flex: 1,
    justifyContent: 'flex-end',
  },
  MascotImage: {
    height: 288,
    width: 196,
  },
});
