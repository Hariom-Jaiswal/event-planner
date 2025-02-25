import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ROLES } from '../../../constants/roles';

export default function DepartmentList() {
  const { userRole, currentUser } = useAuth();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // If committee member, redirect to their department
    if (userRole === ROLES.COMMITTEE_MEMBER && currentUser?.department) {
      navigate(`/departments/${currentUser.department}`);
      return;
    }
    
    // Load departments based on role
    loadDepartments();
  }, [userRole, currentUser]);

  const loadDepartments = async () => {
    // Mock data - replace with Firebase fetch
    const departmentsData = [
      {
        id: 'tech',
        name: 'Technical',
        head: 'John Doe',
        totalMembers: 15,
        upcomingEvents: 3,
        status: 'active'
      },
      {
        id: 'cultural',
        name: 'Cultural',
        head: 'Jane Smith',
        totalMembers: 20,
        upcomingEvents: 2,
        status: 'active'
      },
      {
        id: 'sports',
        name: 'Sports',
        head: 'Mike Johnson',
        totalMembers: 12,
        upcomingEvents: 1,
        status: 'planning'
      }
    ];

    // Filter departments based on role
    if (userRole === ROLES.HOD) {
      setDepartments(departmentsData.filter(dept => dept.id === currentUser.department));
    } else {
      setDepartments(departmentsData);
    }
  };

  // If committee member, don't render the list
  if (userRole === ROLES.COMMITTEE_MEMBER) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {userRole === ROLES.HOD ? 'My Department' : 'Departments'}
          </h1>
          <p className="text-gray-500">
            {userRole === ROLES.HOD 
              ? 'Manage your department details'
              : 'Manage and view department details'
            }
          </p>
        </div>
        {(userRole === ROLES.TEACHER_INCHARGE || userRole === ROLES.CHAIRPERSON) && (
          <button
            onClick={() => navigate('/departments/new')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Create Department
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept.id}
            onClick={() => navigate(`/departments/${dept.id}`)}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="text-sm text-gray-500">Head: {dept.head}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                dept.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {dept.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-indigo-600">{dept.totalMembers}</p>
                <p className="text-sm text-gray-600">Members</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-2xl font-semibold text-indigo-600">{dept.upcomingEvents}</p>
                <p className="text-sm text-gray-600">Upcoming Events</p>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/departments/${dept.id}/members`);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Members
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/departments/${dept.id}/events`);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-800"
              >
                View Events
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 