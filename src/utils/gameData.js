// learningData.js

export const learningModules = {
alphabet: [
{ id: 1, letter: 'A', word: 'Apple', image: '🍎', sound: 'a-apple' },
{ id: 2, letter: 'B', word: 'Ball', image: '⚽', sound: 'b-ball' },
{ id: 3, letter: 'C', word: 'Cat', image: '🐱', sound: 'c-cat' },
{ id: 4, letter: 'D', word: 'Dog', image: '🐶', sound: 'd-dog' },
{ id: 5, letter: 'E', word: 'Elephant', image: '🐘', sound: 'e-elephant' },
{ id: 6, letter: 'F', word: 'Fish', image: '🐠', sound: 'f-fish' },
{ id: 7, letter: 'G', word: 'Giraffe', image: '🦒', sound: 'g-giraffe' },
{ id: 8, letter: 'H', word: 'House', image: '🏠', sound: 'h-house' },
{ id: 9, letter: 'I', word: 'Ice Cream', image: '🍦', sound: 'i-icecream' },
{ id: 10, letter: 'J', word: 'Jungle', image: '🌴', sound: 'j-jungle' },
{ id: 11, letter: 'K', word: 'Kite', image: '🪁', sound: 'k-kite' },
{ id: 12, letter: 'L', word: 'Lion', image: '🦁', sound: 'l-lion' },
{ id: 13, letter: 'M', word: 'Monkey', image: '🐵', sound: 'm-monkey' },
{ id: 14, letter: 'N', word: 'Nest', image: '🪺', sound: 'n-nest' },
{ id: 15, letter: 'O', word: 'Orange', image: '🍊', sound: 'o-orange' },
{ id: 16, letter: 'P', word: 'Parrot', image: '🦜', sound: 'p-parrot' },
{ id: 17, letter: 'Q', word: 'Queen', image: '👑', sound: 'q-queen' },
{ id: 18, letter: 'R', word: 'Rabbit', image: '🐰', sound: 'r-rabbit' },
{ id: 19, letter: 'S', word: 'Sun', image: '☀️', sound: 's-sun' },
{ id: 20, letter: 'T', word: 'Tree', image: '🌳', sound: 't-tree' },
{ id: 21, letter: 'U', word: 'Umbrella', image: '☂️', sound: 'u-umbrella' },
{ id: 22, letter: 'V', word: 'Van', image: '🚐', sound: 'v-van' },
{ id: 23, letter: 'W', word: 'Whale', image: '🐳', sound: 'w-whale' },
{ id: 24, letter: 'X', word: 'Xylophone', image: '🎵', sound: 'x-xylophone' },
{ id: 25, letter: 'Y', word: 'Yak', image: '🐂', sound: 'y-yak' },
{ id: 26, letter: 'Z', word: 'Zebra', image: '🦓', sound: 'z-zebra' }
],

words: [
{ id: 1, word: 'House', image: '🏠', category: 'Places', sound: 'house' },
{ id: 2, word: 'Car', image: '🚗', category: 'Transport', sound: 'car' },
{ id: 3, word: 'Book', image: '📚', category: 'Objects', sound: 'book' },
{ id: 4, word: 'Tree', image: '🌳', category: 'Nature', sound: 'tree' },
{ id: 5, word: 'Sun', image: '☀️', category: 'Nature', sound: 'sun' },
{ id: 6, word: 'Water', image: '💧', category: 'Nature', sound: 'water' },
{ id: 7, word: 'Friend', image: '👫', category: 'People', sound: 'friend' },
{ id: 8, word: 'School', image: '🏫', category: 'Places', sound: 'school' },
{ id: 9, word: 'Family', image: '👨‍👩‍👧‍👦', category: 'People', sound: 'family' },
{ id: 10, word: 'Dog', image: '🐶', category: 'Animals', sound: 'dog' },
{ id: 11, word: 'Cat', image: '🐱', category: 'Animals', sound: 'cat' },
{ id: 12, word: 'Milk', image: '🥛', category: 'Food', sound: 'milk' },
{ id: 13, word: 'Bread', image: '🍞', category: 'Food', sound: 'bread' },
{ id: 14, word: 'Chair', image: '🪑', category: 'Objects', sound: 'chair' },
{ id: 15, word: 'Clock', image: '⏰', category: 'Objects', sound: 'clock' }
],

sentences: [
{ id: 1, sentence: 'The cat sits on the mat.', image: '🐱', sound: 'sentence-1' },
{ id: 2, sentence: 'I read a book every day.', image: '📚', sound: 'sentence-2' },
{ id: 3, sentence: 'The sun is bright today.', image: '☀️', sound: 'sentence-3' },
{ id: 4, sentence: 'We play in the park.', image: '🏞️', sound: 'sentence-4' },
{ id: 5, sentence: 'My dog runs fast.', image: '🐶', sound: 'sentence-5' },
{ id: 6, sentence: 'I love my family.', image: '👨‍👩‍👧‍👦', sound: 'sentence-6' }
],

stories: [
{
id: 1,
title: 'The Little Cat',
content: 'A little cat played with a ball. It was very happy.',
image: '🐱',
level: 'Beginner'
},
{
id: 2,
title: 'A Day at School',
content: 'Sam goes to school. He learns and plays with friends.',
image: '🏫',
level: 'Beginner'
},
{
id: 3,
title: 'The Big Tree',
content: 'A big tree gives shade. Birds live on it.',
image: '🌳',
level: 'Intermediate'
},
{
id: 4,
title: 'The Magic Book',
content: 'The book had magic stories. Every page was fun.',
image: '📖',
level: 'Advanced'
}
]
};

