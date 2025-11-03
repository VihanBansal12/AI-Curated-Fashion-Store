# AI Curated Fashion Store

A sleek online fashion platform where users get outfit recommendations based on their mood, weather, and events — powered by AI. When you land on the site, it feels like stepping into a personal high-end dressing room that knows you better than your mirror.

## Features

- **🎭 Mood-Based Styling**: Select from 8 different moods (Energized, Relaxed, Bold, Classic, Creative, Professional, Casual, Romantic)
- **🌤️ Weather Integration**: Manual weather selection with temperature, conditions, and seasonal preferences
- **📅 Event-Specific Recommendations**: Choose from Work, Date Night, Casual Outing, Special Events, Travel, and Fitness
- **🤖 AI-Powered Stylist**: Rule-based fashion engine with curated expert recommendations
- **👗 Virtual Wardrobe**: Save and manage your favorite outfits with tags and notes
- **🛍️ Shopping Integration**: Browse and purchase recommended items from multiple retailers
- **💾 Local Storage**: All your preferences and saved outfits stored locally
- **📱 Responsive Design**: Beautiful, mobile-first interface with smooth animations

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks and local storage
- **AI Engine**: Rule-based expert system (no external APIs required)
- **Deployment**: Optimized for Vercel deployment

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── QuickInput.tsx   # Main input interface
│   ├── MoodPicker.tsx   # Mood selection component
│   ├── EventSelector.tsx # Event selection component
│   ├── WeatherDisplay.tsx # Weather input component
│   ├── OutfitDisplay.tsx # Outfit presentation
│   ├── VirtualWardrobe.tsx # Saved outfits management
│   └── ShoppingView.tsx # Shopping interface
├── services/           # Business logic
│   └── aiStylist.ts    # AI recommendation engine
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── styles/             # Global styles
```

## Design System

- **Colors**: Sophisticated palette with luxury accent colors
- **Typography**: Mix of elegant serif headings and clean sans-serif body text
- **Animations**: Subtle transitions and smooth micro-interactions
- **Responsive**: Mobile-first approach with breakpoint optimization

## Future Enhancements

- Real weather API integration
- OpenAI GPT-4 integration for dynamic recommendations
- 3D model visualization
- Wardrobe photo upload
- User accounts and cloud sync
- Brand partnerships and affiliate programs
- Social sharing features

## Contributing

This is a demonstration project showcasing modern web development practices with Next.js, TypeScript, and AI-powered fashion recommendations.

---

Made with ❤️ and AI 
