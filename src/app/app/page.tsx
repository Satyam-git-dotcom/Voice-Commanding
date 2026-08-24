"use client";

import { useState, useEffect } from 'react';
import { ShoppingProvider } from '@/lib/ShoppingContext';
import VoiceInput from '@/components/VoiceInput';
import ShoppingList from '@/components/ShoppingList';
import SmartSuggestions from '@/components/SmartSuggestions';
import InventoryCatalog from '@/components/InventoryCatalog';
import VoiceLogs from '@/components/VoiceLogs';
import { Settings, History, LayoutDashboard, Archive, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  useEffect(() => {
    const handleSwitchTab = (e: any) => {
      if (e.detail) setActiveTab(e.detail);
    };
    window.addEventListener('SWITCH_TAB', handleSwitchTab);
    return () => window.removeEventListener('SWITCH_TAB', handleSwitchTab);
  }, []);

  return (
    <ShoppingProvider>
      <div className="font-body-base min-h-screen flex flex-col bg-surface text-on-background">
        
        {/* TopAppBar */}
        <header className="bg-surface w-full border-b border-on-surface flex flex-col px-8 py-4 max-w-[1280px] mx-auto">
          <div className="flex justify-between items-center w-full">
            <Link href="/" className="font-display-lg uppercase tracking-tighter text-primary cursor-pointer hover:opacity-80">QCART</Link>
            <nav className="hidden md:flex gap-8">
              <button onClick={() => setActiveTab('archive')} className="text-secondary font-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-100 p-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5">ARCHIVE</button>
              <button onClick={() => setActiveTab('logistics')} className="text-secondary font-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-100 p-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5">LOGISTICS</button>
              <button onClick={() => setActiveTab('categories')} className="text-secondary font-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-100 p-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5">CATEGORIES</button>
              <button onClick={() => setActiveTab('account')} className="text-secondary font-label-caps hover:bg-primary hover:text-on-primary transition-colors duration-100 p-2 cursor-pointer active:translate-x-0.5 active:translate-y-0.5">ACCOUNT</button>
            </nav>
            <div className="flex gap-4">
              <Settings onClick={() => setActiveTab('preferences')} className="text-primary cursor-pointer w-6 h-6" />
              <History onClick={() => setActiveTab('voice_logs')} className="text-primary cursor-pointer w-6 h-6" />
            </div>
          </div>
        </header>

        {/* Main Layout Grid */}
        <div className="flex flex-1 max-w-[1280px] mx-auto w-full relative">
          
          {/* SideNavBar */}
          <aside className="bg-surface hidden md:flex flex-col w-[280px] border-r border-on-surface h-[calc(100vh-100px)] sticky top-0 flex-shrink-0 z-20">
            <div className="p-4 border-b border-on-surface">
              <h2 className="font-headline-md font-bold text-on-surface truncate">QCART_SYSTEM</h2>
              <p className="font-metadata text-secondary mt-1">V.2.04_STABLE</p>
            </div>
            <nav className="flex-1 overflow-y-auto">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`w-full flex items-center gap-4 px-4 py-3 border-b border-on-surface font-label-caps transition-all duration-75 text-left ${
                  activeTab === 'dashboard' ? 'bg-on-surface text-surface font-bold hover:opacity-90' : 'text-secondary hover:bg-surface-variant hover:invert'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                DASHBOARD
              </button>
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center gap-4 px-4 py-3 border-b border-on-surface font-label-caps transition-all duration-75 text-left ${
                  activeTab === 'inventory' ? 'bg-on-surface text-surface font-bold hover:opacity-90' : 'text-secondary hover:bg-surface-variant hover:invert'
                }`}
              >
                <Archive className="w-5 h-5" />
                INVENTORY
              </button>
              <button 
                onClick={() => setActiveTab('voice_logs')} 
                className={`w-full flex items-center gap-4 px-4 py-3 border-b border-on-surface font-label-caps transition-all duration-75 text-left ${
                  activeTab === 'voice_logs' ? 'bg-[#111111] text-[#fcf9f8] font-bold hover:opacity-90' : 'text-secondary hover:bg-surface-variant hover:invert'
                }`}
              >
                <History className="w-5 h-5" />
                VOICE_LOGS
              </button>
              <button 
                onClick={() => setActiveTab('market_trends')} 
                className={`w-full flex items-center gap-4 px-4 py-3 border-b border-on-surface font-label-caps transition-all duration-75 text-left ${
                  activeTab === 'market_trends' ? 'bg-on-surface text-surface font-bold hover:opacity-90' : 'text-secondary hover:bg-surface-variant hover:invert'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                MARKET_TRENDS
              </button>
              <button 
                onClick={() => setActiveTab('preferences')} 
                className={`w-full flex items-center gap-4 px-4 py-3 border-b border-on-surface font-label-caps transition-all duration-75 text-left ${
                  activeTab === 'preferences' ? 'bg-on-surface text-surface font-bold hover:opacity-90' : 'text-secondary hover:bg-surface-variant hover:invert'
                }`}
              >
                <Settings className="w-5 h-5" />
                PREFERENCES
              </button>
            </nav>
          </aside>

          {/* Main Content Canvas */}
          <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-100px)]">
            {activeTab === 'dashboard' ? (
              <div className="grid grid-cols-1 md:grid-cols-12 pattern-dots flex-1 h-full overflow-hidden">
                {/* Left Column: Ledger / Shopping List (Cols 1-8) */}
                <div className="md:col-span-8 brutalist-border-right flex flex-col h-full">
                  {/* Control Bar */}
                  <div className="border-b border-on-surface p-4 flex justify-between items-center bg-surface sticky top-0 z-10 flex-shrink-0">
                    <h2 className="font-headline-md font-bold uppercase truncate">ACTIVE_MANIFEST</h2>
                  </div>
                  <div className="p-4 md:p-8 flex-1 overflow-y-auto bg-surface-lowest">
                    <ShoppingList />
                  </div>
                </div>

                {/* Right Column: Suggestions (Cols 9-12) */}
                <div className="md:col-span-4 flex flex-col bg-surface h-full overflow-y-auto">
                  <SmartSuggestions />
                </div>
              </div>
            ) : activeTab === 'inventory' ? (
              <InventoryCatalog />
            ) : activeTab === 'voice_logs' ? (
              <VoiceLogs />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center pattern-hatching p-8 text-center h-full">
                <div className="bg-surface p-12 brutalist-border max-w-lg shadow-brutalist w-full mx-4">
                  <h2 
                    className="font-display-lg uppercase tracking-tight text-primary mb-4 break-words" 
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', wordBreak: 'break-word', hyphens: 'auto' }}
                  >
                    {activeTab.replace('_', ' ')}
                  </h2>
                  <p className="font-metadata text-secondary uppercase mb-8">
                    MODULE_OFFLINE // THIS COMPONENT IS NOT REQUIRED FOR THE TECHNICAL ASSESSMENT
                  </p>
                  <button 
                    onClick={() => setActiveTab('dashboard')}
                    className="brutalist-button w-full py-4 font-label-caps uppercase"
                  >
                    RETURN_TO_MANIFEST
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
        
        <VoiceInput />
      </div>
    </ShoppingProvider>
  );
}
