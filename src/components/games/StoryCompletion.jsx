import { useState } from 'react';
import { useSpeech } from '../../hooks/useSpeech';
import { useProfile } from '../../hooks/useProfile';

const StoryCompletion = ({ gameData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { speak } = useSpeech();
  const { addPoints } = useProfile();

  const currentItem = gameData[currentIndex];

  const handleSelect = async (word) => {
    setSelectedWord(word);
    setShowResult(true);
    
    // Speak the story with the selected word
    const completeStory = currentItem.story.replace('___', word);
    await speak(completeStory);
    
    if (word === currentItem.missingWord) {
      await speak("Perfect! You completed the story correctly!");
      await addPoints(30);
      setTimeout(() => {
        setShowResult(false);
        setSelectedWord('');
        setCurrentIndex((prev) => (prev + 1) % gameData.length);
      }, 3000);
    } else {
      await speak(`Good try! The correct word is ${currentItem.missingWord}.`);
      setTimeout(() => setShowResult(false), 3000);
    }
  };

  const readStory = async () => {
    const storyWithBlank = currentItem.story.replace('___', 'blank');
    await speak("Complete the story: " + storyWithBlank);
  };

  return (
    <div className="text-center space-y-6">
      {/* Story Display */}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Complete the Story</h3>
        <p className="text-xl text-gray-700 leading-relaxed">
          {currentItem.story.split('___').map((part, index) => (
            <span key={index}>
              {part}
              {index < currentItem.story.split('___').length - 1 && (
                <span className="inline-block mx-1">
                  <span className="bg-yellow-100 border-2 border-yellow-300 rounded px-2 py-1 min-w-16">
                    {selectedWord && showResult ? (
                      <span className={selectedWord === currentItem.missingWord ? 'text-green-600' : 'text-red-600'}>
                        {selectedWord}
                      </span>
                    ) : (
                      '___'
                    )}
                  </span>
                </span>
              )}
            </span>
          ))}
        </p>
        
        <button
          onClick={readStory}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
        >
          🔊 Read Story
        </button>
      </div>

      {/* Word Options */}
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        {currentItem.options.map((word) => (
          <button
            key={word}
            onClick={() => handleSelect(word)}
            disabled={showResult}
            className={`p-4 rounded-2xl text-lg font-semibold transition-all ${
              showResult
                ? word === currentItem.missingWord
                  ? 'bg-green-500 text-white scale-105'
                  : word === selectedWord
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200'
                : 'bg-purple-100 hover:bg-purple-200 hover:scale-105'
            }`}
          >
            {word}
          </button>
        ))}
      </div>

      {/* Result */}
      {showResult && (
        <div className={`text-2xl font-bold animate-bounce ${
          selectedWord === currentItem.missingWord ? 'text-green-600' : 'text-red-600'
        }`}>
          {selectedWord === currentItem.missingWord ? '📚 Story Complete! 🎉' : 'Keep practicing! ✨'}
        </div>
      )}

      {/* Progress */}
      <div className="text-sm text-gray-600">
        Story {currentIndex + 1} of {gameData.length}
      </div>
    </div>
  );
};

export default StoryCompletion;