import { UserPreferences, UserProfile, SavedOutfit } from '@/types';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'fashionStore_userPreferences',
  USER_PROFILE: 'fashionStore_userProfile',
  SAVED_OUTFITS: 'fashionStore_savedOutfits',
  INTERACTION_HISTORY: 'fashionStore_interactionHistory',
  WARDROBE_TAGS: 'fashionStore_wardrobeTags'
} as const;

class StorageManager {
  // Generic methods
  private getFromStorage<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      return parsed;
    } catch (error) {
      console.error(`Error reading from localStorage for key ${key}:`, error);
      return null;
    }
  }

  private setToStorage<T>(key: string, data: T): boolean {
    if (typeof window === 'undefined') return false;

    try {
      const serialized = JSON.stringify(data);
      window.localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage for key ${key}:`, error);
      return false;
    }
  }

  private removeFromStorage(key: string): boolean {
    if (typeof window === 'undefined') return false;

    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage for key ${key}:`, error);
      return false;
    }
  }

  // User Preferences
  getUserPreferences(): UserPreferences | null {
    return this.getFromStorage<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES);
  }

  saveUserPreferences(preferences: UserPreferences): boolean {
    return this.setToStorage(STORAGE_KEYS.USER_PREFERENCES, preferences);
  }

  updateUserPreferences(updates: Partial<UserPreferences>): boolean {
    const current = this.getUserPreferences();
    if (!current) return false;

    const updated = { ...current, ...updates };
    return this.saveUserPreferences(updated);
  }

  // User Profile
  getUserProfile(): UserProfile | null {
    return this.getFromStorage<UserProfile>(STORAGE_KEYS.USER_PROFILE);
  }

  saveUserProfile(profile: UserProfile): boolean {
    return this.setToStorage(STORAGE_KEYS.USER_PROFILE, profile);
  }

  initializeUserProfile(): UserProfile {
    const existingProfile = this.getUserProfile();
    if (existingProfile) return existingProfile;

    const newProfile: UserProfile = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      preferences: {
        id: `prefs_${Date.now()}`,
        favoriteColors: [],
        preferredStyles: [],
        dislikedColors: [],
        brandPreferences: [],
        sizePreferences: {
          tops: 'M',
          bottoms: 'M',
          footwear: 'M'
        },
        climateZone: 'temperate',
        comfortLevel: 'moderate'
      },
      locationPermission: false,
      savedOutfits: [],
      interactionHistory: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.saveUserProfile(newProfile);
    this.saveUserPreferences(newProfile.preferences);

    return newProfile;
  }

  // Saved Outfits
  getSavedOutfits(): SavedOutfit[] {
    return this.getFromStorage<SavedOutfit[]>(STORAGE_KEYS.SAVED_OUTFITS) || [];
  }

  saveOutfit(outfit: SavedOutfit): boolean {
    const current = this.getSavedOutfits();
    const exists = current.some(o => o.id === outfit.id);

    if (exists) {
      // Update existing outfit
      const updated = current.map(o => o.id === outfit.id ? outfit : o);
      return this.setToStorage(STORAGE_KEYS.SAVED_OUTFITS, updated);
    } else {
      // Add new outfit
      const updated = [...current, outfit];
      return this.setToStorage(STORAGE_KEYS.SAVED_OUTFITS, updated);
    }
  }

  removeSavedOutfit(outfitId: string): boolean {
    const current = this.getSavedOutfits();
    const filtered = current.filter(o => o.id !== outfitId);
    return this.setToStorage(STORAGE_KEYS.SAVED_OUTFITS, filtered);
  }

  getSavedOutfitById(outfitId: string): SavedOutfit | null {
    const outfits = this.getSavedOutfits();
    return outfits.find(o => o.id === outfitId) || null;
  }

  getSavedOutfitsByTag(tag: string): SavedOutfit[] {
    const outfits = this.getSavedOutfits();
    return outfits.filter(o => o.tags.includes(tag));
  }

  // Interaction History
  getInteractionHistory(): any[] {
    return this.getFromStorage(STORAGE_KEYS.INTERACTION_HISTORY) || [];
  }

  addInteraction(interaction: any): boolean {
    const current = this.getInteractionHistory();
    const updated = [interaction, ...current].slice(0, 1000); // Keep last 1000 interactions
    return this.setToStorage(STORAGE_KEYS.INTERACTION_HISTORY, updated);
  }

  // Wardrobe Tags
  getWardrobeTags(): string[] {
    return this.getFromStorage(STORAGE_KEYS.WARDROBE_TAGS) || [];
  }

  addWardrobeTag(tag: string): boolean {
    const current = this.getWardrobeTags();
    if (!current.includes(tag)) {
      const updated = [...current, tag];
      return this.setToStorage(STORAGE_KEYS.WARDROBE_TAGS, updated);
    }
    return true;
  }

  removeWardrobeTag(tag: string): boolean {
    const current = this.getWardrobeTags();
    const filtered = current.filter(t => t !== tag);
    return this.setToStorage(STORAGE_KEYS.WARDROBE_TAGS, filtered);
  }

  // Analytics and Insights
  getOutfitStats() {
    const outfits = this.getSavedOutfits();
    const interactions = this.getInteractionHistory();

    return {
      totalOutfits: outfits.length,
      totalInteractions: interactions.length,
      averageOutfitScore: outfits.reduce((sum, o) => sum + o.confidenceScore, 0) / outfits.length || 0,
      favoriteMoods: this.getMostFrequentMoods(),
      favoriteEvents: this.getMostFrequentEvents(),
      favoriteColors: this.getMostFrequentColors(),
      outfitsSavedThisMonth: outfits.filter(o => {
        const outfitDate = new Date(o.savedAt);
        const now = new Date();
        return outfitDate.getMonth() === now.getMonth() &&
               outfitDate.getFullYear() === now.getFullYear();
      }).length
    };
  }

  private getMostFrequentMoods(): Array<{ mood: string; count: number }> {
    const outfits = this.getSavedOutfits();
    const moodCounts: Record<string, number> = {};

    outfits.forEach(outfit => {
      moodCounts[outfit.mood] = (moodCounts[outfit.mood] || 0) + 1;
    });

    return Object.entries(moodCounts)
      .map(([mood, count]) => ({ mood, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getMostFrequentEvents(): Array<{ event: string; count: number }> {
    const outfits = this.getSavedOutfits();
    const eventCounts: Record<string, number> = {};

    outfits.forEach(outfit => {
      eventCounts[outfit.eventType] = (eventCounts[outfit.eventType] || 0) + 1;
    });

    return Object.entries(eventCounts)
      .map(([event, count]) => ({ event, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  private getMostFrequentColors(): Array<{ color: string; count: number }> {
    const outfits = this.getSavedOutfits();
    const colorCounts: Record<string, number> = {};

    outfits.forEach(outfit => {
      outfit.colorPalette.forEach(color => {
        colorCounts[color] = (colorCounts[color] || 0) + 1;
      });
    });

    return Object.entries(colorCounts)
      .map(([color, count]) => ({ color, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  // Data Management
  exportUserData(): string {
    const userData = {
      profile: this.getUserProfile(),
      preferences: this.getUserPreferences(),
      savedOutfits: this.getSavedOutfits(),
      interactionHistory: this.getInteractionHistory(),
      wardrobeTags: this.getWardrobeTags(),
      exportDate: new Date().toISOString()
    };

    return JSON.stringify(userData, null, 2);
  }

  importUserData(jsonData: string): boolean {
    try {
      const userData = JSON.parse(jsonData);

      if (userData.profile) this.saveUserProfile(userData.profile);
      if (userData.preferences) this.saveUserPreferences(userData.preferences);
      if (userData.savedOutfits) this.setToStorage(STORAGE_KEYS.SAVED_OUTFITS, userData.savedOutfits);
      if (userData.interactionHistory) this.setToStorage(STORAGE_KEYS.INTERACTION_HISTORY, userData.interactionHistory);
      if (userData.wardrobeTags) this.setToStorage(STORAGE_KEYS.WARDROBE_TAGS, userData.wardrobeTags);

      return true;
    } catch (error) {
      console.error('Error importing user data:', error);
      return false;
    }
  }

  clearAllData(): boolean {
    const success = Object.values(STORAGE_KEYS).every(key => this.removeFromStorage(key));
    return success;
  }

  // Storage info
  getStorageInfo() {
    let totalSize = 0;
    const details: Record<string, number> = {};

    Object.values(STORAGE_KEYS).forEach(key => {
      const item = window.localStorage.getItem(key);
      const size = item ? new Blob([item]).size : 0;
      details[key] = size;
      totalSize += size;
    });

    return {
      totalSize,
      details,
      totalSizeFormatted: `${(totalSize / 1024).toFixed(2)} KB`,
      itemCounts: {
        savedOutfits: this.getSavedOutfits().length,
        interactions: this.getInteractionHistory().length,
        tags: this.getWardrobeTags().length
      }
    };
  }
}

export const storage = new StorageManager();
export default StorageManager;