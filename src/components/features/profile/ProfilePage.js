import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function ProfilePage() {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState('details');
  const [showEditForm, setShowEditForm] = useState(false);

  // Mock data - will be replaced with Firebase data
  const userProfile = {
    name: 'John Doe',
    email: 'john@example.com',
    position: ROLES.COMMITTEE_MEMBER,
    department: 'Technical',
    phone: '+1234567890',
    joinedDate: '2024-01-15',
    tasks: [
      {
        id: 1,
        title: 'Prepare Workshop Material',
        assignedBy: 'Jane Smith',
        dueDate: '2024-03-25',
        status: 'in-progress',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Budget Report',
        assignedBy: 'Mike Johnson',
        dueDate: '2024-03-27',
        status: 'pending',
        priority: 'medium'
      }
    ],
    schedule: [
      {
        id: 1,
        title: 'Team Meeting',
        time: '09:00',
        duration: '1h',
        type: 'meeting'
      },
      {
        id: 2,
        title: 'Workshop Preparation',
        time: '11:00',
        duration: '2h',
        type: 'task'
      },
      {
        id: 3,
        title: 'Budget Review',
        time: '14:00',
        duration: '1h',
        type: 'review'
      }
    ]
  };

  const EditProfileForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Edit Profile</h3>
          <button
            onClick={() => setShowEditForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              defaultValue={userProfile.name}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue={userProfile.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              defaultValue={userProfile.phone}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowEditForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const PersonalDetails = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{userProfile.name}</h2>
          <p className="text-sm text-gray-500">{userProfile.position}</p>
        </div>
        <button
          onClick={() => setShowEditForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit Profile
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">Email: {userProfile.email}</p>
            <p className="text-sm text-gray-900">Phone: {userProfile.phone}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Department Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-sm text-gray-900">Department: {userProfile.department}</p>
            <p className="text-sm text-gray-900">
              Joined: {new Date(userProfile.joinedDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TaskList = () => (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Assigned Tasks</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Task
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned By
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {userProfile.tasks.map(task => (
            <tr key={task.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {task.assignedBy}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  task.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'in-progress'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800'
                    : task.priority === 'medium'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const DayPlanner = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h2>
      <div className="space-y-4">
        {userProfile.schedule.map(event => (
          <div
            key={event.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-shrink-0 w-16 text-sm text-gray-600">
              {event.time}
            </div>
            <div className="flex-grow">
              <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500">Duration: {event.duration}</p>
            </div>
            <div className="flex-shrink-0">
              <span className={`px-2 py-1 text-xs rounded-full ${
                event.type === 'meeting'
                  ? 'bg-blue-100 text-blue-800'
                  : event.type === 'task'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-500">Manage your personal information and schedule</p>
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('details')}
            className={`${
              activeTab === 'details'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Personal Details
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`${
              activeTab === 'tasks'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Tasks
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`${
              activeTab === 'planner'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Day Planner
          </button>
        </nav>
      </div>

      {activeTab === 'details' && <PersonalDetails />}
      {activeTab === 'tasks' && <TaskList />}
      {activeTab === 'planner' && <DayPlanner />}

      {showEditForm && <EditProfileForm />}
    </div>
  );
} 