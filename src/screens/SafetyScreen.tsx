import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {AppSlider} from '../components/inputs/AppSlider';
import {colors, fonts, layout} from '../constants/theme';
import {createAppSound, type AppSound} from '../utils/appSound';

const VOLUME_BAR_HEIGHTS = [
  4, 7, 10, 14, 18, 22, 26, 30, 28, 24, 20, 16, 20, 24, 28, 30, 26, 22, 18, 14,
];

const FREQ_MIN = 15000;
const FREQ_MAX = 20000;

const REPELLER_SOUND = 'freesound_community_generic_censor_tone_104518.mp3';
const ALARM_SOUND = 'dragon_studio_animal_grunt_382728.mp3';

export function SafetyScreen() {
  const insets = useSafeAreaInsets();
  const [repellerOn, setRepellerOn] = useState(false);
  const [frequency, setFrequency] = useState(17500);
  const [alarmPlaying, setAlarmPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const repellerSoundRef = useRef<AppSound | null>(null);
  const alarmSoundRef = useRef<AppSound | null>(null);
  const alarmPlayingRef = useRef(false);

  useEffect(() => {
    repellerSoundRef.current = createAppSound(REPELLER_SOUND, err => {
      if (err) {
        console.warn('Failed to load repeller sound:', err);
      }
    });
    alarmSoundRef.current = createAppSound(ALARM_SOUND, err => {
      if (err) {
        console.warn('Failed to load alarm sound:', err);
      }
    });
    return () => {
      repellerSoundRef.current?.stop();
      alarmSoundRef.current?.stop();
      repellerSoundRef.current?.release();
      alarmSoundRef.current?.release();
      repellerSoundRef.current = null;
      alarmSoundRef.current = null;
    };
  }, []);

  useEffect(() => {
    const s = repellerSoundRef.current;
    if (!s) {
      return;
    }
    if (repellerOn) {
      s.setNumberOfLoops(-1);
      s.play();
    } else {
      s.stop();
    }
  }, [repellerOn]);

  const handleVolumeChange = useCallback((val: number) => {
    setVolume(val);
    alarmSoundRef.current?.setVolume(val);
  }, []);

  const toggleAlarm = useCallback(() => {
    const s = alarmSoundRef.current;
    if (!s) {
      return;
    }
    if (alarmPlayingRef.current) {
      s.stop();
      alarmPlayingRef.current = false;
      setAlarmPlaying(false);
      return;
    }

    s.setVolume(volume);
    s.setNumberOfLoops(-1);
    alarmPlayingRef.current = true;
    setAlarmPlaying(true);
    s.play(() => {
      alarmPlayingRef.current = false;
      setAlarmPlaying(false);
    });
  }, [volume]);

  const formattedFreq = frequency.toLocaleString('en-US');

  return (
    <View style={[styles.Screen, {paddingTop: insets.top}]}>
      <StatusBar barStyle="light-content" />

      <View style={styles.Header}>
        <Text style={styles.Title}>Safety</Text>
        <Text style={styles.Subtitle}>Wildlife protection tools</Text>
      </View>

      <ScrollView
        style={styles.Scroll}
        contentContainerStyle={styles.ScrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.Card}>
          <View style={styles.CardHeader}>
            <View style={styles.CardHeaderLeft}>
              <View style={styles.IconBox}>
                <Image
                  source={require('../assets/viknergo_safety_repeller.png')}
                  style={styles.IconImage}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.CardTitle}>Mosquito Repeller</Text>
                <Text style={styles.CardSubtitle}>Ultrasonic frequency</Text>
              </View>
            </View>
            <Switch
              value={repellerOn}
              onValueChange={setRepellerOn}
              trackColor={{false: '#1a2248', true: colors.button}}
              thumbColor={repellerOn ? colors.buttonText : '#6a7ca0'}
            />
          </View>

          <View style={styles.FreqDisplay}>
            <Text style={styles.FreqValue}>{formattedFreq}</Text>
            <Text style={styles.FreqUnit}>Hz · Ultrasonic</Text>
          </View>

          <View style={styles.SliderSection}>
            <View style={styles.SliderLabels}>
              <Text style={styles.SliderLabel}>15,000 Hz</Text>
              <Text style={styles.SliderLabel}>20,000 Hz</Text>
            </View>
            <AppSlider
              style={styles.SliderControl}
              minimumValue={FREQ_MIN}
              maximumValue={FREQ_MAX}
              step={100}
              value={frequency}
              onValueChange={setFrequency}
              minimumTrackTintColor={colors.button}
              maximumTrackTintColor="#1a2248"
              thumbTintColor={colors.button}
            />
          </View>

          {repellerOn ? (
            <View style={styles.StatusBadge}>
              <View style={styles.StatusDot} />
              <Text style={styles.StatusText}>Active · Repelling mosquitoes</Text>
            </View>
          ) : null}
        </View>

        <View style={[styles.Card, styles.AlarmCard]}>
          <View style={styles.CardHeader}>
            <View style={styles.CardHeaderLeft}>
              <View style={styles.IconBox}>
                <Image
                  source={require('../assets/viknergo_safety_alarm.png')}
                  style={styles.IconImage}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={styles.CardTitle}>Wild Animal Alarm</Text>
                <Text style={styles.CardSubtitle}>High-frequency deterrent</Text>
              </View>
            </View>
          </View>

          <View style={styles.PlayButtonRow}>
            <TouchableOpacity
              style={styles.PlayButton}
              onPress={toggleAlarm}
              activeOpacity={0.8}>
              {alarmPlaying ? (
                <Image
                  source={require('../assets/pause.png')}
                  style={styles.PlayButtonImage}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.PlayButtonIcon}>▶</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.VolumeLabelRow}>
            <Text style={styles.VolumeLabel}>Volume Level</Text>
          </View>

          <View style={styles.VolumeBars}>
            {VOLUME_BAR_HEIGHTS.map((h, i) => {
              const barThreshold = (i + 1) / VOLUME_BAR_HEIGHTS.length;
              return (
                <View
                  key={i}
                  style={[
                    styles.VolumeBar,
                    {
                      height: h,
                      backgroundColor:
                        volume >= barThreshold ? colors.button : '#1a2248',
                    },
                  ]}
                />
              );
            })}
          </View>

          <AppSlider
            style={styles.VolumeSlider}
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor={colors.button}
            maximumTrackTintColor="#1a2248"
            thumbTintColor={colors.button}
          />

          <View style={styles.WarningBox}>
            <Text style={styles.WarningIcon}>⚠</Text>
            <Text style={styles.WarningText}>
              Use only when wildlife is detected nearby. May disturb other hikers
              or campers in the area.
            </Text>
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
  Header: {
    paddingBottom: 8,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 18,
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
    lineHeight: 18,
  },
  Scroll: {
    flex: 1,
  },
  ScrollContent: {
    gap: 14,
    paddingBottom: 24,
    paddingHorizontal: layout.screenPadding,
    paddingTop: 8,
  },
  Card: {
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 5,
    padding: 21,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.35,
    shadowRadius: 11,
  },
  AlarmCard: {
    backgroundColor: '#191540',
  },
  CardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CardHeaderLeft: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
  },
  IconBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(201,164,39,0.1)',
    borderColor: 'rgba(201,164,39,0.2)',
    borderRadius: 13,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  IconImage: {
    height: 24,
    tintColor: colors.button,
    width: 24,
  },
  CardTitle: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22.5,
  },
  CardSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 16.5,
  },
  FreqDisplay: {
    alignItems: 'center',
    marginTop: 20,
  },
  FreqValue: {
    color: colors.button,
    fontFamily: fonts.sansExtraBold,
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: -0.72,
    lineHeight: 54,
  },
  FreqUnit: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 12,
    lineHeight: 18,
  },
  SliderSection: {
    marginTop: 18,
  },
  SliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  SliderLabel: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 10,
    lineHeight: 15,
  },
  SliderControl: {
    height: 34,
    marginHorizontal: -8,
    marginTop: 4,
  },
  StatusBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(201,164,39,0.08)',
    borderColor: 'rgba(201,164,39,0.18)',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  StatusDot: {
    backgroundColor: colors.button,
    borderRadius: 3.5,
    height: 7,
    width: 7,
  },
  StatusText: {
    color: colors.button,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
  },
  PlayButtonRow: {
    alignItems: 'center',
    marginTop: 22,
  },
  PlayButton: {
    alignItems: 'center',
    backgroundColor: colors.button,
    borderRadius: 38,
    elevation: 6,
    height: 76,
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 22,
    width: 76,
  },
  PlayButtonIcon: {
    color: colors.buttonText,
    fontSize: 28,
  },
  PlayButtonImage: {
    height: 32,
    tintColor: colors.buttonText,
    width: 32,
  },
  VolumeLabelRow: {
    marginTop: 22,
  },
  VolumeLabel: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 16.5,
  },
  VolumeBars: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 3,
    marginTop: 9,
  },
  VolumeBar: {
    borderRadius: 2,
    flex: 1,
  },
  VolumeSlider: {
    height: 34,
    marginHorizontal: -8,
    marginTop: 4,
  },
  WarningBox: {
    alignItems: 'flex-start',
    backgroundColor: 'rgba(192,64,64,0.1)',
    borderColor: 'rgba(192,64,64,0.25)',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 9,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  WarningIcon: {
    color: '#c04040',
    fontSize: 13,
    marginTop: 1,
  },
  WarningText: {
    color: '#c04040',
    flex: 1,
    fontFamily: fonts.sansRegular,
    fontSize: 11,
    lineHeight: 17,
  },
});
