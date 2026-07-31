import {useMemo} from 'react';
import {useWindowDimensions} from 'react-native';

import {DESIGN_HEIGHT, DESIGN_WIDTH, layout} from '../constants/theme';

export function useAdaptive() {
  const {width, height} = useWindowDimensions();

  return useMemo(() => {
    const isNarrow = width < 370;
    const isSmallHeight = height < 740;
    const isTinyHeight = height < 660;

    const scale = (size: number) => (width / DESIGN_WIDTH) * size;
    const verticalScale = (size: number) => (height / DESIGN_HEIGHT) * size;

    const imageSize = Math.min(
      scale(layout.onboardImageSize),
      width - (isNarrow ? 32 : 56),
      isTinyHeight ? height * 0.36 : isSmallHeight ? height * 0.4 : height * 0.42,
    );

    return {
      width,
      height,
      isNarrow,
      isSmallHeight,
      isTinyHeight,
      scale,
      verticalScale,
      horizontalPadding: isNarrow ? scale(16) : scale(layout.screenPadding),
      onboardImageSize: imageSize,
      logoWidth: scale(layout.logoWidth),
      logoHeight: scale(layout.logoHeight),
      buttonWidth: Math.min(scale(layout.buttonWidth), width - 56),
    };
  }, [width, height]);
}
