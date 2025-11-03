import { Mood, EventType, ManualWeatherInput, Outfit, OutfitItem, WeatherCondition, Season } from '@/types';
import { additionalFashionRules } from '@/data/fashionRules';

interface FashionRule {
  id: string;
  mood: Mood;
  event: EventType;
  temperature: number;
  condition: WeatherCondition;
  season: Season;
  outfit: {
    primaryItems: Partial<OutfitItem>[];
    accessories: Partial<OutfitItem>[];
    styleVibe: string;
    colorPalette: string[];
    reasoning: string;
  };
}

// Curated fashion rules database
const fashionRules: FashionRule[] = [
  // Energized + Work
  {
    id: 'energized-work-hot-sunny-summer',
    mood: 'energized',
    event: 'work',
    temperature: 85,
    condition: 'sunny',
    season: 'summer',
    outfit: {
      primaryItems: [
        {
          name: 'Lightweight Blazer',
          description: 'Breathable linen blazer in navy',
          reason: 'Professional yet breathable for hot weather',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#2C3E50'
        },
        {
          name: 'Performance Dress Shirt',
          description: 'Moisture-wicking dress shirt',
          reason: 'Keeps you cool and professional',
          weatherAppropriate: true,
          category: 'top',
          color: '#FFFFFF'
        },
        {
          name: 'Chino Trousers',
          description: 'Lightweight cotton chinos',
          reason: 'Comfortable for all-day wear',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#F4E4C1'
        },
        {
          name: 'Loafers',
          description: 'Breathable leather loafers',
          reason: 'Professional without socks in hot weather',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#8B4513'
        }
      ],
      accessories: [
        {
          name: 'Leather Belt',
          description: 'Matching leather belt',
          reason: 'Completes the professional look',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#8B4513'
        },
        {
          name: 'Minimal Watch',
          description: 'Simple leather strap watch',
          reason: 'Professional accessory without bulk',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#2C3E50'
        }
      ],
      styleVibe: 'Sharp professional with summer comfort',
      colorPalette: ['#2C3E50', '#FFFFFF', '#F4E4C1', '#8B4513'],
      reasoning: 'Your energized mood calls for sharp, professional attire that won\'t weigh you down in the heat. This combination keeps you looking polished while staying comfortable.'
    }
  },

  // Relaxed + Casual Outing
  {
    id: 'relaxed-casual-mild-cloudy-spring',
    mood: 'relaxed',
    event: 'casual-outing',
    temperature: 70,
    condition: 'cloudy',
    season: 'spring',
    outfit: {
      primaryItems: [
        {
          name: 'Relaxed Fit Henley',
          description: 'Soft cotton henley shirt',
          reason: 'Comfortable and effortlessly stylish',
          weatherAppropriate: true,
          category: 'top',
          color: '#98FB98'
        },
        {
          name: 'Stretch Jeans',
          description: 'Comfortable stretch denim',
          reason: 'Perfect for casual activities',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#4682B4'
        },
        {
          name: 'Canvas Sneakers',
          description: 'Classic white canvas sneakers',
          reason: 'Versatile and comfortable for walking',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#FFFFFF'
        }
      ],
      accessories: [
        {
          name: 'Canvas Baseball Cap',
          description: 'Relaxed baseball cap',
          reason: 'Casual accessory for outdoor activities',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#708090'
        }
      ],
      styleVibe: 'Effortlessly casual and comfortable',
      colorPalette: ['#98FB98', '#4682B4', '#FFFFFF', '#708090'],
      reasoning: 'Your relaxed mood pairs perfectly with comfortable, casual pieces that allow for easy movement while maintaining a put-together appearance.'
    }
  },

  // Bold + Date Night
  {
    id: 'bold-date-night-warm-sunny-summer',
    mood: 'bold',
    event: 'date-night',
    temperature: 75,
    condition: 'sunny',
    season: 'summer',
    outfit: {
      primaryItems: [
        {
          name: 'Statement Blazer',
          description: 'Bold colored blazer in burgundy',
          reason: 'Makes a confident first impression',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#800020'
        },
        {
          name: 'Premium T-shirt',
          description: 'High-quality black tee',
          reason: 'Simple base that lets the blazer shine',
          weatherAppropriate: true,
          category: 'top',
          color: '#1C1C1C'
        },
        {
          name: 'Slim Fit Chinos',
          description: 'Well-tailored chinos',
          reason: 'Modern silhouette that\'s dressy but comfortable',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#2F4F4F'
        },
        {
          name: 'Chelsea Boots',
          description: 'Sleek leather Chelsea boots',
          reason: 'Elevated footwear choice for evening',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#1C1C1C'
        }
      ],
      accessories: [
        {
          name: 'Statement Watch',
          description: 'Bold watch with metal bracelet',
          reason: 'Confidence-boosting accessory',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#C0C0C0'
        },
        {
          name: 'Leather Bracelet',
          description: 'Subtle leather accent bracelet',
          reason: 'Adds personal style without overwhelming',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#8B4513'
        }
      ],
      styleVibe: 'Confident and romantic with modern edge',
      colorPalette: ['#800020', '#1C1C1C', '#2F4F4F', '#C0C0C0'],
      reasoning: 'Your bold personality deserves an outfit that makes a statement. This combination projects confidence while maintaining the romantic atmosphere perfect for a date night.'
    }
  },

  // Classic + Special Event
  {
    id: 'classic-special-event-mild-cloudy-fall',
    mood: 'classic',
    event: 'special-event',
    temperature: 65,
    condition: 'cloudy',
    season: 'fall',
    outfit: {
      primaryItems: [
        {
          name: 'Timeless Wool Blazer',
          description: 'Classic navy wool blazer',
          reason: 'Eternal style that never goes out of fashion',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#1C2833'
        },
        {
          name: 'Crisp Dress Shirt',
          description: 'White cotton dress shirt',
          reason: 'The foundation of classic formal wear',
          weatherAppropriate: true,
          category: 'top',
          color: '#FFFFFF'
        },
        {
          name: 'Wool Dress Trousers',
          description: 'Perfectly tailored wool trousers',
          reason: 'Classic silhouette for formal occasions',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#2C3E50'
        },
        {
          name: 'Oxford Shoes',
          description: 'Quality leather Oxford shoes',
          reason: 'The pinnacle of classic formal footwear',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#1C1C1C'
        }
      ],
      accessories: [
        {
          name: 'Silk Tie',
          description: 'Elegant silk tie in subtle pattern',
          reason: 'Adds sophistication without being flashy',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#8B4513'
        },
        {
          name: 'Pocket Square',
          description: 'White linen pocket square',
          reason: 'Classic detail that shows attention to style',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#FFFFFF'
        },
        {
          name: 'Leather Belt',
          description: 'High-quality leather belt',
          reason: 'Essential classic accessory',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#1C1C1C'
        }
      ],
      styleVibe: 'Timeless elegance and sophisticated formal',
      colorPalette: ['#1C2833', '#FFFFFF', '#2C3E50', '#8B4513'],
      reasoning: 'Your classic taste calls for timeless pieces that have defined elegance for generations. This outfit embodies traditional formal wear with impeccable fit and quality.'
    }
  },

  // Creative + Casual Outing
  {
    id: 'creative-casual-mild-sunny-spring',
    mood: 'creative',
    event: 'casual-outing',
    temperature: 70,
    condition: 'sunny',
    season: 'spring',
    outfit: {
      primaryItems: [
        {
          name: 'Artistic Print Shirt',
          description: 'Unique pattern button-down shirt',
          reason: 'Expresses creativity while remaining wearable',
          weatherAppropriate: true,
          category: 'top',
          color: '#9B59B6'
        },
        {
          name: 'Colored Chinos',
          description: 'Comfortable chinos in unique color',
          reason: 'Adds personality while staying casual',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#3498DB'
        },
        {
          name: 'Fashion Sneakers',
          description: 'Stylish sneakers with design details',
          reason: 'Creative footwear that\'s still comfortable',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#E74C3C'
        }
      ],
      accessories: [
        {
          name: 'Statement Socks',
          description: 'Colorful patterned socks',
          reason: 'Hidden detail that shows personality',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#F39C12'
        },
        {
          name: 'Unique Watch',
          description: 'Watch with interesting design',
          reason: 'Functional accessory that expresses creativity',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#16A085'
        }
      ],
      styleVibe: 'Artistically expressive and uniquely personal',
      colorPalette: ['#9B59B6', '#3498DB', '#E74C3C', '#F39C12'],
      reasoning: 'Your creative spirit deserves an outfit that stands out from the crowd. These pieces allow for self-expression while maintaining comfort and wearability.'
    }
  }
];

