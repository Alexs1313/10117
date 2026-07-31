import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppSlider } from '../components/inputs/AppSlider';
import { colors, fonts, layout } from '../constants/theme';

type FlashlightMode = 'white' | 'red' | 'sos';

const MODE_LABELS: Record<FlashlightMode, string> = {
  white: 'WHITE MODE',
  red: 'RED MODE',
  sos: 'STROBE MODE',
};

const MODE_COLORS: Record<FlashlightMode, string> = {
  white: '#FAF8F2',
  red: '#FF2D2D',
  sos: '#FAF8F2',
};

export function FlashlightScreen() {
  const insets = useSafeAreaInsets();
  const [mode, setMode] = useState<FlashlightMode>('white');
  const [brightness, setBrightness] = useState(1);
  const strobeAnim = useRef(new Animated.Value(1)).current;
  const strobeLoop = useRef<Animated.CompositeAnimation | null>(null);

  const startStrobe = useCallback(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(strobeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
        Animated.timing(strobeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
        Animated.timing(strobeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
        Animated.timing(strobeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
        Animated.timing(strobeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
        Animated.timing(strobeAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.step0,
          useNativeDriver: false,
        }),
      ]),
    );
    strobeLoop.current = anim;
    anim.start();
  }, [strobeAnim]);

  const stopStrobe = useCallback(() => {
    strobeLoop.current?.stop();
    strobeAnim.setValue(1);
  }, [strobeAnim]);

  useEffect(() => {
    if (mode === 'sos') {
      startStrobe();
    } else {
      stopStrobe();
    }
    return () => stopStrobe();
  }, [mode, startStrobe, stopStrobe]);

  const selectMode = (m: FlashlightMode) => setMode(m);

  const modeSubtitle =
    mode === 'white'
      ? `White mode · ${Math.round(brightness * 100)}% brightness`
      : mode === 'red'
      ? `Red night mode · ${Math.round(brightness * 100)}% brightness`
      : `SOS strobe · ${Math.round(brightness * 100)}% brightness`;

  const panelBg =
    mode === 'sos'
      ? strobeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['#0b0f26', MODE_COLORS.sos],
        })
      : MODE_COLORS[mode];

  const panelOpacity = mode === 'sos' ? strobeAnim : brightness;

  return (
    <View style={styles.ScreenChassis}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.Header, { paddingTop: insets.top + 18 }]}>
          <Text style={styles.Title}>Flashlight</Text>
          <Text style={styles.Subtitle}>{modeSubtitle}</Text>
        </View>

        <View style={styles.LightPanelWrapper}>
          <Animated.View
            style={[
              styles.LightPanel,
              {
                backgroundColor: panelBg,
                opacity: mode === 'sos' ? 1 : brightness,
              },
            ]}
          >
            {mode === 'sos' && (
              <Animated.View
                style={[StyleSheet.absoluteFill, { opacity: panelOpacity }]}
              />
            )}
            <View style={styles.LightPanelIconContainer}>
              {mode === 'white' && <Text style={styles.IconBulb}>💡</Text>}
              {mode === 'red' && (
                <View style={styles.RedGlow}>
                  <View style={styles.RedGlowInner} />
                </View>
              )}
              {mode === 'sos' && <Text style={styles.IconSos}>⚠️</Text>}
            </View>
            <View style={styles.ModeLabelBadge}>
              <Text style={styles.ModeLabelText}>{MODE_LABELS[mode]}</Text>
            </View>
          </Animated.View>
        </View>

        <View style={styles.BrightnessCard}>
          <View style={styles.BrightnessHeader}>
            <Text style={styles.BrightnessLabel}>Brightness</Text>
            <Text style={styles.BrightnessValue}>
              {Math.round(brightness * 100)}%
            </Text>
          </View>
          <AppSlider
            style={styles.Slider}
            minimumValue={0.05}
            maximumValue={1}
            value={brightness}
            onValueChange={setBrightness}
            minimumTrackTintColor={colors.button}
            maximumTrackTintColor={colors.cardBorder}
            thumbTintColor={colors.button}
          />
          <View style={styles.SliderLabels}>
            <Text style={styles.SliderLabelText}>0%</Text>
            <Text style={styles.SliderLabelText}>100%</Text>
          </View>
        </View>

        <View style={styles.ModeSection}>
          <Text style={styles.ModeSectionTitle}>Mode</Text>

          <ModeOption
            title="White Screen"
            subtitle="Full brightness white light"
            active={mode === 'white'}
            icon={<Text style={styles.ModeOptionIcon}>💡</Text>}
            onPress={() => selectMode('white')}
          />

          <ModeOption
            title="Red Night Mode"
            subtitle="Preserve night vision"
            active={mode === 'red'}
            titleColor="#C94A4A"
            icon={<View style={styles.RedDot} />}
            onPress={() => selectMode('red')}
          />

          <ModeOption
            title="SOS Strobe"
            subtitle="Emergency signal · Morse code"
            active={mode === 'sos'}
            titleColor="#C94A4A"
            icon={<Text style={styles.SosIcon}>⚠️</Text>}
            onPress={() => selectMode('sos')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

type ModeOptionProps = {
  title: string;
  subtitle: string;
  active: boolean;
  icon: React.ReactNode;
  titleColor?: string;
  onPress: () => void;
};

function ModeOption({
  title,
  subtitle,
  active,
  icon,
  titleColor,
  onPress,
}: ModeOptionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.ModeOptionChassis, active && styles.ModeOptionActive]}
    >
      <View style={styles.ModeOptionContent}>
        <Text
          style={[
            styles.ModeOptionTitle,
            active
              ? { color: colors.surface }
              : titleColor
              ? { color: titleColor }
              : null,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[styles.ModeOptionSubtitle, active && { color: '#6a7070' }]}
        >
          {subtitle}
        </Text>
      </View>
      {active ? (
        <View style={styles.ActiveBadge}>
          <Text style={styles.ActiveBadgeText}>ACTIVE</Text>
        </View>
      ) : (
        <View style={styles.ModeIconContainer}>{icon}</View>
      )}
    </TouchableOpacity>
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
  LightPanelWrapper: {
    paddingHorizontal: layout.screenPadding,
    paddingTop: 12,
  },
  LightPanel: {
    borderRadius: 16,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  LightPanelIconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  IconBulb: {
    fontSize: 48,
  },
  RedGlow: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 45, 45, 0.3)',
    borderRadius: 50,
    height: 100,
    justifyContent: 'center',
    width: 100,
  },
  RedGlowInner: {
    backgroundColor: '#8B0000',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  IconSos: {
    fontSize: 48,
  },
  ModeLabelBadge: {
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    bottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 5,
    position: 'absolute',
    right: 14,
  },
  ModeLabelText: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  BrightnessCard: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    marginHorizontal: layout.screenPadding,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  BrightnessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  BrightnessLabel: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
  BrightnessValue: {
    color: colors.button,
    fontFamily: fonts.sansExtraBold,
    fontSize: 16,
    fontWeight: '800',
  },
  Slider: {
    height: 40,
    marginTop: 4,
  },
  SliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  SliderLabelText: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
  },
  ModeSection: {
    marginTop: 16,
    paddingHorizontal: layout.screenPadding,
  },
  ModeSectionTitle: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  ModeOptionChassis: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  ModeOptionActive: {
    backgroundColor: '#FAF8F2',
    borderColor: '#FAF8F2',
  },
  ModeOptionContent: {
    flex: 1,
  },
  ModeOptionTitle: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 14,
    fontWeight: '700',
  },
  ModeOptionSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    marginTop: 2,
  },
  ModeOptionIcon: {
    fontSize: 22,
  },
  ModeIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
  },
  RedDot: {
    backgroundColor: '#C94A4A',
    borderRadius: 10,
    height: 20,
    width: 20,
  },
  SosIcon: {
    fontSize: 22,
  },
  ActiveBadge: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  ActiveBadgeText: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
});
