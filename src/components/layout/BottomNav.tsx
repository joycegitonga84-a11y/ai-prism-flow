import React from 'react';
import { MessageSquare, Mic, Image as ImageIcon, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center w-full py-2 transition-all duration-200 relative",
      isActive ? "text-spark-primary" : "text-muted-foreground hover:text-foreground"
    )}
  >
    {isActive && (
      <div className="absolute top-0 w-8 h-1 bg-spark-primary rounded-full" />
    )}
    <Icon className={cn("w-6 h-6 mb-1", isActive && "animate-pulse")} />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav = ({ activeTab, setActiveTab }: BottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center max-w-lg mx-auto px-4">
        <NavItem
          icon={MessageSquare}
          label="Chat"
          isActive={activeTab === 'chat'}
          onClick={() => setActiveTab('chat')}
        />
        <NavItem
          icon={Mic}
          label="Voice"
          isActive={activeTab === 'voice'}
          onClick={() => setActiveTab('voice')}
        />
        <NavItem
          icon={ImageIcon}
          label="Images"
          isActive={activeTab === 'images'}
          onClick={() => setActiveTab('images')}
        />
      </div>
    </nav>
  );
};
