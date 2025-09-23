import { useState, useEffect } from 'react';
import Layout from '../components/common/Layout';
import { useProfile } from '../hooks/useProfile.jsx';

const Profile = () => {
  const { profile, updateProfile } = useProfile();
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('avatar1');

  const avatars = [
    { id: 'avatar1', emoji: '👦', name: 'Boy' },
    { id: 'avatar2', emoji: '👧', name: 'Girl' },
    { id: 'avatar3', emoji: '🧑', name: 'Kid' },
    { id: 'avatar4', emoji: '👦', name: 'Buddy' },
  ];

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setSelectedAvatar(profile.avatar || 'avatar1');
    }
  }, [profile]);

  const handleSave = () => {
    updateProfile({ name, avatar: selectedAvatar });
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Your Profile</h1>
        
        <div className="card space-y-6">
          {/* Avatar Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Choose Your Avatar</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {avatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => setSelectedAvatar(avatar.id)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    selectedAvatar === avatar.id
                      ? 'border-blue-500 bg-blue-50 scale-105'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{avatar.emoji}</div>
                  <div className="text-sm">{avatar.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg focus:border-blue-500 focus:outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="btn-primary w-full text-lg py-3"
          >
            Save Profile
          </button>

          {/* Stats */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold mb-3">Your Progress</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl">⭐</div>
                <div className="font-bold text-lg">{profile.points}</div>
                <div className="text-sm text-gray-600">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl">🏆</div>
                <div className="font-bold text-lg">{profile.badges.length}</div>
                <div className="text-sm text-gray-600">Badges</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;