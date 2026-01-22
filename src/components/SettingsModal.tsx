import { motion, AnimatePresence } from 'motion/react';
import { X, Moon, Sun, User as UserIcon, Bell } from 'lucide-react';
import { User } from '../App';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  user: User;
}

export function SettingsModal({ isOpen, onClose, isDarkMode, onToggleDarkMode, user }: SettingsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 z-50 backdrop-blur-md"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-[#1c1c1e] rounded-3xl w-full max-w-lg shadow-2xl border border-gray-200 dark:border-gray-800 pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl text-gray-900 dark:text-white">Settings</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              <div className="p-6 space-y-6">
                {/* Profile Section */}
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Profile
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <button className="w-full py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-lg transition-colors">
                      Edit Profile
                    </button>
                  </div>
                </div>

                {/* Appearance Section */}
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    Appearance
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Switch between light and dark theme</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={onToggleDarkMode}
                        className={`relative w-12 h-7 rounded-full transition-colors ${
                          isDarkMode ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      >
                        <motion.div
                          animate={{ x: isDarkMode ? 22 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Notifications Section */}
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Notifications
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Task Reminders</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about upcoming tasks</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="relative w-12 h-7 rounded-full bg-blue-500"
                      >
                        <motion.div
                          animate={{ x: 22 }}
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">Email Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        className="relative w-12 h-7 rounded-full bg-gray-300"
                      >
                        <motion.div
                          animate={{ x: 2 }}
                          className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 dark:border-gray-800">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="w-full px-5 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
