import React from "react";
import { FaDownload, FaTrash } from "react-icons/fa"; // icons for download and delete

function FileAttachments() {
  // Mock data (you can replace this with props or API data)
  const files = [
    {
      name: "Proposal Document",
      date: "03/07/2025",
      assignedTo: ["Alice", "Bob"],
    },
    {
      name: "Wireframe.png",
      date: "03/05/2025",
      assignedTo: ["Charlie"],
    },
  ];

  const handleDownload = (fileName) => {
    console.log("Downloading:", fileName);
    // implement download logic
  };

  const handleDelete = (fileName) => {
    console.log("Deleting:", fileName);
    // implement delete logic
  };

  return (
    <div className="p-5 w-full h-full">
      <table className="min-w-full border border-gray-200 text-sm">
        <thead>
          <tr className="bg-white">
            <th className="text-left text-gray-500 px-4 py-2">File Name</th>
            <th className="text-left text-gray-500 px-4 py-2">Date</th>
            <th className="text-left text-gray-500 px-4 py-2">Assigned to</th>
            <th className="text-left text-gray-500 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{file.name}</td>
              <td className="px-4 py-2">{file.date}</td>
              <td className="px-4 py-2">
                {file.assignedTo.join(", ")}
              </td>
              <td className="px-4 py-2 flex space-x-3">
                {/* Download Button */}
                <button
                  onClick={() => handleDownload(file.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaDownload />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(file.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileAttachments;
