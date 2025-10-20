import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router";
import AppLayout from "./layout/AppLayout"; // New layout with LoadingBar

// Lazy load
const HomePage = lazy( () => import( './pages/Home' ) );

//components layouts pages
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout";

//components pages
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./portected/ProtectedRoute";
import HomeSkeleton from './components/HomeSkeleton';
import ForgotPassword from './pages/ForgotPassword';
import RouteAuth from './portected/RouteAuth';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Categories from './pages/Categories';
import PageData from './pages/PageData';
import AddCourses from './pages/AddCourses';
import CoursePage from './pages/CoursePage';
import Contact from './pages/Contact';
import Faqs from './pages/Faqs';
import Terms from './pages/Terms';

const router = createBrowserRouter( [
  {
    path: "/",
    element: <AppLayout />, // <-- Add LoadingBar here
    children: [
      {
        element: (
          <Suspense fallback={<HomeSkeleton />}>
            <MainLayout />
          </Suspense> ),
        children: [
          {
            index: true, element: <HomePage />
          },
          {
            path: "about",
            element: <About />
          },
          {
            path: "contact", element: <Contact />
          },
          {
            path: "faqs", element: <Faqs />
          },
          {
            path: "terms", element: <Terms />
          },
          {
            path: "profile", element: <ProtectedRoute />,
            children: [ {index: true, element: <Profile />} ]
          },
          {
            path: "courses", element: <Courses />,
          },
          {
            path: "courses/:id", element: <CoursePage />
          }
        ]
      },
      {
        path: "login",
        element: <RouteAuth />,
        children: [ {
          element: <AuthLayout />,
          children: [ {index: true, element: <Login />} ]
        } ]
      },
      {
        path: "register",
        element: <AuthLayout />,
        children: [ {index: true, element: <Register />} ]
      },
      {
        path: "forgot-password",
        element: <AuthLayout />,
        children: [ {index: true, element: <ForgotPassword />} ]
      },
      {
        path: "dashboard",
        element: <ProtectedRoute role="admin" />,
        children: [ {
          element: <DashboardLayout />,
          children:
            [
              {index: true, element: <Dashboard />},
              {path: "categories", element: <Categories />},
              {path: "page-data", element: <PageData />},
              {path: "add-courses", element: <AddCourses />}
            ]
        } ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
] );

function App() {
  return (
    <>
      {/* توفير التوجيه للتطبيق / Provide routing to the app */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;