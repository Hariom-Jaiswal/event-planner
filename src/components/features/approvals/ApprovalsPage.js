import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function ApprovalsPage() {
  const { userRole } = useAuth();
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Mock data - will be replaced with Firebase data
  const approvalTasks = [
    {
      id: 1,
      title: 'Technical Workshop Budget',
      type: 'BUDGET',
      description: 'Budget request for Web Development Workshop',
      amount: 50000,
      department: 'Technical',
      requestedBy: 'John Doe',
      requestedAt: '2024-03-20T10:30:00',
      status: 'pending',
      currentLevel: 'HOD',
      requiredApprovals: ['HOD', 'VICE_CHAIRPERSON', 'CHAIRPERSON'],
      completedApprovals: [],
      attachments: ['budget_breakdown.pdf']
    },
    {
      id: 2,
      title: 'Cultural Night Venue',
      type: 'VENUE',
      description: 'Venue booking for Annual Cultural Night',
      venue: 'Main Auditorium',
      department: 'Cultural',
      requestedBy: 'Jane Smith',
      requestedAt: '2024-03-21T14:15:00',
      status: 'pending',
      currentLevel: 'VICE_CHAIRPERSON',
      requiredApprovals: ['HOD', 'VICE_CHAIRPERSON'],
      completedApprovals: ['HOD'],
      attachments: ['venue_details.pdf', 'schedule.pdf']
    }
  ];

  const getTasksForRole = () => {
    switch (userRole) {
      case ROLES.HOD:
        return approvalTasks.filter(task => task.currentLevel === 'HOD');
      case ROLES.VICE_CHAIRPERSON:
        return approvalTasks.filter(task => 
          task.currentLevel === 'VICE_CHAIRPERSON' || 
          (task.currentLevel === 'HOD' && task.department === 'Your Department')
        );
      case ROLES.CHAIRPERSON:
        return approvalTasks.filter(task => task.requiredApprovals.includes('CHAIRPERSON'));
      default:
        return [];
    }
  };

  const RejectForm = ({ task, onClose }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Reject Request</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Rejection Type</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value="changes">Suggested Changes</option>
              <option value="complete">Complete Rejection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reason for Rejection</label>
            <textarea
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Please provide detailed reason for rejection..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Suggested Changes (if applicable)</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Suggest changes that would make this request acceptable..."
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Confirm Rejection
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const TaskDetails = ({ task }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
          <p className="text-sm text-gray-500">
            Requested by {task.requestedBy} on {new Date(task.requestedAt).toLocaleString()}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
          task.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
        }`}>
          {task.status}
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1 text-sm text-gray-900">{task.description}</p>
        </div>
        {task.amount && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Amount</h3>
            <p className="mt-1 text-sm text-gray-900">₹{task.amount.toLocaleString()}</p>
          </div>
        )}
        {task.venue && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Venue</h3>
            <p className="mt-1 text-sm text-gray-900">{task.venue}</p>
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium text-gray-500">Approval Flow</h3>
          <div className="mt-2 flex items-center space-x-2">
            {task.requiredApprovals.map((level, index) => (
              <React.Fragment key={level}>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  task.completedApprovals.includes(level)
                    ? 'bg-green-100 text-green-800'
                    : task.currentLevel === level
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {level}
                </span>
                {index < task.requiredApprovals.length - 1 && (
                  <span className="text-gray-300">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">Attachments</h3>
          <div className="mt-2 space-y-2">
            {task.attachments.map(attachment => (
              <div
                key={attachment}
                className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-900"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                </svg>
                <span>{attachment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end space-x-3">
        <button
          onClick={() => {
            setSelectedTask(task);
            setShowRejectForm(true);
          }}
          className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
        >
          Reject
        </button>
        {userRole !== ROLES.CHAIRPERSON && (
          <button
            className="px-4 py-2 border border-indigo-300 text-indigo-700 rounded-md hover:bg-indigo-50"
          >
            Send to Higher Level
          </button>
        )}
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Approve
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Approvals</h1>
        <p className="text-gray-500">Manage and review pending approval requests</p>
      </div>

      <div className="space-y-6">
        {getTasksForRole().map(task => (
          <TaskDetails key={task.id} task={task} />
        ))}
      </div>

      {showRejectForm && selectedTask && (
        <RejectForm
          task={selectedTask}
          onClose={() => {
            setShowRejectForm(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
} 