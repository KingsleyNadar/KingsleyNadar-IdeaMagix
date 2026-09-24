import { Bell, Search } from 'lucide-react';

export default function Header({ title }) {
  return (
    <header className="h-16 bg-victorian-offwhite border-b border-victorian-charcoal/20 flex items-center justify-between px-8 sticky top-0 z-10 font-serif">
      <h1 className="text-2xl font-serif italic text-victorian-ink">{title}</h1>
      
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-9 pr-4 py-2 bg-victorian-paper border border-victorian-charcoal/30 rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-victorian-gold focus:border-victorian-gold transition-all w-64 text-victorian-ink font-serif italic"
          />
        </div>
        
        <button className="relative p-2 text-victorian-charcoal/70 hover:text-victorian-ink transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-victorian-burgundy rounded-full border border-victorian-offwhite"></span>
        </button>
      </div>
    </header>
  );
}
