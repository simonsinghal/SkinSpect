import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeedbackSupport = () => {
  const [feedbackQueries, setFeedbackQueries] = useState([]);
  const [pendingQueriesCount, setPendingQueriesCount] = useState(0);
  const [resolvedQueriesCount, setResolvedQueriesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbackData = async () => { // Defined at the component's top level
    setLoading(true);
    setError(null);
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("No token found, cannot fetch feedback data.");
      setError("Authentication token not found.");
      setLoading(false);
      return;
    }

    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const feedbackResponse = await fetch("http://localhost:5000/api/feedback", {
        headers: headers,
      });
      if (!feedbackResponse.ok) {
        throw new Error(`HTTP error! status: ${feedbackResponse.status}`);
      }
      const feedbackData = await feedbackResponse.json();
      setFeedbackQueries(feedbackData || []);

      const pendingResponse = await fetch("http://localhost:5000/api/feedback/pending-count", {
        headers: headers,
      });
      if (!pendingResponse.ok) {
        console.warn(`Failed to fetch pending count: ${pendingResponse.status}`);
      } else {
        const pendingData = await pendingResponse.json();
        setPendingQueriesCount(pendingData?.count || 0);
      }

      const resolvedResponse = await fetch("http://localhost:5000/api/feedback/resolved-count", {
        headers: headers,
      });
      if (!resolvedResponse.ok) {
        console.warn(`Failed to fetch resolved count: ${resolvedResponse.status}`);
      } else {
        const resolvedData = await resolvedResponse.json();
        setResolvedQueriesCount(resolvedData?.count || 0);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch feedback data.");
      console.error("Error fetching feedback data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbackData(); // Call it inside useEffect to run on component mount
  }, []);

  const handleReplyFeedback = (feedbackId) => {
    // Implement your reply feedback logic here (e.g., navigate to a reply form)
    console.log(`Replying to feedback with ID: ${feedbackId}`);
  };

  const handleDeleteFeedback = async (feedbackId) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, cannot delete feedback.");
        setError("Authentication token not found.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/feedback/${feedbackId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log(`Feedback with ID ${feedbackId} deleted successfully.`);
          // Refetch feedback data after successful deletion
          fetchFeedbackData(); // Now accessible here
        } else if (response.status === 404) {
          setError("Feedback query not found.");
        } else {
          const errorData = await response.json();
          setError(errorData?.error || "Failed to delete feedback query.");
        }
      } catch (err) {
        setError(err.message || "Failed to delete feedback query.");
        console.error("Error deleting feedback query:", err);
      }
    }
  };

  if (loading) {
    return <div className="p-8 flex-1">Loading feedback data...</div>;
  }

  if (error) {
    return <div className="p-8 flex-1 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 flex-1">
      {/* Top Statistics */}
      <div className="flex space-x-4 mb-6">
        <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
          <h3 className="text-lg font-semibold text-blue-700 mb-1">
            Pending Queries :
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {pendingQueriesCount}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
          <h3 className="text-lg font-semibold text-green-700 mb-1">
            Resolved Queries :
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            {resolvedQueriesCount}
          </p>
        </div>
      </div>

      {/* Feedback Table */}
      <div className="bg-white rounded-lg overflow-hidden flex-1 flex flex-col">
        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">
            Feedback And Support
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
                  Username
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                  Feedback
                </th>
                <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {feedbackQueries.map((feedback, index) => (
                <tr key={feedback?._id || index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4">{feedback?.name}</td>
                  <td className="px-6 py-4">{feedback?.email}</td>
                  <td className="px-6 py-4">{feedback?.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleReplyFeedback(feedback?._id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(feedback?._id)}
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
        <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
          <span>&lt; 1-{feedbackQueries.length} &gt;</span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSupport;