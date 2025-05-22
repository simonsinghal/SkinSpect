import React, { useState, useEffect, useContext } from "react";
import { AuthContext} from "../../authContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to the home page after logout
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, cannot fetch admin data.");
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const usersResponse = await fetch(
          "http://localhost:5000/api/admin/users/count",
          { headers }
        );
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.count || 0);

        const analysisResponse = await fetch(
          "http://localhost:5000/api/admin/analysis/count",
          { headers }
        );
        const analysisData = await analysisResponse.json();
        setTotalAnalysis(analysisData.count || 0);

        const activityResponse = await fetch(
          "http://localhost:5000/api/admin/activity/recent",
          { headers }
        );
        const activityData = await activityResponse.json();
        setRecentActivity(Array.isArray(activityData) ? activityData : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    
    <div className="flex-1 flex flex-col p-8 relative">

      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-200 ease-in-out z-20" // Added z-20 to ensure it's on top
      >
        Logout
      </button>

      {/* Top Boxes */}
      <div className="flex gap-4 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Total Users:
          </h2>
          <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">
            Types of Analysis:
          </h2>
          <p className="text-3xl font-bold text-gray-800">{totalAnalysis}</p>
        </div>
        {/* You can add more boxes here if needed */}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Recent Activity
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto max-h-[400px]"> {/* Added max-h and overflow-y */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-700 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  S. No.
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Activity
                </th>
                {/* <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Input Details
                </th> */}
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivity.map((activity, index) => (
                <tr key={activity.id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    {activity.activityType}
                  </td>
                  {/* <td className="px-6 py-4">
                    {activity.activityType === "Image Analysis Submitted" &&
                      activity.inputDetails ? (
                        <div className="flex items-center">
                          <img
                            src={`http://localhost:5000/${activity.inputDetails}`}
                            // src="http://localhost:5000/uploads/test.jpg"

                            alt="Uploaded Scan"
                            className="h-8 w-8 mr-2 rounded-md object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/fallback-image.png";
                            }}
                          />
                          <span>Uploaded Scan</span>
                        </div>
                      ) : activity.activityType === "Text Analysis Submitted" &&
                        activity.inputDetails ? (
                          <span>{activity.inputDetails}</span>
                        ) : (
                          <span>{activity.inputDetails}</span>
                        )}
                  </td> */}
                  <td className="px-6 py-4">
                    {activity.user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(activity.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* No "Load More" button here */}
      </div>
    </div>
  );
};

export default Dashboard;