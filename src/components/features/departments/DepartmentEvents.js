import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../../../constants/roles';

export default function DepartmentEvents() {
  const { departmentId } = useParams();
  const { userRole } = useAuth();
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const canManageEvents = ROLE_PERMISSIONS[userRole]?.includes(PERMISSIONS.MANAGE_EVENTS);

  // Mock data - will be replaced with Firebase data
  const events = [
    {
      id: 1,
      name: 'Technical Workshop',
      date: '2024-03-25',
      status: 'upcoming',
      venue: 'Auditorium A',
      coordinator: 'John Doe',
      budget: 50000,
      participants: 45,
      description: 'Web development workshop for beginners'
    },
    // Add more events...
  ];

  const AddEventForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Create New Event</h3>
          <button
            onClick={() => setShowAddEventForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Venue</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Budget Required</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddEventForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Events</h1>
          <p className="text-gray-500">Manage and view event details</p>
        </div>
        {canManageEvents && (
          <button
            onClick={() => setShowAddEventForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Event
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                event.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
              }`}>
                {event.status}
              </span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Venue: {event.venue}</p>
              <p className="text-sm text-gray-600">Coordinator: {event.coordinator}</p>
              <p className="text-sm text-gray-600">Budget: ₹{event.budget.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Participants: {event.participants}</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => {/* Handle view details */}}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Details
              </button>
              {canManageEvents && (
                <button
                  onClick={() => {/* Handle edit event */}}
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                >
                  Edit Event
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddEventForm && <AddEventForm />}
    </div>
  );
} 