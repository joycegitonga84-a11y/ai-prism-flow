import React, { useState } from 'react';
import { Search, Sparkles, Wand2, Download, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface GeneratedImage {
  id: string;
  url: string;
  title: string;
  prompt: string;
}

const MOCK_IMAGES: GeneratedImage[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9dd5dcf-064f-4740-ae09-28012f86f275/cyberpunk-city-db60aafc-1781098015041.webp',
    title: 'Cyberpunk City',
    prompt: 'A futuristic cyberpunk city with neon lights and flying cars',
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9dd5dcf-064f-4740-ae09-28012f86f275/ai-assistant-6bf253b3-1781098015613.webp',
    title: 'AI Assistant',
    prompt: 'A professional AI assistant robot helping a human in a modern office',
  },
  {
    id: '3',
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9dd5dcf-064f-4740-ae09-28012f86f275/neural-network-664a87ca-1781098016771.webp',
    title: 'Neural Network',
    prompt: 'Abstract digital representation of a neural network',
  },
  {
    id: '4',
    url: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/b9dd5dcf-064f-4740-ae09-28012f86f275/futuristic-garden-2773fe5c-1781098016510.webp',
    title: 'Futuristic Garden',
    prompt: 'A serene futuristic garden with bioluminescent plants',
  },
];

const SUGGESTIONS = [
  "Cyberpunk metropolis",
  "Interstellar nebula",
  "Steampunk owl",
  "Minimalist zen garden",
  "Ancient dragon city"
];

export const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>(MOCK_IMAGES);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)].url,
        title: prompt,
        prompt: prompt,
      };
      setImages([newImage, ...images]);
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-lg mx-auto px-4 pt-4 overflow-hidden">
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to see..."
            className="pr-12 py-8 rounded-2xl bg-spark-surface border-none focus-visible:ring-1 focus-visible:ring-spark-primary text-lg"
          />
          <Button
            size="icon"
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-spark-primary hover:bg-spark-primary/90"
          >
            <Wand2 className={cn("w-6 h-6", isGenerating && "animate-spin")} />
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="whitespace-nowrap px-4 py-1.5 rounded-full bg-spark-surface-lighter text-sm font-medium hover:bg-spark-primary hover:text-white transition-colors border border-border/50"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 pb-8">
          <AnimatePresence mode="popLayout">
            {isGenerating && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="col-span-1 aspect-square rounded-2xl overflow-hidden bg-spark-surface-lighter flex flex-col items-center justify-center p-4 text-center border-2 border-dashed border-spark-primary/30"
              >
                <div className="relative w-12 h-12 mb-3">
                  <Sparkles className="w-full h-full text-spark-primary animate-pulse" />
                  <div className="absolute inset-0 rounded-full border-2 border-spark-primary animate-ping opacity-20" />
                </div>
                <p className="text-xs font-medium text-spark-primary">Generating your vision...</p>
              </motion.div>
            )}

            {images.map((image) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-spark-surface"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                  <p className="text-xs font-bold text-white mb-1 line-clamp-1">{image.title}</p>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 backdrop-blur-md text-white transition-colors">
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
