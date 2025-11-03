export interface WeatherContext {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  hourlyForecast: Array<{
    temp: number;
    condition: string;
    time: string;
  }>;
  location: string;
}

export interface ManualWeatherInput {
  temperature: number;
  condition: WeatherCondition;
  season: Season;
}

export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface TemperatureRange {
  min: number;
  max: number;
  unit: 'F' | 'C';
}

export interface WeatherCategory {
  name: string;
  temperatureRange: TemperatureRange;
  clothingLayers: string[];
  recommendedFabrics: string[];
  styleTips: string[];
}