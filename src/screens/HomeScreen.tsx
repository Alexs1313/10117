import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { locationImages, tabIcons } from '../data/assets';
import { colors, fonts, layout } from '../constants/theme';
import { useAppNavigation } from '../navigation/NavigationContext';
import type { GuestTab } from '../navigation/types';

const FACT_TEXT_PARTS = [
  { text: 'The Viking longship ', italic: false },
  { text: 'Gokstad', italic: true },
  {
    text: ', buried around 900 AD and discovered in Norway in 1880, was built from overlapping oak strakes and could reach speeds of 12 knots under full sail across the open North Sea.',
    italic: false,
  },
];

type QuickToolProps = {
  icon: any;
  title: string;
  subtitle: string;
  onPress: () => void;
};

function QuickToolCard({ icon, title, subtitle, onPress }: QuickToolProps) {
  return (
    <TouchableOpacity
      style={styles.ToolCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={icon} style={styles.ToolIcon} resizeMode="contain" />
      <Text style={styles.ToolTitle}>{title}</Text>
      <Text style={styles.ToolSubtitle}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { selectTab, openLocationDetail } = useAppNavigation();

  const goToTab = (tab: GuestTab) => () => selectTab(tab);

  return (
    <View style={styles.Screen}>
      <ScrollView
        style={styles.Scroll}
        contentContainerStyle={[
          styles.ScrollContent,
          {
            paddingTop: insets.top + 14,
            paddingBottom: 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.Header}>
          <Text style={styles.Greeting}>Good Morning, Explorer</Text>
          <Text style={styles.Title}>Nordic Explorer</Text>
        </View>

        <View style={styles.LocationCard}>
          <View style={styles.LocationImageWrap}>
            <Image
              source={locationImages.trolltunga}
              style={styles.LocationImage}
              resizeMode="cover"
            />
            <View style={styles.LocationBadge}>
              <Text style={styles.LocationBadgeText}>LOCATION OF THE DAY</Text>
            </View>
          </View>
          <View style={styles.LocationInfo}>
            <View style={styles.LocationTextCol}>
              <Text style={styles.LocationName}>Trolltunga, Norway</Text>
              <Text style={styles.LocationDesc}>
                Suspended cliff 700m above Ringedalsvatnet
              </Text>
            </View>
            <TouchableOpacity
              style={styles.OpenButton}
              onPress={() => openLocationDetail('trolltunga')}
              activeOpacity={0.8}
            >
              <Text style={styles.OpenButtonText}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.FactCard}>
          <Text style={styles.FactLabel}>⚡ FACT OF THE DAY</Text>
          <Text style={styles.FactBody}>
            {FACT_TEXT_PARTS.map((part, i) =>
              part.italic ? (
                <Text key={i} style={styles.FactItalic}>
                  {part.text}
                </Text>
              ) : (
                <Text key={i}>{part.text}</Text>
              ),
            )}
          </Text>
        </View>

        <View style={styles.ToolsSection}>
          <Text style={styles.ToolsSectionTitle}>Quick Tools</Text>
          <View style={styles.ToolsGrid}>
            <QuickToolCard
              icon={tabIcons.locations}
              title="Locations"
              subtitle="Nordic spots"
              onPress={goToTab('LocationsTab')}
            />
            <QuickToolCard
              icon={tabIcons.flashlight}
              title="Flashlight"
              subtitle="White · 100%"
              onPress={goToTab('FlashlightTab')}
            />
            <QuickToolCard
              icon={tabIcons.map}
              title="Map"
              subtitle="12 destinations"
              onPress={goToTab('MapTab')}
            />
            <QuickToolCard
              icon={tabIcons.safety}
              title="Safety Quiz"
              subtitle="5 levels"
              onPress={goToTab('SafetyTab')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  Scroll: {
    flex: 1,
  },
  ScrollContent: {
    paddingHorizontal: layout.screenPadding,
  },
  Header: {
    paddingTop: 0,
  },
  Greeting: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    letterSpacing: 0.44,
    lineHeight: 16.5,
  },
  Title: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26.4,
    marginTop: 2,
  },
  LocationCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 6,
    marginTop: 14,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 24,
  },
  LocationImageWrap: {
    height: 176,
    overflow: 'hidden',
  },
  LocationImage: {
    height: '100%',
    width: '100%',
  },
  LocationBadge: {
    backgroundColor: colors.button,
    borderRadius: 6,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    position: 'absolute',
    top: 12,
  },
  LocationBadgeText: {
    color: colors.buttonText,
    fontFamily: fonts.sansExtraBold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.72,
    lineHeight: 13.5,
    textTransform: 'uppercase',
  },
  LocationInfo: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  LocationTextCol: {
    flex: 1,
    marginRight: 14,
  },
  LocationName: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20.4,
  },
  LocationDesc: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 17.4,
    marginTop: 5,
  },
  OpenButton: {
    backgroundColor: colors.button,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  OpenButtonText: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19.5,
    textAlign: 'center',
  },
  FactCard: {
    backgroundColor: '#191540',
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 3,
    marginTop: 14,
    padding: 17,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  FactLabel: {
    color: colors.button,
    fontFamily: fonts.sansBold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  FactBody: {
    color: colors.title,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 22.75,
    marginTop: 10,
  },
  FactItalic: {
    fontStyle: 'italic',
  },
  ToolsSection: {
    marginTop: 13,
  },
  ToolsSectionTitle: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
  },
  ToolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  ToolCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    elevation: 3,
    gap: 8,
    paddingHorizontal: 15,
    paddingVertical: 17,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    width: '48%',
  },
  ToolIcon: {
    height: 26,
    tintColor: colors.button,
    width: 26,
  },
  ToolTitle: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
  },
  ToolSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
});
