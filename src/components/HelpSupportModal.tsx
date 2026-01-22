import { motion, AnimatePresence } from 'motion/react';
import { X, HelpCircle, Mail, Phone, MessageCircle, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface HelpSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'help' | 'contact' | 'about' | null;
}

export function HelpSupportModal({ isOpen, onClose, type }: HelpSupportModalProps) {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  // Don't render if type is null
  if (!type) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#1c1c1e] rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                {type === 'help' && (
                  <>
                    <HelpCircle className="w-6 h-6" />
                    Help Center
                  </>
                )}
                {type === 'contact' && (
                  <>
                    <MessageCircle className="w-6 h-6" />
                    Contact Support
                  </>
                )}
                {type === 'about' && (
                  <>
                    <AlertCircle className="w-6 h-6" />
                    About TaskPro
                  </>
                )}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {type === 'help' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get help with TaskPro. Browse our frequently asked questions or search for specific topics.
                  </p>

                  {/* FAQ Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg text-gray-900 dark:text-white flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Frequently Asked Questions
                    </h3>

                    <div className="space-y-3">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          How do I create a new task?
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Navigate to "My Tasks" and click the "+ Add Task" button. Fill in the task details including title, description, category, priority, and due date.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          How do I mark a task as complete?
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Click the checkbox next to any task to mark it as complete. Completed tasks will show a strikethrough and can be filtered out.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          Can I organize tasks by category?
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Yes! You can assign categories like Personal, Work, Shopping, Health, and Finance to your tasks. Use the filter buttons to view tasks by category.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          How do I change my profile photo?
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Go to Settings, click "Edit Profile", then click on your current avatar to upload a new photo.
                        </p>
                      </div>

                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                          How do I enable dark mode?
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Navigate to Settings and toggle the "Dark Mode" switch under the Appearance section. Your preference will be saved automatically.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Resources */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Additional Resources
                    </h4>
                    <div className="space-y-2">
                      <a href="#" className="block p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                        <p className="text-sm text-blue-600 dark:text-blue-400">📚 User Guide</p>
                      </a>
                      <a href="#" className="block p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                        <p className="text-sm text-purple-600 dark:text-purple-400">🎥 Video Tutorials</p>
                      </a>
                      <a href="#" className="block p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors">
                        <p className="text-sm text-teal-600 dark:text-teal-400">💡 Tips & Tricks</p>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {type === 'contact' && (
                <div className="space-y-6">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We'll get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Reach out to our team. We're here to help you 24/7.
                      </p>

                      {/* Contact Methods */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
                          <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Email</p>
                          <p className="text-sm text-gray-900 dark:text-white">support@taskpro.com</p>
                        </div>
                        <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-center">
                          <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Phone</p>
                          <p className="text-sm text-gray-900 dark:text-white">1-800-TASKPRO</p>
                        </div>
                        <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-xl text-center">
                          <MessageCircle className="w-6 h-6 text-teal-600 dark:text-teal-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Live Chat</p>
                          <p className="text-sm text-gray-900 dark:text-white">Available 24/7</p>
                        </div>
                      </div>

                      {/* Contact Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Your Name
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            required
                            value={contactForm.subject}
                            onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How can we help?"
                          />
                        </div>

                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Message
                          </label>
                          <textarea
                            required
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                            rows={5}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Tell us more about your issue..."
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors"
                        >
                          Send Message
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              )}

              {type === 'about' && (
                <div className="space-y-6">
                  {/* App Logo/Icon */}
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl text-white font-bold">T</span>
                    </div>
                    <h3 className="text-2xl text-gray-900 dark:text-white mb-2">TaskPro</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Task Management Application
                    </p>
                  </div>

                  {/* Version Info */}
                  <div className="space-y-3">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Version</span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">1.0.0</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Build Date</span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">January 13, 2026</span>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">License</span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">MIT</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Features
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-xs text-blue-600 dark:text-blue-400">✓ Task Management</p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-xs text-purple-600 dark:text-purple-400">✓ Calendar View</p>
                      </div>
                      <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                        <p className="text-xs text-teal-600 dark:text-teal-400">✓ Dark Mode</p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-xs text-orange-600 dark:text-orange-400">✓ Notifications</p>
                      </div>
                      <div className="p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <p className="text-xs text-pink-600 dark:text-pink-400">✓ Categories</p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <p className="text-xs text-green-600 dark:text-green-400">✓ Statistics</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Built With
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                        React
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                        TypeScript
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                        Tailwind CSS
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                        Motion
                      </span>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 rounded-full">
                        Lucide Icons
                      </span>
                    </div>
                  </div>

                  {/* Copyright */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      © 2026 TaskPro. All rights reserved.
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Made with ❤️ for productivity enthusiasts
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}