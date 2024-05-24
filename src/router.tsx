
import React from "react";
import { createBrowserRouter, createHashRouter, Navigate } from "react-router-dom";

import Layout from "./components/atom/layout";
import PageTitle from "./components/atom/pageTitle";

import Dashboard from './components/pages/dashboard';
import Login from './components/pages/login';
import ErrorPage from './components/pages/error';
import ProtectedRoute from './components/atom/protectedRoute';
import UpdateDashboard from './components/pages/updateDashboard';


const router = createHashRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        id: "dashboard",
        path: "/dashboard",
        element: (
          <>
            <ProtectedRoute />
            <PageTitle title="Dashboard" />
            <Dashboard />
          </>
        ),
      }
    ]
  },
  {
    path: "/update-dashboard",
    // element: <Login />,
    errorElement: <ErrorPage />,
    children: [
      {
        id: "update-dashboard",
        path: "/update-dashboard",
        element: (
          <>
            <ProtectedRoute />
            <PageTitle title="Customize Dashboard" />
            <UpdateDashboard />
          </>
        ),
      }
    ]
  },
]);

export { router };