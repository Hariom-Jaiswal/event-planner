import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLES, ROLE_NAVIGATION } from '../../constants/roles';

export default function Navigation() {
  const { userRole, userDepartments } = useAuth();
  const location = useLocation();
  const [selectedDepartment, setSelectedDepartment] = useState(userDepartments[0]);

  const menuItems = ROLE_NAVIGATION[userRole] || [];

  // Special handling for Vice Chairperson with multiple departments
  const isViceChair = userRole === ROLES.VICE_CHAIRPERSON;

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {isViceChair && userDepartments.length > 0 && (
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="mr-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {userDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept} Department
                  </option>
                ))}
              </select>
            )}

            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path.replace(':departmentId', selectedDepartment)}
                className={`inline-flex items-center px-3 py-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 