export const learningModules = {
  alphabet: [
    { id: 1, letter: 'A', word: 'Apple', image: '🍎', sound: 'apple' },
    { id: 2, letter: 'B', word: 'Ball', image: '⚽', sound: 'ball' },
    { id: 3, letter: 'C', word: 'Cat', image: '🐱', sound: 'cat' },
    { id: 4, letter: 'D', word: 'Dog', image: '🐶', sound: 'dog' },
    { id: 5, letter: 'E', word: 'Elephant', image: '🐘', sound: 'elephant' },
    { id: 6, letter: 'F', word: 'Fish', image: '🐠', sound: 'fish' },
    { id: 7, letter: 'G', word: 'Giraffe', image: '🦒', sound: 'giraffe' },
    { id: 8, letter: 'H', word: 'House', image: '🏠', sound: 'house' },
    { id: 9, letter: 'I', word: 'Ice Cream', image: '🍦', sound: 'ice cream' },
    { id: 10, letter: 'J', word: 'Jellyfish', image: '🎐', sound: 'jellyfish' }
  ],
  words: [
    { id: 1, word: 'House', image: '🏠', category: 'Places' },
    { id: 2, word: 'Car', image: '🚗', category: 'Transport' },
    { id: 3, word: 'Book', image: '📚', category: 'Objects' },
    { id: 4, word: 'Tree', image: '🌳', category: 'Nature' },
    { id: 5, word: 'Sun', image: '☀️', category: 'Nature' },
    { id: 6, word: 'Water', image: '💧', category: 'Nature' },
    { id: 7, word: 'Friend', image: '👫', category: 'People' },
    { id: 8, word: 'School', image: '🏫', category: 'Places' },
    { id: 9, word: 'Family', image: '👨‍👩‍👧‍👦', category: 'People' },
    { id: 10, word: 'Animal', image: '🐾', category: 'Nature' }
  ],
  sentences: [
    { id: 1, sentence: 'The cat sat on the mat.', image: '🐱' },
    { id: 2, sentence: 'I like to read books.', image: '📚' },
    { id: 3, sentence: 'The sun is very bright.', image: '☀️' },
    { id: 4, sentence: 'We play in the park.', image: '🏞️' },
    { id: 5, sentence: 'My dog runs very fast.', image: '🐶' },
    { id: 6, sentence: 'I love my family very much.', image: '👨‍👩‍👧‍👦' },
    { id: 7, sentence: 'The fish swims in the water.', image: '🐠' },
    { id: 8, sentence: 'We go to school to learn.', image: '🏫' },
    { id: 9, sentence: 'The tree has green leaves.', image: '🌳' },
    { id: 10, sentence: 'I eat an apple every day.', image: '🍎' }
  ],
  stories: [
    {
      id: 1,
      title: 'The Little Cat',
      content: 'Once there was a little cat. It liked to play in the garden. The cat had a red ball. It was happy.',
      image: '🐱',
      level: 'Beginner'
    },
    {
      id: 2,
      title: 'A Sunny Day',
      content: 'Today is a sunny day. The birds are singing. We can go to the park. It will be fun!',
      image: '☀️',
      level: 'Beginner'
    },
    {
      id: 3,
      title: 'The Big Tree',
      content: 'There is a big tree in our garden. It has many green leaves. Birds make nests in the tree. We sit under it when it is hot.',
      image: '🌳',
      level: 'Intermediate'
    },
    {
      id: 4,
      title: 'My Best Friend',
      content: 'I have a best friend named Sam. We go to school together. We play games and read books. Friends make life happy.',
      image: '👫',
      level: 'Intermediate'
    },
    {
      id: 5,
      title: 'The Magic Book',
      content: 'I found a magic book in the library. When I read it, amazing things happen. The stories come to life! Reading is magical.',
      image: '📚',
      level: 'Advanced'
    }
  ]
};

