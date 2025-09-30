// TaskDetails.jsx
import { useLocation, useNavigate } from "react-router-dom";
import backIcon from "../assets/Vector.png";
import memberIcon from "../assets/Ellipse 3.png";
import { useEffect, useState } from "react";
import UploadAttachmentModal from "../Components/UploadAttachmentModal";
function ViewTaskDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    taskId,
    taskName,
    taskDescription,
    startDate,
    endDate,
    assignedTo,
    projectId
  } = location.state || {};
  console.log("tasks details:", taskId, taskName, taskDescription, startDate, endDate, assignedTo, projectId);
  const [form, setForm] = useState({
    status: "",
    assignedTo: null,
  });

  const [showUserList, setShowUserList] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  
  const [attachments, setAttachments] = useState([
    "Figma Prototype",
    "ScreenShot1.png",
    "ScreenShot2.png",
    "Document.pdf",
    "Wireframe.jpg",
  ]);
  const [showAll, setShowAll] = useState(false);
  const handleUpload = (attachment) => {
    console.log("Uploaded attachment:", attachment);
    setAttachments((prev) => [...prev, attachment]);
  };
  const [availableUsers, setAvailableUsers] = useState([]);
  console.log(projectId);
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
  const visibleAttachments = showAll ? attachments : attachments.slice(0, 3);
  return (
    <div className="w-full h-full p-5">
      <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigate(-1)}>
              <img src={backIcon} alt="Back" className="w-5 h-5" />
            </button>
            <label className="text-black font-normal text-2xl">
              Edit Task
            </label>
          </div>
          <button
            className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]">
            Save
          </button>
        </div>
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="p-6 w-full max-w-xl bg-white shadow-md rounded-md">
              <h2 className="text-2xl font-bold mb-4 text-center">Task Details</h2>
              <div className="space-y-2 text-gray-700">
                <p><strong>Task Name:</strong> {taskName}</p>
                <p><strong>Description:</strong> {taskDescription}</p>
                <p><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : "—"}</p>
                <p><strong>End Date:</strong> {endDate ? new Date(endDate).toLocaleDateString() : "—"}</p>
                <p><strong>Assigned To:</strong> {assignedTo}</p>
              </div>
            </div>
            {/* </div> */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Start Date*
                </label>
                <input
                  name="startDate"
                  type="date"
                  // value={form.startDate}
                  // onChange={handleChange}
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
                  // value={form.endDate}
                  // onChange={handleChange}
                  className="w-full md:w-[200px] h-[40px] border border-[#CECECE] rounded-lg px-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-normal text-[#747373]">
                Chat Box
              </label>
              <textarea
                name="chatbox"
                // value={form.description}
                // onChange={handleChange}
                className="w-full md:w-[600px] h-[180px] border border-[#CECECE] rounded-lg px-3 py-2"
              />
            </div>
          </div>

          <div className="flex-1 space-y-10 flex flex-col">
            <div className="w-full md:w-auto ">
              <label className="block text-lg font-normal text-[#747373]">
                Status*
              </label>
              <select
                name="status"
                // value={form.status}
                // onChange={handleChange}
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
            <div>
              <label className="block text-lg font-normal text-[#747373] mb-2">
                Attachments
              </label>
              <button
                onClick={() => setShowUploadModal(true)}
                className="border border-[#CECECE] w-[200px] h-[40px] rounded-lg text-[#212121]">
                Upload Attachments
              </button>
              <div className="mt-3 flex flex-col gap-2">
                {visibleAttachments.map((file, idx) => (
                  <button
                    key={idx}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 text-left hover:bg-gray-100"
                  >
                    {file}
                  </button>
                ))}
              </div>
              {attachments.length > 3 && (
                <button
                onClick={() => navigate("/home/file-attachments")}
                  className="text-sm text-gray-500 mt-2 underline"
                >
                   View More
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <UploadAttachmentModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default ViewTaskDetails;
