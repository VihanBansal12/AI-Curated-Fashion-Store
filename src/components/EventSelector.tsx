'use client';

import { EventType, EventOption } from '@/types';
import { useState } from 'react';

const eventOptions: EventOption[] = [
  {
    value: 'work',
    label: 'Work',
    description: 'Professional office environment',
    dressCode: 'Business casual to formal'
  },
  {
    value: 'date-night',
    label: 'Date Night',
    description: 'Romantic evening out',
    dressCode: 'Elegant and charming'
  },
  {
    value: 'casual-outing',
    label: 'Casual Outing',
    description: 'Weekend with friends or family',
    dressCode: 'Comfortable and relaxed'
  },
  {
    value: 'special-event',
    label: 'Special Event',
    description: 'Wedding, party, or celebration',
    dressCode: 'Formal and festive'
  },
  {
    value: 'travel',
    label: 'Travel',
    description: 'Exploring new places',
    dressCode: 'Comfortable and practical'
  },
  {
    value: 'fitness',
    label: 'Fitness',
    description: 'Workout or active pursuit',
    dressCode: 'Athletic and functional'
  }
];

interface EventSelectorProps {
  selectedEvent?: EventType;
  onEventSelect: (event: EventType) => void;
}

export default function EventSelector({ selectedEvent, onEventSelect }: EventSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-title text-primary mb-3">What's your plan today?</h2>
        <p className="text-body text-ui-gray">
          Choose the occasion to help us style the perfect outfit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventOptions.map((event) => (
          <div
            key={event.value}
            onClick={() => onEventSelect(event.value)}
            className={`mood-option cursor-pointer transform transition-all duration-200 hover:scale-105 ${
              selectedEvent === event.value ? 'selected' : ''
            }`}
          >
            <div className="text-center mb-3">
              <h3 className="font-semibold text-primary text-lg mb-2">
                {event.label}
              </h3>
              <p className="text-body text-ui-gray mb-2">
                {event.description}
              </p>
              <div className="text-small text-accent font-medium">
                {event.dressCode}
              </div>
            </div>

            {/* Visual indicator */}
            <div className="flex justify-center">
              {selectedEvent === event.value && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="text-center animate-fade-in">
          <p className="text-body text-primary">
            Perfect! We'll style you for{' '}
            <span className="font-semibold">
              {eventOptions.find(e => e.value === selectedEvent)?.label}
            </span>
            .
          </p>
        </div>
      )}
    </div>
  );
}