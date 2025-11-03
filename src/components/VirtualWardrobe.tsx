'use client';

import { useState, useEffect } from 'react';
import { Outfit } from '@/types';

interface VirtualWardrobeProps {
  onBack: () => void;
}

interface SavedOutfit extends Outfit {
  savedAt: string;
  tags: string[];
  notes?: string;
}

export default function VirtualWardrobe({ onBack }: VirtualWardrobeProps) {
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<SavedOutfit | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState<string>('all');

  useEffect(() => {
    loadSavedOutfits();
  }, []);

  const loadSavedOutfits = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
      setSavedOutfits(saved);
    } catch (error) {
      console.error('Error loading saved outfits:', error);
      setSavedOutfits([]);
    }
  };

  const deleteOutfit = (outfitId: string) => {
    const updated = savedOutfits.filter(outfit => outfit.id !== outfitId);
    setSavedOutfits(updated);
    localStorage.setItem('savedOutfits', JSON.stringify(updated));

    if (selectedOutfit?.id === outfitId) {
      setSelectedOutfit(null);
    }
  };

  const getAllTags = (): string[] => {
    const tags = new Set<string>();
    savedOutfits.forEach(outfit => {
      outfit.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const filteredOutfits = savedOutfits.filter(outfit => {
    const matchesSearch = outfit.styleVibe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outfit.detailedReasoning.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outfit.mood.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         outfit.eventType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = filterTag === 'all' || outfit.tags.includes(filterTag);

    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (selectedOutfit) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button onClick={() => setSelectedOutfit(null)} className="btn-secondary">
            ← Back to Wardrobe
          </button>
          <h2 className="text-title text-primary">Outfit Details</h2>
          <button onClick={onBack} className="btn-secondary">
            ← Back to Stylist
          </button>
        </div>

        <div className="outfit-card">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-primary text-lg mb-2">
                  {selectedOutfit.styleVibe}
                </h3>
                <div className="flex items-center space-x-4 text-small text-ui-gray">
                  <span>😊 {selectedOutfit.mood}</span>
                  <span>📅 {selectedOutfit.eventType.replace('-', ' ')}</span>
                  <span>🌡️ {selectedOutfit.weatherContext.temperature}°F</span>
                  <span>📅 {formatDate(selectedOutfit.savedAt)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-small font-medium text-accent">
                  {selectedOutfit.confidenceScore}% Match
                </span>
              </div>
            </div>

            {/* Tags */}
            {selectedOutfit.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedOutfit.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-full text-small">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Color Palette */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-3">Color Palette</h4>
              <div className="flex space-x-2">
                {selectedOutfit.colorPalette.map((color, index) => (
                  <div key={index} className="flex-1">
                    <div
                      className="h-10 rounded-lg border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="mb-6">
              <h4 className="font-medium text-primary mb-3">Why This Outfit Works</h4>
              <p className="text-body text-ui-gray leading-relaxed">
                {selectedOutfit.detailedReasoning}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-primary mb-3">Main Pieces</h4>
                <div className="space-y-2">
                  {selectedOutfit.primaryItems.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-primary">{item.name}</h5>
                        <p className="text-small text-ui-gray">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedOutfit.accessories.length > 0 && (
                <div>
                  <h4 className="font-medium text-primary mb-3">Accessories</h4>
                  <div className="space-y-2">
                    {selectedOutfit.accessories.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        />
                        <div className="flex-1">
                          <h5 className="font-medium text-primary">{item.name}</h5>
                          <p className="text-small text-ui-gray">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6">
              <button className="btn-primary">
                🔄 Wear Again
              </button>
              <button
                onClick={() => deleteOutfit(selectedOutfit.id)}
                className="btn-secondary"
              >
                🗑️ Remove from Wardrobe
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Stylist
        </button>
        <h2 className="text-title text-primary">Your Virtual Wardrobe</h2>
        <div className="text-small text-ui-gray">
          {savedOutfits.length} outfit{savedOutfits.length !== 1 ? 's' : ''} saved
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search outfits by style, mood, or occasion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-small text-ui-gray">Filter:</label>
            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              className="input-field flex-1 min-w-[150px]"
            >
              <option value="all">All Outfits</option>
              {getAllTags().map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Outfits Grid */}
      {filteredOutfits.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">👗</div>
          <h3 className="text-title text-primary mb-3">
            {savedOutfits.length === 0 ? 'Your Wardrobe is Empty' : 'No Outfits Found'}
          </h3>
          <p className="text-body text-ui-gray mb-6">
            {savedOutfits.length === 0
              ? 'Start generating outfits and save your favorites to build your virtual wardrobe.'
              : 'Try adjusting your search or filter to find what you\'re looking for.'
            }
          </p>
          {savedOutfits.length === 0 && (
            <button onClick={onBack} className="btn-primary">
              Create Your First Outfit
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOutfits.map((outfit) => (
            <div key={outfit.id} className="outfit-card cursor-pointer transform transition-all duration-200 hover:scale-105">
              <div
                onClick={() => setSelectedOutfit(outfit)}
                className="p-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-primary">
                    {outfit.styleVibe}
                  </h3>
                  <div className="text-small text-accent font-medium">
                    {outfit.confidenceScore}%
                  </div>
                </div>

                {/* Context */}
                <div className="flex items-center space-x-3 text-small text-ui-gray mb-3">
                  <span>😊 {outfit.mood}</span>
                  <span>📅 {outfit.eventType.replace('-', ' ')}</span>
                  <span>🌡️ {outfit.weatherContext.temperature}°F</span>
                </div>

                {/* Color Palette */}
                <div className="flex space-x-1 mb-3">
                  {outfit.colorPalette.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="flex-1 h-2 rounded"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>

                {/* Items Preview */}
                <div className="text-small text-ui-gray mb-3">
                  {outfit.primaryItems.length} main pieces, {outfit.accessories.length} accessories
                </div>

                {/* Date */}
                <div className="text-xs text-ui-gray">
                  Saved {formatDate(outfit.savedAt)}
                </div>

                {/* Tags */}
                {outfit.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {outfit.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-accent bg-opacity-20 text-accent rounded text-xs">
                        {tag}
                      </span>
                    ))}
                    {outfit.tags.length > 3 && (
                      <span className="text-xs text-ui-gray">+{outfit.tags.length - 3} more</span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 p-3 flex space-x-2">
                <button
                  onClick={() => setSelectedOutfit(outfit)}
                  className="flex-1 text-small text-accent hover:bg-accent hover:bg-opacity-10 py-1 rounded transition-colors"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOutfit(outfit.id);
                  }}
                  className="text-small text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      {savedOutfits.length > 0 && (
        <div className="text-center text-small text-ui-gray">
          Showing {filteredOutfits.length} of {savedOutfits.length} saved outfits
        </div>
      )}
    </div>
  );
}