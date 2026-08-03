import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tabIcons } from '../../data/assets';
import type { GuestTab } from '../../navigation/types';
import { colors, fonts, layout } from '../../constants/theme';

const TAB_ORDER: GuestTab[] = [
  'HomeTab',
  'LocationsTab',
  'MapTab',
  'FlashlightTab',
  'CompassTab',
  'SafetyTab',
];

const TAB_LABELS: Record<GuestTab, string> = {
  HomeTab: 'Home',
  LocationsTab: 'Locations',
  MapTab: 'Map',
  FlashlightTab: 'Flashlight',
  CompassTab: 'Compass',
  SafetyTab: 'Safety',
};

const TAB_ICON_SOURCES = {
  HomeTab: tabIcons.home,
  LocationsTab: tabIcons.locations,
  MapTab: tabIcons.map,
  FlashlightTab: tabIcons.flashlight,
  CompassTab: tabIcons.compass,
  SafetyTab: tabIcons.safety,
} as const;

type TabBarProps = {
  activeTab: GuestTab;
  onSelectTab: (tab: GuestTab) => void;
};

export function TabBar({ activeTab, onSelectTab }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.TabBarFacetChassis,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {TAB_ORDER.map(tab => {
        const isActive = tab === activeTab;

        return (
          <Pressable
            key={tab}
            onPress={() => onSelectTab(tab)}
            style={styles.TabBarTab}
          >
            {isActive ? <View style={styles.TabBarActiveIndicator} /> : null}
            <Image
              source={TAB_ICON_SOURCES[tab]}
              style={[
                styles.TabBarIconSigil,
                { tintColor: isActive ? colors.button : colors.tabInactive },
                !isActive && styles.TabBarIconInactive,
              ]}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.TabBarLabelFiligree,
                isActive && styles.TabBarLabelActiveFiligree,
              ]}
            >
              {TAB_LABELS[tab]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  TabBarFacetChassis: {
    backgroundColor: colors.tabBar,
    borderTopColor: colors.cardBorder,
    borderTopWidth: 1,
    flexDirection: 'row',
    minHeight: layout.tabHeight,
    paddingTop: 10,
  },

  TabBarTab: {
    alignItems: 'center',
    flex: 1,
    gap: 4,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },

  TabBarActiveIndicator: {
    backgroundColor: colors.button,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    height: 2,
    position: 'absolute',
    top: -7,
    width: 28,
  },
  TabBarIconSigil: {
    height: 22,
    width: 22,
  },
  TabBarIconInactive: {
    opacity: 0.85,
  },

  TabBarLabelFiligree: {
    color: colors.tabInactive,
    fontFamily: fonts.sansMedium,
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 0.45,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  TabBarLabelActiveFiligree: {
    color: colors.button,
    fontFamily: fonts.sansBold,
    fontWeight: '700',
  },
});
