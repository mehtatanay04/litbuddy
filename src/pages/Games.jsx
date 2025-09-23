import { useState } from 'react';
import Layout from '../components/common/Layout';
import WordMatching from '../components/games/WordMatching';
import SpellBuilder from '../components/games/SpellBuilder';
import StoryCompletion from '../components/games/StoryCompletion';
import { games } from '../utils/gameData';
import { useProfile } from '../hooks/useProfile.jsx';

const Games = () => {
  const [currentGame, setCurrentGame] = useState('wordMatching');
  const { profile } = useProfile();

  const gameTypes = [
    { id: 'wordMatching', name: 'Word Matching', icon: '🔤', description: 'Match words with pictures' },
    { id: 'spellBuilder', name: 'Spell Builder', icon: '🧩', description: 'Arrange letters to form words' },
    { id: 'storyCompletion', name: 'Story Completion', icon: '📖', description: 'Fill in missing words' },
  ];

  const renderGame = () => {
    switch (currentGame) {
      case 'wordMatching':
        return <WordMatching gameData={games.wordMatching} />;
      case 'spellBuilder':
        return <SpellBuilder gameData={games.spellBuilder} />;
      case 'storyCompletion':
        return <StoryCompletion gameData={games.storyCompletion} />;
      default:
        return <WordMatching gameData={games.wordMatching} />;
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Learning Games</h1>
          <p className="text-gray-600">Play fun games to improve your reading skills!</p>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className="bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-yellow-600 font-bold">⭐ {profile?.points || 0} Points</span>
            </div>
          </div>
        </div>

        {/* Game Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {gameTypes.map((game) => (
            <button
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              className={`p-4 rounded-2xl text-left transition-all ${
                currentGame === game.id
                  ? 'bg-blue-500 text-white transform scale-105 shadow-lg'
                  : 'bg-white hover:bg-blue-50 border-2 border-gray-100'
              }`}
            >
              <div className="text-3xl mb-2">{game.icon}</div>
              <h3 className="font-bold text-lg mb-1">{game.name}</h3>
              <p className="text-sm opacity-80">{game.description}</p>
            </button>
          ))}
        </div>

        {/* Game Area */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {gameTypes.find(g => g.id === currentGame)?.name}
            </h2>
          </div>
          
          {renderGame()}
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 rounded-2xl p-4">
          <h4 className="font-bold text-blue-800 mb-2">How to Play:</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            <li>• Listen carefully to the words and sounds</li>
            <li>• Take your time to think before answering</li>
            <li>• Earn points for correct answers</li>
            <li>• Practice speaking with the voice exercises</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default Games;