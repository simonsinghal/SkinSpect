import React, { useState, useEffect } from 'react';
// import UploadIcon from '../../assets/upload.png'; // Adjust path if needed

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalAnalysis, setTotalAnalysis] = useState(0);
    const [recentActivity, setRecentActivity] = useState([]);

    useEffect(() => {
        // Fetch data from your backend API
        const fetchDashboardData = async () => {
            try {
                // Replace with your actual API endpoints
                const usersResponse = await fetch('http://localhost:5000/api/admin/users/count');
                const usersData = await usersResponse.json();
                setTotalUsers(usersData.count || 0);

                const analysisResponse = await fetch('http://localhost:5000/api/admin/analysis/count');
                const analysisData = await analysisResponse.json();
                setTotalAnalysis(analysisData.count || 0);

                const activityResponse = await fetch('http://localhost:5000/api/admin/activity/recent');
                const activityData = await activityResponse.json();
                setRecentActivity(activityData || []);

            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                // Handle error appropriately
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <div className="flex-1 flex flex-col p-8">
            {/* Top Boxes */}
            <div className="flex gap-4 mb-8">
                <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Users:</h2>
                    <p className="text-3xl font-bold text-gray-800">{totalUsers}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6 w-64 text-center">
                    <h2 className="text-xl font-semibold text-blue-700 mb-2">Total Analysis:</h2>
                    <p className="text-3xl font-bold text-gray-800">{totalAnalysis}</p>
                </div>
                {/* You can add more boxes here if needed */}
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1 flex flex-col">
                <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Recent Activity</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-700 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">S. No.</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Activity</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Input Details</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">User</th>
                                <th className="px-4 py-2 text-left text-sm font-medium uppercase tracking-wider">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentActivity.map((activity, index) => (
                                <tr key={activity.id || index}>
                                    <td className="px-4 py-2 text-sm text-gray-500">{index + 1}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{activity.activityType}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">
                                        {activity.inputDetails && activity.inputDetails.toLowerCase().includes('image') ? (
                                            <div className="flex items-center">
                                                {/* <img src={UploadIcon} alt="Image Uploaded" className="h-6 w-6 mr-2" /> */}
                                                <span>Image Uploaded</span>
                                            </div>
                                        ) : (
                                            activity.inputDetails
                                        )}
                                    </td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{activity.user}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{new Date(activity.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="py-3 px-4 bg-gray-100 text-sm text-gray-500">
                    Showing 1-10
                </div>
            </div>
        </div>
    );
};

export default Dashboard;