import { useState } from 'react';
import Layout from '../components/common/Layout';
import { learningModules } from '../utils/gameData';
import { useSpeech } from '../hooks/useSpeech';
import { useProfile } from '../hooks/useProfile.jsx';

const Learning = () => {
  const [currentModule, setCurrentModule] = useState('alphabet');
  const { speak, listen, isSpeaking } = useSpeech();
  const { addPoints } = useProfile();

  const modules = [
    { id: 'alphabet', name: 'Alphabet', icon: '🔤', color: 'blue' },
    { id: 'words', name: 'Words', icon: '📝', color: 'green' },
    { id: 'sentences', name: 'Sentences', icon: '💬', color: 'purple' },
    { id: 'stories', name: 'Stories', icon: '📖', color: 'orange' },
  ];

  const currentData = learningModules[currentModule];

  const handleSpeak = async (text) => {
    await speak(text);
  };

  const handlePractice = async (expectedWord) => {
    await speak("Say: " + expectedWord);
    const result = await listen();
    
    if (result && result.includes(expectedWord.toLowerCase())) {
      await addPoints(10);
      await speak("Great job! You said it correctly!");
      return true;
    } else {
      await speak("Try again! Say: " + expectedWord);
      return false;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Learning Center</h1>
        
        {/* Module Tabs */}
        <div className="flex overflow-x-auto space-x-2 mb-8 pb-2">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setCurrentModule(module.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all ${
                currentModule === module.id
                  ? `bg-${module.color}-500 text-white shadow-lg`
                  : `bg-white text-gray-600 hover:bg-${module.color}-100`
              }`}
            >
              <span className="text-xl">{module.icon}</span>
              <span>{module.name}</span>
            </button>
          ))}
        </div>

        {/* Learning Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentData.map((item) => (
            <div key={item.id} className="card text-center group hover:scale-105 transition-transform">
              <div className="text-6xl mb-4">{item.image}</div>
              
              {currentModule === 'alphabet' && (
                <>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{item.letter}</div>
                  <div className="text-xl font-semibold mb-4">{item.word}</div>
                </>
              )}
              
              {currentModule === 'words' && (
                <div className="text-2xl font-bold text-green-600 mb-4">{item.word}</div>
              )}
              
              {currentModule === 'sentences' && (
                <div className="text-lg text-purple-600 mb-4">{item.sentence}</div>
              )}
              
              {currentModule === 'stories' && (
                <>
                  <h3 className="text-xl font-bold text-orange-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.content}</p>
                </>
              )}

              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => handleSpeak(
                    currentModule === 'alphabet' ? item.word :
                    currentModule === 'words' ? item.word :
                    currentModule === 'sentences' ? item.sentence :
                    item.content
                  )}
                  disabled={isSpeaking}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors disabled:opacity-50"
                >
                  {isSpeaking ? 'Speaking...' : '🎤 Listen'}
                </button>
                
                {(currentModule === 'alphabet' || currentModule === 'words') && (
                  <button
                    onClick={() => handlePractice(
                      currentModule === 'alphabet' ? item.word : item.word
                    )}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    🗣️ Practice
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Learning;