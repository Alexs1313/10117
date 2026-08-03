import React from 'react';
import {
  Image,
  ScrollView,
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
      style={styles.HomeQuickToolCardFacetChassis}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={icon}
        style={styles.HomeQuickToolCardIconSigil}
        resizeMode="contain"
      />
      <Text style={styles.HomeQuickToolCardTitleFiligree}>{title}</Text>
      <Text style={styles.HomeQuickToolCardSubtitleFiligree}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { selectTab, openLocationDetail } = useAppNavigation();

  const goToTab = (tab: GuestTab) => () => selectTab(tab);

  return (
    <View style={styles.HomeScreenFacetChassis}>
      <ScrollView
        style={styles.HomeScreenScrollEnclave}
        contentContainerStyle={[
          styles.HomeScreenScrollContent,
          {
            paddingTop: insets.top + 14,
            paddingBottom: 40,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.HomeScreenHeaderInset}>
          <Text style={styles.HomeScreenGreetingFiligree}>
            Good Morning, Explorer
          </Text>
          <Text style={styles.HomeScreenTitleFiligree}>Nordic Explorer</Text>
        </View>

        <View style={styles.HomeScreenLocationFacetChassis}>
          <View style={styles.HomeScreenLocationImageEnclave}>
            <Image
              source={locationImages.trolltunga}
              style={styles.HomeScreenLocationImageSigil}
              resizeMode="cover"
            />
            <View style={styles.HomeScreenLocationBadgeEnclave}>
              <Text style={styles.HomeScreenLocationBadgeFiligree}>
                LOCATION OF THE DAY
              </Text>
            </View>
          </View>
          <View style={styles.HomeScreenLocationInfoLintel}>
            <View style={styles.HomeScreenLocationTextEnclave}>
              <Text style={styles.HomeScreenLocationNameFiligree}>
                Trolltunga, Norway
              </Text>
              <Text style={styles.HomeScreenLocationDescFiligree}>
                Suspended cliff 700m above Ringedalsvatnet
              </Text>
            </View>
            <TouchableOpacity
              style={styles.HomeScreenLocationOpenPortico}
              onPress={() => openLocationDetail('trolltunga')}
              activeOpacity={0.8}
            >
              <Text style={styles.HomeScreenLocationOpenFiligree}>Open</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.HomeScreenFactFacetChassis}>
          <Text style={styles.HomeScreenFactLabelFiligree}>
            ⚡ FACT OF THE DAY
          </Text>
          <Text style={styles.HomeScreenFactBodyFiligree}>
            {FACT_TEXT_PARTS.map((part, i) =>
              part.italic ? (
                <Text key={i} style={styles.HomeScreenFactItalicFiligree}>
                  {part.text}
                </Text>
              ) : (
                <Text key={i}>{part.text}</Text>
              ),
            )}
          </Text>
        </View>

        <View style={styles.HomeScreenToolsEnclave}>
          <Text style={styles.HomeScreenToolsTitleFiligree}>Quick Tools</Text>
          <View style={styles.HomeScreenToolsLintel}>
            <QuickToolCard
              icon={tabIcons.compass}
              title="Compass"
              subtitle="NNE · 022°"
              onPress={goToTab('CompassTab')}
            />
            <QuickToolCard
              icon={tabIcons.flashlight}
              title="Flashlight"
              subtitle="White · 100%"
              onPress={goToTab('FlashlightTab')}
            />
            <QuickToolCard
              icon={tabIcons.safety}
              title="Mosquito Rep."
              subtitle="17,500 Hz"
              onPress={goToTab('SafetyTab')}
            />
            <QuickToolCard
              icon={tabIcons.safety}
              title="Animal Alarm"
              subtitle="Ready"
              onPress={goToTab('SafetyTab')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  HomeScreenFacetChassis: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  HomeScreenScrollEnclave: {
    flex: 1,
  },
  HomeScreenScrollContent: {
    paddingHorizontal: layout.screenPadding,
  },

  HomeScreenHeaderInset: {
    paddingTop: 0,
  },
  HomeScreenGreetingFiligree: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansMedium,
    fontSize: 11,
    letterSpacing: 0.44,
    lineHeight: 16.5,
  },

  HomeScreenTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 26.4,
    marginTop: 2,
  },

  HomeScreenLocationFacetChassis: {
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
  HomeScreenLocationImageEnclave: {
    height: 176,
    overflow: 'hidden',
  },
  HomeScreenLocationImageSigil: {
    height: '100%',
    width: '100%',
  },

  HomeScreenLocationBadgeEnclave: {
    backgroundColor: colors.button,
    borderRadius: 6,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    position: 'absolute',
    top: 12,
  },

  HomeScreenLocationBadgeFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansExtraBold,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.72,
    lineHeight: 13.5,
    textTransform: 'uppercase',
  },
  HomeScreenLocationInfoLintel: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  HomeScreenLocationTextEnclave: {
    flex: 1,
    marginRight: 14,
  },
  HomeScreenLocationNameFiligree: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20.4,
  },

  HomeScreenLocationDescFiligree: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 17.4,
    marginTop: 5,
  },

  HomeScreenLocationOpenPortico: {
    backgroundColor: colors.button,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
  },
  HomeScreenLocationOpenFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19.5,
    textAlign: 'center',
  },
  HomeScreenFactFacetChassis: {
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

  HomeScreenFactLabelFiligree: {
    color: colors.button,
    fontFamily: fonts.sansBold,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 15,
    textTransform: 'uppercase',
  },
  HomeScreenFactBodyFiligree: {
    color: colors.title,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 22.75,
    marginTop: 10,
  },
  HomeScreenFactItalicFiligree: {
    fontStyle: 'italic',
  },
  HomeScreenToolsEnclave: {
    marginTop: 14,
  },

  HomeScreenToolsTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
  },
  HomeScreenToolsLintel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  HomeQuickToolCardFacetChassis: {
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

  HomeQuickToolCardIconSigil: {
    height: 26,
    tintColor: colors.button,
    width: 26,
  },

  HomeQuickToolCardTitleFiligree: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19.5,
  },

  HomeQuickToolCardSubtitleFiligree: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
});
