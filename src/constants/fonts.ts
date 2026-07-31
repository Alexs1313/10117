import {Platform} from 'react-native';

const ios = {
  sansRegular: 'System',
  sansMedium: 'System',
  sansSemiBold: 'System',
  sansBold: 'System',
  sansExtraBold: 'System',
};

const android = {
  sansRegular: 'sans-serif',
  sansMedium: 'sans-serif-medium',
  sansSemiBold: 'sans-serif-medium',
  sansBold: 'sans-serif',
  sansExtraBold: 'sans-serif-black',
};

const platformFonts = Platform.OS === 'ios' ? ios : android;

export const fonts = {
  sansRegular: platformFonts.sansRegular,
  sansMedium: platformFonts.sansMedium,
  sansSemiBold: platformFonts.sansSemiBold,
  sansBold: platformFonts.sansBold,
  sansExtraBold: platformFonts.sansExtraBold,
};
