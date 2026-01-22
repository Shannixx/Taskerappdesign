import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface StatsCardProps {
  title: string;
  value: number;
  subtitle?: string;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple';
  delay?: number;
  showProgress?: boolean;
  total?: number;
}

export function StatsCard({ title, value, subtitle, color, delay = 0, showProgress = false, total = 0 }: StatsCardProps) {
  const colorClasses = {
    blue: { gradient: 'from-blue-500 to-blue-600', stroke: '#3b82f6', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    green: { gradient: 'from-green-500 to-green-600', stroke: '#10b981', bg: 'bg-green-100 dark:bg-green-900/30' },
    orange: { gradient: 'from-orange-500 to-orange-600', stroke: '#f97316', bg: 'bg-orange-100 dark:bg-orange-900/30' },
    red: { gradient: 'from-red-500 to-red-600', stroke: '#ef4444', bg: 'bg-red-100 dark:bg-red-900/30' },
    purple: { gradient: 'from-purple-500 to-purple-600', stroke: '#a855f7', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  };

  // Calculate percentage for circular progress
  const percentage = showProgress && total > 0 ? Math.round((value / total) * 100) : 0;
  
  // Circle progress bar settings - smaller for mobile
  const size = 48; // Smaller circle for mobile
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-black/20 transition-all duration-300"
    >
      {showProgress ? (
        // Circular progress design - mobile optimized
        <div className="space-y-2.5">
          <div className="flex items-center gap-3">
            {/* Circular progress on the left */}
            <div className="relative w-12 h-12 flex-shrink-0">
              {/* Background circle */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth={strokeWidth}
                  fill="none"
                  className="dark:stroke-gray-700"
                />
                {/* Progress circle */}
                <motion.circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={colorClasses[color].stroke}
                  strokeWidth={strokeWidth}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1, delay: delay + 0.2, ease: 'easeInOut' }}
                />
              </svg>
              {/* Percentage text inside circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-900 dark:text-white">
                  {percentage}%
                </span>
              </div>
            </div>
            {/* Large number on the right */}
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{total}</div>
          </div>
          {/* Title and subtitle below */}
          <div>
            <div className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{title}</div>
            {subtitle && (
              <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{subtitle}</div>
            )}
          </div>
        </div>
      ) : (
        // Original icon design for other cards - more compact
        <>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorClasses[color].gradient} flex items-center justify-center mb-3 shadow-lg`}>
            <div className="w-5 h-5 bg-white/30 rounded-md"></div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
          <div className="text-xs font-semibold text-gray-900 dark:text-white mb-0.5">{title}</div>
          {subtitle && (
            <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400">{subtitle}</div>
          )}
        </>
      )}
    </motion.div>
  );
}