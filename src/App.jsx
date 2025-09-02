import React from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
// import AddProject from "./Components/AddProject";
import AddProject from "./Components/AddProject";
import MainBody from "./Layout.js/MainBody";
import AddPipeline from "./pages/AddPipeline";
import CreateSpaceCard from "./pages/CreateSpaceCard";
import CreateTask from "./pages/CreateTask";
import Login from "./pages/LoginPage";
import ProjectDashboard from "./pages/ProjectDashboard";
import Register from "./pages/Register";
import SpaceDashboard from "./pages/SpaceDashboard";
import Tasks from "./pages/Tasks";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/register" />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <MainBody />,
      children: [
        {
          path: "spaceDashboard",
          element: <SpaceDashboard />,
        },
        {
          path: "projectDashboard/:spaceId",
          element: <ProjectDashboard />,
        },
        {
          path: "createSpace",
          element: <CreateSpaceCard />,
        },
        {
          path: "tasks/:spaceId",
          element: <Tasks />,
        },
        {
          path: "createTask",
          element: <CreateTask />,
        },
        {
          path: "addPipeline/:spaceId",
          element: <AddPipeline />,
        },
        {
          path: "addProject/:spaceId",
          element: <AddProject />,
        },
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
