import React, { createContext, useContext, useState, useEffect } from 'react';

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  category: string;
  purchased: boolean;
};

export type CommandLog = {
  id: string;
  timestamp: string;
  transcript: string;
  intent: 'ADD_ITEM' | 'REMOVE_ITEM' | 'SEARCH_ITEM' | 'QUERY_TOTAL' | 'ERROR_PARSE' | 'SYS_INIT';
  confidence: number;
};

type ShoppingContextType = {
  items: ShoppingItem[];
  addItem: (item: Omit<ShoppingItem, 'id' | 'purchased'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<ShoppingItem>) => void;
  clearList: () => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  commandHistory: CommandLog[];
  addCommandLog: (log: Omit<CommandLog, 'id'>) => void;
};

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<CommandLog[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('shopping_list');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse local storage", e);
      }
    }
    const savedLogs = localStorage.getItem('command_history');
    if (savedLogs) {
      try {
        setCommandHistory(JSON.parse(savedLogs));
      } catch (e) {
        console.error("Failed to parse command history", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('shopping_list', JSON.stringify(items));
      localStorage.setItem('command_history', JSON.stringify(commandHistory));
    }
  }, [items, commandHistory, isLoaded]);

  const addItem = (newItem: Omit<ShoppingItem, 'id' | 'purchased'>) => {
    setItems((prev) => {
      // Check if item already exists (case-insensitive)
      const existingItemIndex = prev.findIndex(
        (i) => i.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (existingItemIndex >= 0) {
        // Update quantity if exists
        const newItems = [...prev];
        newItems[existingItemIndex].quantity += newItem.quantity || 1;
        return newItems;
      }

      // Add new item
      return [
        ...prev,
        {
          ...newItem,
          id: Math.random().toString(36).substring(2, 9),
          purchased: false,
        },
      ];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<ShoppingItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const clearList = () => {
    setItems([]);
  };

  const addCommandLog = (log: Omit<CommandLog, 'id'>) => {
    setCommandHistory((prev) => [
      ...prev,
      { ...log, id: Math.random().toString(36).substring(2, 9) },
    ]);
  };

  return (
    <ShoppingContext.Provider
      value={{ items, addItem, removeItem, updateItem, clearList, globalSearchQuery, setGlobalSearchQuery, commandHistory, addCommandLog }}
    >
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShoppingList() {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error('useShoppingList must be used within a ShoppingProvider');
  }
  return context;
}
