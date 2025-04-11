import React, { useState, useEffect } from "react";

const AIManagement = () => {
  const [currentVersion, setCurrentVersion] = useState("V1.7"); // Static for now
  const [models, setModels] = useState([]);

  useEffect(() => {
    // Fetch AI model data from your backend API
    const fetchAIModels = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "http://localhost:5000/api/admin/ai/models"
        );
        const data = await response.json();
        console.log("AI Models API Response:", data);
        if (Array.isArray(data)) {
          setModels(data);
        } else {
          console.error("Invalid AI models data format:", data);
          setModels([]);
        }
      } catch (error) {
        console.error("Error fetching AI models:", error);
        setModels([]);
      }
    };

    fetchAIModels();
  }, []);

  const handleUpdateModel = () => {
    // Implement your update model logic here (API call)
    console.log("Updating AI Model...");
    // After successful update, you might want to refetch model data
  };

  return (
    <div className="flex-1 p-8">
      {/* Current Version and Update Model Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-1">
            Current Version:
          </h3>
          <p className="text-2xl font-bold text-gray-800">{currentVersion}</p>
        </div>
        <button
          onClick={handleUpdateModel}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Model
        </button>
      </div>

      {/* Skin Disease Details Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Skin Disease Details
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  S. No.
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Model Name
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Version
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Date Deployed
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  modelName: "SkinCancer Analyzer",
                  version: "v 0.1",
                  dateDeployed: "15/4/2025, 5:16:27 PM",
                  status: "Active",
                },
                {
                  id: 2,
                  modelName: "SkinDisease Analyzer",
                  version: "v 0.1",
                  dateDeployed: "15/4/2025, 5:16:27 PM",
                  status: "Active",
                },
                {
                  id: 3,
                  modelName: "SkinSymptoms Analyzer",
                  version: "v 0.1",
                  dateDeployed: "15/4/2025, 5:16:27 PM",
                  status: "Active",
                },
              ].map((model, index) => (
                <tr key={model.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {model.modelName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {model.version}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {model.dateDeployed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        model.status === "Active"
                          ? "bg-green-500 text-white"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
      </div>
    </div>
  );
};

export default AIManagement;
