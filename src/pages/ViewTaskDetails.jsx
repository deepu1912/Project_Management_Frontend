// TaskDetails.jsx
import { useLocation } from "react-router-dom";

function ViewTaskDetails() {
  const location = useLocation();
  const {
    taskId,
    taskName,
    startDate,
    endDate,
    assignedTo,
  } = location.state || {};

  return (
    <div className="h-screen -mt-10 flex items-center justify-center bg-gray-50">
      <div className="p-6 w-full max-w-xl bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Task Details</h2>
        <div className="space-y-2 text-gray-700">
          {/* <p><strong>Task ID:</strong> {taskId}</p> */}
          <p><strong>Task Name:</strong> {taskName}</p>
          <p><strong>Start Date:</strong> {startDate ? new Date(startDate).toLocaleDateString() : "—"}</p>
          <p><strong>End Date:</strong> {endDate ? new Date(endDate).toLocaleDateString() : "—"}</p>
          <p><strong>Assigned To:</strong> {assignedTo}</p>
        </div>
      </div>
    </div>
  );
}

export default ViewTaskDetails;
