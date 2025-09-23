import { useState, useEffect } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import { useProfile } from '../../hooks/useProfile.jsx';

const SpellBuilder = ({ gameData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrambledLetters, setScrambledLetters] = useState([]);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const { speak } = useSpeech();
  const { addPoints, addBadge } = useProfile();

  const currentItem = gameData[currentIndex];

  useEffect(() => {
    resetGame();
  }, [currentIndex]);

  const resetGame = () => {
    setScrambledLetters([...currentItem.scrambled].sort(() => Math.random() - 0.5));
    setSelectedLetters([]);
    setShowResult(false);
  };

  const handleLetterSelect = (letter, index) => {
    if (showResult) return;
    
    const newScrambled = [...scrambledLetters];
    newScrambled.splice(index, 1);
    setScrambledLetters(newScrambled);
    
    setSelectedLetters([...selectedLetters, letter]);
  };

  const handleLetterDeselect = (letter, index) => {
    if (showResult) return;
    
    const newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);
    
    setScrambledLetters([...scrambledLetters, letter].sort(() => Math.random() - 0.5));
  };

  const checkAnswer = async () => {
    const attemptedWord = selectedLetters.join('');
    setShowResult(true);
    
    if (attemptedWord === currentItem.word) {
      await speak(`Excellent! ${currentItem.word} is correct!`);
      await addPoints(25);
      
      // Check for badge achievement
      if (currentIndex === gameData.length - 1) {
        await addBadge('spell_master');
        await speak("You've earned the Spell Master badge!");
      }
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % gameData.length);
      }, 2000);
    } else {
      await speak(`Good try! The word is ${currentItem.word}. Let's try again!`);
      setTimeout(() => {
        resetGame();
      }, 2000);
    }
  };

  const getHint = async () => {
    await speak(currentItem.hint);
  };

  return (
    <div className="text-center space-y-6">
      {/* Hint Section */}
      <div className="bg-yellow-50 rounded-xl p-4">
        <p className="text-yellow-800 font-semibold">{currentItem.hint}</p>
        <button
          onClick={getHint}
          className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full text-sm"
        >
          🎯 Get Hint
        </button>
      </div>

      {/* Selected Letters */}
      <div className="min-h-20 bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-300">
        <div className="flex justify-center space-x-2 flex-wrap">
          {selectedLetters.map((letter, index) => (
            <button
              key={index}
              onClick={() => handleLetterDeselect(letter, index)}
              className="text-3xl font-bold bg-blue-500 text-white w-12 h-12 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {letter}
            </button>
          ))}
          {selectedLetters.length === 0 && (
            <span className="text-gray-400 text-lg">Build your word here...</span>
          )}
        </div>
      </div>

      {/* Scrambled Letters */}
      <div className="flex justify-center space-x-2 flex-wrap">
        {scrambledLetters.map((letter, index) => (
          <button
            key={index}
            onClick={() => handleLetterSelect(letter, index)}
            disabled={showResult}
            className="text-3xl font-bold bg-green-500 text-white w-12 h-12 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            {letter}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-x-4">
        <button
          onClick={checkAnswer}
          disabled={selectedLetters.length === 0 || showResult}
          className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full font-semibold disabled:opacity-50"
        >
          Check Answer
        </button>
        <button
          onClick={resetGame}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Result */}
      {showResult && (
        <div className={`text-2xl font-bold ${
          selectedLetters.join('') === currentItem.word ? 'text-green-600' : 'text-red-600'
        }`}>
          {selectedLetters.join('') === currentItem.word ? '🎉 Correct! Well done!' : '💡 Try again!'}
        </div>
      )}

      {/* Progress */}
      <div className="text-sm text-gray-600">
        Word {currentIndex + 1} of {gameData.length}
      </div>
    </div>
  );
};

export default SpellBuilder;