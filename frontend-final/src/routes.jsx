import {createBrowserRouter} from 'react-router';
import {
  protectedLoader,
  authLoader,
  loginAction,
  logoutAction
} from './middleware/auth.middleware';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthLayout from './layout/AuthLayout';
import DashboardLayout from './layout/DashboardLayout';

export const router = createBrowserRouter( [
  {
    path: '/',
    children: [
      // Public routes (login, register, etc.)
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <Login />,
            loader: authLoader,    // Prevents authenticated users from accessing login
            action: loginAction,   // Handles login form submission
          },
          // Add other auth routes (register, forgot-password, etc.)
        ],
      },

      // Protected routes (dashboard, profile, etc.)
      {
        element: <DashboardLayout />,
        loader: protectedLoader,   // Protects all dashboard routes
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path: 'logout',
            action: logoutAction,
          },
          // Add other protected routes
        ],
      },
    ],
  },
] );

export default router;