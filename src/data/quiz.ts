export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
};

export type QuizLevel = {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
};

export const QUIZ_LEVELS: QuizLevel[] = [
  {
    id: 'l1',
    title: 'Trail Basics',
    description:
      'Start with the essentials — weather, gear, and smart planning before you head into Nordic wilderness.',
    questions: [
      {
        id: 'l1q1',
        text: 'What should you check before starting a mountain or forest trail?',
        options: [
          'Only the nearest cafe',
          'Trail length, weather, access, and route status',
          'How many photos are online',
          'The color of your jacket',
        ],
        correctIndex: 1,
      },
      {
        id: 'l1q2',
        text: 'Why is it important to stay on marked paths near cliffs and ridges?',
        options: [
          'The view is always worse outside the path',
          'The ground can be unstable or unsafe',
          'It makes the trip shorter',
          'It avoids other hikers',
        ],
        correctIndex: 1,
      },
      {
        id: 'l1q3',
        text: 'What is a smart item to save before visiting remote Nordic areas?',
        options: [
          'Offline map and coordinates',
          'Random screenshots',
          'Restaurant playlist',
          'Hotel logo',
        ],
        correctIndex: 0,
      },
      {
        id: 'l1q4',
        text: 'Which footwear is best for rocky mountain trails?',
        options: [
          'Slippers',
          'Smooth city shoes',
          'Hiking shoes with good grip',
          'Open sandals',
        ],
        correctIndex: 2,
      },
      {
        id: 'l1q5',
        text: 'Why should longer routes start earlier in the day?',
        options: [
          'More time to return before dark',
          'Fewer maps are needed',
          'Rocks are softer in the morning',
          'Phones charge faster outside',
        ],
        correctIndex: 0,
      },
      {
        id: 'l1q6',
        text: 'What should you do if a mountain path is closed?',
        options: [
          'Ignore the sign',
          'Climb around the barrier',
          'Follow local restrictions and choose another route',
          'Wait until nobody is watching',
        ],
        correctIndex: 2,
      },
    ],
  },
  {
    id: 'l2',
    title: 'Nordic Peaks',
    description:
      'Test what you know about iconic Scandinavian summits featured in Viknergo Travelo.',
    questions: [
      {
        id: 'l2q1',
        text: 'Which Norwegian cliff is shaped like a dramatic rock tongue above a lake?',
        options: ['Trolltunga', 'Preikestolen', 'Kebnekaise', 'Tyresta'],
        correctIndex: 0,
      },
      {
        id: 'l2q2',
        text: 'Which peak is among Norway’s highest and a classic alpine challenge?',
        options: ['Galdhøpiggen', 'Rold Skov', 'Oulanka', 'Senja Coast'],
        correctIndex: 0,
      },
      {
        id: 'l2q3',
        text: 'Kebnekaise is best known as a major summit in which country?',
        options: ['Denmark', 'Sweden', 'Iceland', 'Finland'],
        correctIndex: 1,
      },
      {
        id: 'l2q4',
        text: 'Reinebringen is a steep viewpoint hike most associated with which islands?',
        options: ['Lofoten', 'Faroe Islands', 'Svalbard', 'Åland'],
        correctIndex: 0,
      },
      {
        id: 'l2q5',
        text: 'What should hikers prioritize on exposed Nordic peaks?',
        options: [
          'Fashionable outfits',
          'Wind protection and sure footing',
          'Skipping water',
          'Night hiking only',
        ],
        correctIndex: 1,
      },
      {
        id: 'l2q6',
        text: 'Why can summit weather change quickly in Scandinavia?',
        options: [
          'Mountains create their own local conditions',
          'GPS stops working above 500 m',
          'Trails disappear at noon',
          'Maps become inaccurate',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l3',
    title: 'Fjords & Water',
    description:
      'From Geiranger to Jökulsárlón — how well do you know Nordic water landscapes and safe travel around them?',
    questions: [
      {
        id: 'l3q1',
        text: 'Geirangerfjord is famous for which kind of scenery?',
        options: [
          'Desert dunes',
          'Steep cliffs and cascading waterfalls',
          'City skylines',
          'Hot springs only',
        ],
        correctIndex: 1,
      },
      {
        id: 'l3q2',
        text: 'Nærøyfjord is best described as what?',
        options: [
          'A narrow scenic fjord',
          'A desert canyon',
          'An indoor museum',
          'A flat city park',
        ],
        correctIndex: 0,
      },
      {
        id: 'l3q3',
        text: 'Jökulsárlón is known for what natural feature?',
        options: [
          'A glacial lagoon with icebergs',
          'Active lava flows',
          'Sandstone arches',
          'Underground caves only',
        ],
        correctIndex: 0,
      },
      {
        id: 'l3q4',
        text: 'What is a key safety tip near icy water or lagoon edges?',
        options: [
          'Stand as close as possible for photos',
          'Keep distance — ice and banks can be unstable',
          'Swim without checking temperature',
          'Ignore warning signs',
        ],
        correctIndex: 1,
      },
      {
        id: 'l3q5',
        text: 'Senja Coast is especially valued for what?',
        options: [
          'Dramatic coastal mountain scenery',
          'Shopping malls',
          'Desert hiking',
          'Underground metro lines',
        ],
        correctIndex: 0,
      },
      {
        id: 'l3q6',
        text: 'Why are offline coordinates useful around remote fjords?',
        options: [
          'They help locate viewpoints with weak signal',
          'They change the tide',
          'They unlock hotels',
          'They replace weather forecasts',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l4',
    title: 'Forests & Parks',
    description:
      'Explore forest reserves and national parks — and the quiet safety habits that keep you oriented.',
    questions: [
      {
        id: 'l4q1',
        text: 'Tyresta is best known as what kind of destination?',
        options: [
          'A national park near Stockholm',
          'An active volcano',
          'A glacier lagoon',
          'A desert trail',
        ],
        correctIndex: 0,
      },
      {
        id: 'l4q2',
        text: 'Fulufjället is associated with which landscape?',
        options: [
          'Plateau forests and waterfalls',
          'Tropical beaches',
          'City canals',
          'Sand dunes',
        ],
        correctIndex: 0,
      },
      {
        id: 'l4q3',
        text: 'Oulanka National Park is located in which country?',
        options: ['Finland', 'Denmark', 'Iceland', 'Germany'],
        correctIndex: 0,
      },
      {
        id: 'l4q4',
        text: 'Rold Skov is a large forest area most associated with which country?',
        options: ['Denmark', 'Norway', 'Sweden', 'Iceland'],
        correctIndex: 0,
      },
      {
        id: 'l4q5',
        text: 'What helps you stay oriented in dense forest trails?',
        options: [
          'Marked paths, map, and landmarks',
          'Walking in random circles',
          'Turning off all devices',
          'Ignoring trail signs',
        ],
        correctIndex: 0,
      },
      {
        id: 'l4q6',
        text: 'What should you carry even on shorter forest walks?',
        options: [
          'Water, layers, and a charged phone',
          'Only sunglasses',
          'Nothing at all',
          'A surfboard',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'l5',
    title: 'App Tools & Safety',
    description:
      'Map, flashlight, and location cards — test how Viknergo Travelo tools support safer adventures.',
    questions: [
      {
        id: 'l5q1',
        text: 'What is the main purpose of the Map tab?',
        options: [
          'To show destinations visually with pins',
          'To replace all trail descriptions',
          'To create random routes only',
          'To hide saved places',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q2',
        text: 'What information helps find the exact position of a place?',
        options: ['Coordinates', 'Button color', 'App logo', 'Font size'],
        correctIndex: 0,
      },
      {
        id: 'l5q3',
        text: 'When is a screen flashlight most useful outdoors?',
        options: [
          'Low-light reading and night orientation',
          'Cooking breakfast',
          'Changing map themes',
          'Editing onboarding text',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q4',
        text: 'What can you open from a location detail screen?',
        options: [
          'The place on the in-app map',
          'Hotel booking only',
          'A random playlist',
          'App font settings',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q5',
        text: 'Why are location categories like mountains, water, and forests useful?',
        options: [
          'They help filter destinations by landscape type',
          'They change GPS accuracy',
          'They remove safety tips',
          'They unlock hidden coins',
        ],
        correctIndex: 0,
      },
      {
        id: 'l5q6',
        text: 'What should a location detail screen ideally include?',
        options: [
          'Name, description, coordinates, and map access',
          'Only a blank image',
          'Only a random icon',
          'Only a loading spinner',
        ],
        correctIndex: 0,
      },
    ],
  },
];
