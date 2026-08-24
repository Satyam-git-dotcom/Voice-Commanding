"use client";

import React, { useMemo } from 'react';
import { useShoppingList } from '@/lib/ShoppingContext';
import { Square, CheckSquare, X } from 'lucide-react';

export default function ShoppingList() {
  const { items, updateItem } = useShoppingList();

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = item.category || 'UNCATEGORIZED';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {} as Record<string, typeof items>);
  }, [items]);

  const categories = Object.keys(groupedItems).sort();

  if (items.length === 0) {
    return (
      <div className="text-secondary font-metadata">
        [ NO_ACTIVE_ITEMS_DETECTED ]
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      {categories.map((category) => (
        <div key={category}>
          <div className="inline-block brutalist-border px-2 py-1 font-metadata mb-2 bg-surface uppercase">
            [{category}_SECTION]
          </div>
          <ul className="flex flex-col gap-2">
            {groupedItems[category].map((item, idx) => {
              // Extract a keyword for the image search
              const keyword = encodeURIComponent(item.name.split(' ')[0].toLowerCase());
              
              return (
                <li
                  key={item.id}
                  className={`flex justify-between items-center p-2 brutalist-border font-metadata transition-colors bg-surface ${
                    item.purchased ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 brutalist-border bg-surface-dim bg-cover bg-center sepia-hover flex-shrink-0"
                      style={{ backgroundImage: `url('https://loremflickr.com/160/160/${keyword},food')` }}
                    />
                    <span className={`uppercase ${item.purchased ? 'line-through' : ''}`}>
                      Fig. {idx + 1}: {item.quantity}x {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-error hover:text-surface hover:bg-error border border-error transition-colors p-1"
                      aria-label="Delete item"
                      title="DELETE_ITEM"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => updateItem(item.id, { purchased: !item.purchased })}
                      className="text-secondary hover:text-on-surface transition-colors p-1"
                      aria-label={item.purchased ? "Mark unpurchased" : "Mark purchased"}
                      title={item.purchased ? "MARK_UNPURCHASED" : "MARK_PURCHASED"}
                    >
                      {item.purchased ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
