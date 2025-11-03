import { WeatherContext, Mood, EventType } from './index';

export interface OutfitItem {
  id: string;
  name: string;
  description: string;
  reason: string;
  weatherAppropriate: boolean;
  category: 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory';
  color: string;
  imageUrl?: string;
  brand?: string;
  priceRange?: string;
}

export interface Outfit {
  id: string;
  primaryItems: OutfitItem[];
  accessories: OutfitItem[];
  colorPalette: string[];
  styleVibe: string;
  confidenceScore: number;
  detailedReasoning: string;
  weatherContext: WeatherContext;
  mood: Mood;
  eventType: EventType;
  createdAt: Date;
}

export interface OutfitAlternatives {
  similarVibe: Array<{
    name: string;
    reason: string;
  }>;
  differentApproach: Array<{
    name: string;
    reason: string;
  }>;
}

export interface SavedOutfit extends Outfit {
  savedAt: Date;
  userId?: string;
  tags: string[];
  notes?: string;
}