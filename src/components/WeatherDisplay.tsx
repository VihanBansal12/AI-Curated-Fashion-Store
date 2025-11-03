'use client';

import { useState, useEffect } from 'react';
import { WeatherCondition, Season, ManualWeatherInput } from '@/types';

interface WeatherDisplayProps {
  onWeatherUpdate: (weather: ManualWeatherInput) => void;
}

const temperatureRanges = {
  cold: { label: 'Cold', range: '0-50°F', color: 'from-blue-400 to-blue-600' },
  cool: { label: 'Cool', range: '50-65°F', color: 'from-cyan-400 to-cyan-600' },
  mild: { label: 'Mild', range: '65-75°F', color: 'from-green-400 to-green-600' },
  warm: { label: 'Warm', range: '75-85°F', color: 'from-yellow-400 to-orange-500' },
  hot: { label: 'Hot', range: '85°F+', color: 'from-red-400 to-red-600' }
};

const weatherConditions: { value: WeatherCondition; label: string; icon: string; description: string }[] = [
  { value: 'sunny', label: 'Sunny', icon: '☀️', description: 'Clear skies and bright' },
  { value: 'cloudy', label: 'Cloudy', icon: '☁️', description: 'Overcast skies' },
  { value: 'rainy', label: 'Rainy', icon: '🌧️', description: 'Wet and possibly gray' },
  { value: 'snowy', label: 'Snowy', icon: '❄️', description: 'Cold and snowy' },
  { value: 'windy', label: 'Windy', icon: '💨', description: 'Breezy conditions' }
];

const seasons: { value: Season; label: string; icon: string; colors: string[] }[] = [
  { value: 'spring', label: 'Spring', icon: '🌸', colors: ['#FFB6C1', '#98FB98', '#87CEEB'] },
  { value: 'summer', label: 'Summer', icon: '☀️', colors: ['#FFD700', '#FF6347', '#00CED1'] },
  { value: 'fall', label: 'Fall', icon: '🍂', colors: ['#D2691E', '#FF8C00', '#8B4513'] },
  { value: 'winter', label: 'Winter', icon: '❄️', colors: ['#4682B4', '#708090', '#F0F8FF'] }
];

export default function WeatherDisplay({ onWeatherUpdate }: WeatherDisplayProps) {
  const [temperature, setTemperature] = useState<number>(70);
  const [condition, setCondition] = useState<WeatherCondition>('sunny');
  const [season, setSeason] = useState<Season>('spring');

  const getTemperatureCategory = (temp: number) => {
    if (temp < 50) return 'cold';
    if (temp < 65) return 'cool';
    if (temp < 75) return 'mild';
    if (temp < 85) return 'warm';
    return 'hot';
  };

  const tempCategory = temperatureRanges[getTemperatureCategory(temperature) as keyof typeof temperatureRanges];

  useEffect(() => {
    onWeatherUpdate({ temperature, condition, season });
  }, [temperature, condition, season, onWeatherUpdate]);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-title text-primary mb-3">What's the weather like?</h2>
        <p className="text-body text-ui-gray">
          Set the weather conditions to get the perfect outfit recommendations
        </p>
      </div>

      {/* Temperature Slider */}
      <div className="card">
        <h3 className="font-semibold text-primary mb-4">Temperature</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-body text-ui-gray">Current Temperature</span>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold bg-gradient-to-r ${tempCategory.color} bg-clip-text text-transparent`}>
                {temperature}°F
              </span>
              <span className="text-small text-ui-gray">({tempCategory.label})</span>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
          />

          <div className="flex justify-between text-small text-ui-gray">
            <span>0°F</span>
            <span>50°F</span>
            <span>75°F</span>
            <span>100°F</span>
          </div>
        </div>
      </div>

      {/* Weather Conditions */}
      <div className="card">
        <h3 className="font-semibold text-primary mb-4">Weather Condition</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {weatherConditions.map((weather) => (
            <div
              key={weather.value}
              onClick={() => setCondition(weather.value)}
              className={`mood-option p-3 text-center cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                condition === weather.value ? 'selected' : ''
              }`}
            >
              <div className="text-2xl mb-1">{weather.icon}</div>
              <div className="text-small font-medium text-primary">{weather.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Season Selection */}
      <div className="card">
        <h3 className="font-semibold text-primary mb-4">Season</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {seasons.map((seasonOption) => (
            <div
              key={seasonOption.value}
              onClick={() => setSeason(seasonOption.value)}
              className={`mood-option p-4 text-center cursor-pointer transform transition-all duration-200 hover:scale-105 ${
                season === seasonOption.value ? 'selected' : ''
              }`}
              style={{
                background: season === seasonOption.value
                  ? `linear-gradient(135deg, ${seasonOption.colors[0]}20, ${seasonOption.colors[1]}20)`
                  : 'transparent'
              }}
            >
              <div className="text-2xl mb-2">{seasonOption.icon}</div>
              <div className="text-small font-medium text-primary">{seasonOption.label}</div>

              {/* Season color indicators */}
              <div className="flex justify-center space-x-1 mt-2">
                {seasonOption.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Summary */}
      <div className={`weather-display text-center`}>
        <div className="flex items-center justify-center space-x-4">
          <span className="text-2xl">
            {weatherConditions.find(w => w.value === condition)?.icon}
          </span>
          <div>
            <div className="font-semibold text-primary">
              {tempCategory.label} and {weatherConditions.find(w => w.value === condition)?.label}
            </div>
            <div className="text-small text-ui-gray">
              {seasons.find(s => s.value === season)?.label} season • {temperature}°F
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}