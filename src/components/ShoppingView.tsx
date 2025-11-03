'use client';

import { useState } from 'react';
import { Outfit, OutfitItem } from '@/types';

interface ShoppingViewProps {
  outfit: Outfit;
  onBack: () => void;
}

interface ShoppingItem extends OutfitItem {
  retailers: Array<{
    name: string;
    price: string;
    url: string;
    availability: 'in-stock' | 'low-stock' | 'out-of-stock';
    rating?: number;
    shipping?: string;
  }>;
  saved: boolean;
}

// Mock shopping data - in a real app, this would come from affiliate APIs
const mockRetailers = [
  { name: 'Nordstrom', price: '$89-$150', url: '#', rating: 4.5, shipping: 'Free shipping' },
  { name: 'Bloomingdale\'s', price: '$95-$160', url: '#', rating: 4.3, shipping: 'Free over $100' },
  { name: 'Saks Fifth Avenue', price: '$120-$200', url: '#', rating: 4.6, shipping: 'Free returns' },
  { name: 'Amazon Fashion', price: '$65-$120', url: '#', rating: 4.2, shipping: 'Prime shipping' },
  { name: 'ASOS', price: '$45-$90', url: '#', rating: 4.1, shipping: 'Free shipping' }
];

export default function ShoppingView({ outfit, onBack }: ShoppingViewProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'top' | 'bottom' | 'outerwear' | 'footwear' | 'accessory'>('all');

  const allItems = [...outfit.primaryItems, ...outfit.accessories];

  const createShoppingItems = (items: OutfitItem[]): ShoppingItem[] => {
    return items.map(item => ({
      ...item,
      retailers: mockRetailers.map(retailer => ({
        ...retailer,
        availability: Math.random() > 0.2 ? 'in-stock' : (Math.random() > 0.5 ? 'low-stock' : 'out-of-stock'),
        price: `$${Math.floor(Math.random() * 150 + 50)}-$${Math.floor(Math.random() * 200 + 150)}`
      })),
      saved: false
    }));
  };

  const shoppingItems = createShoppingItems(allItems);

  const filteredItems = selectedCategory === 'all'
    ? shoppingItems
    : shoppingItems.filter(item => item.category === selectedCategory);

  const toggleItemSelection = (itemId: string) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const toggleItemSaved = (itemId: string) => {
    const newSaved = new Set(savedItems);
    if (newSaved.has(itemId)) {
      newSaved.delete(itemId);
    } else {
      newSaved.add(itemId);
    }
    setSavedItems(newSaved);
  };

  const getTotalPriceRange = () => {
    const selectedShoppingItems = shoppingItems.filter(item => selectedItems.has(item.id));
    if (selectedShoppingItems.length === 0) return '$0 - $0';

    let minTotal = 0;
    let maxTotal = 0;

    selectedShoppingItems.forEach(item => {
      const inStockRetailer = item.retailers.find(r => r.availability === 'in-stock');
      if (inStockRetailer) {
        const [min, max] = inStockRetailer.price.replace('$', '').split('-').map(p => parseInt(p));
        minTotal += min || 0;
        maxTotal += max || min || 0;
      }
    });

    return `$${minTotal} - $${maxTotal}`;
  };

  const getBestRetailer = (item: ShoppingItem) => {
    const inStockRetailers = item.retailers.filter(r => r.availability === 'in-stock');
    if (inStockRetailers.length === 0) return item.retailers[0];

    return inStockRetailers.reduce((best, current) =>
      (current.rating || 0) > (best.rating || 0) ? current : best
    );
  };

  const categories = [
    { value: 'all', label: 'All Items', count: allItems.length },
    { value: 'top', label: 'Tops', count: allItems.filter(i => i.category === 'top').length },
    { value: 'bottom', label: 'Bottoms', count: allItems.filter(i => i.category === 'bottom').length },
    { value: 'outerwear', label: 'Outerwear', count: allItems.filter(i => i.category === 'outerwear').length },
    { value: 'footwear', label: 'Footwear', count: allItems.filter(i => i.category === 'footwear').length },
    { value: 'accessory', label: 'Accessories', count: allItems.filter(i => i.category === 'accessory').length }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="btn-secondary">
          ← Back to Outfit
        </button>
        <div className="text-center">
          <h2 className="text-title text-primary mb-2">Shop This Look</h2>
          <p className="text-body text-ui-gray">
            Complete your {outfit.styleVibe} outfit with these curated pieces
          </p>
        </div>
        <div className="text-small text-ui-gray">
          {selectedItems.size} selected
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value as any)}
            className={`px-4 py-2 rounded-lg text-small font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-ui-gray hover:bg-gray-200'
            }`}
          >
            {category.label} ({category.count})
          </button>
        ))}
      </div>

      {/* Shopping Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredItems.map((item) => {
          const bestRetailer = getBestRetailer(item);
          const isSelected = selectedItems.has(item.id);
          const isSaved = savedItems.has(item.id);

          return (
            <div key={item.id} className="outfit-card">
              <div className="p-4">
                {/* Item Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <h3 className="font-semibold text-primary">{item.name}</h3>
                    </div>
                    <p className="text-body text-ui-gray mb-2">{item.description}</p>
                    <p className="text-small text-accent mb-3">{item.reason}</p>
                    <div className="flex items-center space-x-3 text-small text-ui-gray">
                      <span className="px-2 py-1 bg-gray-100 rounded">{item.category}</span>
                      <span>🌡️ {item.weatherAppropriate ? 'Weather Perfect' : 'Consider Weather'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => toggleItemSelection(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-accent text-white'
                          : 'bg-gray-100 text-ui-gray hover:bg-gray-200'
                      }`}
                    >
                      {isSelected ? '✓' : '○'}
                    </button>
                    <button
                      onClick={() => toggleItemSaved(item.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        isSaved
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-100 text-ui-gray hover:bg-gray-200'
                      }`}
                    >
                      {isSaved ? '♥' : '♡'}
                    </button>
                  </div>
                </div>

                {/* Image Placeholder */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-48 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">
                      {item.category === 'top' && '👔'}
                      {item.category === 'bottom' && '👖'}
                      {item.category === 'outerwear' && '🧥'}
                      {item.category === 'footwear' && '👟'}
                      {item.category === 'accessory' && '⌚'}
                    </div>
                    <p className="text-small text-ui-gray">Product Image</p>
                  </div>
                </div>

                {/* Retailer Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-primary">Best Price</h4>
                    <div className="text-right">
                      <div className="font-semibold text-accent">{bestRetailer.price}</div>
                      <div className="text-small text-ui-gray">
                        {bestRetailer.availability === 'in-stock' && '✅ In Stock'}
                        {bestRetailer.availability === 'low-stock' && '⚠️ Low Stock'}
                        {bestRetailer.availability === 'out-of-stock' && '❌ Out of Stock'}
                      </div>
                    </div>
                  </div>

                  {/* Retailer Selection */}
                  <div className="space-y-2">
                    {item.retailers.slice(0, 3).map((retailer, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-small font-medium text-primary">{retailer.name}</div>
                          {retailer.rating && (
                            <div className="text-small text-accent">
                              ⭐ {retailer.rating}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-small font-medium">{retailer.price}</div>
                          <div className="text-xs text-ui-gray">{retailer.shipping}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full btn-primary text-small"
                    onClick={() => window.open(bestRetailer.url, '_blank')}
                  >
                    Shop at {bestRetailer.name}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Shopping Summary */}
      {selectedItems.size > 0 && (
        <div className="card border-2 border-accent border-opacity-30">
          <div className="flex items-center justify-between p-6">
            <div>
              <h3 className="font-semibold text-primary mb-2">
                Shopping Cart ({selectedItems.size} items)
              </h3>
              <p className="text-body text-ui-gray">
                Total estimated price: {getTotalPriceRange()}
              </p>
              <p className="text-small text-ui-gray">
                Prices vary by retailer and size
              </p>
            </div>
            <div className="space-y-2">
              <button className="btn-accent">
                🛍️ Checkout Selected Items
              </button>
              <button
                onClick={() => setSelectedItems(new Set())}
                className="btn-secondary text-small"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Tips */}
      <div className="card bg-blue-50 border-blue-200">
        <h3 className="font-semibold text-primary mb-3">💡 Shopping Tips</h3>
        <ul className="text-body text-ui-gray space-y-2">
          <li>• Compare prices across multiple retailers for the best deals</li>
          <li>• Check size charts carefully as they vary between brands</li>
          <li>• Read customer reviews for fit and quality insights</li>
          <li>• Sign up for retailer newsletters for exclusive discounts</li>
          <li>• Consider fabric care instructions based on your lifestyle</li>
        </ul>
      </div>
    </div>
  );
}