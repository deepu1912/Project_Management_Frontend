import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../assets/Vector.png";

const AddPipeline = () => {
  const navigate = useNavigate();
  const { spaceId } = useParams(); // ✅ get spaceId from URL
  const [projects, setProjects] = useState([]);
  const [projectId, setProjectId] = useState(""); // ✅ selected projectId

  const [form, setForm] = useState({
    pipeline: "",
    description: "",
    startDate: "",
    endDate: "",
    addTask: [],
  });

  // ✅ fetch projects under space
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/project/getProjectsUnderSpace/${spaceId}`,
          { credentials: "include" }
        );
        const data = await res.json();
        if (res.ok) {
          setProjects(data.data); // ✅ fix: set the array
        } else {
          console.error(data.message || "Failed to fetch projects");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    
    fetchProjects();
  }, [spaceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async () => {
    if (!projectId) {
      alert("Please select a project!");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8000/api/project/pipelines`, // ✅ your actual API
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
           projectId: form.projectId, // ✅ include projectId in body
          name: form.pipeline,
          description: form.description,
          startDate: form.startDate,
          endDate: form.endDate,
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        alert("Pipeline created successfully!");
        navigate(-1); // go back
      } else {
        alert(data.message || "Failed to create pipeline");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
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
              Create Pipeline
            </label>
          </div>
          <button
            onClick={handleCreate}
            className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]"
          >
            Create
          </button>
        </div>

        {/* form */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {/* ✅ Project dropdown */}
            <div>
              <label className="block text-lg font-normal text-[#747373]">
                Select Project*
              </label>
              <select
  value={projectId}
  onChange={(e) => {
    setProjectId(e.target.value); // keep existing state
    setForm((prev) => ({ ...prev, projectId: e.target.value })); // ✅ update form.projectId
  }}
  className="w-full md:w-[420px] h-[50px] border border-[#CECECE] rounded-lg px-3"
>
  <option value="">-- Select Project --</option>
  {projects.map((p) => (
    <option key={p._id} value={p._id}>
      {p.projectName} {/* ✅ fix: use projectName */}
    </option>
  ))}
</select>

            </div>

            <div>
              <label className="block text-lg font-normal text-[#747373]">
                Pipeline Name*
              </label>
              <input
                name="pipeline"
                type="text"
                value={form.pipeline}
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
          </div>

          {/* Right Column (Task placeholder) */}
          <div className="flex-1 space-y-10 flex flex-col">
            <div className="w-full md:w-auto ">
              <label className="block text-lg font-normal text-[#747373]">
                Add Task
              </label>
              <div className="mt-2 space-y-2">
                {form.addTask.map((st, idx) => (
                  <div
                    key={idx}
                    className="inline-block px-3 py-1 border rounded text-gray-700 mr-2"
                  >
                    {st}
                  </div>
                ))}
                <button className="ml-1 text-blue-500 text-xs font-medium">
                  + Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* end form */}
      </div>
    </div>
  );
};

export default AddPipeline;
