import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { VoiceInterface } from '@/components/voice/VoiceInterface';
import { ImageGenerator } from '@/components/images/ImageGenerator';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-spark-primary selection:text-white">
      <div className="max-w-lg mx-auto min-h-screen flex flex-col relative bg-card shadow-2xl">
        <Header />
        
        <main className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="h-full"
            >
              {activeTab === 'chat' && <ChatInterface />}
              {activeTab === 'voice' && <VoiceInterface />}
              {activeTab === 'images' && <ImageGenerator />}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <Toaster position="top-center" />
    </div>
  );
}
export default App;
