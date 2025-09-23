import { useState, useEffect, createContext, useContext } from 'react';
import { storage } from '../utils/storage';

const ProfileContext = createContext();

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userProfile = await storage.getProfile();
      setProfile(userProfile);
    } catch (error) {
      console.error('Error loading profile:', error);
      // Set default profile if there's an error
      setProfile({
        avatar: 'avatar1',
        name: 'Buddy',
        points: 0,
        badges: [],
        progress: {
          wordsLearned: 0,
          gamesPlayed: 0,
          storiesRead: 0,
          modulesCompleted: 0
        },
        achievements: []
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    const updatedProfile = { ...profile, ...updates };
    setProfile(updatedProfile);
    await storage.saveProfile(updatedProfile);
  };

  const addPoints = async (points) => {
    const newPoints = (profile?.points || 0) + points;
    const updatedProfile = { 
      ...profile, 
      points: newPoints,
      progress: {
        ...profile.progress,
        gamesPlayed: (profile.progress.gamesPlayed || 0) + 1
      }
    };
    setProfile(updatedProfile);
    await storage.saveProfile(updatedProfile);
    
    // Check for achievements based on points
    checkAchievements(newPoints);
    
    return newPoints;
  };

  const addBadge = async (badgeId) => {
    const currentBadges = profile?.badges || [];
    if (!currentBadges.includes(badgeId)) {
      const newBadges = [...currentBadges, badgeId];
      const updatedProfile = { ...profile, badges: newBadges };
      setProfile(updatedProfile);
      await storage.saveProfile(updatedProfile);
    }
  };

  const recordProgress = async (type, data) => {
    const progressUpdate = { ...profile.progress };
    
    switch (type) {
      case 'wordLearned':
        progressUpdate.wordsLearned = (progressUpdate.wordsLearned || 0) + 1;
        break;
      case 'storyRead':
        progressUpdate.storiesRead = (progressUpdate.storiesRead || 0) + 1;
        break;
      case 'moduleCompleted':
        progressUpdate.modulesCompleted = (progressUpdate.modulesCompleted || 0) + 1;
        break;
      default:
        break;
    }
    
    const updatedProfile = { ...profile, progress: progressUpdate };
    setProfile(updatedProfile);
    await storage.saveProfile(updatedProfile);
    
    checkAchievements(updatedProfile.points, progressUpdate);
  };

  const checkAchievements = (points, progress = profile.progress) => {
    const achievements = [];
    
    if (points >= 50 && !profile.badges.includes('alphabet_hero')) {
      achievements.push('alphabet_hero');
    }
    if (points >= 100 && !profile.badges.includes('word_wizard')) {
      achievements.push('word_wizard');
    }
    if (points >= 200 && !profile.badges.includes('game_champion')) {
      achievements.push('game_champion');
    }
    if ((progress.storiesRead >= 3) && !profile.badges.includes('story_star')) {
      achievements.push('story_star');
    }
    
    // Add all achievements
    achievements.forEach(badge => addBadge(badge));
  };

  const value = {
    profile,
    loading,
    updateProfile,
    addPoints,
    addBadge,
    recordProgress
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};