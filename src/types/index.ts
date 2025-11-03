export * from './outfit';
export * from './weather';
export * from './user';

// Common utility types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
}

// Component props types
export interface MoodOption {
  value: Mood;
  label: string;
  icon: string;
  description: string;
  colors: string[];
}

export interface EventOption {
  value: EventType;
  label: string;
  description: string;
  dressCode: string;
}

// Import types for reference
import type { Mood, EventType } from './user';