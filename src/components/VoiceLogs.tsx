"use client";

import React from 'react';
import { useShoppingList } from '@/lib/ShoppingContext';
import { SettingsVoice, Search, Delete, Add, Warning, Calculate } from 'lucide-react';

export default function VoiceLogs() {
  const { commandHistory } = useShoppingList();

  const getIntentIcon = (intent: string) => {
    switch (intent) {
      case 'QUERY_TOTAL': return <Calculate className="w-[14px] h-[14px]" />;
      case 'SEARCH_ITEM': return <Search className="w-[14px] h-[14px]" />;
      case 'REMOVE_ITEM': return <Delete className="w-[14px] h-[14px]" />;
      case 'ADD_ITEM': return <Add className="w-[14px] h-[14px]" />;
      case 'ERROR_PARSE': return <Warning className="w-[14px] h-[14px]" />;
      default: return <SettingsVoice className="w-[14px] h-[14px]" />;
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#111111] text-[#fcf9f8] relative">
      {/* Header Bar */}
      <header className="flex justify-between items-center p-4 border-b border-[#313030] shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-label-caps bg-[#313030] text-[#fcf9f8] px-2 py-1">SYS_LOG</span>
          <h2 className="font-metadata tracking-widest text-[#fcf9f8]">SESSION_ID: QVS-8829-A</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 border border-[#9e0000]">
          <div className="w-2 h-2 rounded-full bg-[#9e0000] animate-pulse"></div>
          <span className="font-label-caps text-[#9e0000]">RECORDING</span>
        </div>
      </header>

      {/* Waveform / Abstract Visualizer Area */}
      <section className="h-48 border-b border-[#313030] flex items-end justify-center gap-1 p-4 shrink-0 overflow-hidden relative" style={{ backgroundImage: "radial-gradient(circle, #313030 1px, transparent 1px)", backgroundSize: "8px 8px" }}>
        {/* Simulated Waveform Bars */}
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="w-1 bg-[#313030] animate-pulse" 
            style={{ 
              height: `${Math.max(10, Math.random() * 100)}%`, 
              animationDelay: `${Math.random()}s`,
              animationDuration: `${0.5 + Math.random()}s`
            }}
          ></div>
        ))}
      </section>

      {/* Live Transcript Overlay (Floating) */}
      <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-10 w-full px-8">
        <h3 className="font-display-lg text-6xl font-black text-[#fcf9f8] opacity-90 leading-none truncate">
          {commandHistory.length > 0 ? commandHistory[0].transcript.toUpperCase() : '"WAITING FOR INPUT..."'}
        </h3>
        <p className="font-metadata text-[#9e0000] mt-2">
          {commandHistory.length > 0 ? 'LAST PROCESSED COMMAND' : 'SYS_IDLE'}
        </p>
      </div>

      {/* Command Log List (Brutalist Grid) */}
      <section className="flex-1 overflow-y-auto font-metadata">
        {/* Grid Header */}
        <div className="grid grid-cols-12 border-b border-[#313030] bg-[#1c1b1b] text-[#fcf9f8] sticky top-0 z-20">
          <div className="col-span-3 md:col-span-2 p-2 border-r border-[#313030]">TIMESTAMP</div>
          <div className="col-span-5 md:col-span-6 p-2 border-r border-[#313030]">RAW_TRANSCRIPT</div>
          <div className="col-span-2 md:col-span-2 p-2 border-r border-[#313030]">ACTION_INTENT</div>
          <div className="col-span-2 p-2 text-right">NLP_CONF</div>
        </div>

        {/* Log Entries */}
        {commandHistory.length === 0 ? (
          <div className="p-8 text-center text-[#5f5e5e] uppercase">
            NO_LOGS_AVAILABLE
          </div>
        ) : (
          commandHistory.map(log => (
            <div 
              key={log.id} 
              className={`grid grid-cols-12 border-b border-[#313030] transition-colors cursor-crosshair ${
                log.intent === 'ERROR_PARSE' 
                  ? 'bg-[#9e0000] text-white hover:bg-white hover:text-[#9e0000]' 
                  : 'hover:bg-[#fcf9f8] hover:text-[#111111]'
              }`}
            >
              <div className={`col-span-3 md:col-span-2 p-3 border-r border-[#313030] flex items-center ${log.intent !== 'ERROR_PARSE' && 'text-[#a3a3a3]'}`}>
                {log.timestamp}
              </div>
              <div className={`col-span-5 md:col-span-6 p-3 border-r border-[#313030] flex items-center ${log.intent !== 'ERROR_PARSE' && 'text-[#a3a3a3]'}`}>
                {log.transcript}
              </div>
              <div className={`col-span-2 md:col-span-2 p-3 border-r border-[#313030] flex items-center gap-2 ${log.intent !== 'ERROR_PARSE' && 'text-[#a3a3a3]'}`}>
                {getIntentIcon(log.intent)}
                <span className="truncate">{log.intent}</span>
              </div>
              <div className={`col-span-2 p-3 text-right flex items-center justify-end ${log.intent !== 'ERROR_PARSE' && 'text-[#a3a3a3]'}`}>
                {log.confidence.toFixed(3)}
              </div>
            </div>
          ))
        )}
      </section>

      {/* Minimal Footer inside canvas */}
      <footer className="p-2 border-t border-[#313030] flex justify-between items-center text-[#5f5e5e] font-metadata shrink-0">
        <span>MIC_ARRAY: ACTIVE [4/4]</span>
        <span>LATENCY: 12ms</span>
      </footer>
    </div>
  );
}
