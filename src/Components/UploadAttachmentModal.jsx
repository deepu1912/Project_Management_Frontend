// components/UploadAttachmentModal.jsx
import { useState } from "react";

function UploadAttachmentModal({ isOpen, onClose, onUpload }) {
  const [attachment, setAttachment] = useState({
    name: "",
    type: "",
    file: null,
  });

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment({ ...attachment, name: file.name, file });
    }
  };

  const handleSubmit = () => {
    onUpload(attachment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded-lg shadow-lg p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Upload Attachment</h2>

        {/* Attachment Name */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            Attachment Name
          </label>
          <input
            type="text"
            value={attachment.name}
            onChange={(e) =>
              setAttachment({ ...attachment, name: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter file name"
          />
        </div>

        {/* Attachment Type */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            Attachment Type
          </label>
          <select
            value={attachment.type}
            onChange={(e) =>
              setAttachment({ ...attachment, type: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="">Select type</option>
            <option value="image">Image</option>
            <option value="file">File</option>
            <option value="url">URL</option>
          </select>
        </div>

        {/* File Upload */}
        <div className="mb-3">
          <label className="block text-sm text-gray-600 mb-1">
            Select File
          </label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Supported formats: .jpg, .jpeg, .png
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-black text-white rounded-lg"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadAttachmentModal;
