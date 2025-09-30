import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function Tasks() {
  const navigate = useNavigate();
  const { spaceId } = useParams();
  const location = useLocation();
  const project = location.state?.project;
  const projectId = project?._id;
  const [pipelines, setPipelines] = useState([]);
  const [expandedPipeline, setExpandedPipeline] = useState(null); // which pipeline is open


  // Fetch pipelines with tasks
  useEffect(() => {
    const fetchPipelines = async () => {
      try {
        console.log("pid", projectId)
        const res = await fetch(
          `http://localhost:8000/api/project/${projectId}/pipelines-with-tasks`,
          { credentials: "include" }
        );
        const result = await res.json();
        console.log(result)
        if (result.success) {
          setPipelines(result?.data);

        }
      } catch (err) {
        console.error("Error fetching pipelines:", err);
      }
    };
    if (projectId) fetchPipelines();
  }, [projectId]);

  console.log(pipelines)

  const toggleExpand = (pipelineId) => {
    setExpandedPipeline((prev) => (prev === pipelineId ? null : pipelineId));
  };

  const handleViewPage = (taskId, taskName,taskDescription, startDate, endDate, assignedTo,projectId) => {
    console.log("taskid", taskId)
    console.log("taskDescriotion",taskDescription);
    navigate(`../task-details/${taskId}`, {
      state: {
        taskId,
        taskName,
        taskDescription,
        startDate,
        endDate,
        assignedTo,
        projectId
      },
    });
  }
  const handleViewPipeline = (pipelineId, pipelineName,pipelineDescription, startDate, endDate,projectId) => {
    console.log("pipelineid", pipelineId)
    console.log("pipelineDescription",pipelineDescription);
    navigate(`../pipeline-details/${pipelineId}`, {
      state: {
        pipelineId,
        pipelineName,
        pipelineDescription,
        startDate,
        endDate,
        projectId
      },
    });
  }
  return (
    <div className="p-5 w-full h-full">
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="w-[6rem] p-1 flex items-center gap-2 bg-white">
            <p className="text-sm">Status</p>
            <div className="flex items-center gap-2">
              <p>All</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
          <div className="w-[6rem] p-1 flex items-center gap-2 bg-white">
            <p className="text-sm">Sort</p>
            <div className="flex items-center gap-2">
              <p>A-Z</p>
              <MdKeyboardArrowDown />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {pipelines.length > 0 && (<Link
            to={"/home/createTask"}
            state={{ projectId }}
            className="flex text-gray-600 py-1 px-.5 items-center gap-1 w-28 bg-white border-2 border-gray-200"
          >
            <div className="border-r-2 border-gray-200">
              <GoPlus size={20} />
            </div>
            <p className="text-sm">Create Task</p>
          </Link>)}
          <Link
            to={`/home/addPipeline/${spaceId}`}
            className="flex text-gray-600 py-1 px-.5 items-center gap-1 w-28 bg-white border-2 border-gray-200"
          >
            <div className="border-r-2 border-gray-200">
              <GoPlus size={20} />
            </div>
            <p className="text-sm">Add Pipeline</p>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="w-full h-full mt-3">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-white">
              <th className="text-left text-gray-500 px-4 py-2">Pipeline</th>
              <th className="text-left text-gray-500 px-4 py-2">Start date</th>
              <th className="text-left text-gray-500 px-4 py-2">Due date</th>
              <th className="text-left text-gray-500 px-4 py-2">Status</th>
              <th className="text-left text-gray-500 px-4 py-2">Assigned to</th>
              <th className="text-left text-gray-500 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>

            {pipelines.map((pipeline) => (

              <React.Fragment key={pipeline._id}>
                {/* Pipeline row */}

                <tr
                  className="bg-gray-100 cursor-pointer"
                  onClick={() => toggleExpand(pipeline._id)}
                >
                  <td className="px-4 py-2 font-semibold flex items-center gap-2">
                    {expandedPipeline === pipeline._id ? (
                      <MdKeyboardArrowUp />
                    ) : (
                      <MdKeyboardArrowDown />
                    )}
                    {pipeline.name}
                  </td>
                  <td className="px-4 py-2">
                    {pipeline.createdAt
                      ? new Date(pipeline.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2">
                    {pipeline.endDate
                      ? new Date(pipeline.endDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-4 py-2">


                    {pipeline.tasks.length > 0 && (pipeline.tasks.every(t => t.status === "Done") ? "Done" : "In Progress")}

                  </td>

                  <td className="px-4 py-2">{pipeline.tasks.assignedTo
                    ? pipeline.tasks.assignedTo.name || "-"
                    : "-"}</td>
                  <td className="px-4 py-2">


                    <Eye size={14} 
                    className="cursor-pointer"
                    onClick={() =>
                      handleViewPipeline(
                        pipeline._id,
                        pipeline.name,
                        pipeline.description,
                        pipeline.startDate,
                        pipeline.endDate,
                        projectId
                      )
                    }/>
                  </td>
                </tr>

                {/* Tasks under pipeline */}
                {expandedPipeline === pipeline._id &&
                  pipeline.tasks.map((task) => (
                    <tr key={task._id} className="border-t">
                      <td className="px-10 py-2 text-gray-700">
                        {task.taskName}
                      </td>
                      <td className="px-4 py-2">
                        {task.startDate
                          ? new Date(task.startDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-2">
                        {task.endDate
                          ? new Date(task.endDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-2">{task.status}</td>
                      <td className="px-4 py-2">
                        {task.assignedTo
                          ? task.assignedTo.name || "Unassigned"
                          : "Unassigned"}
                      </td>
                      <td className="px-4 py-2">
                        <Eye
                          size={14}
                          className="cursor-pointer"
                          onClick={() =>
                            handleViewPage(
                              task._id,
                              task.taskName,
                              task.description,
                              task.startDate,
                              task.endDate,
                              task.assignedTo?.name || "Unassigned",
                              projectId
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;
