import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROLES, ROLE_PERMISSIONS, PERMISSIONS } from '../constants/roles';
import { festivalService } from '../services/festivalService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Import icons from Heroicons v2
import {
  UsersIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ChatBubbleLeftRightIcon,
  UserIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';

export default function Dashboard() {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [festivalDates, setFestivalDates] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null
  });
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    loadFestivalDates();
  }, []);

  useEffect(() => {
    if (festivalDates?.startDate) {
      const timer = setInterval(() => {
        const now = new Date();
        const start = new Date(festivalDates.startDate);
        const daysToGo = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
        
        if (daysToGo > 0) {
          setCountdown(daysToGo);
        } else {
          const end = new Date(festivalDates.endDate);
          if (now <= end) {
            setCountdown('Festival in Progress! 🎉');
          } else {
            setCountdown(null);
          }
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [festivalDates]);

  const loadFestivalDates = async () => {
    try {
      const dates = await festivalService.getFestivalDates();
      setFestivalDates(dates);
    } catch (error) {
      console.error('Error loading festival dates:', error);
    }
  };

  const handleSetDates = async () => {
    try {
      await festivalService.setFestivalDates(
        selectedDates.startDate,
        selectedDates.endDate
      );
      setFestivalDates({
        startDate: selectedDates.startDate,
        endDate: selectedDates.endDate
      });
      setShowDatePicker(false);
    } catch (error) {
      console.error('Error setting festival dates:', error);
    }
  };

  // Define features with role-based access
  const features = [
    {
      id: 1,
      name: 'Departments',
      description: 'Manage department activities and members',
      icon: BuildingOffice2Icon,
      path: '/departments',
      color: 'bg-blue-500',
      roles: [
        ROLES.COMMITTEE_MEMBER,
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 2,
      name: 'Budget',
      description: 'Track and manage budget allocations',
      icon: CurrencyDollarIcon,
      path: '/budget',
      color: 'bg-green-500',
      roles: [
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 3,
      name: 'Venues',
      description: 'View and book event venues',
      icon: MapPinIcon,
      path: '/venues',
      color: 'bg-purple-500',
      roles: [
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 4,
      name: 'Deadlines',
      description: 'Track upcoming events and tasks',
      icon: ClockIcon,
      path: '/deadlines',
      color: 'bg-red-500',
      roles: [
        ROLES.COMMITTEE_MEMBER,
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 5,
      name: 'Approvals',
      description: 'Review and approve requests',
      icon: CheckCircleIcon,
      path: '/approvals',
      color: 'bg-yellow-500',
      roles: [
        ROLES.COMMITTEE_MEMBER,
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 6,
      name: 'Sponsors',
      description: 'Manage sponsor relationships',
      icon: CurrencyDollarIcon,
      path: '/sponsors',
      color: 'bg-indigo-500',
      roles: [
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 7,
      name: 'Chat',
      description: 'Communicate with team members',
      icon: ChatBubbleLeftRightIcon,
      path: '/chat',
      color: 'bg-pink-500',
      roles: [
        ROLES.COMMITTEE_MEMBER,
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    },
    {
      id: 8,
      name: 'Profile',
      description: 'View and edit your profile',
      icon: UserIcon,
      path: '/profile',
      color: 'bg-gray-500',
      roles: [
        ROLES.COMMITTEE_MEMBER,
        ROLES.HOD,
        ROLES.VICE_CHAIRPERSON,
        ROLES.CHAIRPERSON,
        ROLES.TEACHER_INCHARGE
      ]
    }
  ];

  // Filter features based on user role
  const visibleFeatures = features.filter(feature => 
    feature.roles.includes(userRole)
  );

  const handleFeatureClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Event Planner</h1>
              <p className="text-sm text-gray-500">{userRole}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {countdown && (
                <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                  <span className="text-indigo-800 font-semibold">
                    {typeof countdown === 'number' 
                      ? `${countdown} days to Festival! 🎯 (Pre-Fest)` 
                      : countdown
                    }
                  </span>
                </div>
              )}

              {(userRole === ROLES.CHAIRPERSON || userRole === ROLES.TEACHER_INCHARGE) && (
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Set Festival Dates
                </button>
              )}

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Improved Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-visible shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Set Festival Dates
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={selectedDates.startDate}
                          onChange={(date) => setSelectedDates(prev => ({ ...prev, startDate: date }))}
                          dateFormat="MMMM d, yyyy"
                          className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholderText="Select start date"
                          minDate={new Date()}
                          popperClassName="z-50"
                          popperPlacement="bottom-start"
                        />
                        <div className="absolute right-2 top-2 text-gray-400">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                      </label>
                      <div className="relative">
                        <DatePicker
                          selected={selectedDates.endDate}
                          onChange={(date) => setSelectedDates(prev => ({ ...prev, endDate: date }))}
                          dateFormat="MMMM d, yyyy"
                          className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          placeholderText="Select end date"
                          minDate={selectedDates.startDate || new Date()}
                        />
                        <div className="absolute right-2 top-2 text-gray-400">
                          <CalendarIcon className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleSetDates}
                  disabled={!selectedDates.startDate || !selectedDates.endDate}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Save Dates
                </button>
                <button
                  type="button"
                  onClick={() => setShowDatePicker(false)}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleFeatures.map((feature) => (
            <div
              key={feature.id}
              onClick={() => handleFeatureClick(feature.path)}
              className={`${feature.color} bg-opacity-10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer transform hover:-translate-y-1 transition-transform duration-200`}
            >
              <div className={`${feature.color} rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
} 