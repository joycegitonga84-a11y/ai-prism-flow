import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Spark AI. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  const generateResponse = (text: string) => {
    const responses = [
      "That's an interesting perspective. Tell me more about it.",
      "I've analyzed your request and I can certainly help with that.",
      "Spark AI is optimized for tasks like this. What specific details should we focus on?",
      "I'm processing that information right now. It looks like we're on the right track.",
      "As an AI, I can help you brainstorm several ideas for this project.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-lg mx-auto px-4 pt-4">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide"
      >
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "flex items-end gap-2 max-w-[85%]",
                message.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                message.sender === 'user' ? "bg-spark-primary" : "bg-spark-surface-lighter"
              )}>
                {message.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5 text-spark-primary" />}
              </div>
              <div className={cn(
                "px-4 py-2 rounded-2xl text-sm leading-relaxed",
                message.sender === 'user' 
                  ? "bg-spark-primary text-primary-foreground rounded-br-none" 
                  : "bg-spark-surface-lighter text-foreground rounded-bl-none"
              )}>
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-end gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-spark-surface-lighter flex items-center justify-center">
              <Bot className="w-5 h-5 text-spark-primary" />
            </div>
            <div className="bg-spark-surface-lighter px-4 py-3 rounded-2xl rounded-bl-none">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-spark-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-spark-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-spark-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="py-4 border-t border-border bg-background">
        <div className="relative flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="pr-12 py-6 rounded-2xl bg-spark-surface border-none focus-visible:ring-1 focus-visible:ring-spark-primary"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-1.5 w-10 h-10 rounded-xl bg-spark-primary hover:bg-spark-primary/90 transition-all"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
