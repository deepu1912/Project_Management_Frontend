// src/components/AddProject.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memberIcon from "../assets/Ellipse 3.png";
import spaceLogo from "../assets/Ellipse 4.png";
import vectorIcon from "../assets/Vector.png";
import { ToastContainer, toast } from "react-toastify";

const AddProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    projectName: "",
    description: "",
    action: "Pipeline",
    startDate: "",
    endDate: "",
    comments: "",
    members: [],
  });

  // Generic change handler for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const { spaceId } = useParams();
  console.log("space", spaceId);
  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const res = await fetch(
          ` http://localhost:8000/api/project/space-users/${spaceId}`,
          {
            credentials: "include",
          }
        );
        const result = await res.json();
        console.log(result);
        setAvailableUsers(result?.data || []);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchAvailableUsers();
  }, []);

  const handleAddMember = (userId) => {
    setForm((prev) => ({
      ...prev,
      members: [...new Set([...prev.members, userId])],
    }));
  };

  const handleRemoveMember = (userId) => {
    setForm((prev) => ({
      ...prev,
      members: prev.members.filter((id) => id !== userId),
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/project/createProject/${spaceId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectName: form.projectName,
            description: form.description,
            members: form.members,
            endDate: form.endDate,
          }),
        }
      );

      const result = await res.json();
      console.log(result);
      if (res.ok) {
        toast.success("Project created successfully! ✅");

        // ✅ Reset the form state
        setForm({
          projectName: "",
          description: "",
          action: "Pipeline",
          startDate: "",
          endDate: "",
          comments: "",
          members: [],
        });
        setTimeout(() => {
          navigate(`../projectDashboard/${spaceId}`);
        }, 3000);
      } else {
        toast.error(result.message || "Failed to create project ❌");
      }
    } catch (err) {
      console.error("Error creating space", err);
      toast.error("Something went wrong! ❌");
    }
  };

  return (
    <div className="w-full h-full p-5 ">
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate(-1)}
                className="text-black font-normal text-xl"
              >
                <img src={vectorIcon} alt="Back" className="w-5 h-5" />
              </button>
              <label className="text-black font-normal text-2xl">
                Add Project
              </label>
            </div>
            <button
              onClick={handleSubmit}
              className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]"
            >
              Add
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Left Column */}
            <div className="flex flex-col items-center space-y-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full ">
                <img
                  src={spaceLogo}
                  alt="Project logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="border border-[#CECECE] w-[180px] h-[48px] rounded-[25px] text-[18px] leading-[24px] font-normal text-[#747373]">
                Upload
              </button>
              <div>
                <label className="block text-lg font-normal text-[#747373] mb-2">
                  Actions*
                </label>
                <select
                  name="action"
                  value={form.action}
                  onChange={handleChange}
                  className="w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                >
                  <option>Pipeline</option>
                  <option>On Hold</option>
                  <option>Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-lg font-normal text-[#747373] mb-2">
                  Attachments
                </label>
                <button className="border border-[#CECECE] w-[200px] h-[40px] rounded-lg text-[#212121]">
                  Upload Attachments
                </button>
              </div>

              <div className="text-center">
                <label className="block text-[18px] font-normal mb-2 text-[#747373]">
                  Members
                </label>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full">
                    <img
                      src={memberIcon}
                      alt="member Icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => setShowUserList(!showUserList)}
                    className="w-8 h-8 border rounded-full flex items-center justify-center text-xl"
                  >
                    +
                  </button>
                </div>

                {showUserList && (
                  <div className="mt-4 bg-gray-100 p-3 rounded-lg max-h-64 overflow-y-auto border border-gray-200">
                    {availableUsers.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No users available
                      </p>
                    ) : (
                      availableUsers.map((user) => (
                        <div
                          key={user._id}
                          className="flex justify-between items-center py-2 px-2 bg-white rounded shadow-sm mb-2"
                        >
                          <span className="text-sm text-gray-700">
                            {user.name}
                          </span>
                          {form.members.includes(user._id) ? (
                            <button
                              onClick={() => handleRemoveMember(user._id)}
                              className="text-red-500 text-xs font-medium"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              onClick={() => handleAddMember(user._id)}
                              className="text-blue-500 text-xs font-medium"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 space-y-4 w-full">
              {/* Project Name */}
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Project Name*
                </label>
                <input
                  name="projectName"
                  type="text"
                  value={form.projectName}
                  onChange={handleChange}
                  className="w-[420px] h-[60px] border border-[#CECECE] rounded-lg px-3"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-[600px] h-[180px] border border-[#CECECE] rounded-lg px-3 py-2"
                />
              </div>
              {/* Attachments */}

              {/* Dates */}
              <div className="flex space-x-4">
                <div>
                  <label className="block text-lg font-normal text-[#747373] mb-2">
                    Start Date*
                  </label>
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleChange}
                    className="w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                  />
                </div>
                <div>
                  <label className="block text-lg font-normal text-[#747373] mb-2">
                    End Date*
                  </label>
                  <input
                    name="endDate"
                    type="date"
                    value={form.endDate}
                    onChange={handleChange}
                    className="w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                  />
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-lg font-normal text-[#747373] mb-2">
                  Comments
                </label>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  className="w-full h-[100px] border border-[#CECECE] rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="custom-toast-container"
      />
    </div>
  );
};

export default AddProject;
