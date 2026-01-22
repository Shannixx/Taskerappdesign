import { motion } from 'motion/react';
import { Category, Task } from '../../App';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { useState } from 'react';

interface CalendarViewProps {
  tasks: Task[];
  categories: Category[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function CalendarView({ tasks, categories, onToggleTask }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getTasksForDate = (date: Date) => {
    const dateString = date.toDateString();
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      return new Date(task.dueDate).toDateString() === dateString;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: startingDayOfWeek }, (_, i) => i);

  const today = new Date();
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Calendar Header */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <motion.h2 
            key={monthName}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white"
          >
            {monthName}
          </motion.h2>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={previousMonth}
              className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextMonth}
              className="w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm hover:shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2"
            >
              {day}
            </div>
          ))}

          {/* Empty cells */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square" />
          ))}

          {/* Day cells */}
          {days.map((day) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const dayTasks = getTasksForDate(date);
            const todayClass = isToday(day);

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: day * 0.01 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`min-h-[80px] sm:min-h-[100px] p-2 sm:p-3 rounded-xl border transition-all cursor-pointer shadow-sm hover:shadow-md ${
                  todayClass
                    ? 'bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/30'
                    : dayTasks.length > 0
                    ? 'bg-gray-50 dark:bg-gray-800/30 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    : 'bg-white dark:bg-gray-800/20 border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }`}
              >
                <div className={`text-sm font-bold mb-1 ${todayClass ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {day}
                </div>
                {dayTasks.length > 0 && (
                  <div className="space-y-1">
                    {dayTasks.slice(0, 2).map((task, idx) => {
                      const category = categories.find(c => c.id === task.categoryId);
                      const colorMap: Record<string, { bg: string, text: string, dot: string }> = {
                        blue: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', dot: 'bg-blue-500' },
                        purple: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-500' },
                        pink: { bg: 'bg-pink-100 dark:bg-pink-900/30', text: 'text-pink-700 dark:text-pink-300', dot: 'bg-pink-500' },
                        teal: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', dot: 'bg-teal-500' },
                        slate: { bg: 'bg-gray-100 dark:bg-gray-700/30', text: 'text-gray-700 dark:text-gray-300', dot: 'bg-gray-500' },
                      };
                      const colors = category ? colorMap[category.color] : colorMap.slate;
                      
                      return (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + idx * 0.05 }}
                          whileHover={{ scale: 1.05, x: 2 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleTask(task.id);
                          }}
                          className={`${colors.bg} ${colors.text} px-2 py-1 rounded-md text-xs font-medium truncate flex items-center gap-1.5 cursor-pointer transition-all ${
                            task.completed ? 'opacity-50 line-through' : ''
                          }`}
                          title={task.title}
                        >
                          <motion.div 
                            className={`w-1.5 h-1.5 rounded-full ${colors.dot} flex-shrink-0`}
                            animate={!task.completed ? {
                              scale: [1, 1.3, 1],
                            } : {}}
                            transition={{
                              duration: 1.5,
                              repeat: !task.completed ? Infinity : 0,
                              repeatDelay: 0.5
                            }}
                          />
                          <span className="truncate">{task.title}</span>
                        </motion.div>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 pl-2">
                        +{dayTasks.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <CalendarIcon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <h3 className="text-lg text-gray-900 dark:text-white">Upcoming Tasks</h3>
          <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
            {tasks.filter(task => task.dueDate && !task.completed).length}
          </span>
        </div>
        <div className="space-y-2">
          {tasks
            .filter(task => task.dueDate && !task.completed)
            .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
            .slice(0, 8)
            .map((task) => {
              const category = categories.find(c => c.id === task.categoryId);
              const dueDate = new Date(task.dueDate!);
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const taskDate = new Date(dueDate);
              taskDate.setHours(0, 0, 0, 0);
              const isOverdue = taskDate < today;
              const isToday = taskDate.getTime() === today.getTime();
              
              const colorMap: Record<string, string> = {
                blue: 'bg-blue-500',
                purple: 'bg-purple-500',
                pink: 'bg-pink-500',
                teal: 'bg-teal-500',
                slate: 'bg-gray-500',
              };
              
              return (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    isOverdue ? 'bg-red-500' : isToday ? 'bg-orange-500' : category ? colorMap[category.color] : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      {category && (
                        <>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{category.name}</span>
                        </>
                      )}
                    </div>
                  </div>
                  {isOverdue && (
                    <span className="text-xs text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded-md flex-shrink-0">
                      Overdue
                    </span>
                  )}
                  {isToday && (
                    <span className="text-xs text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-md flex-shrink-0">
                      Today
                    </span>
                  )}
                  {!isOverdue && !isToday && (
                    <span className={`text-xs px-2 py-1 rounded-md flex-shrink-0 ${
                      task.priority === 'high' 
                        ? 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20'
                        : task.priority === 'medium'
                        ? 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20'
                        : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800'
                    }`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  )}
                </motion.div>
              );
            })}
          {tasks.filter(task => task.dueDate && !task.completed).length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <CalendarIcon className="w-8 h-8 text-gray-400 dark:text-gray-600" />
              </div>
              <p className="text-sm text-gray-900 dark:text-white mb-1">No upcoming tasks</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">You're all caught up!</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}