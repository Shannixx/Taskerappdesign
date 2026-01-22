import { Calendar, MoreVertical, Trash2 } from 'lucide-react';
import { Task, Category } from '../App';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface TaskCardProps {
  task: Task;
  category?: Category;
  onToggle: () => void;
  onDelete: () => void;
  delay?: number;
}

export function TaskCard({ task, category, onToggle, onDelete, delay = 0 }: TaskCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const priorityColors = {
    low: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    medium: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    high: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  const categoryColors: Record<string, string> = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-400',
    teal: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400',
    slate: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400',
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 30 }}
      layout
      className={`bg-white dark:bg-[#1c1c1e] rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-black/20 transition-all duration-300 ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
            task.completed
              ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30'
              : 'border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
          }`}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.svg
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`text-sm sm:text-[15px] font-semibold leading-snug transition-all duration-300 ${
              task.completed ? 'text-gray-400 dark:text-gray-600 line-through' : 'text-gray-900 dark:text-white'
            }`}>
              {task.title}
            </h3>
            
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </motion.button>
              
              <AnimatePresence>
                {showMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      className="absolute right-0 top-10 bg-white dark:bg-[#1c1c1e] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 py-1 min-w-[140px] z-20 overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          onDelete();
                          setShowMenu(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 flex items-center gap-2 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {task.description && (
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            {category && (
              <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full ${categoryColors[category.color]}`}>
                {category.name}
              </span>
            )}
            
            <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full capitalize ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>

            {task.dueDate && (
              <span className={`text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full flex items-center gap-1 ${
                isOverdue ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}