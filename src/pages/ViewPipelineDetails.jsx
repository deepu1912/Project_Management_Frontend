// PipelineDetails.jsx
import { useLocation, useNavigate } from "react-router-dom";
import backIcon from "../assets/Vector.png";
import { useEffect, useState } from "react";
function ViewPipelineDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const {
        pipelineId,
        pipelineName,
        pipelineDescription,
        startDate,
        endDate,
        projectId
    } = location.state || {};
    console.log("Pipeline details:", pipelineId, pipelineName,pipelineDescription, startDate, endDate, projectId);
    const [form, setForm] = useState({
        status: "",
    });

    console.log(projectId);

    return (
        <div className="w-full h-full p-5">
            <div className="max-w-screen-xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center space-x-2">
                        <button onClick={() => navigate(-1)}>
                            <img src={backIcon} alt="Back" className="w-5 h-5" />
                        </button>
                        <label className="text-black font-normal text-2xl">
                            Edit Pipeline
                        </label>
                    </div>
                    <button
                        //onClick={handleSubmit}
                        className="w-[149px] h-[48px] border border-blue-500 text-[#212121] rounded-[15px] font-normal text-[18px] leading-[24px]">
                        Save
                    </button>
                </div>
                {/* <div className="h-screen flex items-center justify-center bg-gray-50"> */}
                <div className="p-6 flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="p-6 w-full max-w-xl bg-white shadow-md rounded-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">Pipeline Details</h2>
                            <div className="space-y-2 text-gray-700">
                                {/* <p><strong>Task ID:</strong> {taskId}</p> */}
                                <p><strong>Pipeline Name:</strong> {pipelineName}</p>
                                <p><strong>Description:</strong> {pipelineDescription}</p>
                                <p><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : "—"}</p>
                                <p><strong>End Date:</strong> {endDate ? new Date(endDate).toLocaleDateString() : "—"}</p>
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
                                Comment
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewPipelineDetails;
