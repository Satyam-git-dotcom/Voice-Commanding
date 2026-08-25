"use client";

import React, { useEffect, useState } from 'react';
import { useShoppingList } from '@/lib/ShoppingContext';

type Suggestion = {
  name: string;
  reason: string;
};

export default function SmartSuggestions() {
  const { items, addItem } = useShoppingList();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (items.length === 0) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch('/api/suggestions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items }),
        });
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.suggestions || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 1500);
    return () => clearTimeout(timeoutId);
  }, [items]);

  return (
    <>
      {/* Smart Suggestions / SYSTEM ALERTS */}
      <div className="p-4 brutalist-border-bottom bg-surface">
        <h3 className="font-label-caps font-bold mb-4 uppercase">SYSTEM_ALERTS</h3>
        
        {isLoading && suggestions.length === 0 ? (
          <div className="brutalist-border p-3 bg-surface-dim">
            <p className="font-metadata text-on-surface mb-3 uppercase animate-pulse">
              ANALYZING_INVENTORY_PATTERNS...
            </p>
          </div>
        ) : suggestions.length > 0 ? (
          <div className="flex flex-col gap-4">
            {suggestions.map((suggestion, idx) => {
              return (
                <div key={idx} className="flex gap-4 p-4 border border-on-surface bg-surface brutalist-border hover:-translate-y-1 transition-transform group">
                  <div 
                    className="w-12 h-12 border-r border-on-surface bg-surface-dim bg-cover bg-center sepia-hover flex-shrink-0"
                    style={{ backgroundImage: `url('https://loremflickr.com/100/100/${encodeURIComponent(suggestion.name.toLowerCase())},food/all')` }}
                  ></div>
                  <div className="relative z-10">
                    <p className="font-metadata text-on-surface mb-3 uppercase">
                      Warning: {suggestion.reason}. Ref: {suggestion.name}.
                    </p>
                    <button 
                      onClick={() => {
                        addItem({ name: suggestion.name, quantity: 1, category: 'RECOMMENDED' });
                        setSuggestions(prev => prev.filter(s => s.name !== suggestion.name));
                      }}
                      className="brutalist-button w-full py-2 font-label-caps uppercase flex items-center justify-center gap-2"
                    >
                      <div className="w-4 h-4 bg-surface-dim border border-surface"></div>
                      REPLENISH {suggestion.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="brutalist-border p-3 bg-surface">
            <p className="font-metadata text-secondary uppercase">
              NO_DEFICITS_DETECTED
            </p>
          </div>
        )}
      </div>

      {/* Seasonal Recommendations */}
      <div className="p-4 flex-1 bg-surface">
        <h3 className="font-label-caps font-bold mb-4">SEASONAL_INDEX</h3>
        <div className="flex flex-col gap-4">
          <div className="brutalist-border p-4 bg-surface group cursor-pointer hover:bg-surface-dim transition-colors relative overflow-hidden">
            <div className="w-full h-32 bg-cover bg-center sepia-hover mb-2 brutalist-border" style={{ backgroundImage: "url('https://placehold.co/400x200/e5e2e1/1c1b1b?text=FRESH+PRODUCE+SALE')" }}></div>
            <h4 className="font-label-caps font-bold">FRESH PRODUCE SALE</h4>
          </div>
          <div className="brutalist-border p-4 bg-surface group cursor-pointer hover:bg-surface-dim transition-colors relative overflow-hidden">
            <div className="w-full h-32 bg-cover bg-center sepia-hover mb-2 brutalist-border" style={{ backgroundImage: "url('https://placehold.co/400x200/e5e2e1/1c1b1b?text=DAIRY+BOGO')" }}></div>
            <h4 className="font-label-caps font-bold">BUY 1 GET 1 DAIRY</h4>
          </div>
        </div>
      </div>
    </>
  );
}
