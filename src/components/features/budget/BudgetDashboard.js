import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES, PERMISSIONS, ROLE_PERMISSIONS } from '../../../constants/roles';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { db } from '../../../firebase';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BudgetDashboard() {
  const { userRole, currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(
    userRole === ROLES.CHAIRPERSON || userRole === ROLES.TEACHER_INCHARGE 
      ? 'overview' 
      : 'requests'
  );
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState({
    amount: '',
    purpose: '',
    description: '',
    eventDate: ''
  });
  const [loading, setLoading] = useState(true);

  const isChairperson = userRole === ROLES.CHAIRPERSON;
  const canApproveBudget = ROLE_PERMISSIONS[userRole]?.includes(PERMISSIONS.MANAGE_BUDGET);

  useEffect(() => {
    loadBudgetRequests();
  }, [currentUser]);

  const loadBudgetRequests = async () => {
    try {
      const q = query(
        collection(db, 'budgetRequests'),
        where('requesterId', '==', currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const requestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRequests(requestsData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading budget requests:', error);
      setLoading(false);
    }
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        amount: parseFloat(newRequest.amount),
        purpose: newRequest.purpose,
        description: newRequest.description,
        eventDate: new Date(newRequest.eventDate),
        status: 'pending',
        requesterId: currentUser.uid,
        requesterName: currentUser.name,
        requesterRole: userRole,
        department: currentUser.department,
        createdAt: Timestamp.now()
      };

      await addDoc(collection(db, 'budgetRequests'), requestData);
      setShowRequestForm(false);
      setNewRequest({ amount: '', purpose: '', description: '', eventDate: '' });
      loadBudgetRequests();
    } catch (error) {
      console.error('Error submitting budget request:', error);
    }
  };

  // Mock data - will be replaced with Firebase data
  const budgetData = {
    totalBudget: 2000000,
    allocated: 1500000,
    remaining: 500000,
    departments: [
      { name: 'Technical', allocated: 500000, spent: 300000, pending: 50000 },
      { name: 'Cultural', allocated: 600000, spent: 400000, pending: 100000 },
      { name: 'Sports', allocated: 400000, spent: 200000, pending: 0 },
    ],
    requests: [
      {
        id: 1,
        department: 'Technical',
        amount: 50000,
        purpose: 'Workshop Equipment',
        status: 'pending',
        requestedBy: 'John Doe',
        requestedAt: '2024-03-20',
      },
      // Add more requests...
    ]
  };

  const doughnutData = {
    labels: ['Allocated', 'Remaining'],
    datasets: [
      {
        data: [budgetData.allocated, budgetData.remaining],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: budgetData.departments.map(dept => dept.name),
    datasets: [
      {
        label: 'Allocated',
        data: budgetData.departments.map(dept => dept.allocated),
        backgroundColor: '#4F46E5',
      },
      {
        label: 'Spent',
        data: budgetData.departments.map(dept => dept.spent),
        backgroundColor: '#10B981',
      },
      {
        label: 'Pending',
        data: budgetData.departments.map(dept => dept.pending),
        backgroundColor: '#F59E0B',
      },
    ],
  };

  const BudgetRequestForm = () => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              onClick={() => setShowRequestForm(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmitRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Amount (₹)</label>
              <input
                type="number"
                value={newRequest.amount}
                onChange={(e) => setNewRequest(prev => ({ ...prev, amount: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Purpose</label>
              <input
                type="text"
                value={newRequest.purpose}
                onChange={(e) => setNewRequest(prev => ({ ...prev, purpose: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newRequest.description}
                onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Event Date</label>
              <input
                type="date"
                value={newRequest.eventDate}
                onChange={(e) => setNewRequest(prev => ({ ...prev, eventDate: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setShowRequestForm(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Define available tabs based on role
  const tabs = [
    ...(userRole === ROLES.CHAIRPERSON || userRole === ROLES.TEACHER_INCHARGE ? [
      { id: 'overview', label: 'Overview' },
      { id: 'requests', label: 'Requests' },
      { id: 'analysis', label: 'Analysis' }
    ] : [
      { id: 'requests', label: 'My Requests' }
    ])
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Budget Management</h1>
          <p className="text-gray-500">
            {userRole === ROLES.CHAIRPERSON || userRole === ROLES.TEACHER_INCHARGE
              ? 'Track and manage budget allocations'
              : 'Submit and track budget requests'}
          </p>
        </div>
        {(userRole === ROLES.HOD || userRole === ROLES.VICE_CHAIRPERSON) && (
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            New Budget Request
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Total Budget</h3>
              <p className="text-3xl font-bold text-indigo-600">
                ₹{budgetData.totalBudget.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Allocated</h3>
              <p className="text-3xl font-bold text-green-600">
                ₹{budgetData.allocated.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900">Remaining</h3>
              <p className="text-3xl font-bold text-yellow-600">
                ₹{budgetData.remaining.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Department Allocations</h3>
            <div className="space-y-4">
              {budgetData.departments.map(dept => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">{dept.name}</span>
                    <span className="text-gray-900">₹{dept.allocated.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(dept.spent / dept.allocated) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Spent: ₹{dept.spent.toLocaleString()}</span>
                    <span className="text-gray-500">
                      {((dept.spent / dept.allocated) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {request.purpose}
                      </p>
                      <p className="text-sm text-gray-500">
                        Amount: ₹{request.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        Event Date: {new Date(request.eventDate.seconds * 1000).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      Submitted: {new Date(request.createdAt.seconds * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </li>
            ))}
            {requests.length === 0 && (
              <li className="px-4 py-8 text-center text-gray-500">
                No budget requests found. Click "New Budget Request" to create one.
              </li>
            )}
          </ul>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Distribution</h3>
              <div className="w-full max-w-md mx-auto">
                <Doughnut data={doughnutData} />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Department-wise Analysis</h3>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showRequestForm && <BudgetRequestForm />}
    </div>
  );
} 