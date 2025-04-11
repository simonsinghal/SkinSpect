import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ContentManagement = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('disease');
    const [totalDiseases, setTotalDiseases] = useState(0);
    const [diseases, setDiseases] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [totalFaqs, setTotalFaqs] = useState(0);
    const [generalContent, setGeneralContent] = useState([]);
    const [totalGeneralContent, setTotalGeneralContent] = useState(0);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchDiseases = async () => {
            setLoading(true);
            try {
              const response = await fetch("http://localhost:5000/api/admin/content/diseases", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (!response.ok) throw new Error(`Failed to fetch diseases: ${response.status}`);
              const data = await response.json();
              setDiseases(Array.isArray(data) ? data : []);
              
              const countResponse = await fetch("http://localhost:5000/api/admin/content/diseases/count", {
                headers: { Authorization: `Bearer ${token}` },
              });
              const countData = await countResponse.json();
              setTotalDiseases(countData.count || 0);
            } catch (error) {
              console.error("Error fetching diseases:", error);
            } finally {
              setLoading(false);
            }
          };
        
          const fetchFAQs = async () => {
            setLoading(true);
            try {
              const response = await fetch("http://localhost:5000/api/admin/content/faqs", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (!response.ok) throw new Error(`Failed to fetch FAQs: ${response.status}`);
              const data = await response.json();
              setFaqs(Array.isArray(data) ? data : []);
        
              const countResponse = await fetch("http://localhost:5000/api/admin/content/faqs/count", {
                headers: { Authorization: `Bearer ${token}` },
              });
              const countData = await countResponse.json();
              setTotalFaqs(countData.count || 0);
            } catch (error) {
              console.error("Error fetching FAQs:", error);
            } finally {
              setLoading(false);
            }
          };

          const fetchGeneralContent = async () => {
            setLoading(true);
            try {
              const response = await fetch("http://localhost:5000/api/admin/content/general", {
                headers: { Authorization: `Bearer ${token}` },
              });
              if (!response.ok) throw new Error(`Failed to fetch general content: ${response.status}`);
              const data = await response.json();
              setGeneralContent(Array.isArray(data) ? data : []);
        
              const countResponse = await fetch("http://localhost:5000/api/admin/content/general/count", {
                headers: { Authorization: `Bearer ${token}` },
              });
              const countData = await countResponse.json();
              setTotalGeneralContent(countData.count || 0);
            } catch (error) {
              console.error("Error fetching general content:", error);
            } finally {
              setLoading(false);
            }
          };

        if (activeTab === 'disease') {
            fetchDiseases();
        } else if (activeTab === 'faq') {
            fetchFAQs();
        } else if (activeTab === 'content') {
            fetchGeneralContent();
        }
    }, [activeTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleDeleteDisease = (diseaseId) => {
        console.log(`Deleting disease with ID: ${diseaseId}`);
        // Implement your delete disease logic here
        // Optimistic UI update (remove from state immediately)
        setDiseases(prevDiseases => prevDiseases.filter(disease => disease.id !== diseaseId));
        // Send DELETE request to your API
        fetch(`http://localhost:5000/api/admin/content/diseases/${diseaseId}`, {  // Adjust the URL as needed
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                // If deletion on the server fails, revert the UI update and show an error
                throw new Error(`Failed to delete disease: ${response.status}`);
            }
            // Optionally, you could refetch the diseases to update the list
            // fetchDiseases();
        })
        .catch(error => {
            console.error('Error deleting disease:', error);
            // Revert the UI update (add the deleted disease back to the state)
            //  setDiseases(prevDiseases => {
            //   const deletedDisease = diseases.find(d => d.id === diseaseId);
            //   return [...prevDiseases, deletedDisease];
            // });
            alert("Failed to delete disease.  Please check the console and try again.");
        });
    };

    const handleDeleteFAQ = (faqId) => {
        // Implement your delete FAQ logic here (API call, state update)
        console.log(`Deleting FAQ with ID: ${faqId}`);
        setFaqs(prevFaqs => prevFaqs.filter(faq => faq.id !== faqId));

        fetch(`YOUR_FAQ_API_ENDPOINT/${faqId}`, { // Adjust URL
          method: 'DELETE'
        })
        .then(res => {
          if(!res.ok){
            throw new Error(`Failed to delete FAQ: ${res.status}`);
          }
        })
        .catch(err => {
          console.error("Error deleting FAQ", err);
          alert("Failed to delete FAQ. Check console");
        })
    };

    const handleDeleteContent = (contentId) => {
        // Implement your delete content logic here (API call, state update)
        console.log(`Deleting content with ID: ${contentId}`);
        setGeneralContent(prevContent => prevContent.filter(c => c.id !== contentId));

        fetch(`YOUR_CONTENT_API_ENDPOINT/${contentId}`, { // Adjust URL
          method: 'DELETE'
        })
        .then(res => {
          if(!res.ok){
            throw new Error(`Failed to delete Content: ${res.status}`);
          }
        })
        .catch(err => {
          console.error("Error deleting Content", err);
          alert("Failed to delete Content. Check console");
        })
    };

    const getTitle = () => {
        switch (activeTab) {
            case 'disease':
                return 'Skin Disease Details';
            case 'faq':
                return 'Frequently Asked Questions';
            case 'content':
                return 'General Content';
            default:
                return '';
        }
    };

    return (
        <div className="flex-1 p-8">
            {/* Top Statistics and Add New Button */}
            <div className="flex justify-between items-center mb-6">
                <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
                    <h3 className="text-lg font-semibold text-blue-700 mb-1">Total Skin Diseases:</h3>
                    <p className="text-2xl font-bold text-gray-800">{totalDiseases}</p>
                </div>
                <Link to="/admin/content/disease/add" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Add New
                </Link>
            </div>

            {/* Tabs (Disease, FAQ, Content) */}
            <div className="flex border-b border-gray-300 mb-4">
                <button
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${activeTab === 'disease' ? 'border-b-2 border-white' : ''
                        }`}
                    onClick={() => handleTabChange('disease')}
                >
                    Disease
                </button>
                <button
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${activeTab === 'faq' ? 'border-b-2 border-white' : ''
                        }`}
                    onClick={() => handleTabChange('faq')}
                >
                    FAQ
                </button>
                <button
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${activeTab === 'content' ? 'border-b-2 border-white' : ''
                        }`}
                    onClick={() => handleTabChange('content')}
                >
                    Content
                </button>
            </div>

            {/* Content Below Tabs */}
            <div className="bg-white rounded-lg overflow-hidden flex-1 flex flex-col">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p>Loading data...</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-700">{getTitle()}</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-[400px]">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-700 text-white sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                                            {activeTab === 'disease' && 'Disease'}
                                            {activeTab === 'faq' && 'Question'}
                                            {activeTab === 'content' && 'Title'}
                                        </th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">
                                            {activeTab === 'disease' && 'Description'}
                                            {activeTab === 'faq' && 'Answer'}
                                            {activeTab === 'content' && 'Body'}
                                        </th>
                                        <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {activeTab === 'disease' &&
                                        diseases.map((disease, index) => (
                                            <tr key={disease.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{disease.name}</td>
                                                <td className="px-6 py-4">{disease.description}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Link to={`/admin/content/disease/edit/${disease.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDeleteDisease(disease.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    {activeTab === 'faq' &&
                                        faqs.map((faq, index) => (
                                            <tr key={faq.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                <td className="px-6 py-4">{faq.question}</td>
                                                <td className="px-6 py-4">{faq.answer}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Link to={`/admin/content/faq/edit/${faq.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDeleteFAQ(faq.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    {activeTab === 'content' &&
                                        generalContent.map((content, index) => (
                                            <tr key={content.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                                                <td className="px-6 py-4">{content.title}</td>
                                                <td className="px-6 py-4">{content.body}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <Link to={`/admin/content/edit/${content.id}`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => handleDeleteContent(content.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                            <span>&lt; 1-3 &gt;</span>
                        </div> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
