export type Mood =
  | 'energized'
  | 'relaxed'
  | 'bold'
  | 'classic'
  | 'creative'
  | 'professional'
  | 'casual'
  | 'romantic';

export type EventType =
  | 'work'
  | 'date-night'
  | 'casual-outing'
  | 'special-event'
  | 'travel'
  | 'fitness';

export interface UserPreferences {
  id: string;
  favoriteColors: string[];
  preferredStyles: string[];
  dislikedColors: string[];
  brandPreferences: string[];
  sizePreferences: {
    tops: string;
    bottoms: string;
    footwear: string;
  };
  climateZone: 'hot' | 'temperate' | 'cold';
  comfortLevel: 'minimal' | 'moderate' | 'layered';
}

export interface UserProfile {
  id: string;
  email?: string;
  preferences: UserPreferences;
  locationPermission: boolean;
  savedOutfits: string[]; // Outfit IDs
  interactionHistory: UserInteraction[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInteraction {
  id: string;
  type: 'outfit_generated' | 'outfit_saved' | 'outfit_shared' | 'item_clicked';
  outfitId?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}