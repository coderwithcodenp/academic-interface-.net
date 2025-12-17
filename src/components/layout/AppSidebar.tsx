import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BookOpen,
  Calendar,
  BarChart3,
  Settings,
  PenLine,
  Search,
  Menu,
  X,
  Flame,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Dashboard', url: '/', icon: BarChart3 },
  { title: 'New Entry', url: '/entry', icon: PenLine },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Journal', url: '/entries', icon: BookOpen },
  { title: 'Search', url: '/search', icon: Search },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-accent-foreground" />
            </div>
            <span className="font-serif text-lg font-semibold">Reflecta</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      {/* Streak Display */}
      {!collapsed && (
        <div className="mx-4 mt-4 p-3 rounded-lg bg-sidebar-accent">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-400" />
            <div>
              <p className="text-xs text-sidebar-foreground/70">Current Streak</p>
              <p className="font-semibold">7 days</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-150',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 text-center">
            Version 1.0.0
          </p>
        </div>
      )}
    </aside>
  );
}
