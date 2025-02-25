import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function DepartmentDetail() {
  const { departmentId } = useParams();
  const { userRole, currentUser } = useAuth();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartmentDetails();
  }, [departmentId]);

  const loadDepartmentDetails = async () => {
    try {
      // Mock data - replace with Firebase fetch
      const departmentData = {
        id: departmentId,
        name: departmentId === 'tech' ? 'Technical' : 
              departmentId === 'cultural' ? 'Cultural' : 'Sports',
        head: 'John Doe',
        description: 'Department responsible for technical events and workshops',
        totalMembers: 15,
        upcomingEvents: 3,
        budget: {
          allocated: 50000,
          spent: 20000,
          remaining: 30000
        },
        events: [
          {
            id: 1,
            name: 'Tech Workshop',
            date: '2024-03-20',
            status: 'upcoming'
          },
          {
            id: 2,
            name: 'Coding Competition',
            date: '2024-03-25',
            status: 'planning'
          }
        ],
        members: [
          {
            id: 1,
            name: 'Alice Johnson',
            role: 'Committee Member',
            team: 'Web Development'
          },
          {
            id: 2,
            name: 'Bob Smith',
            role: 'Committee Member',
            team: 'App Development'
          }
        ]
      };

      setDepartment(departmentData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading department details:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Department not found</h2>
        <button
          onClick={() => navigate('/departments')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{department.name}</h1>
            <p className="text-gray-500">{department.description}</p>
          </div>
          <button
            onClick={() => navigate('/departments')}
            className="text-indigo-600 hover:text-indigo-800"
          >
            Back to Departments
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Members</h3>
          <p className="text-3xl font-bold text-indigo-600">{department.totalMembers}</p>
          <button
            onClick={() => navigate(`/departments/${departmentId}/members`)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All Members
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Events</h3>
          <p className="text-3xl font-bold text-indigo-600">{department.upcomingEvents}</p>
          <button
            onClick={() => navigate(`/departments/${departmentId}/events`)}
            className="mt-4 text-sm text-indigo-600 hover:text-indigo-800"
          >
            View All Events
          </button>
        </div>

        {(userRole === ROLES.HOD || userRole === ROLES.VICE_CHAIRPERSON || 
          userRole === ROLES.CHAIRPERSON || userRole === ROLES.TEACHER_INCHARGE) && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Budget</h3>
            <p className="text-3xl font-bold text-indigo-600">
              ₹{department.budget.remaining.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              of ₹{department.budget.allocated.toLocaleString()} allocated
            </p>
          </div>
        )}
      </div>

      {/* Recent Events */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
        <div className="space-y-4">
          {department.events.map(event => (
            <div
              key={event.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{event.name}</h4>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                event.status === 'upcoming' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {event.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Members */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Members</h3>
        <div className="space-y-4">
          {department.members.map(member => (
            <div
              key={member.id}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
              <span className="text-sm text-gray-600">{member.team}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 