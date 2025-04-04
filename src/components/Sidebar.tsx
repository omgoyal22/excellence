
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CalendarDays, CheckSquare, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'Todos', path: '/todos' },
    { icon: CalendarDays, label: 'Calendar', path: '/calendar' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="md:w-64 w-full md:min-h-0 bg-card border-r border-border">
      <div className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
