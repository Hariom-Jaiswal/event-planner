export const ROLES = {
  TEACHER_INCHARGE: 'TEACHER_INCHARGE',
  CHAIRPERSON: 'CHAIRPERSON',
  VICE_CHAIRPERSON: 'VICE_CHAIRPERSON',
  HOD: 'HOD',
  COMMITTEE_MEMBER: 'COMMITTEE_MEMBER'
};

export const PERMISSIONS = {
  // Department Permissions
  VIEW_ALL_DEPARTMENTS: 'VIEW_ALL_DEPARTMENTS',
  MANAGE_DEPARTMENT: 'MANAGE_DEPARTMENT',
  VIEW_DEPARTMENT: 'VIEW_DEPARTMENT',
  
  // Budget Permissions
  MANAGE_BUDGET: 'MANAGE_BUDGET',
  VIEW_BUDGET: 'VIEW_BUDGET',
  REQUEST_BUDGET: 'REQUEST_BUDGET',
  
  // Event Permissions
  MANAGE_EVENTS: 'MANAGE_EVENTS',
  VIEW_EVENTS: 'VIEW_EVENTS',
  CREATE_EVENT: 'CREATE_EVENT',
  
  // Member Permissions
  MANAGE_MEMBERS: 'MANAGE_MEMBERS',
  VIEW_MEMBERS: 'VIEW_MEMBERS',
  
  // Venue Permissions
  MANAGE_VENUES: 'MANAGE_VENUES',
  BOOK_VENUE: 'BOOK_VENUE',
  
  // Sponsor Permissions
  MANAGE_SPONSORS: 'MANAGE_SPONSORS',
  VIEW_SPONSORS: 'VIEW_SPONSORS',
  
  // Approval Permissions
  APPROVE_ALL: 'APPROVE_ALL',
  APPROVE_DEPARTMENT: 'APPROVE_DEPARTMENT',
  
  // Chat Permissions
  ACCESS_GLOBAL_CHAT: 'ACCESS_GLOBAL_CHAT',
  ACCESS_DEPARTMENT_CHAT: 'ACCESS_DEPARTMENT_CHAT',
  MANAGE_CHAT: 'MANAGE_CHAT',
  MANAGE_MULTIPLE_DEPARTMENTS: 'MANAGE_MULTIPLE_DEPARTMENTS'
};

export const ROLE_PERMISSIONS = {
  [ROLES.TEACHER_INCHARGE]: [
    PERMISSIONS.VIEW_ALL_DEPARTMENTS,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EVENTS,
    PERMISSIONS.MANAGE_MEMBERS,
    PERMISSIONS.MANAGE_VENUES,
    PERMISSIONS.MANAGE_SPONSORS,
    PERMISSIONS.APPROVE_ALL,
    PERMISSIONS.ACCESS_GLOBAL_CHAT,
    PERMISSIONS.MANAGE_CHAT
  ],
  
  [ROLES.CHAIRPERSON]: [
    PERMISSIONS.VIEW_ALL_DEPARTMENTS,
    PERMISSIONS.MANAGE_BUDGET,
    PERMISSIONS.MANAGE_EVENTS,
    PERMISSIONS.MANAGE_MEMBERS,
    PERMISSIONS.MANAGE_VENUES,
    PERMISSIONS.MANAGE_SPONSORS,
    PERMISSIONS.APPROVE_ALL,
    PERMISSIONS.ACCESS_GLOBAL_CHAT,
    PERMISSIONS.MANAGE_CHAT
  ],
  
  [ROLES.VICE_CHAIRPERSON]: [
    PERMISSIONS.VIEW_ALL_DEPARTMENTS,
    PERMISSIONS.VIEW_BUDGET,
    PERMISSIONS.REQUEST_BUDGET,
    PERMISSIONS.MANAGE_EVENTS,
    PERMISSIONS.MANAGE_MEMBERS,
    PERMISSIONS.BOOK_VENUE,
    PERMISSIONS.VIEW_SPONSORS,
    PERMISSIONS.APPROVE_DEPARTMENT,
    PERMISSIONS.ACCESS_GLOBAL_CHAT,
    PERMISSIONS.ACCESS_DEPARTMENT_CHAT,
    PERMISSIONS.MANAGE_MULTIPLE_DEPARTMENTS
  ],
  
  [ROLES.HOD]: [
    PERMISSIONS.VIEW_DEPARTMENT,
    PERMISSIONS.MANAGE_DEPARTMENT,
    PERMISSIONS.VIEW_BUDGET,
    PERMISSIONS.REQUEST_BUDGET,
    PERMISSIONS.CREATE_EVENT,
    PERMISSIONS.MANAGE_MEMBERS,
    PERMISSIONS.BOOK_VENUE,
    PERMISSIONS.APPROVE_DEPARTMENT,
    PERMISSIONS.ACCESS_DEPARTMENT_CHAT
  ],
  
  [ROLES.COMMITTEE_MEMBER]: [
    PERMISSIONS.VIEW_DEPARTMENT,
    PERMISSIONS.VIEW_EVENTS,
    PERMISSIONS.VIEW_MEMBERS,
    PERMISSIONS.BOOK_VENUE,
    PERMISSIONS.ACCESS_DEPARTMENT_CHAT
  ]
};

// Navigation menu items based on role
export const ROLE_NAVIGATION = {
  [ROLES.TEACHER_INCHARGE]: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/departments', label: 'Departments' },
    { path: '/budget', label: 'Budget' },
    { path: '/approvals', label: 'Approvals' },
    { path: '/venues', label: 'Venues' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/chat', label: 'Chat' }
  ],
  
  [ROLES.CHAIRPERSON]: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/departments', label: 'Departments' },
    { path: '/budget', label: 'Budget' },
    { path: '/approvals', label: 'Approvals' },
    { path: '/venues', label: 'Venues' },
    { path: '/sponsors', label: 'Sponsors' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/chat', label: 'Chat' }
  ],
  
  [ROLES.VICE_CHAIRPERSON]: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/departments', label: 'Departments' },
    { path: '/budget', label: 'Budget Requests' },
    { path: '/approvals', label: 'Approvals' },
    { path: '/venues', label: 'Venues' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/chat', label: 'Chat' }
  ],
  
  [ROLES.HOD]: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/department', label: 'My Department' },
    { path: '/budget', label: 'Budget Requests' },
    { path: '/venues', label: 'Venues' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/chat', label: 'Chat' }
  ],
  
  [ROLES.COMMITTEE_MEMBER]: [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/department', label: 'My Department' },
    { path: '/venues', label: 'Venues' },
    { path: '/deadlines', label: 'Deadlines' },
    { path: '/chat', label: 'Chat' }
  ]
}; 