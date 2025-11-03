import { FashionRule } from '@/services/aiStylist';

export const additionalFashionRules: FashionRule[] = [
  // Romantic + Date Night
  {
    id: 'romantic-date-night-mild-sunny-spring',
    mood: 'romantic',
    event: 'date-night',
    temperature: 70,
    condition: 'sunny',
    season: 'spring',
    outfit: {
      primaryItems: [
        {
          name: 'Floral Blouse',
          description: 'Delicate floral print silk blouse',
          reason: 'Romantic and feminine for a special evening',
          weatherAppropriate: true,
          category: 'top',
          color: '#FFB6C1'
        },
        {
          name: 'A-line Skirt',
          description: 'Elegant midi skirt in soft fabric',
          reason: 'Flattering silhouette that moves beautifully',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#E6E6FA'
        },
        {
          name: 'Delicate Heels',
          description: 'Strappy heels in neutral tone',
          reason: 'Elevates the romantic look',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#F5DEB3'
        }
      ],
      accessories: [
        {
          name: 'Statement Necklace',
          description: 'Delicate gold pendant necklace',
          reason: 'Adds romantic sparkle without overwhelming',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#FFD700'
        },
        {
          name: 'Clutch Purse',
          description: 'Elegant evening clutch',
          reason: 'Perfect size for evening essentials',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#8B4513'
        }
      ],
      styleVibe: 'Romantic elegance with feminine grace',
      colorPalette: ['#FFB6C1', '#E6E6FA', '#F5DEB3', '#FFD700'],
      reasoning: 'Your romantic mood calls for soft, feminine pieces that create an elegant and enchanting atmosphere perfect for a special date night.'
    }
  },

  // Professional + Work (Cold Weather)
  {
    id: 'professional-work-cold-snowy-winter',
    mood: 'professional',
    event: 'work',
    temperature: 35,
    condition: 'snowy',
    season: 'winter',
    outfit: {
      primaryItems: [
        {
          name: 'Wool Overcoat',
          description: 'Classic wool overcoat in charcoal',
          reason: 'Essential protection from cold while maintaining professionalism',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#36454F'
        },
        {
          name: 'Cashmere Sweater',
          description: 'Luxurious cashmere crewneck sweater',
          reason: 'Warm and sophisticated base layer',
          weatherAppropriate: true,
          category: 'top',
          color: '#2F4F4F'
        },
        {
          name: 'Wool Dress Pants',
          description: 'Tailored wool trousers in dark gray',
          reason: 'Professional and warm for cold weather',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#2C3E50'
        },
        {
          name: 'Leather Dress Boots',
          description: 'Waterproof leather dress boots',
          reason: 'Professional footwear suitable for snow',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#1C1C1C'
        }
      ],
      accessories: [
        {
          name: 'Leather Gloves',
          description: 'Classic leather dress gloves',
          reason: 'Essential for cold weather commuting',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#1C1C1C'
        },
        {
          name: 'Wool Scarf',
          description: 'Merino wool scarf in neutral tone',
          reason: 'Adds warmth and professional polish',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#708090'
        }
      ],
      styleVibe: 'Professional polish with winter functionality',
      colorPalette: ['#36454F', '#2F4F4F', '#2C3E50', '#708090'],
      reasoning: 'Cold, snowy weather requires professional attire that prioritizes warmth without sacrificing sophistication. These pieces create a polished look while protecting you from the elements.'
    }
  },

  // Casual + Fitness
  {
    id: 'casual-fitness-warm-sunny-summer',
    mood: 'casual',
    event: 'fitness',
    temperature: 80,
    condition: 'sunny',
    season: 'summer',
    outfit: {
      primaryItems: [
        {
          name: 'Performance Tank Top',
          description: 'Moisture-wicking athletic tank',
          reason: 'Keeps you cool and dry during workout',
          weatherAppropriate: true,
          category: 'top',
          color: '#00CED1'
        },
        {
          name: 'Athletic Shorts',
          description: 'Lightweight performance shorts',
          reason: 'Maximum freedom of movement',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#1E90FF'
        },
        {
          name: 'Running Shoes',
          description: 'Supportive athletic sneakers',
          reason: 'Essential for workout performance and safety',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#FFFFFF'
        }
      ],
      accessories: [
        {
          name: 'Sports Watch',
          description: 'Digital fitness tracker watch',
          reason: 'Monitors workout performance',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#1C1C1C'
        },
        {
          name: 'Athletic Socks',
          description: 'Moisture-wicking athletic socks',
          reason: 'Prevents blisters and keeps feet dry',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#FFFFFF'
        }
      ],
      styleVibe: 'Functional athletic performance',
      colorPalette: ['#00CED1', '#1E90FF', '#FFFFFF', '#1C1C1C'],
      reasoning: 'Your casual mood during fitness calls for high-performance athletic wear that prioritizes comfort, functionality, and moisture management in warm weather.'
    }
  },

  // Creative + Travel
  {
    id: 'creative-travel-mild-cloudy-fall',
    mood: 'creative',
    event: 'travel',
    temperature: 65,
    condition: 'cloudy',
    season: 'fall',
    outfit: {
      primaryItems: [
        {
          name: 'Artisan Jacket',
          description: 'Unique jacket with interesting textures',
          reason: 'Expresses creativity while being practical for travel',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#8B4513'
        },
        {
          name: 'Graphic Tee',
          description: 'Artistic graphic t-shirt',
          reason: 'Showcases personality and creative spirit',
          weatherAppropriate: true,
          category: 'top',
          color: '#FF6347'
        },
        {
          name: 'Comfortable Jeans',
          description: 'Well-worn jeans with character',
          reason: 'Perfect for travel and exploration',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#4682B4'
        },
        {
          name: 'Comfortable Boots',
          description: 'Stylish boots suitable for walking',
          reason: 'Supportive for travel while maintaining creative style',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#2F4F4F'
        }
      ],
      accessories: [
        {
          name: 'Camera Bag',
          description: 'Stylish crossbody bag for essentials',
          reason: 'Practical for travel while complementing creative look',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#8B4513'
        },
        {
          name: 'Statement Sunglasses',
          description: 'Unique frame sunglasses',
          reason: 'Functional accessory that expresses personality',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#D2691E'
        }
      ],
      styleVibe: 'Creative exploration with practical comfort',
      colorPalette: ['#8B4513', '#FF6347', '#4682B4', '#D2691E'],
      reasoning: 'Your creative spirit during travel calls for pieces that express individuality while providing comfort and functionality for exploration and discovery.'
    }
  },

  // Bold + Special Event
  {
    id: 'bold-special-event-warm-cloudy-summer',
    mood: 'bold',
    event: 'special-event',
    temperature: 75,
    condition: 'cloudy',
    season: 'summer',
    outfit: {
      primaryItems: [
        {
          name: 'Statement Blazer',
          description: 'Bold colored blazer with unique cut',
          reason: 'Makes a confident entrance at any special event',
          weatherAppropriate: true,
          category: 'outerwear',
          color: '#FF1493'
        },
        {
          name: 'Luxury Button-Up',
          description: 'High-quality shirt with subtle sheen',
          reason: 'Sophisticated base that complements bold blazer',
          weatherAppropriate: true,
          category: 'top',
          color: '#FFFFFF'
        },
        {
          name: 'Designer Trousers',
          description: 'Well-tailored trousers in premium fabric',
          reason: 'Elegant foundation for special occasion',
          weatherAppropriate: true,
          category: 'bottom',
          color: '#2C3E50'
        },
        {
          name: 'Statement Shoes',
          description: 'Bold dress shoes that catch attention',
          reason: 'Completes the confident, bold look',
          weatherAppropriate: true,
          category: 'footwear',
          color: '#8B0000'
        }
      ],
      accessories: [
        {
          name: 'Bold Watch',
          description: 'Eye-catching timepiece with unique details',
          reason: 'Accessory that reinforces bold confidence',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#FFD700'
        },
        {
          name: 'Pocket Square',
          description: 'Colorful pocket square with artistic pattern',
          reason: 'Adds personality without overwhelming the bold look',
          weatherAppropriate: true,
          category: 'accessory',
          color: '#FF6347'
        }
      ],
      styleVibe: 'Bold confidence making memorable impression',
      colorPalette: ['#FF1493', '#FFFFFF', '#2C3E50', '#FFD700'],
      reasoning: 'Your bold personality deserves an outfit that commands attention and creates a lasting impression at any special event. These pieces project confidence and individuality.'
    }
  }
];