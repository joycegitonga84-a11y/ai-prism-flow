import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Settings, X, AudioLines } from 'lucide-react';
import { cn } from '@/lib/utils';

export function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<'idle' | 'listening' | 'processing' | 'speaking'>('idle');

  useEffect(() => {
    let timeout: any;
    if (status === 'listening') {
      timeout = setTimeout(() => {
        setStatus('processing');
        setTimeout(() => {
          setStatus('speaking');
          setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [status]);

  const toggleListening = () => {
    if (status === 'idle') {
      setStatus('listening');
    } else {
      setStatus('idle');
    }
  };

  return (
    <div className="flex flex-col h-full bg-spark-surface pt-12 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-spark-primary/20 via-transparent to-transparent opacity-50 pointer-events-none" />

      <header className="px-6 py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-spark-primary" />
          <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Voice Session</span>
        </div>
        <button className="p-2 text-muted-foreground hover:text-foreground">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="relative mb-12">
          <AnimatePresence mode="wait">
            {status === 'listening' && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 rounded-full bg-spark-primary/20 blur-2xl"
              />
            )}
          </AnimatePresence>
          
          <div className="w-48 h-48 rounded-full border border-white/5 flex items-center justify-center relative bg-spark-surface-lighter/50 backdrop-blur-3xl shadow-2xl">
            <div className="flex gap-1.5 h-16 items-center">
              {[...Array(status === 'idle' ? 5 : 12)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={status !== 'idle' ? {
                    height: [20, 40, 25, 60, 20],
                  } : { height: 10 }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    delay: i * 0.1,
                  }}
                  className={cn(
                    "w-1.5 rounded-full transition-colors",
                    status === 'listening' ? "bg-spark-primary" : 
                    status === 'processing' ? "bg-spark-accent" :
                    status === 'speaking' ? "bg-blue-400" : "bg-muted-foreground/30"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="text-center space-y-2 px-8">
          <h2 className="text-2xl font-bold tracking-tight">
            {status === 'idle' && "Ready to Talk"}
            {status === 'listening' && "Listening..."}
            {status === 'processing' && "Thinking..."}
            {status === 'speaking' && "Spark Speaking"}
          </h2>
          <p className="text-muted-foreground text-sm">
            {status === 'idle' && "Tap the microphone to begin your conversation."}
            {status === 'listening' && "Go ahead, I'm all ears."}
            {status === 'processing' && "Gathering my thoughts..."}
            {status === 'speaking' && "Synthesizing response for you."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 px-6 pb-12 relative z-10">
        <button className="p-4 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-all">
          <MicOff size={24} />
        </button>

        <button 
          onClick={toggleListening}
          className={cn(
            "p-8 rounded-full shadow-2xl transition-all active:scale-95 group relative",
            status === 'idle' ? "bg-white text-black" : "bg-spark-primary text-white"
          )}
        >
          {status === 'idle' ? <Mic size={32} /> : <X size={32} />}
          {status !== 'idle' && (
            <div className="absolute inset-0 rounded-full border-4 border-spark-primary animate-ping opacity-30" />
          )}
        </button>

        <button className="p-4 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 transition-all">
          <AudioLines size={24} />
        </button>
      </div>
    </div>
  );
}
