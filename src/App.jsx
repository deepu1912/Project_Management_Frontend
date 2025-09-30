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
import EditSpace from "./Components/EditSpace";
import EditProject from "./Components/EditProject";
import ViewTaskDetails from "./pages/ViewTaskDetails";
import ViewPipelineDetails from "./pages/ViewPipelineDetails";
import { FileArchiveIcon } from "lucide-react";
import FileAttachments from "./Components/FileAttachments";

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
        {
          path: 'editSpace/:spaceId',
          element:<EditSpace/>
        },
        {
          path: 'editProject/:spaceId/:projectId',
          element:<EditProject/>
        },
         {
          path: 'task-details/:taskId',
          element:<ViewTaskDetails/>
        },
        {
          path: 'pipeline-details/:pipelineId',
          element:<ViewPipelineDetails/>
        },
        {
          path: "file-attachments",
          element:<FileAttachments/>
        }
      ],
    },
  ]);
  return <RouterProvider router={appRouter} />;
}

export default App;
