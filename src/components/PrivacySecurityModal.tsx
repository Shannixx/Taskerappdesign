import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Fingerprint, Eye, EyeOff, CheckCircle, Copy, Check, Shield, Download, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface PrivacySecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'password' | 'twoFactor' | 'privacy' | null;
}

export function PrivacySecurityModal({ isOpen, onClose, type }: PrivacySecurityModalProps) {
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes] = useState([
    'ABCD-1234-EFGH',
    'IJKL-5678-MNOP',
    'QRST-9012-UVWX',
    'YZAB-3456-CDEF',
    'GHIJ-7890-KLMN',
    'OPQR-1234-STUV'
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    analytics: true,
    profileVisibility: 'public' as 'public' | 'private' | 'friends',
    showEmail: false,
    showActivity: true
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    if (passwordForm.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!');
      return;
    }

    setPasswordChanged(true);
    setTimeout(() => {
      setPasswordChanged(false);
      onClose();
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 2000);
  };

  const handleEnableTwoFactor = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationCode.length !== 6) {
      alert('Please enter a 6-digit verification code');
      return;
    }

    setTwoFactorEnabled(true);
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleExportData = () => {
    alert('Your data export has been initiated.\n\nYou will receive an email with a download link within 24 hours.');
  };

  const handleDeleteAccount = () => {
    const confirmed = confirm('Are you sure you want to delete your account?\n\nThis action cannot be undone and all your data will be permanently deleted.');
    if (confirmed) {
      alert('Account deletion initiated.\n\nYou will receive a confirmation email with further instructions.');
    }
  };

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
            <div className="sticky top-0 bg-white dark:bg-[#1c1c1e] border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl text-gray-900 dark:text-white flex items-center gap-2">
                {type === 'password' && (
                  <>
                    <Lock className="w-6 h-6" />
                    Change Password
                  </>
                )}
                {type === 'twoFactor' && (
                  <>
                    <Fingerprint className="w-6 h-6" />
                    Two-Factor Authentication
                  </>
                )}
                {type === 'privacy' && (
                  <>
                    <Shield className="w-6 h-6" />
                    Privacy Settings
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
              {/* Change Password */}
              {type === 'password' && (
                <div className="space-y-6">
                  {passwordChanged ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-lg text-gray-900 dark:text-white mb-2">Password Updated!</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your password has been changed successfully.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Update your password to keep your account secure. Make sure your new password is strong and unique.
                      </p>

                      <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {/* Current Password */}
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              required
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              required
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Must be at least 8 characters long
                          </p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              required
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>

                        {/* Password Strength Tips */}
                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                          <p className="text-xs font-medium text-blue-900 dark:text-blue-300 mb-2">Password Tips:</p>
                          <ul className="text-xs text-blue-700 dark:text-blue-400 space-y-1">
                            <li>• Use a mix of uppercase and lowercase letters</li>
                            <li>• Include numbers and special characters</li>
                            <li>• Avoid common words or personal information</li>
                          </ul>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-600/30 hover:shadow-xl"
                        >
                          Update Password
                        </motion.button>
                      </form>
                    </>
                  )}
                </div>
              )}

              {/* Two-Factor Authentication */}
              {type === 'twoFactor' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add an extra layer of security to your account with two-factor authentication.
                  </p>

                  {!twoFactorEnabled ? (
                    <>
                      {/* QR Code Section */}
                      <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl text-center">
                        <div className="w-48 h-48 bg-white dark:bg-gray-900 rounded-xl mx-auto mb-4 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-5 gap-1 p-4">
                            {Array.from({ length: 25 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-6 h-6 ${
                                  Math.random() > 0.5 ? 'bg-gray-900 dark:bg-white' : 'bg-white dark:bg-gray-900'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Scan this QR code with your authenticator app
                        </p>
                      </div>

                      {/* Manual Entry Code */}
                      <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          Can't scan? Enter this code manually:
                        </p>
                        <div className="flex items-center gap-2">
                          <code className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 rounded-lg text-sm text-gray-900 dark:text-white font-mono border border-gray-200 dark:border-gray-700">
                            JBSW Y3DP EHPK 3PXP
                          </code>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard('JBSWY3DPEHPK3PXP')}
                            className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            {copiedCode === 'JBSWY3DPEHPK3PXP' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                          </motion.button>
                        </div>
                      </div>

                      {/* Verification Form */}
                      <form onSubmit={handleEnableTwoFactor} className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2">
                            Verification Code
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white text-center text-2xl tracking-widest placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                            placeholder="000000"
                          />
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                            Enter the 6-digit code from your authenticator app
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-lg shadow-blue-600/30"
                        >
                          Enable Two-Factor Authentication
                        </motion.button>
                      </form>
                    </>
                  ) : (
                    <div className="space-y-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="py-8 text-center"
                      >
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg text-gray-900 dark:text-white mb-2">2FA Enabled!</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your account is now protected with two-factor authentication.
                        </p>
                      </motion.div>

                      {/* Backup Codes */}
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                        <div className="flex items-start gap-2 mb-3">
                          <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-1">
                              Save Your Backup Codes
                            </p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-400">
                              Store these codes in a safe place. You can use them to access your account if you lose your device.
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          {backupCodes.map((code) => (
                            <div key={code} className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="flex-1 text-xs text-gray-900 dark:text-white font-mono">
                                {code}
                              </code>
                              <button
                                onClick={() => copyToClipboard(code)}
                                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                              >
                                {copiedCode === code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            const codesText = backupCodes.join('\n');
                            const blob = new Blob([codesText], { type: 'text/plain' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'taskpro-backup-codes.txt';
                            a.click();
                          }}
                          className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download Backup Codes
                        </motion.button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Privacy Settings */}
              {type === 'privacy' && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Control how your data is used and who can see your information.
                  </p>

                  {/* Privacy Toggles */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Data Sharing</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Share anonymous usage data to improve TaskPro</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPrivacySettings({ ...privacySettings, dataSharing: !privacySettings.dataSharing })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          privacySettings.dataSharing ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: privacySettings.dataSharing ? 26 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Analytics</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Help us understand how you use TaskPro</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPrivacySettings({ ...privacySettings, analytics: !privacySettings.analytics })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          privacySettings.analytics ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: privacySettings.analytics ? 26 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Show Email</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Display email on your public profile</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPrivacySettings({ ...privacySettings, showEmail: !privacySettings.showEmail })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          privacySettings.showEmail ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: privacySettings.showEmail ? 26 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 dark:text-white">Show Activity</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Let others see your task activity</p>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPrivacySettings({ ...privacySettings, showActivity: !privacySettings.showActivity })}
                        className={`relative w-14 h-8 rounded-full transition-colors ${
                          privacySettings.showActivity ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      >
                        <motion.div
                          animate={{ x: privacySettings.showActivity ? 26 : 2 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                        />
                      </motion.button>
                    </div>
                  </div>

                  {/* Profile Visibility */}
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-3">
                      Profile Visibility
                    </label>
                    <div className="space-y-2">
                      {[
                        { value: 'public', label: 'Public', desc: 'Anyone can view your profile' },
                        { value: 'friends', label: 'Friends Only', desc: 'Only your friends can view' },
                        { value: 'private', label: 'Private', desc: 'Only you can view your profile' }
                      ].map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setPrivacySettings({ ...privacySettings, profileVisibility: option.value as any })}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            privacySettings.profileVisibility === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-900 dark:text-white font-medium">{option.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{option.desc}</p>
                            </div>
                            {privacySettings.profileVisibility === option.value && (
                              <CheckCircle className="w-5 h-5 text-blue-500" />
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Data Management */}
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                      Data Management
                    </h4>
                    <div className="space-y-3">
                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleExportData}
                        className="w-full p-4 text-left bg-blue-50 dark:bg-blue-900/20 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                          <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">Export Your Data</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Download all your TaskPro data</p>
                        </div>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleDeleteAccount}
                        className="w-full p-4 text-left bg-red-50 dark:bg-red-900/20 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors flex items-center gap-3"
                      >
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
                          <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 dark:text-white">Delete Account</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete your account and data</p>
                        </div>
                      </motion.button>
                    </div>
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