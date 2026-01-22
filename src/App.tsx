import { useState, useEffect } from 'react';
import { Plus, Bell, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { MyTasksView } from './components/views/MyTasksView';
import { CalendarView } from './components/views/CalendarView';
import { SettingsView } from './components/views/SettingsView';
import { AddTaskModal } from './components/AddTaskModal';
import { EditProfileModal } from './components/EditProfileModal';
import { NotificationPanel } from './components/NotificationPanel';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

export interface Notification {
  id: string;
  type: 'task' | 'reminder' | 'update' | 'success';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationSettings {
  taskReminders: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
}

type View = 'dashboard' | 'tasks' | 'calendar' | 'settings';

export default function App() {
  const [user, setUser] = useState<User>({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  });

  const [categories] = useState<Category[]>([
    { id: 'all', name: 'All Tasks', color: 'slate' },
    { id: '1', name: 'Development', color: 'blue' },
    { id: '2', name: 'Design', color: 'purple' },
    { id: '3', name: 'Marketing', color: 'pink' },
    { id: '4', name: 'Personal', color: 'teal' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Design new landing page',
      description: 'Create wireframes and mockups for the new landing page',
      completed: false,
      categoryId: '2',
      priority: 'high',
      dueDate: '2026-01-15',
      createdAt: '2026-01-08',
    },
    {
      id: '2',
      title: 'Review pull requests',
      description: 'Check and merge pending PRs from the team',
      completed: false,
      categoryId: '1',
      priority: 'medium',
      dueDate: '2026-01-14',
      createdAt: '2026-01-08',
    },
    {
      id: '3',
      title: 'Update documentation',
      description: 'Add API documentation for new endpoints',
      completed: true,
      categoryId: '1',
      priority: 'low',
      createdAt: '2026-01-07',
    },
    {
      id: '4',
      title: 'Prepare social media content',
      description: 'Schedule posts for next week',
      completed: false,
      categoryId: '3',
      priority: 'medium',
      dueDate: '2026-01-16',
      createdAt: '2026-01-08',
    },
    {
      id: '5',
      title: 'Team meeting',
      description: 'Quarterly planning session',
      completed: false,
      categoryId: '4',
      priority: 'high',
      dueDate: '2026-01-13',
      createdAt: '2026-01-09',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'reminder',
      title: 'Task Due Today',
      message: 'Team meeting is scheduled for today at 2:00 PM',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '2',
      type: 'task',
      title: 'New Task Assigned',
      message: 'You have been assigned to "Design new landing page"',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: 'Task Completed',
      message: 'Great job! You completed "Update documentation"',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
    {
      id: '4',
      type: 'update',
      title: 'System Update',
      message: 'TaskPro has been updated to version 1.0.1',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: true,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notificationSettings');
      return saved ? JSON.parse(saved) : {
        taskReminders: true,
        emailNotifications: false,
        pushNotifications: true,
      };
    }
    return {
      taskReminders: true,
      emailNotifications: false,
      pushNotifications: true,
    };
  });

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
  }, [notificationSettings]);

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to sign out?')) {
      alert('Signing out...');
      setShowProfileMenu(false);
    }
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    setUser({ ...user, ...updates });
  };

  const handleMarkNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllNotificationsAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  const viewTitles: Record<View, string> = {
    dashboard: 'Dashboard',
    tasks: 'My Tasks',
    calendar: 'Calendar',
    settings: 'Settings',
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300">
      {/* Mobile-optimized layout - max width for iPhone 13 Pro */}
      <div className="max-w-[390px] mx-auto min-h-screen bg-[#f5f5f7] dark:bg-[#000000] relative">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            user={user}
            currentView={currentView}
            onViewChange={handleViewChange}
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Main Content */}
          <div className="flex-1 min-h-screen w-full pb-20">
            {/* Top Bar */}
            <header className="sticky top-0 z-20 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
              <div className="px-4 py-4">
                <div className="flex items-center justify-between gap-4">
                  {/* Title */}
                  <div className="flex-1 min-w-0">
                    <motion.h1 
                      key={currentView}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight truncate"
                    >
                      {viewTitles[currentView]}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mt-1 truncate"
                    >
                      {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </motion.p>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-10 h-10 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
                      >
                        <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" strokeWidth={2} />
                        {unreadNotificationCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                          >
                            {unreadNotificationCount}
                          </motion.span>
                        )}
                      </motion.button>

                      <NotificationPanel
                        isOpen={showNotifications}
                        onClose={() => setShowNotifications(false)}
                        notifications={notifications}
                        onMarkAsRead={handleMarkNotificationAsRead}
                        onMarkAllAsRead={handleMarkAllNotificationsAsRead}
                        onDelete={handleDeleteNotification}
                      />
                    </div>

                    <div className="relative">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-3 px-2 sm:px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-9 h-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                      </motion.button>

                      <AnimatePresence>
                        {showProfileMenu && (
                          <>
                            <div 
                              className="fixed inset-0 z-30" 
                              onClick={() => setShowProfileMenu(false)}
                            />
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95, y: -10 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -10 }}
                              className="absolute right-0 top-14 w-64 bg-white dark:bg-[#1c1c1e] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden z-40"
                            >
                              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                              </div>
                              <div className="p-2">
                                <button 
                                  onClick={() => {
                                    setShowProfileMenu(false);
                                    setCurrentView('settings');
                                  }}
                                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center gap-3 transition-colors"
                                >
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                  </div>
                                  Settings
                                </button>
                                <button 
                                  onClick={handleLogout}
                                  className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg flex items-center gap-3 transition-colors"
                                >
                                  <LogOut className="w-4 h-4" />
                                  Sign out
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* View Content */}
            <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              <AnimatePresence mode="wait">
                {currentView === 'dashboard' && (
                  <DashboardView
                    key="dashboard"
                    tasks={tasks}
                    categories={categories}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
                {currentView === 'tasks' && (
                  <MyTasksView
                    key="tasks"
                    tasks={tasks}
                    categories={categories}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={handleUpdateTask}
                  />
                )}
                {currentView === 'calendar' && (
                  <CalendarView
                    key="calendar"
                    tasks={tasks}
                    categories={categories}
                    onToggleTask={handleToggleTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
                {currentView === 'settings' && (
                  <SettingsView
                    key="settings"
                    user={user}
                    onUpdateUser={handleUpdateUser}
                    onEditProfile={() => setIsEditProfileOpen(true)}
                    notificationSettings={notificationSettings}
                    onUpdateNotificationSettings={setNotificationSettings}
                  />
                )}
              </AnimatePresence>
            </main>
          </div>
        </div>

        {/* Floating Action Button - Hide on Settings - Bottom-right */}
        {currentView !== 'settings' && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-24 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-2xl flex items-center justify-center hover:bg-blue-600 transition-all group z-30"
          >
            <Plus className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" strokeWidth={2.5} />
          </motion.button>
        )}

        {/* Add Task Modal */}
        <AddTaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddTask}
          categories={categories.filter(c => c.id !== 'all')}
        />

        {/* Edit Profile Modal */}
        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={() => setIsEditProfileOpen(false)}
          user={user}
          onSave={handleUpdateUser}
        />
      </div>
    </div>
  );
}