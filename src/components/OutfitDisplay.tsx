'use client';

import { useState, useEffect } from 'react';
import { Outfit, ManualWeatherInput, Mood, EventType } from '@/types';
import { aiStylist } from '@/services/aiStylist';
import VirtualWardrobe from './VirtualWardrobe';
import ShoppingView from './ShoppingView';

interface OutfitDisplayProps {
  weather: ManualWeatherInput;
  mood: Mood;
  eventType: EventType;
  onRestart: () => void;
}

export default function OutfitDisplay({ weather, mood, eventType, onRestart }: OutfitDisplayProps) {
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'outfit' | 'wardrobe' | 'shopping'>('outfit');

  useEffect(() => {
    const generateOutfit = async () => {
      setIsLoading(true);
      try {
        const generatedOutfit = await aiStylist.generateOutfit(mood, eventType, weather);
        setOutfit(generatedOutfit);
      } catch (error) {
        console.error('Error generating outfit:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generateOutfit();
  }, [mood, eventType, weather]);

  const handleSaveOutfit = () => {
    if (outfit) {
      // Save to local storage
      const savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
      savedOutfits.push({ ...outfit, savedAt: new Date().toISOString() });
      localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));

      setCurrentView('wardrobe');
    }
  };

  const handleRegenerateOutfit = () => {
    setIsLoading(true);
    generateOutfit();
  };

  const generateOutfit = async () => {
    try {
      const generatedOutfit = await aiStylist.generateOutfit(mood, eventType, weather);
      setOutfit(generatedOutfit);
    } catch (error) {
      console.error('Error regenerating outfit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-pulse-soft">
        <div className="text-6xl mb-6">🤖</div>
        <h2 className="text-title text-primary mb-4">Creating Your Perfect Look</h2>
        <p className="text-body text-ui-gray text-center max-w-md">
          Our AI stylist is analyzing your mood, the weather, and your plans to create the perfect outfit just for you...
        </p>
        <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent to-primary animate-slide-up" />
        </div>
      </div>
    );
  }

  if (!outfit) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-ui-gray mb-6">
          Sorry, we couldn\'t generate an outfit. Please try again.
        </p>
        <button onClick={handleRegenerateOutfit} className="btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  if (currentView === 'wardrobe') {
    return <VirtualWardrobe onBack={() => setCurrentView('outfit')} />;
  }

  if (currentView === 'shopping') {
    return <ShoppingView outfit={outfit} onBack={() => setCurrentView('outfit')} />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-title text-primary mb-3">Your Perfect Outfit</h2>
        <div className="flex items-center justify-center space-x-4 text-body text-ui-gray mb-4">
          <span>🌡️ {weather.temperature}°F {weather.condition}</span>
          <span>•</span>
          <span>😊 {mood}</span>
          <span>•</span>
          <span>📅 {eventType.replace('-', ' ')}</span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-small text-ui-gray">
              {outfit.confidenceScore}% Match
            </span>
          </div>
          <span className="text-small text-accent font-medium">
            {outfit.styleVibe}
          </span>
        </div>
      </div>

      {/* Main Outfit Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Outfit Visual */}
        <div className="outfit-card">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">👔</div>
              <p className="text-body text-ui-gray">3D Model Coming Soon</p>
            </div>
          </div>

          {/* Color Palette */}
          <div className="p-4 border-t border-gray-100">
            <h4 className="font-semibold text-primary mb-3">Color Palette</h4>
            <div className="flex space-x-2">
              {outfit.colorPalette.map((color, index) => (
                <div key={index} className="flex-1">
                  <div
                    className="h-12 rounded-lg border border-gray-200"
                    style={{ backgroundColor: color }}
                  />
                  <p className="text-xs text-center mt-1 text-ui-gray">{color}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Outfit Details */}
        <div className="space-y-6">
          {/* AI Reasoning */}
          <div className="card">
            <h3 className="font-semibold text-primary mb-3">Why This Outfit Works</h3>
            <p className="text-body text-ui-gray leading-relaxed">
              {outfit.detailedReasoning}
            </p>
          </div>

          {/* Primary Items */}
          <div className="card">
            <h3 className="font-semibold text-primary mb-4">Main Pieces</h3>
            <div className="space-y-3">
              {outfit.primaryItems.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div
                    className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-primary">{item.name}</h4>
                    <p className="text-small text-ui-gray mb-1">{item.description}</p>
                    <p className="text-small text-accent">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          {outfit.accessories.length > 0 && (
            <div className="card">
              <h3 className="font-semibold text-primary mb-4">Finishing Touches</h3>
              <div className="space-y-3">
                {outfit.accessories.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-primary">{item.name}</h4>
                      <p className="text-small text-ui-gray mb-1">{item.description}</p>
                      <p className="text-small text-accent">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={handleSaveOutfit} className="btn-accent">
          💾 Save to Wardrobe
        </button>
        <button onClick={() => setCurrentView('shopping')} className="btn-primary">
          🛍️ Shop This Look
        </button>
        <button onClick={handleRegenerateOutfit} className="btn-secondary">
          🔄 Generate Different Look
        </button>
        <button onClick={onRestart} className="btn-secondary">
          🔄 Start Over
        </button>
      </div>

      {/* Weather Adaptation Notice */}
      <div className="weather-display text-center">
        <p className="text-body text-primary">
          This outfit is perfectly adapted for {weather.condition} weather at {weather.temperature}°F
          during {weather.season}. Every piece is chosen for both style and weather-appropriate comfort.
        </p>
      </div>
    </div>
  );
}