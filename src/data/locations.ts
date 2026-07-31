import type {ImageSourcePropType} from 'react-native';

import {locationImages} from './assets';

export type LocationCategory = 'mountains' | 'water' | 'forest';

export type LocationItem = {
  id: string;
  name: string;
  category: LocationCategory;
  tag: string;
  latitude: number;
  longitude: number;
  image: ImageSourcePropType;
  paragraphs: [string, string];
};

export const LOCATION_CATEGORIES: {
  id: LocationCategory;
  label: string;
}[] = [
  {id: 'mountains', label: 'Mountains'},
  {id: 'water', label: 'Water'},
  {id: 'forest', label: 'Forest'},
];

export const LOCATIONS: LocationItem[] = [
  {
    id: 'trolltunga',
    name: 'Trolltunga',
    category: 'mountains',
    tag: 'Mountain',
    latitude: 60.124,
    longitude: 6.7402,
    image: locationImages.trolltunga,
    paragraphs: [
      "Trolltunga is one of Norway's most iconic mountain viewpoints, famous for its dramatic rock formation suspended high above Lake Ringedalsvatnet. The hike offers spectacular panoramic views of snow-capped peaks, crystal-clear lakes, and untouched Nordic wilderness. Every season transforms the landscape into a completely different experience, from lush green valleys to snowy alpine scenery. The destination attracts outdoor enthusiasts from around the world.",
      'The trail is challenging but rewards hikers with unforgettable scenery and countless photography opportunities. Early mornings often bring peaceful conditions with fewer visitors and beautiful light. Weather can change quickly, so proper hiking equipment is recommended. This location perfectly represents the wild beauty of Scandinavian mountains.',
    ],
  },
  {
    id: 'reinebringen',
    name: 'Reinebringen',
    category: 'mountains',
    tag: 'Mountain',
    latitude: 67.9326,
    longitude: 13.0835,
    image: locationImages.reinebringen,
    paragraphs: [
      "Reinebringen overlooks the famous fishing village of Reine in Norway's Lofoten Islands. After climbing the stone staircase, visitors are rewarded with breathtaking views of dramatic peaks rising directly from deep blue fjords. The surrounding landscape is considered one of the most photographed in Scandinavia. Every viewpoint reveals another unforgettable perspective.",
      'Sunrise and sunset create especially vibrant colors across the mountains and water. The trail is relatively short but steep, making sturdy footwear essential. During summer, the Midnight Sun offers extended hiking opportunities late into the evening. The location combines rugged nature with traditional Nordic coastal charm.',
    ],
  },
  {
    id: 'galdhopiggen',
    name: 'Galdhøpiggen',
    category: 'mountains',
    tag: 'Mountain',
    latitude: 61.6361,
    longitude: 8.3123,
    image: locationImages.galdhopiggen,
    paragraphs: [
      'Galdhøpiggen is the highest mountain in Northern Europe and a favorite destination for adventurous hikers. Its summit provides incredible panoramic views stretching across glaciers, valleys, and surrounding mountain ranges. The landscape feels remote and untouched, offering an authentic Scandinavian alpine experience. Snow often remains on the mountain even during summer.',
      "Guided glacier routes are available for visitors seeking a more adventurous ascent. Clear weather provides visibility for many kilometers in every direction. The surrounding national park protects unique wildlife and alpine vegetation. It is one of Norway's greatest natural landmarks.",
    ],
  },
  {
    id: 'kebnekaise',
    name: 'Kebnekaise',
    category: 'mountains',
    tag: 'Mountain',
    latitude: 67.9025,
    longitude: 18.5165,
    image: locationImages.kebnekaise,
    paragraphs: [
      "Kebnekaise is Sweden's highest mountain and one of the country's premier hiking destinations. The area features glaciers, rugged peaks, and wide mountain plateaus surrounded by pristine wilderness. Visitors experience dramatic elevation changes and spectacular Nordic landscapes throughout the journey. Every trail offers impressive views of Lapland.",
      'Summer provides the safest conditions for climbing, while winter transforms the mountain into a paradise for experienced mountaineers. Local mountain stations offer accommodation and helpful information for hikers. Wildlife such as reindeer is commonly seen throughout the region. Kebnekaise represents the heart of Swedish mountain adventures.',
    ],
  },
  {
    id: 'geirangerfjord',
    name: 'Geirangerfjord',
    category: 'water',
    tag: 'Fjord',
    latitude: 62.1049,
    longitude: 7.0942,
    image: locationImages.geirangerfjord,
    paragraphs: [
      "Geirangerfjord is one of Norway's most famous UNESCO World Heritage Sites. Towering cliffs rise above emerald waters while numerous waterfalls cascade into the fjord below. The scenery changes constantly with shifting light and weather conditions. Every viewpoint showcases spectacular natural beauty.",
      "Boat tours provide a unique perspective of the surrounding cliffs and waterfalls. Hiking trails lead to panoramic overlooks above the fjord. The nearby village offers local restaurants and visitor facilities. Geirangerfjord is considered one of Scandinavia's most impressive natural attractions.",
    ],
  },
  {
    id: 'jokulsarlon',
    name: 'Jökulsárlón Glacier Lagoon',
    category: 'water',
    tag: 'Lagoon',
    latitude: 64.0485,
    longitude: -16.1794,
    image: locationImages.jokulsarlon,
    paragraphs: [
      "Jökulsárlón is Iceland's famous glacier lagoon where massive icebergs slowly drift toward the Atlantic Ocean. The crystal-blue ice creates a constantly changing landscape unlike anywhere else in the world. Seals are frequently spotted swimming among the floating ice formations. Every visit offers a unique experience.",
      'Nearby Diamond Beach is covered with sparkling ice fragments washed ashore by the waves. Boat excursions allow visitors to explore the lagoon more closely. Photographers especially appreciate the incredible lighting throughout the day. The location perfectly demonstrates the power of Nordic glaciers.',
    ],
  },
  {
    id: 'naeroyfjord',
    name: 'Naerøyfjord',
    category: 'water',
    tag: 'Fjord',
    latitude: 60.9645,
    longitude: 6.913,
    image: locationImages.naeroyfjord,
    paragraphs: [
      'Naerøyfjord is one of the narrowest fjords in Europe, surrounded by steep mountain walls and peaceful waterfalls. Calm waters reflect the dramatic landscape, creating beautiful mirror-like scenery. Traditional villages remain scattered along the shoreline, preserving centuries of Norwegian history. The area offers an unforgettable journey through untouched nature.',
      "Kayaking is one of the most popular ways to explore the fjord quietly. Scenic cruises also provide excellent views of the surrounding cliffs. The region is recognized as a UNESCO World Heritage Site. Visitors often describe it as one of Norway's most peaceful destinations.",
    ],
  },
  {
    id: 'senja-coast',
    name: 'Senja Coast',
    category: 'water',
    tag: 'Coast',
    latitude: 69.47,
    longitude: 17.42,
    image: locationImages.senjaCoast,
    paragraphs: [
      'The coastline of Senja Island combines rugged mountains, white beaches, and deep blue Arctic waters. Every turn along the scenic roads reveals another breathtaking coastal panorama. Small fishing villages preserve the authentic atmosphere of Northern Norway. The island is often called a special gem of Scandinavia.',
      'Visitors can enjoy hiking, photography, and wildlife watching throughout the year. During winter, the Northern Lights frequently illuminate the sky above the coastline. Summer offers nearly endless daylight under the Midnight Sun. Senja provides an unforgettable Arctic travel experience.',
    ],
  },
  {
    id: 'fulufjallet',
    name: 'Fulufjället National Park',
    category: 'forest',
    tag: 'Forest',
    latitude: 61.5795,
    longitude: 12.7135,
    image: locationImages.fulufjallet,
    paragraphs: [
      "Fulufjället National Park is home to ancient forests, waterfalls, and peaceful mountain landscapes. The park protects one of the world's oldest living trees, Old Tjikko, estimated to be thousands of years old. Quiet hiking trails pass through dense forests and open alpine areas. The atmosphere feels calm and untouched.",
      "The famous Njupeskär Waterfall is one of Sweden's highest waterfalls. Wildlife including moose and foxes can occasionally be spotted throughout the park. Clearly marked trails make exploration easy for visitors of all experience levels. Fulufjället offers an authentic Scandinavian forest adventure.",
    ],
  },
  {
    id: 'oulanka',
    name: 'Oulanka National Park',
    category: 'forest',
    tag: 'Forest',
    latitude: 66.372,
    longitude: 29.321,
    image: locationImages.oulanka,
    paragraphs: [
      'Oulanka National Park in Finland features dense forests, rushing rivers, and wooden suspension bridges crossing crystal-clear streams. The park is famous for its well-maintained hiking routes and diverse northern wildlife. Every season brings a completely different atmosphere, from colorful autumn forests to snowy winter landscapes. Nature remains the main attraction.',
      "The popular Karhunkierros Trail passes through some of the park's most scenic areas. Visitors frequently encounter reindeer and numerous bird species along the routes. Campsites and shelters make multi-day hikes comfortable. Oulanka is one of Finland's most beloved national parks.",
    ],
  },
  {
    id: 'rold-skov',
    name: 'Rold Skov Forest',
    category: 'forest',
    tag: 'Forest',
    latitude: 56.8212,
    longitude: 9.8353,
    image: locationImages.roldSkov,
    paragraphs: [
      "Rold Skov is Denmark's largest forest and offers peaceful walking paths beneath towering beech and pine trees. Small lakes and rolling hills create a relaxing natural environment throughout the forest. The area is popular for hiking, cycling, and wildlife observation. Every trail provides a quiet escape from city life.",
      'Ancient springs and historical landmarks are special throughout the woodland. Autumn colors transform the forest into vibrant shades of gold and orange. Visitors appreciate the well-maintained trails and easy accessibility. Rold Skov combines history, nature, and recreation in one destination.',
    ],
  },
  {
    id: 'tyresta',
    name: 'Tyresta National Park',
    category: 'forest',
    tag: 'Forest',
    latitude: 59.173,
    longitude: 18.316,
    image: locationImages.tyresta,
    paragraphs: [
      "Tyresta National Park protects one of Sweden's largest ancient forests located near Stockholm. Tall pine trees, peaceful lakes, and rocky trails create a classic Nordic wilderness atmosphere. The park offers excellent opportunities for hiking, birdwatching, and nature photography. Despite its proximity to the city, the landscape feels remarkably untouched.",
      'Several marked trails are suitable for both short walks and full-day adventures. Wooden boardwalks pass through wetlands and old-growth forests. Wildlife such as deer, foxes, and woodpeckers can often be observed. Tyresta is an ideal destination for experiencing Scandinavian forests close to the capital.',
    ],
  },
];

export function formatCoordinates(latitude: number, longitude: number): string {
  const latDir = latitude >= 0 ? 'N' : 'S';
  const lngDir = longitude >= 0 ? 'E' : 'W';

  return `${Math.abs(latitude).toFixed(4)}° ${latDir}, ${Math.abs(
    longitude,
  ).toFixed(4)}° ${lngDir}`;
}

export function getLocationById(id: string): LocationItem | undefined {
  return LOCATIONS.find(location => location.id === id);
}

export function getLocationsByCategory(
  category: LocationCategory,
): LocationItem[] {
  return LOCATIONS.filter(location => location.category === category);
}
