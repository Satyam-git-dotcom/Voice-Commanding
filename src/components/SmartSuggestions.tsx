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
              const keyword = encodeURIComponent(suggestion.name.toUpperCase());
              return (
                <div key={idx} className="flex gap-4 p-4 border border-on-surface bg-surface brutalist-border hover:-translate-y-1 transition-transform group">
                  <div 
                    className="w-16 h-16 bg-surface-dim border-r border-b border-on-surface bg-cover bg-center sepia-hover flex-shrink-0"
                    style={{ backgroundImage: `url('https://image.pollinations.ai/prompt/fresh%20${keyword}%20grocery%20food?width=100&height=100&nologo=true')` }}
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
          <div className="brutalist-border p-2 group cursor-pointer" onClick={() => addItem({ name: "Pomegranates", quantity: 1, category: "Produce" })}>
            <div className="w-full h-32 bg-cover bg-center sepia-hover mb-2 brutalist-border" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZsYVdGkn94j_Dx1860AH_nWpPQ2lkaFHFAqQrAzM6UZG2o9aV8ln3NMd2Hgxz0gdD5fGXsbzaPNJJhwZAoUOgdjC6dQhp9YKH6rlPUw36p5H-bDw05dsCRcmZ1gVaf1faEUjaT4KmyKChTOhKoxrVTCgivy5xRgvmloF-7PiFIx79dS6leUigJFqIHXNHUpqA-JP7voCO1CheQoO_yPS9_fF6RcL9KEBotD23v45W5Pra0xSDQM8u')" }}></div>
            <p className="font-metadata uppercase">REF: POMEGRANATES</p>
          </div>
          <div className="brutalist-border p-2 group cursor-pointer" onClick={() => addItem({ name: "Winter Squash", quantity: 1, category: "Produce" })}>
            <div className="w-full h-32 bg-cover bg-center sepia-hover mb-2 brutalist-border" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCIJ1Nm2E7cJZGiVm6mrYDtHjXKvsR5ej7wfmIdaO65xcQ_TBZfJaWHkCK0ZQvDUtxfTcPKKb6ACWNPNeMUt33Bz8cztmZQIMydSj8nLno4OKDZATHPNiLI5FeZjI2Ah9fNduCmY7krpDIIt1mpscL6MfEa19Y9LRAXE6qGqzDd2SQIAdpTAPlAII2mEFtcZLJ4USZiLROn3YunnimbInHhP6qivDg9MQ2sEYUoYfxS7WRY8u7JSKBY')" }}></div>
            <p className="font-metadata uppercase">REF: WINTER SQUASH</p>
          </div>
        </div>
      </div>
    </>
  );
}
