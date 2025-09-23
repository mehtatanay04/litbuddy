import { useState } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import { useProfile } from '../../hooks/useProfile';

const WordMatching = ({ gameData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { speak } = useSpeech();
  const { addPoints } = useProfile();

  const currentItem = gameData[currentIndex];

  const handleSelect = async (word) => {
    setSelectedWord(word);
    setShowResult(true);
    
    if (word === currentItem.correctWord) {
      await speak('Correct! Well done!');
      await addPoints(20);
      setTimeout(() => {
        setShowResult(false);
        setSelectedWord('');
        setCurrentIndex((prev) => (prev + 1) % gameData.length);
      }, 2000);
    } else {
      await speak('Try again!');
      setTimeout(() => setShowResult(false), 2000);
    }
  };

  return (
    <div className="text-center space-y-6">
      <div className="text-8xl mb-4">{currentItem.image}</div>
      
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {currentItem.options.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            disabled={showResult}
            className={`p-4 rounded-2xl text-lg font-semibold transition-all ${
              showResult
                ? word === currentItem.correctWord
                  ? 'bg-green-500 text-white scale-105'
                  : word === selectedWord
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200'
                : 'bg-blue-100 hover:bg-blue-200 hover:scale-105'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`text-2xl font-bold ${
          selectedWord === currentItem.correctWord ? 'text-green-600' : 'text-red-600'
        }`}>
          {selectedWord === currentItem.correctWord ? '✅ Correct!' : '❌ Try Again!'}
        </div>
      )}
    </div>
  );
};

export default WordMatching;