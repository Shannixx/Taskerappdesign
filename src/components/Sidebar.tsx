import { Home, CheckSquare, Calendar, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User } from '../App';

type View = 'dashboard' | 'tasks' | 'calendar' | 'settings';

interface SidebarProps {
  user: User;
  currentView: View;
  onViewChange: (view: View) => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export function Sidebar({ user, currentView, onViewChange, isMobileMenuOpen, onToggleMobileMenu }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard' as View, icon: Home, label: 'Dashboard' },
    { id: 'tasks' as View, icon: CheckSquare, label: 'My Tasks' },
    { id: 'calendar' as View, icon: Calendar, label: 'Calendar' },
    { id: 'settings' as View, icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation - iPhone optimized */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#1a1a26] backdrop-blur-xl border-t border-gray-800/50 mx-auto max-w-[390px]">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                whileTap={{ scale: 0.9 }}
                className="relative flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all flex-1 min-w-0"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon 
                  className={`w-5 h-5 transition-colors relative z-10 ${
                    isActive 
                      ? 'text-[#1a1a26]' 
                      : 'text-white/70'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className={`text-[10px] font-semibold relative z-10 truncate ${
                  isActive 
                    ? 'text-[#1a1a26]' 
                    : 'text-white/70'
                }`}>
                  {item.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
}