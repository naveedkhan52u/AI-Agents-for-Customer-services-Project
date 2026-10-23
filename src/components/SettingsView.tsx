import React, { useState } from 'react';
import { ScreenType } from '../types';
import { APP_ASSETS } from '../mockData';

interface SettingsViewProps {
  onShowToast: (msg: string, icon?: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onShowToast,
  onNavigate,
}) => {
  const [subTab, setSubTab] = useState<'profile' | 'business' | 'security'>('profile');

  // Form states
  const [fullName, setFullName] = useState('Elena Vance');
  const [adminEmail, setAdminEmail] = useState('elena.vance@orken.ai');
  const [companyName, setCompanyName] = useState('Orken AI Inc.');
  const [websiteUrl, setWebsiteUrl] = useState('https://orken.ai');
  const [timezone, setTimezone] = useState('(UTC-08:00) Pacific Time');
  const [currency, setCurrency] = useState('USD ($)');

  // Toggles
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [notifyQualified, setNotifyQualified] = useState(true);
  const [notifyDailyDigest, setNotifyDailyDigest] = useState(true);
  const [notifyDowntime, setNotifyDowntime] = useState(true);
  const [consentMandatory, setConsentMandatory] = useState(true);
  const [autoEnrich, setAutoEnrich] = useState(true);

  // Password Modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveAll = () => {
    onShowToast('Platform preferences saved successfully', 'check_circle');
  };

  const handlePurgeTestLeads = () => {
    if (window.confirm('Are you sure you want to purge synthetic demo leads?')) {
      onShowToast('Demo sandbox leads successfully purged.', 'cleaning_services');
    }
  };

  const handleCloseAccount = () => {
    if (window.confirm('WARNING: This will permanently revoke administrative access. Proceed?')) {
      onShowToast('Account closure request sent to operations desk.', 'warning');
      setTimeout(() => onNavigate('login'), 1200);
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 space-y-4 max-w-2xl mx-auto font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h1 className="text-xl sm:text-2xl text-[#0b1c30] font-bold tracking-tight">Settings</h1>
          <p className="text-xs sm:text-sm text-[#565e74] mt-0.5">
            Manage your administrator account &amp; platform preferences.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#4f46e5] hover:bg-[#3525cd] text-white text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">check</span>
          <span>Save All</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
        <button
          onClick={() => setSubTab('profile')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs cursor-pointer transition-all ${
            subTab === 'profile'
              ? 'bg-[#4f46e5] text-white'
              : 'bg-white text-[#464555] border border-[#e5eeff] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">person</span>
          <span>Admin Profile</span>
        </button>
        <button
          onClick={() => setSubTab('business')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs cursor-pointer transition-all ${
            subTab === 'business'
              ? 'bg-[#4f46e5] text-white'
              : 'bg-white text-[#464555] border border-[#e5eeff] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <span>Business Info</span>
        </button>
        <button
          onClick={() => setSubTab('security')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shadow-xs cursor-pointer transition-all ${
            subTab === 'security'
              ? 'bg-[#4f46e5] text-white'
              : 'bg-white text-[#464555] border border-[#e5eeff] hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span>Security &amp; Notifications</span>
        </button>
      </div>

      {/* Section 1: Admin Profile */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">badge</span>
            <span className="text-sm font-bold">Admin Profile</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#e2dfff] text-[#3323cc] font-bold">
            Super Administrator
          </span>
        </div>

        {/* Profile Card Banner */}
        <div className="bg-[#eff4ff] p-3.5 rounded-xl border border-[#dce9ff] flex items-center gap-3">
          <div className="relative">
            <img
              src={APP_ASSETS.avatar}
              alt="Elena Vance"
              className="w-12 h-12 rounded-xl object-cover shadow-xs border border-white"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#006d62] text-white flex items-center justify-center text-[10px] border border-white">
              ✓
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-[#0b1c30]">Elena Vance</h3>
            <p className="text-xs text-[#565e74] truncate">elena.vance@orken.ai</p>
            <div className="flex items-center gap-2 mt-1">
              <label className="text-[11px] text-[#4f46e5] font-semibold flex items-center gap-1 hover:underline cursor-pointer">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                <span>Change Avatar</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={() => onShowToast('Avatar updated', 'image')}
                />
              </label>
              <span className="text-[11px] text-[#006d62] font-semibold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Verified
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#565e74]">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs sm:text-sm text-[#0b1c30] border border-[#dce9ff] outline-none focus:bg-white focus:ring-1 focus:ring-[#4f46e5]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#565e74]">Admin Email Address</label>
              <span className="text-[10px] bg-[#71f8e4]/60 text-[#00201c] px-1.5 py-0.2 rounded font-bold">
                Primary
              </span>
            </div>
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs sm:text-sm text-[#0b1c30] border border-[#dce9ff] outline-none focus:bg-white focus:ring-1 focus:ring-[#4f46e5]"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Business Information */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">domain</span>
          <span className="text-sm font-bold">Business Information</span>
        </div>
        <div className="flex flex-col gap-3 mt-1">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#565e74]">Company Legal Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs sm:text-sm text-[#0b1c30] border border-[#dce9ff] outline-none focus:bg-white focus:ring-1 focus:ring-[#4f46e5]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-[#565e74]">Website URL</label>
            <div className="flex items-center bg-[#eff4ff] rounded-lg px-3 py-2 border border-[#dce9ff]">
              <span className="material-symbols-outlined text-[#565e74] text-[18px] mr-1.5">link</span>
              <input
                type="text"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-[#0b1c30] outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Default Timezone</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-2.5 py-2 bg-[#eff4ff] rounded-lg text-xs font-bold text-[#0b1c30] border border-[#dce9ff] outline-none"
              >
                <option>(UTC-08:00) Pacific Time</option>
                <option>(UTC-05:00) Eastern Time</option>
                <option>(UTC+00:00) UTC / GMT</option>
                <option>(UTC+01:00) Central European Time</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-[#565e74]">Platform Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-2.5 py-2 bg-[#eff4ff] rounded-lg text-xs font-bold text-[#0b1c30] border border-[#dce9ff] outline-none"
              >
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>CAD ($)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Account Security */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-[#006d62] text-[20px]">shield</span>
            <span className="text-sm font-bold">Account Security</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-bold">
            SOC 2 Type II
          </span>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          {/* Two-Factor Authentication Toggle */}
          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Two-Factor Authentication</div>
              <div className="text-[11px] text-[#006d62] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>{mfaEnabled ? 'Enabled (Authenticator App)' : 'Disabled'}</span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={mfaEnabled}
                onChange={(e) => setMfaEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#c7c4d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f46e5]"></div>
            </label>
          </div>

          {/* Admin Password */}
          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div>
              <div className="text-xs font-bold text-[#0b1c30]">Admin Password</div>
              <div className="text-xs font-mono text-[#565e74] mt-0.5">••••••••••••</div>
            </div>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-[#dce9ff] text-xs font-bold text-[#0b1c30] hover:bg-[#dce9ff] transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[14px]">key</span>
              <span>Change</span>
            </button>
          </div>

          {/* Inactivity Auto-Lock */}
          <div className="flex items-center justify-between px-2 pt-1 text-xs">
            <div>
              <span className="font-semibold text-[#0b1c30]">Inactivity Auto-Lock</span>
              <p className="text-[11px] text-[#565e74]">30 minutes of inactivity</p>
            </div>
            <span className="text-[#006d62] font-bold">Active</span>
          </div>
        </div>
      </div>

      {/* Section 4: Notification Preferences */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">notifications</span>
          <span className="text-sm font-bold">Notification Preferences</span>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#eff4ff] cursor-pointer">
            <input
              type="checkbox"
              checked={notifyQualified}
              onChange={(e) => setNotifyQualified(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#4f46e5] accent-[#4f46e5]"
            />
            <div>
              <span className="text-xs font-bold text-[#0b1c30]">Email alert on new Qualified Lead</span>
              <p className="text-[11px] text-[#565e74] leading-relaxed">
                Instant notification when a bot conversation clears lead scoring criteria.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#eff4ff] cursor-pointer">
            <input
              type="checkbox"
              checked={notifyDailyDigest}
              onChange={(e) => setNotifyDailyDigest(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#4f46e5] accent-[#4f46e5]"
            />
            <div>
              <span className="text-xs font-bold text-[#0b1c30]">Daily Lead Digest report</span>
              <p className="text-[11px] text-[#565e74] leading-relaxed">
                Aggregated pipeline analytics sent every morning at 08:00 AM PST.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#eff4ff] cursor-pointer">
            <input
              type="checkbox"
              checked={notifyDowntime}
              onChange={(e) => setNotifyDowntime(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#4f46e5] accent-[#4f46e5]"
            />
            <div>
              <span className="text-xs font-bold text-[#0b1c30]">
                Chatbot downtime or high error rate notification
              </span>
              <p className="text-[11px] text-[#565e74] leading-relaxed">
                Urgent real-time SMS &amp; email alerts triggered by agent webhook anomalies.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Section 5: Lead Capture Defaults */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-[#e5eeff] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#0b1c30]">
          <span className="material-symbols-outlined text-[#4f46e5] text-[20px]">tune</span>
          <span className="text-sm font-bold">Lead Capture Defaults</span>
        </div>

        <div className="flex flex-col gap-3 mt-1">
          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="max-w-[80%]">
              <div className="text-xs font-bold text-[#0b1c30]">Consent Checkbox Mandatory</div>
              <p className="text-[11px] text-[#565e74] mt-0.5">
                Requires GDPR/CCPA explicit opt-in before conversation state persists.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={consentMandatory}
                onChange={(e) => setConsentMandatory(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#c7c4d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f46e5]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
            <div className="max-w-[80%]">
              <div className="text-xs font-bold text-[#0b1c30]">Auto-enrich company domain data</div>
              <p className="text-[11px] text-[#565e74] mt-0.5">
                Look up company size, industry, and headquarter metadata via Clearbit/Apollo.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoEnrich}
                onChange={(e) => setAutoEnrich(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#c7c4d8] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f46e5]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Section 6: Danger Zone */}
      <div className="bg-[#ffdad6]/30 rounded-2xl p-4 sm:p-5 border border-[#ffdad6] flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#ba1a1a]">
          <span className="material-symbols-outlined text-[22px]">warning</span>
          <span className="text-sm font-bold">Danger Zone</span>
        </div>
        <p className="text-xs text-[#565e74] leading-relaxed">
          Destructive actions can affect lead attribution histories, live customer chats, and linked CRM synchronizations. Proceed with extreme caution.
        </p>

        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handlePurgeTestLeads}
            className="w-full py-2.5 px-4 bg-white border border-[#ffdad6] text-[#ba1a1a] text-xs font-bold rounded-lg hover:bg-[#ffdad6]/50 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">cleaning_services</span>
            <span>Purge Test Leads</span>
          </button>
          <button
            onClick={handleCloseAccount}
            className="w-full py-2.5 px-4 bg-[#ba1a1a] text-white text-xs font-bold rounded-lg hover:bg-[#93000a] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">delete_forever</span>
            <span>Close Admin Account</span>
          </button>
        </div>
      </div>

      {/* Password Change Dialog */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#dce9ff] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0b1c30]">Update Master Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-[#565e74] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[#565e74] block mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs border border-[#dce9ff] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#565e74] block mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-[#eff4ff] rounded-lg text-xs border border-[#dce9ff] outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-3 py-2 text-xs font-semibold text-[#565e74]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  onShowToast('Master password updated!', 'lock_reset');
                }}
                className="px-4 py-2 bg-[#4f46e5] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
