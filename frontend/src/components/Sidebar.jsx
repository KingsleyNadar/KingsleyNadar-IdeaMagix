import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { BookOpen, Calendar, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Schedule', path: '/admin/schedule', icon: LayoutDashboard }
  ];

  const instructorLinks = [
    { name: 'My Schedule', path: '/instructor', icon: Calendar },
  ];

  const links = user?.role === 'Admin' ? adminLinks : instructorLinks;

  return (
    <div className="w-64 bg-[#6B1F3A] text-white border-r border-victorian-charcoal/30 h-screen flex flex-col fixed left-0 top-0 font-serif">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-victorian-ink rounded-full border border-victorian-gold flex items-center justify-center">
          <BookOpen className="text-victorian-gold w-4 h-4" />
        </div>
        <span className="text-3xl font-calligraphy text-victorian-ink tracking-wide">Logo</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin' || link.path === '/instructor'}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-serif italic transition-colors",
                isActive
                  ? "bg-victorian-paper border-l-2 border-l-victorian-burgundy border-y border-y-transparent border-r border-r-transparent text-victorian-burgundy"
                  : "text-victorian-charcoal hover:bg-victorian-paper hover:text-victorian-ink border border-transparent"
              )
            }
          >
            <link.icon className="w-5 h-5" />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-victorian-charcoal/30">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-10 h-10 rounded-full bg-victorian-paper border border-victorian-gold/50 flex items-center justify-center text-victorian-ink font-serif uppercase">
            {user?.name?.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-serif text-victorian-ink">{user?.name}</span>
            <span className="text-xs text-victorian-charcoal italic">{user?.role}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-serif italic text-victorian-ink bg-victorian-paper border border-victorian-charcoal/30 hover:bg-victorian-charcoal hover:text-victorian-offwhite rounded-sm transition-colors uppercase tracking-widest"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
