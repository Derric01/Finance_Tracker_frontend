import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { FiSettings, FiBell, FiGlobe, FiEye, FiShield, FiLock, FiDollarSign } from 'react-icons/fi';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      reminderTime: '08:00',
      lowBalanceAlert: true,
      budgetAlert: true,
      goalAlert: true
    },    appearance: {
      compactView: false,
      showCurrency: true
    },
    privacy: {
      showRecentTransactions: true,
      showTotalBalance: true,
      hideAmounts: false,
      allowAnalytics: true
    },
    currency: {
      preferred: 'USD',
      showConversion: true
    },
    security: {
      twoFactorAuth: false,
      loginNotification: true,
      inactivityTimeout: '30'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings({
      ...settings,
      [category]: {
        ...settings[category],
        [setting]: value
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FiSettings className="mr-2" /> Settings
          </h1>
          <button className="btn btn-primary btn-sm">
            Save Changes
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <FiBell className="mr-2" /> Notifications
            </h2>
            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  />
                  <span className="label-text">Email Notifications</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  />
                  <span className="label-text">Push Notifications</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.sms}
                    onChange={(e) => handleSettingChange('notifications', 'sms', e.target.checked)}
                  />
                  <span className="label-text">SMS Notifications</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.lowBalanceAlert}
                    onChange={(e) => handleSettingChange('notifications', 'lowBalanceAlert', e.target.checked)}
                  />
                  <span className="label-text">Low Balance Alerts</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.budgetAlert}
                    onChange={(e) => handleSettingChange('notifications', 'budgetAlert', e.target.checked)}
                  />
                  <span className="label-text">Budget Alerts</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.notifications.goalAlert}
                    onChange={(e) => handleSettingChange('notifications', 'goalAlert', e.target.checked)}
                  />
                  <span className="label-text">Goal Achievement Alerts</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Daily Reminder Time</span>
                </label>
                <input 
                  type="time" 
                  className="input input-bordered" 
                  value={settings.notifications.reminderTime}
                  onChange={(e) => handleSettingChange('notifications', 'reminderTime', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <FiEye className="mr-2" /> Appearance
            </h2>
            <div className="divider my-2"></div>            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.appearance.compactView}
                    onChange={(e) => handleSettingChange('appearance', 'compactView', e.target.checked)}
                  />
                  <span className="label-text">Compact View</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.appearance.showCurrency}
                    onChange={(e) => handleSettingChange('appearance', 'showCurrency', e.target.checked)}
                  />
                  <span className="label-text">Show Currency Symbol</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <FiDollarSign className="mr-2" /> Currency
            </h2>
            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Preferred Currency</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  value={settings.currency.preferred}
                  onChange={(e) => handleSettingChange('currency', 'preferred', e.target.value)}
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="JPY">JPY - Japanese Yen</option>
                  <option value="CAD">CAD - Canadian Dollar</option>
                  <option value="AUD">AUD - Australian Dollar</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.currency.showConversion}
                    onChange={(e) => handleSettingChange('currency', 'showConversion', e.target.checked)}
                  />
                  <span className="label-text">Show Currency Conversion</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl mb-6">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <FiShield className="mr-2" /> Privacy
            </h2>
            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.privacy.showRecentTransactions}
                    onChange={(e) => handleSettingChange('privacy', 'showRecentTransactions', e.target.checked)}
                  />
                  <span className="label-text">Show Recent Transactions on Dashboard</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.privacy.showTotalBalance}
                    onChange={(e) => handleSettingChange('privacy', 'showTotalBalance', e.target.checked)}
                  />
                  <span className="label-text">Show Total Balance</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.privacy.hideAmounts}
                    onChange={(e) => handleSettingChange('privacy', 'hideAmounts', e.target.checked)}
                  />
                  <span className="label-text">Hide Transaction Amounts</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.privacy.allowAnalytics}
                    onChange={(e) => handleSettingChange('privacy', 'allowAnalytics', e.target.checked)}
                  />
                  <span className="label-text">Allow Analytics Data Collection</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title flex items-center">
              <FiLock className="mr-2" /> Security
            </h2>
            <div className="divider my-2"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleSettingChange('security', 'twoFactorAuth', e.target.checked)}
                  />
                  <span className="label-text">Two-Factor Authentication</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label cursor-pointer justify-start">
                  <input 
                    type="checkbox" 
                    className="toggle toggle-primary mr-4" 
                    checked={settings.security.loginNotification}
                    onChange={(e) => handleSettingChange('security', 'loginNotification', e.target.checked)}
                  />
                  <span className="label-text">Login Notifications</span>
                </label>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Session Timeout (minutes)</span>
                </label>
                <select 
                  className="select select-bordered w-full"
                  value={settings.security.inactivityTimeout}
                  onChange={(e) => handleSettingChange('security', 'inactivityTimeout', e.target.value)}
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="never">Never</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Change Password</span>
                </label>
                <button className="btn btn-outline">Change Password</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
