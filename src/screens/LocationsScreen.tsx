import React, { useMemo, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CategoryChips } from '../components/locations/CategoryChips';

import { LocationCard } from '../components/locations/LocationCard';
import {
  getLocationsByCategory,
  type LocationCategory,
} from '../data/locations';
import { useAppNavigation } from '../navigation/NavigationContext';
import { colors, fonts, layout } from '../constants/theme';

import { shareLocation } from '../utils/locationActions';

export function LocationsScreen() {
  const insets = useSafeAreaInsets();
  const { openLocationDetail } = useAppNavigation();
  const [category, setCategory] = useState<LocationCategory>('mountains');

  const locations = useMemo(() => getLocationsByCategory(category), [category]);

  return (
    <View style={styles.LocationsScreenFacetChassis}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={[
          styles.LocationsScreenScrollContent,
          { paddingTop: insets.top + 18 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.LocationsScreenTitleFiligree}>Locations</Text>

        <View style={styles.LocationsScreenChipsEnclave}>
          <CategoryChips activeCategory={category} onSelect={setCategory} />
        </View>

        <View style={styles.LocationsScreenListLintel}>
          {locations.map(location => (
            <LocationCard
              key={location.id}
              location={location}
              onShare={() => {
                shareLocation(location).catch(() => undefined);
              }}
              onOpen={() => openLocationDetail(location.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  LocationsScreenFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  LocationsScreenScrollContent: {
    gap: 0,
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
  },
  LocationsScreenTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 33,
    marginBottom: 16,
  },

  LocationsScreenChipsEnclave: {
    marginBottom: 18,
  },

  LocationsScreenListLintel: {
    gap: 12,
  },
});
