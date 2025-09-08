import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import memberIcon from "../assets/Ellipse 3.png";
import backIcon from "../assets/Vector.png";

const CreateTask = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    taskName: "",
    description: "",
    startDate: "",
    endDate: "",
   pipelineId: "",
    status: "To Do",
    assignedTo: null,
    attachments: [],
    subTasks: [],
  });

  const [availableUsers, setAvailableUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);
  const { spaceId} = useParams();

  const [pipelines, setPipelines] = useState([]); 
  const projectId = location.state?.projectId;

  useEffect(() => {
 

    const fetchAvailableUsersToAssignTask = async () => {
      try {
        console.log(projectId)
        const res = await fetch(
          `http://localhost:8000/api/project/getProjectMembers/${projectId}/members`,
          {
            credentials: "include",
          }
        );
        const result = await res.json();
        setAvailableUsers(result?.data || []);
        // setShowUserList(true)
        console.log(availableUsers)
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchAvailableUsersToAssignTask();
  }, [projectId]);

  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/project/${projectId}/pipelines`,
          { credentials: "include" }
        );
        const result = await res.json();
        setPipelines(result?.data || []);
      } catch (err) {
        console.error("Error fetching pipelines", err);
      }
    };

    if (projectId) fetchPipelines();
  }, [projectId]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = (userId) => {
    setForm((prev) => ({
      ...prev,
      assignedTo: userId,
    }));
  };

  const handleRemoveMember = (userId) => {
    setForm((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.filter((id) => id !== userId),
    }));
  };
  const handleSubmit = async () => {
    if (!projectId) {
      alert("Project ID is missing!");
      return;
    }
  
    if (!form.taskName || !form.pipelineId) {
      alert("Task name and Pipeline are required!");
      return;
    }
  
    try {
      console.log("assignto",form.assignedTo)
      const res = await fetch(
        `http://localhost:8000/api/task/${projectId}/createTask`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            pipelineId: form.pipelineId,   // ✅ required by backend
            taskName: form.taskName,
            description: form.description,
            startDate: form.startDate || null,
            endDate: form.endDate || null,
            assignedTo: form.assignedTo || null,
            attachments: form.attachments || [],
              status:form.status,
          }),
        }
      );
  
      const result = await res.json();
      console.log("Task Create Response:", result);
  
      if (result.success) {
        alert("Task created successfully ✅");
        navigate(-1)
      } else {
        alert(result.message || "Failed to create task ❌");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Something went wrong ❌");
    }
  };

  return (
    <div className="w-full h-full p-5">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate(-1)}>
              <img src={backIcon} alt="Back" className="w-5 h-5" />
            </button>
            <label className="text-black font-normal text-2xl">
              Create Task
            </label>
          </div>
          <button
          onClick={handleSubmit}
          className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]">
            Add
          </button>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div>
              <label className="block text-lg font-normal text-[#747373]">
                Task Name*
              </label>
              <input
                name="taskName"
                type="text"
                value={form.taskName}
                onChange={handleChange}
                className="w-full md:w-[420px] h-[60px] border border-[#CECECE] rounded-lg px-3"
              />
            </div>
            <div>
              <label className="block text-lg font-normal text-[#747373]">
                Description*
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full md:w-[600px] h-[180px] border border-[#CECECE] rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Start Date*
                </label>
                <input
                  name="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full md:w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                />
              </div>
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  End Date*
                </label>
                <input
                  name="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full md:w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                />
              </div>
            </div>
            <div>
            <label className="block text-lg font-normal text-[#747373]">
                Pipeline*
              </label>
              <select
  value={form.pipelineId}
  onChange={(e) => setForm({ ...form, pipelineId: e.target.value })}
>
  <option value="">Select Pipeline</option>
  {pipelines.map((p) => (
    <option key={p._id} value={p._id}>
      {p.name}
    </option>
  ))}
</select>
            </div>
          </div>
          <div className="flex-1 space-y-10 flex flex-col">
            <div className="w-full md:w-auto ">
              <label className="block text-lg font-normal text-[#747373]">
                Status*
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full md:w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2 mt-1"
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
              </select>
            </div>
            <div>
              <label className="block text-[18px] font-normal mb-2 text-[#747373]">
                Assigned To
              </label>
              <div className="flex space-x-2">
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
                    <p className="text-gray-500 text-sm">No users available</p>
                  ) : (
                    availableUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex justify-between items-center py-2 px-2 bg-white rounded shadow-sm mb-2"
                      >
                        <span className="text-sm text-gray-700">
                          {user.name}
                        </span>
                        {form.assignedTo?.includes(user._id) ? (
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
            <div className="w-full md:w-auto ">
              <label className="block text-lg font-normal text-[#747373]">
                Attachments
              </label>
              <button className="border border-[#CECECE] w-full md:w-[200px] h-[40px] rounded-lg mt-1">
                Upload Attachments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
