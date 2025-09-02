import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import memberIcon from "../assets/Ellipse 3.png";
import spaceLogo from "../assets/Ellipse 4.png";
import vectorIcon from "../assets/Vector.png";

const CreateSpaceCard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    spaceName: "",
    description: "",
    members: [],
  });

  const [availableUsers, setAvailableUsers] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:8000/api/spaces/available-users",
          {
            credentials: "include",
          }
        );
        const result = await res.json();
        setAvailableUsers(result?.data || []);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchAvailableUsers();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddMember = (userId) => {
    setData((prev) => ({
      ...prev,
      members: [...new Set([...prev.members, userId])],
    }));
  };

  const handleRemoveMember = (userId) => {
    setData((prev) => ({
      ...prev,
      members: prev.members.filter((id) => id !== userId),
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/spaces/createSpace", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Space created!");
        // navigate("/"); // redirect after creation
      } else {
        alert(result.message || "Failed to create space");
      }
    } catch (err) {
      console.error("Error creating space", err);
      alert("Failed to create space");
    }
  };

  return (
    <div className="w-full h-full p-5">
      <div className="max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center space-x-2">
              <button onClick={() => navigate(-1)}>
                <img src={vectorIcon} alt="Back" className="w-5 h-5" />
              </button>
              <label className="text-black font-normal text-2xl">
                Create Space
              </label>
            </div>
            <button
              onClick={handleSubmit}
              className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]"
            >
              Add
            </button>
          </div>

          <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex flex-col items-center space-y-8">
              <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
                <img
                  src={spaceLogo}
                  alt="Space logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="border border-[#CECECE] w-[180px] h-[48px] rounded-[25px] text-[18px] leading-[24px] font-normal text-[#747373]">
                Upload
              </button>

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
                          {data.members.includes(user._id) ? (
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

            {/* Right section (form inputs) */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Space Name*
                </label>
                <input
                  name="spaceName"
                  type="text"
                  value={data.spaceName}
                  onChange={handleOnChange}
                  className="w-[420px] h-[60px] border border-[#CECECE] rounded-lg px-3"
                />
              </div>
              <div>
                <label className="block text-lg font-normal text-[#747373]">
                  Description*
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleOnChange}
                  className="w-[600px] h-[180px] border border-[#CECECE] rounded-lg p-3"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CreateSpaceCard;
