'use client';

import { useState } from 'react';
import { Mood, EventType, ManualWeatherInput } from '@/types';
import MoodPicker from './MoodPicker';
import EventSelector from './EventSelector';
import WeatherDisplay from './WeatherDisplay';
import OutfitDisplay from './OutfitDisplay';

interface QuickInputProps {}

export default function QuickInput({}: QuickInputProps) {
  const [currentStep, setCurrentStep] = useState<'weather' | 'mood' | 'event' | 'results'>('weather');
  const [weather, setWeather] = useState<ManualWeatherInput | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood>();
  const [selectedEvent, setSelectedEvent] = useState<EventType>();

  const handleWeatherComplete = (weatherData: ManualWeatherInput) => {
    setWeather(weatherData);
    // Auto-advance to mood selection after a brief delay
    setTimeout(() => setCurrentStep('mood'), 500);
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    // Auto-advance to event selection after a brief delay
    setTimeout(() => setCurrentStep('event'), 500);
  };

  const handleEventSelect = (event: EventType) => {
    setSelectedEvent(event);
    // Auto-advance to results after a brief delay
    setTimeout(() => setCurrentStep('results'), 500);
  };

  const handleRestart = () => {
    setCurrentStep('weather');
    setWeather(null);
    setSelectedMood(undefined);
    setSelectedEvent(undefined);
  };

  const canProceedToMood = weather !== null;
  const canProceedToEvent = weather && selectedMood;
  const canShowResults = weather && selectedMood && selectedEvent;

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="flex justify-center items-center space-x-4 mb-8">
        {[
          { step: 'weather', label: 'Weather', completed: weather !== null },
          { step: 'mood', label: 'Mood', completed: selectedMood !== undefined },
          { step: 'event', label: 'Event', completed: selectedEvent !== undefined },
          { step: 'results', label: 'Your Style', completed: false }
        ].map((item, index) => (
          <div key={item.step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep === item.step
                  ? 'bg-accent text-white scale-110'
                  : item.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {item.completed ? '✓' : index + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep === item.step ? 'text-accent' :
              item.completed ? 'text-green-600' : 'text-gray-500'
            }`}>
              {item.label}
            </span>
            {index < 3 && (
              <div className={`w-8 h-0.5 mx-2 ${
                item.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] animate-fade-in">
        {currentStep === 'weather' && (
          <WeatherDisplay onWeatherUpdate={handleWeatherComplete} />
        )}

        {currentStep === 'mood' && (
          <MoodPicker selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
        )}

        {currentStep === 'event' && (
          <EventSelector selectedEvent={selectedEvent} onEventSelect={handleEventSelect} />
        )}

        {currentStep === 'results' && canShowResults && (
          <OutfitDisplay
            weather={weather!}
            mood={selectedMood!}
            eventType={selectedEvent!}
            onRestart={handleRestart}
          />
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <div>
          {currentStep !== 'weather' && currentStep !== 'results' && (
            <button
              onClick={() => {
                if (currentStep === 'mood') setCurrentStep('weather');
                if (currentStep === 'event') setCurrentStep('mood');
              }}
              className="btn-secondary"
            >
              ← Back
            </button>
          )}
        </div>

        <div className="text-center">
          {currentStep !== 'results' && (
            <p className="text-small text-ui-gray">
              {currentStep === 'weather' && 'Tell us about the weather conditions'}
              {currentStep === 'mood' && 'How are you feeling today?'}
              {currentStep === 'event' && 'What do you have planned?'}
            </p>
          )}
        </div>

        <div>
          {currentStep === 'weather' && canProceedToMood && (
            <button
              onClick={() => setCurrentStep('mood')}
              className="btn-primary"
            >
              Next →
            </button>
          )}
          {currentStep === 'mood' && canProceedToEvent && (
            <button
              onClick={() => setCurrentStep('event')}
              className="btn-primary"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Quick Summary */}
      {(weather || selectedMood || selectedEvent) && (
        <div className="bg-gray-50 rounded-lg p-4 text-center text-small text-ui-gray">
          <span className="font-medium">Your selections:</span>
          {weather && <span className="ml-2">🌤️ {weather.temperature}°F {weather.condition}</span>}
          {selectedMood && <span className="ml-2">😊 {selectedMood}</span>}
          {selectedEvent && <span className="ml-2">📅 {selectedEvent.replace('-', ' ')}</span>}
        </div>
      )}
    </div>
  );
}