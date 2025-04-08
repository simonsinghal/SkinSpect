import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch user data and statistics from your backend API
        const fetchUserData = async () => {
            try {
                // Replace with your actual API endpoints
                const statsResponse = await fetch('http://localhost:5000/api/admin/users/stats');
                const statsData = await statsResponse.json();
                setTotalAccounts(statsData.totalAccounts || 0);
                setTotalAdmins(statsData.totalAdmins || 0);

                const usersResponse = await fetch('http://localhost:5000/api/admin/users');
                const usersData = await usersResponse.json();
                setUsers(usersData || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error appropriately
            }
        };

        fetchUserData();
    }, []);

    const handleDeleteUser = (userId) => {
        // Implement your delete user logic here (API call, state update)
        console.log(`Deleting user with ID: ${userId}`);
        // After successful deletion, you might want to refetch user data
    };

    return (
        <div className="flex-1 p-8">
            {/* Top Statistics and Add New User Button (Aligned) */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
                        <h3 className="text-lg font-semibold text-blue-700 mb-1">Total Accounts:</h3>
                        <p className="text-2xl font-bold text-gray-800">{totalAccounts}</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
                        <h3 className="text-lg font-semibold text-blue-700 mb-1">Total Admins:</h3>
                        <p className="text-2xl font-bold text-gray-800">{totalAdmins}</p>
                    </div>
                </div>
                <Link to="/admin/users/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add New User
                </Link>
            </div>

            {/* User Details Table */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1 flex flex-col">
                <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">User Details</h2> {/* Moved heading inside */}
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-700 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-medium font-medium  tracking-wider">Password</th>
                                <th className="px-6 py-3 text-left text-medium font-medium  tracking-wider">Role</th>
                                <th className="px-6 py-3 text-right text-medium font-medium  tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{"miu**********".substring(0, 3) + user.password.slice(3).replace(/./g, '*')}</td> {/* Masking password */}
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Link to={`/admin/users/edit/${user.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Edit
                                        </Link>
                                        <button onClick={() => handleDeleteUser(user.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center"> {/* Aligned pagination to the right */}
                    <span>&lt; 1-10 &gt;</span>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;