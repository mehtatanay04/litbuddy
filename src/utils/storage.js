import localforage from 'localforage';

// Configure localForage
localforage.config({
  name: 'LitBuddy',
  version: 1.0,
  storeName: 'litbuddy_data'
});

export const storage = {
  // Profile data
  async saveProfile(profile) {
    await localforage.setItem('userProfile', profile);
  },

  async getProfile() {
    return await localforage.getItem('userProfile') || {
      avatar: 'avatar1',
      name: 'Buddy',
      points: 0,
      badges: [],
      progress: {}
    };
  },

  // Progress data
  async saveProgress(module, data) {
    const profile = await this.getProfile();
    profile.progress[module] = { ...profile.progress[module], ...data };
    await this.saveProfile(profile);
  },

  async addPoints(points) {
    const profile = await this.getProfile();
    profile.points += points;
    await this.saveProfile(profile);
    return profile.points;
  },

  async addBadge(badge) {
    const profile = await this.getProfile();
    if (!profile.badges.includes(badge)) {
      profile.badges.push(badge);
      await this.saveProfile(profile);
    }
  }
};