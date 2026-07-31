import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';

import {colors, fonts, layout, radius} from '../../constants/theme';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  width?: number | null;
};

export function PrimaryButton({
  label,
  onPress,
  style,
  width = layout.buttonWidth,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.PrimaryButtonBtnPortico,
        width != null ? {width} : null,
        pressed && styles.PrimaryButtonButtonPressedDim,
        style,
      ]}>
      <Text style={styles.PrimaryButtonLabelFiligree}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  PrimaryButtonBtnPortico: {
    alignItems: 'center',
    backgroundColor: colors.button,
    borderRadius: radius.button,
    height: layout.buttonHeight,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  PrimaryButtonButtonPressedDim: {
    opacity: 0.85,
  },
  PrimaryButtonLabelFiligree: {
    color: colors.buttonText,
    fontFamily: fonts.sansBold,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 19.5,
  },
});
