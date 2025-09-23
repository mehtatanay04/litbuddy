import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { useProfile } from '../hooks/useProfile.jsx';
import { badges } from '../utils/gameData';

const Rewards = () => {
  const { profile, updateProfile } = useProfile();
  const [selectedBackground, setSelectedBackground] = useState('default');

  const backgrounds = [
    { id: 'default', name: 'Default', color: 'bg-gradient-to-br from-blue-100 to-purple-100', price: 0 },
    { id: 'space', name: 'Space Adventure', color: 'bg-gradient-to-br from-purple-900 to-blue-900', price: 100 },
    { id: 'forest', name: 'Magic Forest', color: 'bg-gradient-to-br from-green-400 to-blue-500', price: 150 },
    { id: 'ocean', name: 'Ocean Explorer', color: 'bg-gradient-to-br from-blue-300 to-teal-400', price: 200 },
    { id: 'rainbow', name: 'Rainbow World', color: 'bg-gradient-to-br from-red-400 to-yellow-400', price: 300 },
  ];

  const avatars = [
    { id: 'avatar1', emoji: '👦', name: 'Boy', unlocked: true },
    { id: 'avatar2', emoji: '👧', name: 'Girl', unlocked: true },
    { id: 'avatar3', emoji: '🧑', name: 'Kid', unlocked: profile?.points >= 50 },
    { id: 'avatar4', emoji: '👦', name: 'Buddy', unlocked: profile?.points >= 100 },
    { id: 'avatar5', emoji: '🦸', name: 'Super Reader', unlocked: profile?.points >= 200 },
    { id: 'avatar6', emoji: '🧙', name: 'Word Wizard', unlocked: profile?.badges.includes('word_wizard') },
  ];

  useEffect(() => {
    if (profile?.background) {
      setSelectedBackground(profile.background);
    }
  }, [profile]);

  const unlockBackground = async (background) => {
    if (profile.points >= background.price) {
      await updateProfile({ 
        background: background.id,
        points: profile.points - background.price
      });
      setSelectedBackground(background.id);
    }
  };

  const changeAvatar = async (avatar) => {
    if (avatar.unlocked) {
      await updateProfile({ avatar: avatar.id });
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Rewards</h1>
          <p className="text-gray-600">Earn points and unlock amazing rewards!</p>
          <div className="flex items-center justify-center space-x-6 mt-4">
            <div className="bg-yellow-100 px-6 py-2 rounded-full">
              <span className="text-yellow-600 font-bold text-xl">⭐ {profile?.points || 0} Points</span>
            </div>
            <div className="bg-blue-100 px-6 py-2 rounded-full">
              <span className="text-blue-600 font-bold text-xl">🏆 {profile?.badges?.length || 0} Badges</span>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`text-center p-4 rounded-2xl transition-all ${
                  profile?.badges?.includes(badge.id)
                    ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-300 scale-105'
                    : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h3 className="font-bold mb-1">{badge.name}</h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
                {!profile?.badges?.includes(badge.id) && (
                  <div className="text-xs text-red-500 mt-1">Locked</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Avatar Selection */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Avatar</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {avatars.map((avatar) => (
              <button
                key={avatar.id}
                onClick={() => changeAvatar(avatar)}
                disabled={!avatar.unlocked}
                className={`p-4 rounded-2xl text-center transition-all ${
                  profile?.avatar === avatar.id
                    ? 'bg-blue-500 text-white scale-110 shadow-lg'
                    : avatar.unlocked
                    ? 'bg-white hover:bg-blue-50 border-2 border-gray-200'
                    : 'bg-gray-100 border-2 border-gray-200 opacity-50'
                }`}
              >
                <div className="text-4xl mb-2">{avatar.emoji}</div>
                <div className="font-semibold text-sm">{avatar.name}</div>
                {!avatar.unlocked && (
                  <div className="text-xs mt-1">🔒 {avatar.id === 'avatar5' ? '200 points' : 'Earn badge'}</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Background Themes */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6 text-center">Background Themes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {backgrounds.map((background) => (
              <div
                key={background.id}
                className={`rounded-2xl p-6 text-center transition-all ${
                  selectedBackground === background.id
                    ? 'ring-4 ring-blue-500 scale-105'
                    : 'bg-white shadow-md'
                }`}
              >
                <div className={`w-full h-24 rounded-lg mb-4 ${background.color}`}></div>
                <h3 className="font-bold mb-2">{background.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {background.price === 0 ? 'Free' : `${background.price} points`}
                </p>
                <button
                  onClick={() => background.price === 0 ? setSelectedBackground(background.id) : unlockBackground(background)}
                  disabled={background.price > 0 && profile?.points < background.price}
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedBackground === background.id
                      ? 'bg-green-500 text-white'
                      : background.price === 0 || (profile?.points >= background.price)
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-300 text-gray-500'
                  }`}
                >
                  {selectedBackground === background.id
                    ? 'Selected'
                    : background.price === 0
                    ? 'Select'
                    : profile?.points >= background.price
                    ? `Unlock for ${background.price} points`
                    : `Need ${background.price - (profile?.points || 0)} more points`
                  }
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl">📚</div>
            <div className="font-bold text-lg">{profile?.progress?.wordsLearned || 0}</div>
            <div className="text-sm text-gray-600">Words Learned</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl">🎮</div>
            <div className="font-bold text-lg">{profile?.progress?.gamesPlayed || 0}</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl">⭐</div>
            <div className="font-bold text-lg">{profile?.points || 0}</div>
            <div className="text-sm text-gray-600">Total Points</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-md">
            <div className="text-2xl">🏆</div>
            <div className="font-bold text-lg">{profile?.badges?.length || 0}</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Rewards;