import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import PrivateRoute from './components/core/PrivateRoute';
import Dashboard from './components/Dashboard';
import DepartmentList from './components/features/departments/DepartmentList';
import { PERMISSIONS } from './constants/roles';
import DepartmentMembers from './components/features/departments/DepartmentMembers';
import DepartmentEvents from './components/features/departments/DepartmentEvents';
import BudgetDashboard from './components/features/budget/BudgetDashboard';
import ApprovalsPage from './components/features/approvals/ApprovalsPage';
import ProfilePage from './components/features/profile/ProfilePage';
import VenuePage from './components/features/venues/VenuePage';
import DeadlinesPage from './components/features/deadlines/DeadlinesPage';
import SponsorPage from './components/features/sponsors/SponsorPage';
import ChatPage from './components/features/chat/ChatPage';
import DepartmentDetail from './components/features/departments/DepartmentDetail';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/departments"
            element={
              <PrivateRoute>
                <DepartmentList />
              </PrivateRoute>
            }
          />
          <Route
            path="/departments/:departmentId"
            element={
              <PrivateRoute>
                <DepartmentDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/departments/:departmentId/members"
            element={
              <PrivateRoute>
                <DepartmentMembers />
              </PrivateRoute>
            }
          />
          <Route
            path="/departments/:departmentId/events"
            element={
              <PrivateRoute>
                <DepartmentEvents />
              </PrivateRoute>
            }
          />
          <Route
            path="/budget"
            element={
              <PrivateRoute>
                <BudgetDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/approvals"
            element={
              <PrivateRoute>
                <ApprovalsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/venues"
            element={
              <PrivateRoute>
                <VenuePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/deadlines"
            element={
              <PrivateRoute>
                <DeadlinesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/sponsors"
            element={
              <PrivateRoute requiredPermissions={[PERMISSIONS.MANAGE_SPONSORS]}>
                <SponsorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}