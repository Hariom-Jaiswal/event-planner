import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { PERMISSIONS, ROLE_PERMISSIONS, ROLES } from '../../../constants/roles';

export default function DepartmentMembers() {
  const { departmentId } = useParams();
  const { userRole } = useAuth();
  const navigate = useNavigate();
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const canManageMembers = ROLE_PERMISSIONS[userRole]?.includes(PERMISSIONS.MANAGE_DEPARTMENT);

  // Mock data - will be replaced with Firebase data
  const members = [
    {
      id: 1,
      name: 'John Doe',
      role: ROLES.HOD,
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'active',
      tasks: 3,
      joinedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: ROLES.COMMITTEE_MEMBER,
      email: 'jane@example.com',
      phone: '+1234567891',
      status: 'active',
      tasks: 2,
      joinedDate: '2024-01-20'
    },
    // Add more members...
  ];

  const AddMemberForm = () => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Add New Member</h3>
          <button
            onClick={() => setShowAddMemberForm(false)}
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              <option value={ROLES.COMMITTEE_MEMBER}>Committee Member</option>
              <option value={ROLES.HOD}>Head of Department</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowAddMemberForm(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const MemberDetails = ({ member }) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Member Details</h3>
          <button
            onClick={() => setSelectedMember(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Name</h4>
            <p className="mt-1">{member.name}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Role</h4>
            <p className="mt-1">{member.role}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Contact</h4>
            <p className="mt-1">{member.email}</p>
            <p className="mt-1">{member.phone}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Status</h4>
            <p className="mt-1">{member.status}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Active Tasks</h4>
            <p className="mt-1">{member.tasks} tasks assigned</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500">Joined Date</h4>
            <p className="mt-1">{new Date(member.joinedDate).toLocaleDateString()}</p>
          </div>
          {canManageMembers && (
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
              >
                Remove Member
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Department Members</h1>
          <p className="text-gray-500">Manage and view member details</p>
        </div>
        {canManageMembers && (
          <button
            onClick={() => setShowAddMemberForm(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Member
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tasks
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {member.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {member.tasks} active tasks
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    View Details
                  </button>
                  {canManageMembers && (
                    <button className="text-red-600 hover:text-red-900">
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddMemberForm && <AddMemberForm />}
      {selectedMember && <MemberDetails member={selectedMember} />}
    </div>
  );
} 