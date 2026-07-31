import {Linking, Platform, Share} from 'react-native';

import {
  formatCoordinates,
  type LocationItem,
} from '../data/locations';

export async function shareLocation(location: LocationItem): Promise<void> {
  const coords = formatCoordinates(location.latitude, location.longitude);
  const message = [
    location.name,
    coords,
    '',
    location.paragraphs[0],
    '',
    location.paragraphs[1],
  ].join('\n');

  await Share.share({
    title: location.name,
    message,
  });
}

export async function openLocationInMaps(
  location: LocationItem,
): Promise<void> {
  const {latitude, longitude, name} = location;
  const label = encodeURIComponent(name);

  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;

  const canOpen = await Linking.canOpenURL(url);
  if (canOpen) {
    await Linking.openURL(url);
    return;
  }

  await Linking.openURL(
    `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  );
}
