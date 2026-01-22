import { Category } from '../App';
import { motion } from 'motion/react';

interface CategoryFilterProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
  count: number;
  delay?: number;
}

export function CategoryFilter({ category, isSelected, onClick, count, delay = 0 }: CategoryFilterProps) {
  const colorClasses: Record<string, { dot: string; bg: string; text: string }> = {
    blue: { 
      dot: 'bg-blue-500', 
      bg: 'bg-blue-500', 
      text: 'text-blue-500' 
    },
    purple: { 
      dot: 'bg-purple-500', 
      bg: 'bg-purple-500', 
      text: 'text-purple-500' 
    },
    pink: { 
      dot: 'bg-pink-500', 
      bg: 'bg-pink-500', 
      text: 'text-pink-500' 
    },
    teal: { 
      dot: 'bg-teal-500', 
      bg: 'bg-teal-500', 
      text: 'text-teal-500' 
    },
    slate: { 
      dot: 'bg-gray-500', 
      bg: 'bg-gray-700', 
      text: 'text-gray-500' 
    },
  };

  const colors = colorClasses[category.color];

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { type: 'spring', stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 sm:px-5 py-2.5 sm:py-3 rounded-full transition-all duration-300 flex items-center gap-2.5 sm:gap-3 whitespace-nowrap ${
        isSelected
          ? `${colors.bg} text-white shadow-lg`
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
      }`}
    >
      {/* Colored dot indicator */}
      {!isSelected && (
        <motion.div 
          className={`w-2 h-2 rounded-full ${colors.dot}`}
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      )}
      
      <span className="text-sm sm:text-[15px] font-semibold">{category.name}</span>
      
      {/* Count badge */}
      <motion.span 
        className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${
          isSelected 
            ? 'bg-white/30 text-white' 
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
        }`}
        key={count}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
      >
        {count}
      </motion.span>
    </motion.button>
  );
}