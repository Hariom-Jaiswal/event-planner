import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function SponsorPage() {
  const { userRole } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data - will be replaced with Firebase data
  const sponsors = [
    {
      id: 1,
      name: 'Tech Corp',
      type: 'Technology',
      status: 'talking',
      contactPerson: 'John Smith',
      email: 'john@techcorp.com',
      phone: '+1234567890',
      amount: 100000,
      terms: [
        'Logo placement on all event materials',
        'Booth space at the venue',
        'Speaking slot in technical sessions'
      ],
      duties: [
        { task: 'Send sponsorship proposal', completed: true },
        { task: 'Follow-up meeting', completed: false },
        { task: 'Contract signing', completed: false }
      ],
      notes: 'Interested in technical workshops',
      assignedTo: 'Mike Wilson',
      lastUpdated: '2024-03-20'
    }
  ];

  const statusColors = {
    talking: 'yellow',
    approved: 'blue',
    rejected: 'red',
    'deal-done': 'green'
  };

  const AddSponsorForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add New Sponsor</h3>
          <button
            onClick={() => setShowAddForm(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Person</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Amount</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₹</span>
              </div>
              <input
                type="number"
                className="pl-7 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Terms & Conditions</label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter terms line by line..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Initial Notes</label>
            <textarea
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Sponsor
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const SponsorCard = ({ sponsor }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{sponsor.name}</h3>
          <p className="text-sm text-gray-500">{sponsor.type}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${statusColors[sponsor.status]}-100 text-${statusColors[sponsor.status]}-800`}>
          {sponsor.status.charAt(0).toUpperCase() + sponsor.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Contact Person</p>
            <p className="text-sm font-medium">{sponsor.contactPerson}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Amount</p>
            <p className="text-sm font-medium">₹{sponsor.amount.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Terms & Conditions</h4>
          <ul className="list-disc list-inside space-y-1">
            {sponsor.terms.map((term, index) => (
              <li key={index} className="text-sm text-gray-600">{term}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Progress</h4>
          <div className="space-y-2">
            {sponsor.duties.map((duty, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{duty.task}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  duty.completed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {duty.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Assigned to: {sponsor.assignedTo}
            </div>
            <div className="text-sm text-gray-500">
              Last updated: {new Date(sponsor.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sponsors</h1>
          <p className="text-gray-500">Manage sponsorship opportunities</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add New Sponsor
        </button>
      </div>

      <div className="mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">All Statuses</option>
          <option value="talking">Talking</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="deal-done">Deal Done</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sponsors
          .filter(sponsor => filterStatus === 'all' || sponsor.status === filterStatus)
          .map(sponsor => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} />
          ))}
      </div>

      {showAddForm && <AddSponsorForm />}
    </div>
  );
} 