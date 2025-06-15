import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { FiUser, FiEdit, FiMail, FiPhone, FiShield, FiDollarSign, FiSave } from 'react-icons/fi';
import { getUserData } from '../../utils/auth';
import api from '../../utils/api';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    preferredCurrency: 'USD',
    accountCreated: '',
    passwordLastChanged: '',
    avatar: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Get user data when component mounts
    const userData = getUserData();
    
    if (userData) {
      setProfile({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        preferredCurrency: userData.defaultCurrency || 'USD',
        accountCreated: userData.createdAt || new Date().toISOString(),
        passwordLastChanged: userData.updatedAt || new Date().toISOString(),
        avatar: null
      });
      setLoading(false);
    } else {
      // Try to fetch from the backend
      fetchUserProfile();
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);      const response = await api.get('/auth/me');
      
      if (response.data && response.data.data) {
        const userData = response.data.data;
        setProfile({
          name: userData.name || '',
          email: userData.email || '',
          phone: userData.phone || '',
          preferredCurrency: userData.defaultCurrency || 'USD',
          accountCreated: userData.createdAt || new Date().toISOString(),
          passwordLastChanged: userData.updatedAt || new Date().toISOString(),
          avatar: null
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching profile:', err);
      
      if (err.isNetworkError) {
        setError('Cannot connect to server. Please ensure the backend is running.');
      } else {
        setError('Failed to load profile. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
        const response = await api.put('/auth/updatedetails', {
        name: profile.name,
        phone: profile.phone,
        defaultCurrency: profile.preferredCurrency
      });
      
      if (response.data && response.data.success) {
        setIsEditing(false);
        // Update local storage with new user data
        const userData = getUserData();
        if (userData) {
          userData.name = profile.name;
          userData.phone = profile.phone;
          userData.preferredCurrency = profile.preferredCurrency;
          localStorage.setItem('userData', JSON.stringify(userData));
        }
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <FiUser className="mr-2" /> Profile
          </h1>
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditing ? <><FiSave className="mr-2" /> Save</> : <><FiEdit className="mr-2" /> Edit</>}
          </button>
        </div>

        {error && <div className="alert alert-error mb-4">{error}</div>}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{profile.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                </div>
                <h2 className="card-title mt-4">{profile.name}</h2>
                <p className="text-sm text-gray-500">Member since {new Date(profile.accountCreated).toLocaleDateString()}</p>
                
                {isEditing && (
                  <div className="form-control w-full mt-4">
                    <label className="label">
                      <span className="label-text">Change Profile Picture</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered w-full" />
                  </div>
                )}
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <h2 className="card-title flex items-center">
                  <FiShield className="mr-2" /> Security
                </h2>
                <div className="divider my-2"></div>
                <div className="text-sm">
                  <p className="mb-2">Password last changed: {new Date(profile.passwordLastChanged).toLocaleDateString()}</p>
                  
                  {isEditing ? (
                    <>
                      <div className="form-control w-full">
                        <label className="label">
                          <span className="label-text">Current Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" />
                      </div>
                      <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text">New Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" />
                      </div>
                      <div className="form-control w-full mt-2">
                        <label className="label">
                          <span className="label-text">Confirm New Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full" />
                      </div>
                    </>
                  ) : (
                    <button className="btn btn-outline btn-sm mt-2">Change Password</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-2/3">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title flex items-center">
                  <FiUser className="mr-2" /> Personal Information
                </h2>
                <div className="divider my-2"></div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text flex items-center"><FiUser className="mr-2" /> Full Name</span>
                  </label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="input input-bordered w-full" 
                      value={profile.name}
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">{profile.name}</div>
                  )}
                </div>

                <div className="form-control w-full mt-4">
                  <label className="label">
                    <span className="label-text flex items-center"><FiMail className="mr-2" /> Email Address</span>
                  </label>
                  {isEditing ? (
                    <input 
                      type="email" 
                      className="input input-bordered w-full" 
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">{profile.email}</div>
                  )}
                </div>

                <div className="form-control w-full mt-4">
                  <label className="label">
                    <span className="label-text flex items-center"><FiPhone className="mr-2" /> Phone Number</span>
                  </label>
                  {isEditing ? (
                    <input 
                      type="tel" 
                      className="input input-bordered w-full" 
                      value={profile.phone}
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">{profile.phone}</div>
                  )}
                </div>
                
                <h2 className="card-title flex items-center mt-8">
                  <FiDollarSign className="mr-2" /> Financial Preferences
                </h2>
                <div className="divider my-2"></div>
                
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Preferred Currency</span>
                  </label>
                  {isEditing ? (
                    <select 
                      className="select select-bordered w-full"
                      value={profile.preferredCurrency}
                      onChange={(e) => setProfile({...profile, preferredCurrency: e.target.value})}
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                      <option value="AUD">AUD - Australian Dollar</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-base-200 rounded-lg">{profile.preferredCurrency}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl mt-6">
              <div className="card-body">
                <h2 className="card-title">Account Actions</h2>
                <div className="divider my-2"></div>
                <div className="flex flex-col gap-2">
                  <button className="btn btn-outline">Export My Data</button>
                  <button className="btn btn-outline btn-error">Delete Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