class AIStylist {
  private generateOutfitId(): string {
    return `outfit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private calculateTemperatureScore(ruleTemp: number, userTemp: number): number {
    const difference = Math.abs(ruleTemp - userTemp);
    if (difference <= 5) return 1.0;
    if (difference <= 10) return 0.8;
    if (difference <= 15) return 0.6;
    if (difference <= 20) return 0.4;
    return 0.2;
  }

  private findBestRule(mood: Mood, event: EventType, weather: ManualWeatherInput): FashionRule | null {
    let bestRule: FashionRule | null = null;
    let bestScore = 0;

    for (const rule of fashionRules) {
      let score = 0;

      // Exact matches get highest scores
      if (rule.mood === mood) score += 30;
      if (rule.event === event) score += 30;
      if (rule.condition === weather.condition) score += 20;
      if (rule.season === weather.season) score += 15;

      // Temperature similarity
      score += calculateTemperatureScore(rule.temperature, weather.temperature) * 5;

      if (score > bestScore) {
        bestScore = score;
        bestRule = rule;
      }
    }

    return bestRule;
  }

  private adaptRuleToWeather(rule: FashionRule, weather: ManualWeatherInput): FashionRule {
    const adapted = { ...rule };

    // Adjust for extreme temperatures
    if (weather.temperature < 40) {
      // Add layering for cold weather
      adapted.outfit.primaryItems = [
        {
          name: 'Thermal Base Layer',
          description: 'Lightweight thermal shirt',
          reason: 'Essential warmth in cold conditions',
          weatherAppropriate: true,
          category: 'top',
          color: '#FFFFFF'
        },
        ...adapted.outfit.primaryItems
      ];
    } else if (weather.temperature > 85) {
      // Remove heavy layers for hot weather
      adapted.outfit.primaryItems = adapted.outfit.primaryItems.filter(
        item => item.category !== 'outerwear' || (item.name && (item.name.includes('Lightweight') || item.name.includes('Linen')))
      );
    }

    // Adjust for rain
    if (weather.condition === 'rainy') {
      adapted.outfit.primaryItems = [
        ...adapted.outfit.primaryItems.filter(item => item.category !== 'footwear'),
        {
          name: 'Waterproof Boots',
          description: 'Stylish waterproof leather boots',
          reason: 'Keeps feet dry in wet conditions',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#2C3E50'
        }
      ];
    }

    return adapted;
  }

  private createOutfitItems(items: Partial<OutfitItem>[]): OutfitItem[] {
    return items.map((item, index) => ({
      id: `item_${index}_${Date.now()}`,
      name: item.name || 'Unnamed Item',
      description: item.description || 'A stylish clothing item',
      reason: item.reason || 'Perfect for this outfit',
      weatherAppropriate: item.weatherAppropriate ?? true,
      category: item.category || 'top',
      color: item.color || '#000000',
      imageUrl: `https://images.unsplash.com/photo-1594930102821-aea48c5b2c1d?w=400&h=400&fit=crop&auto=format&${item.name || 'fashion'}`,
      brand: 'Premium Fashion House',
      priceRange: '$80-200'
    }));
  }

  async generateOutfit(
    mood: Mood,
    eventType: EventType,
    weather: ManualWeatherInput
  ): Promise<Outfit> {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const bestRule = this.findBestRule(mood, eventType, weather);

    if (!bestRule) {
      // Fallback to a generic outfit if no rule matches
      return this.generateFallbackOutfit(mood, eventType, weather);
    }

    const adaptedRule = this.adaptRuleToWeather(bestRule, weather);

    const outfit: Outfit = {
      id: this.generateOutfitId(),
      primaryItems: this.createOutfitItems(adaptedRule.outfit.primaryItems),
      accessories: this.createOutfitItems(adaptedRule.outfit.accessories),
      colorPalette: adaptedRule.outfit.colorPalette,
      styleVibe: adaptedRule.outfit.styleVibe,
      confidenceScore: 85 + Math.floor(Math.random() * 15), // 85-99% confidence
      detailedReasoning: adaptedRule.outfit.reasoning,
      weatherContext: {
        temperature: weather.temperature,
        condition: weather.condition,
        humidity: 50 + Math.floor(Math.random() * 40), // Simulated humidity
        windSpeed: Math.floor(Math.random() * 20), // Simulated wind speed
        feelsLike: weather.temperature + Math.floor(Math.random() * 10) - 5,
        hourlyForecast: [],
        location: 'Current Location'
      },
      mood,
      eventType,
      createdAt: new Date()
    };

    return outfit;
  }

  private generateFallbackOutfit(
    mood: Mood,
    eventType: EventType,
    weather: ManualWeatherInput
  ): Outfit {
    const fallbackItems: Partial<OutfitItem>[] = [
      {
        name: 'Classic T-Shirt',
        description: 'Versatile cotton t-shirt',
        reason: 'A wardrobe staple that works for any occasion',
        weatherAppropriate: weather.temperature > 50 && weather.temperature < 85,
        category: 'top',
        color: '#FFFFFF'
      },
      {
        name: 'Comfortable Jeans',
        description: 'Classic fit denim jeans',
        reason: 'Timeless style that adapts to any situation',
        weatherAppropriate: weather.temperature > 40,
        category: 'bottom',
        color: '#4682B4'
      },
      {
        name: 'Casual Sneakers',
        description: 'Comfortable everyday sneakers',
        reason: 'Perfect for walking and all-day comfort',
        weatherAppropriate: weather.condition !== 'rainy' && weather.condition !== 'snowy',
        category: 'footwear',
        color: '#FFFFFF'
      }
    ];

    const outfit: Outfit = {
      id: this.generateOutfitId(),
      primaryItems: this.createOutfitItems(fallbackItems),
      accessories: this.createOutfitItems([
        {
          name: 'Simple Watch',
          description: 'Classic timepiece',
          reason: 'Functional and stylish accessory',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#2C3E50'
        }
      ]),
      colorPalette: ['#FFFFFF', '#4682B4', '#2C3E50', '#F4E4C1'],
      styleVibe: 'Classic casual comfort',
      confidenceScore: 70, // Lower confidence for fallback
      detailedReasoning: `Created a versatile outfit that works for your ${mood} mood during ${eventType} in ${weather.condition} ${weather.temperature}°F weather.`,
      weatherContext: {
        temperature: weather.temperature,
        condition: weather.condition,
        humidity: 60,
        windSpeed: 10,
        feelsLike: weather.temperature,
        hourlyForecast: [],
        location: 'Current Location'
      },
      mood,
      eventType,
      createdAt: new Date()
    };

    return outfit;
  }
}

// Helper function for temperature scoring
function calculateTemperatureScore(ruleTemp: number, userTemp: number): number {
  const difference = Math.abs(ruleTemp - userTemp);
  if (difference <= 5) return 1.0;
  if (difference <= 10) return 0.8;
  if (difference <= 15) return 0.6;
  if (difference <= 20) return 0.4;
  return 0.2;
}

export const aiStylist = new AIStylist();
export default AIStylist;