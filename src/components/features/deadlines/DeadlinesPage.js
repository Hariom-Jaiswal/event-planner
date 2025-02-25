import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function DeadlinesPage() {
  const { userRole, currentUser } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, upcoming, overdue
  const [selectedType, setSelectedType] = useState('all'); // all, events, tasks

  // Mock data - will be replaced with Firebase data
  const deadlines = [
    {
      id: 1,
      title: 'Technical Workshop Planning',
      type: 'task',
      department: 'Technical',
      assignedTo: 'John Doe',
      assignedBy: 'Jane Smith',
      dueDate: '2024-03-25',
      priority: 'high',
      status: 'pending',
      reminders: [
        { id: 1, date: '2024-03-20', sent: true },
        { id: 2, date: '2024-03-23', sent: false }
      ]
    },
    {
      id: 2,
      title: 'Cultural Night',
      type: 'event',
      department: 'Cultural',
      coordinator: 'Mike Johnson',
      date: '2024-04-15',
      status: 'upcoming',
      tasks: [
        { title: 'Venue Booking', deadline: '2024-03-30', completed: true },
        { title: 'Budget Approval', deadline: '2024-04-01', completed: false }
      ]
    }
  ];

  const getDeadlinesForRole = () => {
    switch (userRole) {
      case ROLES.CHAIRPERSON:
        return deadlines; // Can see all deadlines
      case ROLES.VICE_CHAIRPERSON:
        // Filter deadlines for their department
        return deadlines.filter(deadline => 
          deadline.department === currentUser.department
        );
      case ROLES.HOD:
        // Filter deadlines for their specific department
        return deadlines.filter(deadline => 
          deadline.department === currentUser.department
        );
      default:
        // Regular members see only their assigned tasks
        return deadlines.filter(deadline => 
          deadline.assignedTo === currentUser.name
        );
    }
  };

  const DeadlineCard = ({ deadline }) => {
    const isOverdue = new Date(deadline.dueDate) < new Date();
    const daysLeft = Math.ceil(
      (new Date(deadline.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );

    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{deadline.title}</h3>
            <p className="text-sm text-gray-500">{deadline.department}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${
              deadline.type === 'event' 
                ? 'bg-purple-100 text-purple-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {deadline.type}
            </span>
            {deadline.priority && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                deadline.priority === 'high'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {deadline.priority}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {deadline.type === 'task' ? (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Assigned to:</span>
                <span className="text-gray-900">{deadline.assignedTo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Assigned by:</span>
                <span className="text-gray-900">{deadline.assignedBy}</span>
              </div>
            </>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Coordinator:</span>
              <span className="text-gray-900">{deadline.coordinator}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Due Date:</span>
            <span className={`font-medium ${
              isOverdue ? 'text-red-600' : 'text-gray-900'
            }`}>
              {new Date(deadline.dueDate).toLocaleDateString()}
              {!isOverdue && daysLeft > 0 && (
                <span className="ml-2 text-xs text-gray-500">
                  ({daysLeft} days left)
                </span>
              )}
            </span>
          </div>

          {deadline.type === 'event' && deadline.tasks && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subtasks</h4>
              <div className="space-y-2">
                {deadline.tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className={task.completed ? 'text-gray-500' : 'text-gray-900'}>
                      {task.title}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      task.completed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {deadline.reminders && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Reminders</h4>
              <div className="space-y-2">
                {deadline.reminders.map(reminder => (
                  <div key={reminder.id} className="flex items-center justify-between text-sm">
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      reminder.sent
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {reminder.sent ? 'Sent' : 'Scheduled'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Deadlines</h1>
        <p className="text-gray-500">Track upcoming events and tasks</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Deadlines</option>
            <option value="upcoming">Upcoming</option>
            <option value="overdue">Overdue</option>
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Types</option>
            <option value="events">Events</option>
            <option value="tasks">Tasks</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {getDeadlinesForRole()
          .filter(deadline => {
            if (selectedType !== 'all' && deadline.type !== selectedType) return false;
            if (selectedFilter === 'upcoming' && new Date(deadline.dueDate) < new Date()) return false;
            if (selectedFilter === 'overdue' && new Date(deadline.dueDate) >= new Date()) return false;
            return true;
          })
          .map(deadline => (
            <DeadlineCard key={deadline.id} deadline={deadline} />
          ))}
      </div>
    </div>
  );
} 