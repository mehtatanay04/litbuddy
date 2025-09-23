import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { learningModules } from '../utils/gameData';
import { useSpeech } from '../hooks/useSpeech';
import { useProfile } from '../hooks/useProfile';

const Stories = () => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const { speak, isSpeaking } = useSpeech();
  const { addPoints } = useProfile();

  const stories = learningModules.stories;
  const currentStory = stories[currentStoryIndex];

  // Simple translation mapping (in a real app, this would be more comprehensive)
  const translations = {
    'cat': 'gato',
    'dog': 'perro',
    'sun': 'sol',
    'play': 'jugar',
    'happy': 'feliz',
    'garden': 'jardín',
    'little': 'pequeño',
    'birds': 'pájaros',
    'singing': 'cantando',
    'park': 'parque'
  };

  const words = currentStory.content.split(' ');

  const readStory = async () => {
    if (isSpeaking) return;
    
    setIsReading(true);
    setCurrentWordIndex(0);
    
    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);
      await speak(words[i].replace(/[.,]/g, ''));
      await new Promise(resolve => setTimeout(resolve, 800)); // Pause between words
    }
    
    setIsReading(false);
    await addPoints(15);
    await speak("Great reading! You've completed the story!");
  };

  const stopReading = () => {
    setIsReading(false);
    setCurrentWordIndex(0);
  };

  const getTranslatedStory = () => {
    return currentStory.content.split(' ').map(word => {
      const cleanWord = word.replace(/[.,]/g, '').toLowerCase();
      return translations[cleanWord] || word;
    }).join(' ');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Story Time</h1>
          <p className="text-gray-600">Listen to stories and practice reading aloud!</p>
        </div>

        {/* Story Navigation */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setCurrentStoryIndex((prev) => (prev - 1 + stories.length) % stories.length)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            ← Previous
          </button>
          
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-600">{currentStory.title}</h2>
            <div className="text-4xl mt-2">{currentStory.image}</div>
          </div>
          
          <button
            onClick={() => setCurrentStoryIndex((prev) => (prev + 1) % stories.length)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Next →
          </button>
        </div>

        {/* Translation Toggle */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              showTranslation 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showTranslation ? '🌍 English + Spanish' : '🌎 English Only'}
          </button>
        </div>

        {/* Story Content */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-6">
          <div className="prose prose-lg max-w-none">
            {showTranslation ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">English</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentStory.content.split(' ').map((word, index) => (
                      <span
                        key={index}
                        className={`inline-block mx-1 transition-all ${
                          isReading && index === currentWordIndex
                            ? 'bg-yellow-200 rounded px-1 scale-110'
                            : ''
                        }`}
                      >
                        {word}
                      </span>
                    ))}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-green-600 mb-3">Spanish</h4>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {getTranslatedStory()}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-700 leading-relaxed text-lg text-center">
                {currentStory.content.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className={`inline-block mx-1 transition-all ${
                      isReading && index === currentWordIndex
                        ? 'bg-yellow-200 rounded px-1 scale-110 font-bold'
                        : ''
                    }`}
                  >
                    {word}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {/* Reading Controls */}
        <div className="text-center space-y-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={readStory}
              disabled={isSpeaking}
              className="btn-primary text-lg px-8 py-3"
            >
              {isReading ? '📖 Reading...' : '🔊 Read Aloud'}
            </button>
            
            {isReading && (
              <button
                onClick={stopReading}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Stop
              </button>
            )}
          </div>

          <button
            onClick={() => speak(currentStory.content)}
            disabled={isSpeaking}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
          >
            🔊 Listen to Full Story
          </button>
        </div>

        {/* Reading Tips */}
        <div className="mt-8 bg-blue-50 rounded-2xl p-4">
          <h4 className="font-bold text-blue-800 mb-2">Reading Tips:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Follow along with the highlighted words</li>
            <li>• Try reading aloud after listening</li>
            <li>• Practice difficult words several times</li>
            <li>• Use the translation feature to learn new words</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Stories;