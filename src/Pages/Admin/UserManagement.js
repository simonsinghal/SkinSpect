import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [totalAccounts, setTotalAccounts] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                };
    
                const statsResponse = await fetch('http://localhost:5000/api/admin/users/stats', { headers });
                const statsData = await statsResponse.json();
                setTotalAccounts(statsData.totalAccounts || 0);
                setTotalAdmins(statsData.totalAdmins || 0);
    
                const usersResponse = await fetch('http://localhost:5000/api/admin/users', { headers });
                const usersData = await usersResponse.json();
    
                if (Array.isArray(usersData)) {
                    setUsers(usersData);
                } else if (Array.isArray(usersData.users)) {
                    setUsers(usersData.users);
                } else {
                    console.error('Unexpected user data format:', usersData);
                    setUsers([]);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsers([]);
            }
        };
    
        fetchUserData();
    }, []);
    

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (res.ok) {
                setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="flex-1 p-8">
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

            <div className="bg-white shadow-md rounded-lg overflow-hidden flex-1 flex flex-col">
                <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">User Details</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-700 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left">S. No.</th>
                                <th className="px-6 py-3 text-left">Full Name</th>
                                <th className="px-6 py-3 text-left">Email</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Array.isArray(users) && users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Link to={`/admin/users/edit/${user._id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                    <span>&lt; 1-10 &gt;</span>
                </div> */}
            </div>
        </div>
    );
};

export default UserManagement;