export const games = {
  wordMatching: [
    { id: 1, image: '🍎', correctWord: 'Apple', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
    { id: 2, image: '🐱', correctWord: 'Cat', options: ['Dog', 'Cat', 'House', 'Tree'] },
    { id: 3, image: '🏠', correctWord: 'House', options: ['Car', 'House', 'Book', 'Sun'] },
    { id: 4, image: '🚗', correctWord: 'Car', options: ['Car', 'Bus', 'Train', 'Bike'] },
    { id: 5, image: '📚', correctWord: 'Book', options: ['Book', 'Pen', 'Paper', 'Desk'] },
    { id: 6, image: '🌳', correctWord: 'Tree', options: ['Tree', 'Flower', 'Grass', 'Bush'] },
    { id: 7, image: '👫', correctWord: 'Friend', options: ['Friend', 'Family', 'Teacher', 'Student'] },
    { id: 8, image: '🏫', correctWord: 'School', options: ['School', 'House', 'Park', 'Store'] }
  ],
  spellBuilder: [
    { id: 1, word: 'CAT', scrambled: ['T', 'A', 'C'], hint: 'A furry animal that says meow' },
    { id: 2, word: 'DOG', scrambled: ['G', 'O', 'D'], hint: 'A friendly pet that barks' },
    { id: 3, word: 'SUN', scrambled: ['N', 'U', 'S'], hint: 'It gives us light and warmth' },
    { id: 4, word: 'BOOK', scrambled: ['K', 'O', 'O', 'B'], hint: 'You read stories from this' },
    { id: 5, word: 'TREE', scrambled: ['E', 'E', 'R', 'T'], hint: 'Tall plant with leaves and branches' },
    { id: 6, word: 'FISH', scrambled: ['H', 'S', 'I', 'F'], hint: 'Swims in water and has scales' },
    { id: 7, word: 'STAR', scrambled: ['R', 'T', 'A', 'S'], hint: 'Twinkles in the night sky' },
    { id: 8, word: 'MOON', scrambled: ['N', 'O', 'O', 'M'], hint: 'Shines at night in the sky' }
  ],
  storyCompletion: [
    {
      id: 1,
      story: 'The ___ sat on the mat.',
      missingWord: 'cat',
      options: ['cat', 'dog', 'ball', 'sun']
    },
    {
      id: 2,
      story: 'I like to read ___.',
      missingWord: 'books',
      options: ['books', 'games', 'food', 'toys']
    },
    {
      id: 3,
      story: 'The ___ is shining brightly.',
      missingWord: 'sun',
      options: ['sun', 'moon', 'star', 'cloud']
    },
    {
      id: 4,
      story: 'We go to ___ to learn.',
      missingWord: 'school',
      options: ['school', 'park', 'home', 'store']
    },
    {
      id: 5,
      story: 'My ___ is my best friend.',
      missingWord: 'dog',
      options: ['dog', 'cat', 'fish', 'bird']
    },
    {
      id: 6,
      story: 'The ___ has green leaves.',
      missingWord: 'tree',
      options: ['tree', 'flower', 'grass', 'bush']
    }
  ]
};

export const badges = [
  { id: 'alphabet_hero', name: 'Alphabet Hero', description: 'Learn 5 letters', icon: '🔤', points: 50 },
  { id: 'word_wizard', name: 'Word Wizard', description: 'Learn 10 words', icon: '✨', points: 100 },
  { id: 'story_star', name: 'Story Star', description: 'Read 3 stories', icon: '⭐', points: 150 },
  { id: 'game_champion', name: 'Game Champion', description: 'Win 5 games', icon: '🏆', points: 200 },
  { id: 'spell_master', name: 'Spell Master', description: 'Complete all spelling games', icon: '🧩', points: 250 },
  { id: 'reading_pro', name: 'Reading Pro', description: 'Read 10 stories', icon: '📖', points: 300 },
  { id: 'vocabulary_expert', name: 'Vocabulary Expert', description: 'Learn 50 words', icon: '🎯', points: 500 }
];

export const difficultyLevels = {
  beginner: { color: 'green', points: 10 },
  intermediate: { color: 'blue', points: 20 },
  advanced: { color: 'purple', points: 30 }
};