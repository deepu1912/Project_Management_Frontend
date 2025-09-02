import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import projectsIcon from "../assets/projects.png";
import settingsIcon from "../assets/settings.png";
import spacesIcon from "../assets/spaces.png";
import tasksIcon from "../assets/tasks.png";

const SideBar = () => {
  const { pathname } = useLocation();
  const { spaceId } = useParams();
  const links = [
    // { name: "Dashboard", icon: dashboardIcon,path:"" },
    { name: "Spaces", icon: spacesIcon, path: "/home/spaceDashboard" },
    {
      name: "Projects",
      icon: projectsIcon,
      path: `../projectDashboard/${spaceId}`,
    },
    { name: "Tasks", icon: tasksIcon, path: "/home/tasks" },
  ];

  return (
    <div className="w-64 h-[100vh] pt-16 bg-white border-r shadow-sm flex flex-col">
      <nav className="flex-1 flex flex-col gap-2 px-4 py-6">
        {links.map(({ name, icon, path }) => {
          const to = `/${path.toLowerCase()}`;
          const active = pathname === to;
          return (
            <Link
              key={to}
              to={path}
              className={`flex items-center h-10 pl-4 gap-3 rounded-lg text-sm font-medium ${
                active
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <img src={icon} alt={`${name} icon`} className="w-5 h-5" />
              {name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          to="/settings"
          className={`flex items-center h-10 pl-4 gap-3 rounded-lg text-sm font-medium w-full ${
            pathname === "/settings"
              ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <img src={settingsIcon} alt="Settings icon" className="w-5 h-5" />
          Settings
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
