import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeedbackManagement = () => {
    const [feedbackQueries, setFeedbackQueries] = useState([]);
    const [pendingQueriesCount, setPendingQueriesCount] = useState(0);
    const [resolvedQueriesCount, setResolvedQueriesCount] = useState(0);

    useEffect(() => {
        // Fetch feedback data from your backend API
        const fetchFeedback = async () => {
            try {
                const response = await fetch('YOUR_FEEDBACK_API_ENDPOINT'); // Replace with your actual API endpoint
                const data = await response.json();
                setFeedbackQueries(data || []);

                // Optionally fetch counts for pending and resolved queries
                const pendingResponse = await fetch('YOUR_PENDING_QUERIES_COUNT_ENDPOINT'); // Replace with your API endpoint
                const pendingData = await pendingResponse.json();
                setPendingQueriesCount(pendingData.count || 0);

                const resolvedResponse = await fetch('YOUR_RESOLVED_QUERIES_COUNT_ENDPOINT'); // Replace with your API endpoint
                const resolvedData = await resolvedResponse.json();
                setResolvedQueriesCount(resolvedData.count || 0);

            } catch (error) {
                console.error('Error fetching feedback data:', error);
            }
        };

        fetchFeedback();
    }, []);

    const handleReplyFeedback = (feedbackId) => {
        // Implement your reply feedback logic here (e.g., navigate to a reply form)
        console.log(`Replying to feedback with ID: ${feedbackId}`);
    };

    const handleDeleteFeedback = (feedbackId) => {
        // Implement your delete feedback logic here (API call, state update)
        console.log(`Deleting feedback with ID: ${feedbackId}`);
        // After successful deletion, you might want to refetch feedback data
    };

    return (
        <div className="p-8 flex-1">
            {/* Top Statistics */}
            <div className="flex space-x-4 mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
                    <h3 className="text-lg font-semibold text-blue-700 mb-1">Pending Queries :</h3>
                    <p className="text-2xl font-bold text-gray-800">{pendingQueriesCount}</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
                    <h3 className="text-lg font-semibold text-green-700 mb-1">Resolved Queries :</h3>
                    <p className="text-2xl font-bold text-gray-800">{resolvedQueriesCount}</p>
                </div>
            </div>

            {/* Feedback Table */}
            <div className="bg-white rounded-lg overflow-hidden flex-1 flex flex-col">
                <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-700">Feedback And Support</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-blue-700 text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Feedback</th>
                                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">FB Reply</th>
                                <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {feedbackQueries.map((feedback, index) => (
                                <tr key={feedback.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                    <td className="px-6 py-4">{feedback.email}</td>
                                    <td className="px-6 py-4">{feedback.feedbackText}</td> {/* Adjust property name based on your API response */}
                                    <td className="px-6 py-4">{feedback.reply}</td> {/* Adjust property name based on your API response */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <button onClick={() => handleReplyFeedback(feedback.id)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Reply
                                        </button>
                                        <button onClick={() => handleDeleteFeedback(feedback.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                    <span>&lt; 1-10 &gt;</span> {/* Placeholder for pagination */}
                </div>
            </div>
        </div>
    );
};

export default FeedbackManagement;