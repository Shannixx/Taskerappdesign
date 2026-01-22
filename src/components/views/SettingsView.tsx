import { motion } from 'motion/react';
import { User as UserIcon, Bell, Shield, HelpCircle, Lock, Fingerprint, Eye } from 'lucide-react';
import { User, NotificationSettings } from '../../App';
import { useState } from 'react';
import { HelpSupportModal } from '../HelpSupportModal';
import { PrivacySecurityModal } from '../PrivacySecurityModal';

interface SettingsViewProps {
  user: User;
  onUpdateUser: (updates: Partial<User>) => void;
  onEditProfile: () => void;
  notificationSettings: NotificationSettings;
  onUpdateNotificationSettings: (updates: Partial<NotificationSettings>) => void;
}

export function SettingsView({ 
  user, 
  onEditProfile,
  notificationSettings,
  onUpdateNotificationSettings 
}: SettingsViewProps) {
  const [helpModalType, setHelpModalType] = useState<'help' | 'contact' | 'about' | null>(null);
  const [securityModalType, setSecurityModalType] = useState<'password' | 'twoFactor' | 'privacy' | null>(null);

  const handleTwoFactor = () => {
    setSecurityModalType('twoFactor');
  };

  const handlePrivacySettings = () => {
    setSecurityModalType('privacy');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl"
    >
      {/* Profile Section */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          Profile
        </h3>
        <div className="flex items-start gap-4 mb-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-0.5">{user.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.email}</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onEditProfile}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-full transition-all shadow-lg shadow-blue-500/30"
            >
              Edit Profile
            </motion.button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Full Name</label>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Email Address</label>
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h3>
        <div className="space-y-4">
          {/* Task Reminders */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Task Reminders</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Get notified about upcoming tasks</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${
                notificationSettings.taskReminders 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {notificationSettings.taskReminders ? 'On' : 'Off'}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onUpdateNotificationSettings({ taskReminders: !notificationSettings.taskReminders })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notificationSettings.taskReminders ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: notificationSettings.taskReminders ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Email Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive updates via email</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${
                notificationSettings.emailNotifications 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {notificationSettings.emailNotifications ? 'On' : 'Off'}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onUpdateNotificationSettings({ emailNotifications: !notificationSettings.emailNotifications })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notificationSettings.emailNotifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: notificationSettings.emailNotifications ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Push Notifications</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Receive browser notifications</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-medium ${
                notificationSettings.pushNotifications 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}>
                {notificationSettings.pushNotifications ? 'On' : 'Off'}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onUpdateNotificationSettings({ pushNotifications: !notificationSettings.pushNotifications })}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  notificationSettings.pushNotifications ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: notificationSettings.pushNotifications ? 26 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Security */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Security
        </h3>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSecurityModalType('password')}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Change Password</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Update your password</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleTwoFactor}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
              <Fingerprint className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Add an extra layer of security</p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handlePrivacySettings}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Privacy Settings</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Manage your data and privacy</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          Help & Support
        </h3>
        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setHelpModalType('help')}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Help Center</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Get help with TaskPro</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setHelpModalType('contact')}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Contact Support</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Reach out to our team</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setHelpModalType('about')}
            className="w-full p-4 text-left bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-white">About TaskPro</p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Version 1.0.0</p>
          </motion.button>
        </div>
      </div>

      {/* Help Support Modal */}
      <HelpSupportModal
        isOpen={helpModalType !== null}
        type={helpModalType}
        onClose={() => setHelpModalType(null)}
      />

      {/* Privacy Security Modal */}
      <PrivacySecurityModal
        isOpen={securityModalType !== null}
        type={securityModalType}
        onClose={() => setSecurityModalType(null)}
      />
    </motion.div>
  );
}