export const games = {
wordMatching: [
{ id: 1, image: '🍎', correctWord: 'Apple', options: ['Apple', 'Ball', 'Cat', 'Dog'] },
{ id: 2, image: '🐶', correctWord: 'Dog', options: ['Dog', 'Cat', 'Cow', 'Lion'] },
{ id: 3, image: '🏫', correctWord: 'School', options: ['Home', 'Park', 'School', 'Store'] },
{ id: 4, image: '🥛', correctWord: 'Milk', options: ['Juice', 'Milk', 'Water', 'Tea'] }
],

spellBuilder: [
{ id: 1, word: 'CAT', scrambled: ['T','C','A'], hint: 'A pet that says meow' },
{ id: 2, word: 'SUN', scrambled: ['U','N','S'], hint: 'Gives us light' },
{ id: 3, word: 'BOOK', scrambled: ['O','K','B','O'], hint: 'You read it' },
{ id: 4, word: 'TREE', scrambled: ['E','T','R','E'], hint: 'Has leaves' }
],

storyCompletion: [
{
id: 1,
story: 'The ___ is shining.',
missingWord: 'sun',
options: ['sun','moon','star','cloud']
},
{
id: 2,
story: 'I drink ___ every morning.',
missingWord: 'milk',
options: ['milk','juice','tea','water']
}
]
};

export const badges = [
{ id: 'alphabet_hero', name: 'Alphabet Hero', description: 'Learn all 26 letters', icon: '🔤', points: 100 },
{ id: 'word_wizard', name: 'Word Wizard', description: 'Learn 20 words', icon: '✨', points: 150 },
{ id: 'story_star', name: 'Story Star', description: 'Read 5 stories', icon: '⭐', points: 200 },
{ id: 'game_champion', name: 'Game Champion', description: 'Win 10 games', icon: '🏆', points: 250 },
{ id: 'spell_master', name: 'Spell Master', description: 'Complete all spelling games', icon: '🧩', points: 300 },
{ id: 'reading_pro', name: 'Reading Pro', description: 'Read 10 stories', icon: '📖', points: 400 },
{ id: 'vocabulary_expert', name: 'Vocabulary Expert', description: 'Learn 50 words', icon: '🎯', points: 500 }
];

export const difficultyLevels = {
beginner: { color: 'green', points: 10 },
intermediate: { color: 'blue', points: 20 },
advanced: { color: 'purple', points: 30 }
};
