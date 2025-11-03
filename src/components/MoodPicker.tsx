'use client';

import { Mood, MoodOption } from '@/types';
import { useState } from 'react';

const moodOptions: MoodOption[] = [
  {
    value: 'energized',
    label: 'Energized',
    icon: '⚡',
    description: 'Ready to conquer the day',
    colors: ['#FF6B6B', '#FFE66D', '#FF6B9D']
  },
  {
    value: 'relaxed',
    label: 'Relaxed',
    icon: '🌙',
    description: 'Peaceful and comfortable',
    colors: ['#A8E6CF', '#DCEDC1', '#B4E7CE']
  },
  {
    value: 'bold',
    label: 'Bold',
    icon: '🔥',
    description: 'Confident and daring',
    colors: ['#FF0000', '#FFD700', '#FF1493']
  },
  {
    value: 'classic',
    label: 'Classic',
    icon: '✨',
    description: 'Timeless and elegant',
    colors: ['#2C3E50', '#34495E', '#7F8C8D']
  },
  {
    value: 'creative',
    label: 'Creative',
    icon: '🎨',
    description: 'Artistic and expressive',
    colors: ['#9B59B6', '#3498DB', '#E74C3C']
  },
  {
    value: 'professional',
    label: 'Professional',
    icon: '💼',
    description: 'Polished and competent',
    colors: ['#1C2833', '#34495E', '#566573']
  },
  {
    value: 'casual',
    label: 'Casual',
    icon: '☕',
    description: 'Easy-going and comfortable',
    colors: ['#95A5A6', '#BDC3C7', '#ECF0F1']
  },
  {
    value: 'romantic',
    label: 'Romantic',
    icon: '💕',
    description: 'Soft and lovely',
    colors: ['#FFB6C1', '#FFC0CB', '#FFE4E1']
  }
];

interface MoodPickerProps {
  selectedMood?: Mood;
  onMoodSelect: (mood: Mood) => void;
}

export default function MoodPicker({ selectedMood, onMoodSelect }: MoodPickerProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-title text-primary mb-3">How are you feeling today?</h2>
        <p className="text-body text-ui-gray">
          Select the mood that best describes your current emotional state
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moodOptions.map((mood) => (
          <div
            key={mood.value}
            onClick={() => onMoodSelect(mood.value)}
            className={`mood-option cursor-pointer transform transition-all duration-200 hover:scale-105 ${
              selectedMood === mood.value ? 'selected' : ''
            }`}
            style={{
              background: selectedMood === mood.value
                ? `linear-gradient(135deg, ${mood.colors[0]}20, ${mood.colors[1]}20)`
                : 'transparent'
            }}
          >
            <div className="text-3xl mb-2 text-center">{mood.icon}</div>
            <h3 className="font-semibold text-primary text-center mb-1">
              {mood.label}
            </h3>
            <p className="text-small text-ui-gray text-center">
              {mood.description}
            </p>

            {/* Color indicators */}
            <div className="flex justify-center space-x-1 mt-3">
              {mood.colors.map((color, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="text-center animate-fade-in">
          <p className="text-body text-primary">
            Great choice! {moodOptions.find(m => m.value === selectedMood)?.label} energy
            will help create the perfect outfit for you.
          </p>
        </div>
      )}
    </div>
  );
}