import { motion } from 'motion/react';
import { Category, Task } from '../../App';
import { TaskCard } from '../TaskCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface MyTasksViewProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updates: Partial<Task>) => void;
}

export function MyTasksView({ tasks, categories, onToggleTask, onDeleteTask }: MyTasksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'name'>('date');

  const filteredTasks = tasks
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesSearch && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Search and Filter Bar */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-3 bg-white dark:bg-[#1c1c1e] border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-gray-500 flex-shrink-0" />
          {(['all', 'high', 'medium', 'low'] as const).map((priority) => (
            <motion.button
              key={priority}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterPriority(priority)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filterPriority === priority
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {priority === 'all' ? 'All' : priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </motion.button>
          ))}
        </div>
      </div>

      {/* Task Lists */}
      <div className="space-y-8">
        {/* Active Tasks */}
        <div>
          <h2 className="text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            Active Tasks
            <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
              {activeTasks.length}
            </span>
          </h2>
          <AnimatePresence mode="popLayout">
            {activeTasks.length > 0 ? (
              <div className="space-y-3">
                {activeTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    category={categories.find(c => c.id === task.categoryId)}
                    onToggle={() => onToggleTask(task.id)}
                    onDelete={() => onDeleteTask(task.id)}
                    delay={0.1 + index * 0.05}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-[#1c1c1e] rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center"
              >
                <p className="text-gray-500 dark:text-gray-400">No active tasks found</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Completed Tasks */}
        {completedTasks.length > 0 && (
          <div>
            <h2 className="text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              Completed Tasks
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                {completedTasks.length}
              </span>
            </h2>
            <div className="space-y-3">
              {completedTasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  category={categories.find(c => c.id === task.categoryId)}
                  onToggle={() => onToggleTask(task.id)}
                  onDelete={() => onDeleteTask(task.id)}
                  delay={0.1 + index * 0.05}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}