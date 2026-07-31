import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AnimatedScreen } from '../components/AnimatedScreen';
import { PrimaryButton } from '../components/buttons/PrimaryButton';
import { QUIZ_LEVELS } from '../data/quiz';
import { colors, fonts, layout, radius } from '../constants/theme';

const PASS_RATIO = 0.7;

const QUIZ_MASCOT_IMAGE = require('../assets/viknergo_compass_mascot.png');

type QuizStage = 'intro' | 'question' | 'complete' | 'failed';

export function SafetyScreen() {
  const insets = useSafeAreaInsets();
  const [levelIndex, setLevelIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [stage, setStage] = useState<QuizStage>('intro');

  const level = QUIZ_LEVELS[levelIndex];
  const question = level.questions[questionIndex];

  const startQuiz = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('question');
  };

  const exitToIntro = () => {
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('intro');
  };

  const nextLevel = () => {
    setLevelIndex(prev => (prev + 1) % QUIZ_LEVELS.length);
    setQuestionIndex(0);
    setCorrectCount(0);
    setSelectedIndex(null);
    setStage('intro');
  };

  const selectAnswer = (index: number) => {
    if (selectedIndex !== null) {
      return;
    }
    setSelectedIndex(index);
    const updatedCorrect =
      correctCount + (index === question.correctIndex ? 1 : 0);
    setCorrectCount(updatedCorrect);

    setTimeout(() => {
      const isLastQuestion = questionIndex + 1 >= level.questions.length;
      if (!isLastQuestion) {
        setQuestionIndex(prev => prev + 1);
        setSelectedIndex(null);
        return;
      }
      const passed = updatedCorrect / level.questions.length >= PASS_RATIO;
      setStage(passed ? 'complete' : 'failed');
    }, 900);
  };

  const handleShare = () => {
    Share.share({
      message:
        stage === 'complete'
          ? `I just completed "${level.title}" in Viknergo Safety Quiz!`
          : `Playing "${level.title}" in Viknergo Safety Quiz — trying again!`,
    }).catch(() => undefined);
  };

  return (
    <View style={[styles.Screen]}>
      <ScrollView
        contentContainerStyle={[styles.ScrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.Header, { paddingTop: insets.top }]}>
          <Text style={styles.Title}>Safety Quiz</Text>
          {stage === 'question' ? (
            <TouchableOpacity
              style={styles.ExitPill}
              onPress={exitToIntro}
              activeOpacity={0.85}
            >
              <Text style={styles.ExitPillText}>Exit</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.Subtitle}>Wildlife & trail knowledge</Text>
          )}
        </View>

        <AnimatedScreen
          key={`${stage}-${levelIndex}-${questionIndex}`}
          style={styles.Body}
          distance={20}
          duration={360}
        >
          {stage === 'intro' ? (
            <View style={styles.Intro}>
              <Image
                source={QUIZ_MASCOT_IMAGE}
                style={styles.IntroImage}
                resizeMode="contain"
              />
              <View style={styles.Card}>
                <Text style={styles.LevelLabel}>
                  Level {levelIndex + 1} · {level.title}
                </Text>
                <Text style={styles.IntroText}>{level.description}</Text>
                <PrimaryButton
                  label="Start Quiz"
                  onPress={startQuiz}
                  width={null}
                  style={styles.PrimaryFull}
                />
              </View>
            </View>
          ) : null}

          {stage === 'question' ? (
            <View style={styles.QuestionBlock}>
              <Text style={styles.ProgressText}>
                Question {questionIndex + 1} / {level.questions.length}
              </Text>
              <Text style={styles.QuestionText}>
                {questionIndex + 1}. {question.text}
              </Text>
              <View style={styles.Options}>
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctIndex;
                  const isSelected = index === selectedIndex;
                  const answered = selectedIndex !== null;
                  return (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.Option,
                        answered && isCorrect && styles.OptionCorrect,
                        answered &&
                          isSelected &&
                          !isCorrect &&
                          styles.OptionWrong,
                      ]}
                      disabled={answered}
                      activeOpacity={0.85}
                      onPress={() => selectAnswer(index)}
                    >
                      <Text
                        style={[
                          styles.OptionText,
                          answered && !isCorrect && styles.OptionTextDim,
                        ]}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Image
                source={QUIZ_MASCOT_IMAGE}
                style={styles.QuestionImage}
                resizeMode="contain"
              />
            </View>
          ) : null}

          {stage === 'complete' || stage === 'failed' ? (
            <View style={styles.Result}>
              <Image
                source={QUIZ_MASCOT_IMAGE}
                style={styles.ResultImage}
                resizeMode="contain"
              />
              <View style={styles.Card}>
                <Text style={styles.ResultTitle}>
                  {stage === 'complete' ? 'Level Complete' : 'Try Again'}
                </Text>
                <Text style={styles.ResultSubtitle}>
                  {stage === 'complete'
                    ? `You scored ${correctCount}/${level.questions.length}. Ready for the next trail challenge.`
                    : `You scored ${correctCount}/${level.questions.length}. Review the tips and try this level again.`}
                </Text>

                <TouchableOpacity
                  style={styles.ResultBtn}
                  activeOpacity={0.85}
                  onPress={stage === 'complete' ? nextLevel : startQuiz}
                >
                  <Text style={styles.ResultBtnText}>
                    {stage === 'complete' ? 'Next Level' : 'Try Again'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ResultBtn}
                  activeOpacity={0.85}
                  onPress={handleShare}
                >
                  <Text style={styles.ResultBtnText}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.ResultBtn}
                  activeOpacity={0.85}
                  onPress={exitToIntro}
                >
                  <Text style={styles.ResultBtnText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </AnimatedScreen>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Screen: {
    backgroundColor: colors.surface,
    flex: 1,
  },
  ScrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
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
    lineHeight: 18,
    marginTop: 2,
  },
  ExitPill: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 12,
    borderWidth: 1,
    height: 28,
    justifyContent: 'center',
    marginTop: 8,
    paddingHorizontal: 14,
  },
  ExitPillText: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
  },
  Divider: {
    backgroundColor: colors.cardBorder,
    height: 1,
    marginBottom: 16,
    marginHorizontal: layout.screenPadding,
  },
  Body: {
    flex: 1,
    paddingHorizontal: layout.screenPadding,
  },
  Card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 22,
    width: '100%',
  },
  Intro: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  IntroImage: {
    height: 260,
    marginBottom: 12,
    width: 180,
  },
  LevelLabel: {
    color: colors.button,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  IntroText: {
    color: colors.body,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
    textAlign: 'center',
  },
  PrimaryFull: {
    alignSelf: 'stretch',
    width: '100%',
  },
  QuestionBlock: {
    flex: 1,
  },
  ProgressText: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansSemiBold,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 10,
  },
  QuestionText: {
    color: colors.title,
    fontFamily: fonts.sansBold,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: 20,
  },
  Options: {
    gap: 12,
  },
  Option: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.cardBorder,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  OptionCorrect: {
    backgroundColor: 'rgba(36, 112, 199, 0.35)',
    borderColor: colors.progressActive,
  },
  OptionWrong: {
    backgroundColor: 'rgba(192, 64, 64, 0.28)',
    borderColor: '#c04040',
  },
  OptionText: {
    color: colors.title,
    fontFamily: fonts.sansRegular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  OptionTextDim: {
    color: colors.bodyMuted,
  },
  QuestionImage: {
    alignSelf: 'center',
    height: 140,
    marginTop: 20,
    width: 100,
  },
  Result: {
    alignItems: 'center',
    flex: 1,
    marginTop: 24,
  },
  ResultImage: {
    height: 200,
    marginBottom: 12,
    width: 140,
  },
  ResultTitle: {
    color: colors.title,
    fontFamily: fonts.sansExtraBold,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
    textAlign: 'center',
  },
  ResultSubtitle: {
    color: colors.bodyMuted,
    fontFamily: fonts.sansRegular,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
    textAlign: 'center',
  },
  ResultBtn: {
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.tabBar,
    borderColor: colors.cardBorder,
    borderRadius: radius.maps,
    borderWidth: 1,
    height: 44,
    justifyContent: 'center',
    marginTop: 10,
  },
  ResultBtnText: {
    color: colors.title,
    fontFamily: fonts.sansSemiBold,
    fontSize: 14,
    fontWeight: '600',
  },
});
