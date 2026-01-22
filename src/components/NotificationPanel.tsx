import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CheckCheck, Trash2, Bell } from 'lucide-react';
import { Notification } from '../App';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: string) => void;
}

export function NotificationPanel({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}: NotificationPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: Notification['type']) => {
    const iconMap = {
      task: '✓',
      reminder: '⏰',
      update: '🔔',
      success: '✨',
    };
    return iconMap[type] || '•';
  };

  const getNotificationColor = (type: Notification['type']) => {
    const colorMap = {
      task: 'bg-blue-500',
      reminder: 'bg-orange-500',
      update: 'bg-purple-500',
      success: 'bg-green-500',
    };
    return colorMap[type] || 'bg-gray-500';
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute right-0 top-14 w-80 sm:w-96 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-40"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Notifications</h3>
                  {unreadCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-0.5 text-xs font-bold bg-blue-500 text-white rounded-full"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>
              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onMarkAllAsRead}
                  className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  Mark all as read
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20, height: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)', x: 4 }}
                      className={`p-4 transition-colors group cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        {/* Icon */}
                        <motion.div 
                          className={`w-8 h-8 ${getNotificationColor(notification.type)} rounded-full flex items-center justify-center text-white text-sm flex-shrink-0 shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          {getNotificationIcon(notification.type)}
                        </motion.div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <motion.div 
                                className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
                              {formatTime(notification.timestamp)}
                            </span>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.read && (
                                <motion.button
                                  whileHover={{ scale: 1.15, y: -2 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-md flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors shadow-sm"
                                  title="Mark as read"
                                >
                                  <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.15, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDelete(notification.id)}
                                className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-md flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors shadow-sm"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-12 text-center"
                >
                  <motion.div 
                    className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    <Bell className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                  </motion.div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">No notifications</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">You're all caught up!</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}