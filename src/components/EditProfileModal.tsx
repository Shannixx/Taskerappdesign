import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, User as UserIcon, Mail } from 'lucide-react';
import { User } from '../App';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (updates: Partial<User>) => void;
}

export function EditProfileModal({ isOpen, onClose, user, onSave }: EditProfileModalProps) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar);
    }
  }, [isOpen, user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onSave({ name: name.trim(), email: email.trim(), avatar });
      onClose();
    }
  };

  const handleAvatarChange = () => {
    const newAvatar = prompt('Enter avatar URL:', avatar);
    if (newAvatar) {
      setAvatar(newAvatar);
    }
  };

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
              className="bg-white dark:bg-[#1c1c1e] rounded-3xl w-full max-w-md shadow-2xl border border-gray-200 dark:border-gray-800 pointer-events-auto overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Profile</h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Avatar Section */}
                <div className="flex flex-col items-center">
                  <motion.button
                    type="button"
                    onClick={handleAvatarChange}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={avatar}
                        alt={name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700 transition-all group-hover:border-blue-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-full transition-all flex items-center justify-center">
                        <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </motion.button>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">Click to change photo</p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <UserIcon className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                    required
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full text-gray-900 dark:text-white px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-all"
                    required
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 px-5 py-3 font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all shadow-sm"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-5 py-3 font-semibold bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!name.trim() || !email.trim()}
                  >
                    Save Changes
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}