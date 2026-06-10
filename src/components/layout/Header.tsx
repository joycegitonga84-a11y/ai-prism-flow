import { Sparkles, Bell, User } from 'lucide-react';

export const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/50 backdrop-blur-md sticky top-0 z-40 border-b border-border/50">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-spark-primary flex items-center justify-center shadow-lg shadow-spark-primary/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">Spark AI</h1>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-spark-surface-lighter border border-border/50 text-foreground">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-spark-primary rounded-full border-2 border-background" />
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden border border-border/50 bg-spark-surface-lighter flex items-center justify-center">
          <User className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};
