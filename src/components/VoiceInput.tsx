"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useShoppingList } from '@/lib/ShoppingContext';

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isActiveListening, setIsActiveListening] = useState(false);
  const [language, setLanguage] = useState('en-US');
  
  const recognitionRef = useRef<any>(null);
  const accumulatedTranscriptRef = useRef<string>('');
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const { items, addItem, removeItem, addCommandLog } = useShoppingList();

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript) {
          accumulatedTranscriptRef.current += ' ' + finalTranscript;
        }

        const currentDisplay = (accumulatedTranscriptRef.current + ' ' + interimTranscript).trim();
        setTranscript(currentDisplay);

        // If we have some final text, wait for 1.5 seconds of silence before processing
        // to ensure the user has finished their entire sentence.
        if (accumulatedTranscriptRef.current.trim()) {
          if (processingTimeoutRef.current) clearTimeout(processingTimeoutRef.current);
          
          processingTimeoutRef.current = setTimeout(() => {
            const fullCommand = accumulatedTranscriptRef.current.trim().toLowerCase();
            accumulatedTranscriptRef.current = ''; // Reset for next command
            
            // Optional wake word stripping
            const wakeWordRegex = /^(?:hey|ok|okay)?\s*(?:q\s*cart|cue\s*cart|queue\s*cart|you\s*cart|key\s*cart|q\s*part)?\s*(.*)/i;
            const match = fullCommand.match(wakeWordRegex);
            const commandToProcess = (match && match[1]) ? match[1].trim() : fullCommand;
            
            if (commandToProcess && commandToProcess.length > 2) {
              processCommand(commandToProcess);
            } else if (fullCommand.includes("cart") || fullCommand.includes("hey")) {
              setFeedback('AWAITING_COMMAND...');
              setTimeout(() => setFeedback(''), 3000);
              setTranscript('');
            }
          }, 1500); // 1.5s debounce
        }
      };

      recognitionRef.current.onend = () => {
        // If it was supposed to be listening but stopped (e.g. due to silence), restart it
        if (isActiveListeningRef.current) {
          try {
            recognitionRef.current.start();
          } catch(e) {
            // Already started or error
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech error", event.error);
        if (event.error !== 'no-speech') {
          setIsListening(false);
          setIsActiveListening(false);
          isActiveListeningRef.current = false;
          setFeedback("ERR_AUDIO_STREAM_INTERRUPTED");
          setTimeout(() => setFeedback(''), 3000);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isActiveListeningRef = useRef(false);

  const toggleListening = () => {
    if (isListening) {
      isActiveListeningRef.current = false;
      setIsActiveListening(false);
      setIsListening(false);
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setFeedback('');
      isActiveListeningRef.current = true;
      setIsActiveListening(true);
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  const processCommand = async (commandText: string) => {
    if (!commandText.trim()) return;
    
    setIsProcessing(true);
    setFeedback('PROCESSING_NLP_INTENT...');

    try {
      const response = await fetch('/api/parse-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command: commandText, currentItems: items }),
      });

      if (!response.ok) throw new Error('Failed to parse');

      const data = await response.json();
      
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      
      let intent: any = 'SYS_INIT';
      let confidence = (Math.random() * 0.1) + 0.9; // 0.90 to 0.99
      
      if (data.action === 'add' && data.items) {
        data.items.forEach((item: any) => addItem(item));
        setFeedback(data.message || `DATA_APPEND_SUCCESS [${data.items.length}]`);
        intent = 'ADD_ITEM';
      } else if (data.action === 'remove' && data.items) {
        data.items.forEach((itemToRemove: any) => {
          const item = items.find(i => i.name.toLowerCase() === itemToRemove.name.toLowerCase());
          if (item) removeItem(item.id);
        });
        setFeedback('DATA_PURGE_SUCCESS');
        intent = 'REMOVE_ITEM';
      } else if (data.action === 'search' && data.searchTerm) {
        setFeedback(`QUERY: ${data.searchTerm}`);
        window.dispatchEvent(new CustomEvent('SWITCH_TAB', { detail: 'inventory' }));
        const evt = new CustomEvent('GLOBAL_SEARCH', { detail: data.searchTerm });
        window.dispatchEvent(evt);
        intent = 'SEARCH_ITEM';
      } else {
        setFeedback("ERR_INTENT_UNKNOWN");
        intent = 'ERROR_PARSE';
        confidence = 0.102;
      }

      addCommandLog({
        timestamp: timeStr,
        transcript: `"${commandText}"`,
        intent: intent,
        confidence: Number(confidence.toFixed(3))
      });

    } catch (error) {
      console.error(error);
      setFeedback("ERR_SYS_FAILURE");
      
      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      addCommandLog({
        timestamp: timeStr,
        transcript: `"${commandText}"`,
        intent: 'ERROR_PARSE',
        confidence: 0.102
      });
      
    } finally {
      setIsProcessing(false);
      setTimeout(() => setFeedback(''), 4000);
      setTranscript('');
    }
  };

  return (
    <>
      {/* Desktop Voice Status Indicator (Persistent Bottom) */}
      <div className="fixed bottom-8 right-8 left-64 z-50 pointer-events-none hidden md:flex justify-end pr-8">
        <div className={`brutalist-border p-3 flex items-center gap-4 shadow-brutalist pointer-events-auto transition-colors ${
          isListening ? 'bg-[#cc0000]' : 'bg-surface'
        } ${isListening ? 'w-[600px]' : 'w-auto max-w-2xl'}`}>
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isListening ? 'bg-surface animate-pulse' : 'bg-primary'}`}></div>
          
          <select 
            value={language} 
            onChange={(e) => {
              setLanguage(e.target.value);
              if (recognitionRef.current) recognitionRef.current.lang = e.target.value;
            }}
            className={`font-label-caps bg-transparent border-none outline-none cursor-pointer flex-shrink-0 ${isListening ? 'text-surface' : 'text-primary'}`}
            disabled={isListening}
          >
            <option value="en-US">EN</option>
            <option value="es-ES">ES</option>
            <option value="fr-FR">FR</option>
            <option value="hi-IN">HI</option>
          </select>
          
          <span className={`font-label-caps font-bold flex-shrink-0 ${isListening ? 'text-surface' : 'text-primary'}`}>
            {isListening ? 'AWAITING INPUT' : 'SYS_IDLE'}
          </span>
          <div className={`flex-1 font-metadata truncate ${isListening ? 'text-surface' : 'text-secondary'}`}>
            {isListening 
              ? `"${transcript.toUpperCase() || 'SPEAK NOW...'}"` 
              : isProcessing 
                ? feedback 
                : feedback 
                  ? feedback 
                  : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const text = formData.get('manualInput') as string;
                        if (text) processCommand(text);
                        e.currentTarget.reset();
                      }}
                      className="w-full flex items-center"
                    >
                      <input 
                        name="manualInput"
                        type="text" 
                        placeholder="[ MANUAL ENTRY ]" 
                        className="bg-transparent border-none outline-none font-metadata focus:ring-0 placeholder:opacity-60 w-full"
                        disabled={isProcessing}
                      />
                      <button type="submit" className="hidden" />
                    </form>
                  )}
          </div>
          <button onClick={toggleListening} disabled={isProcessing} className={`flex-shrink-0 cursor-pointer hover:opacity-70 ${isListening ? 'text-surface' : 'text-primary'}`}>
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Voice Indicator */}
      <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex justify-center pointer-events-none">
        <div className={`brutalist-border p-3 flex items-center gap-4 shadow-brutalist pointer-events-auto w-full transition-colors ${
          isListening ? 'bg-[#cc0000]' : 'bg-surface'
        }`}>
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${isListening ? 'bg-surface animate-pulse' : 'bg-primary'}`}></div>
          <span className={`font-label-caps font-bold flex-shrink-0 ${isListening ? 'text-surface' : 'text-primary'}`}>
            {isListening ? 'WAKE' : 'SYS'}
          </span>
          <div className={`flex-1 font-metadata truncate ${isListening ? 'text-surface' : 'text-secondary'}`}>
            {isListening 
              ? `"${transcript.toUpperCase() || 'SAY HEY QCART'}"` 
              : isProcessing 
                ? feedback 
                : feedback 
                  ? feedback 
                  : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const text = formData.get('manualInput') as string;
                        if (text) processCommand(text);
                        e.currentTarget.reset();
                      }}
                      className="w-full flex items-center"
                    >
                      <input 
                        name="manualInput"
                        type="text" 
                        placeholder="[ MANUAL ]" 
                        className="bg-transparent border-none outline-none font-metadata focus:ring-0 placeholder:opacity-60 w-full p-0"
                        disabled={isProcessing}
                      />
                      <button type="submit" className="hidden" />
                    </form>
                  )}
          </div>
          <button onClick={toggleListening} disabled={isProcessing} className={`flex-shrink-0 cursor-pointer hover:opacity-70 ${isListening ? 'text-surface' : 'text-primary'}`}>
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </>
  );
}
