"use client";

import React, { useState, useEffect } from 'react';
import { catalogData, catalogCategories } from '@/lib/catalogData';
import { useShoppingList } from '@/lib/ShoppingContext';
import { Plus } from 'lucide-react';

export default function InventoryCatalog() {
  const { items, addItem } = useShoppingList();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleGlobalSearch = (e: any) => {
      if (e.detail) {
        setSearchQuery(e.detail);
        setSelectedCategory("All"); // Reset category on global search
      }
    };
    window.addEventListener('GLOBAL_SEARCH', handleGlobalSearch);
    return () => window.removeEventListener('GLOBAL_SEARCH', handleGlobalSearch);
  }, []);

  const filteredCatalog = catalogData.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col h-full bg-background">
      {/* Catalog Header & Filters */}
      <div className="border-b border-on-surface p-4 flex flex-col gap-4 bg-surface sticky top-0 z-10 flex-shrink-0">
        <div className="flex justify-between items-center">
          <h2 className="font-headline-md font-bold uppercase truncate">INVENTORY_CATALOG</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text" 
            placeholder="SEARCH_CATALOG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="brutalist-border p-2 font-metadata bg-surface focus:outline-none focus:ring-1 focus:ring-on-surface w-full md:w-64 uppercase"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full">
            <button 
              onClick={() => setSelectedCategory("All")}
              className={`flex-shrink-0 font-label-caps px-3 py-2 brutalist-border transition-colors ${selectedCategory === "All" ? "bg-on-surface text-surface" : "bg-surface text-on-surface hover:bg-surface-variant"}`}
            >
              ALL
            </button>
            {catalogCategories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 font-label-caps px-3 py-2 brutalist-border transition-colors ${selectedCategory === cat ? "bg-on-surface text-surface" : "bg-surface text-on-surface hover:bg-surface-variant"}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="p-4 md:p-8 flex-1 overflow-y-auto pattern-dots">
        {filteredCatalog.length === 0 ? (
          <div className="brutalist-border p-8 bg-surface text-center">
            <p className="font-metadata text-secondary uppercase">NO_ITEMS_FOUND</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCatalog.map(item => {
              const keyword = encodeURIComponent(item.name.toUpperCase());
              // Check if item is already in cart
              const inCartCount = items.find(i => i.name.toLowerCase() === item.name.toLowerCase())?.quantity || 0;
              
              return (
                <div key={item.id} className="brutalist-border bg-surface flex flex-col group hover:-translate-y-1 transition-transform duration-200">
                  <div 
                    className="w-full h-48 border-b border-on-surface bg-surface-dim bg-cover bg-center sepia-hover"
                    style={{ backgroundImage: `url('https://image.pollinations.ai/prompt/fresh%20${keyword}%20grocery%20food?width=400&height=400&nologo=true')` }}
                  />
                  <div className="p-4 flex flex-col flex-1">
                    <span className="font-metadata text-secondary mb-1 uppercase">[{item.category}]</span>
                    <h3 className="font-label-caps font-bold text-lg mb-2 truncate">{item.name}</h3>
                    <p className="font-metadata text-on-surface-variant mb-4 flex-1 line-clamp-2">{item.description}</p>
                    
                    <button 
                      onClick={() => addItem({ name: item.name, quantity: 1, category: item.category })}
                      className="brutalist-button w-full py-3 font-label-caps uppercase flex items-center justify-center gap-2 relative overflow-hidden"
                    >
                      <Plus className="w-4 h-4" />
                      ADD_TO_MANIFEST
                      {inCartCount > 0 && (
                        <span className="absolute right-3 font-bold bg-surface text-on-surface px-2 py-0.5 text-[10px]">
                          {inCartCount} IN CART
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
