
import React from "react";
import { createHashRouter } from "react-router-dom";

import PageTitle from "./components/atom/pageTitle";
import ErrorPage from './components/pages/error';
import Demo from "./components/pages/demo";
import Shapes from "./components/pages/shapes";

const router = createHashRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <PageTitle title="Create charts" />
            <Shapes />
          </>
        ),
      }
    ]
  },
]);

// const router = createHashRouter([
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "/",
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <Navigate to="/dashboard" replace />,
//       },
//       {
//         id: "dashboard",
//         path: "/dashboard",
//         element: (
//           <>
//             <ProtectedRoute />
//             <PageTitle title="Dashboard" />
//             <Dashboard />
//           </>
//         ),
//       }
//     ]
//   },
//   {
//     path: "/update-dashboard",
//     // element: <Login />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         id: "update-dashboard",
//         path: "/update-dashboard",
//         element: (
//           <>
//             <ProtectedRoute />
//             <PageTitle title="Customize Dashboard" />
//             <UpdateDashboard />
//           </>
//         ),
//       }
//     ]
//   },
// ]);

export { router };