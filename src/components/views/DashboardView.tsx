import { motion } from 'motion/react';
import { Category, Task } from '../../App';
import { StatsCard } from '../StatsCard';
import { CategoryFilter } from '../CategoryFilter';
import { TaskCard } from '../TaskCard';
import { Plus } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface DashboardViewProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function DashboardView({ tasks, categories, onToggleTask, onDeleteTask }: DashboardViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredTasks = tasks.filter(task => 
    selectedCategory === 'all' || task.categoryId === selectedCategory
  );

  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.filter(t => !t.completed).length;
  const todayTasks = tasks.filter(t => {
    if (!t.dueDate) return false;
    const today = new Date().toDateString();
    const taskDate = new Date(t.dueDate).toDateString();
    return today === taskDate;
  }).length;

  const completionRate = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatsCard
          title="Total Tasks"
          value={completedCount}
          subtitle={`${completionRate}% completed`}
          color="blue"
          delay={0.1}
          showProgress={true}
          total={totalTasks}
        />
        <StatsCard
          title="Active"
          value={pendingCount}
          subtitle="In progress"
          color="orange"
          delay={0.15}
        />
        <StatsCard
          title="Completed"
          value={completedCount}
          subtitle="All time"
          color="green"
          delay={0.2}
        />
        <StatsCard
          title="Due Today"
          value={todayTasks}
          subtitle="Tasks scheduled"
          color="purple"
          delay={0.25}
        />
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => (
            <CategoryFilter
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => setSelectedCategory(category.id)}
              count={category.id === 'all' ? tasks.length : tasks.filter(t => t.categoryId === category.id).length}
              delay={0.35 + index * 0.05}
            />
          ))}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="space-y-6">
        {/* Active Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Active Tasks</h2>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
              {pendingTasks.length}
            </span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {pendingTasks.length > 0 ? (
              <div className="space-y-3">
                {pendingTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    delay={0.45 + index * 0.05}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-12 sm:p-16 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-600" strokeWidth={2} />
                </div>
                <p className="text-sm sm:text-base text-gray-900 dark:text-white mb-1">No active tasks</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">You're all caught up!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Completed Tasks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Completed Tasks</h2>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
              {completedTasks.length}
            </span>
          </div>
          
          <AnimatePresence mode="popLayout">
            {completedTasks.length > 0 ? (
              <div className="space-y-3">
                {completedTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    delay={0.5 + index * 0.05}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-[#1c1c1e] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-12 sm:p-16 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 dark:text-gray-600" strokeWidth={2} />
                </div>
                <p className="text-sm sm:text-base text-gray-900 dark:text-white mb-1">No completed tasks</p>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Complete some tasks to see them here</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}