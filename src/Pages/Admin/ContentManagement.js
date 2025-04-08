import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ContentManagement = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('disease'); // Default to 'disease'
    const [totalDiseases, setTotalDiseases] = useState(0);
    const [diseases, setDiseases] = useState([]);
    const [faqs, setFaqs] = useState([]);
    const [totalFaqs, setTotalFaqs] = useState(0);
    const [generalContent, setGeneralContent] = useState([]);
    const [totalGeneralContent, setTotalGeneralContent] = useState(0);

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/content/diseases');
                const data = await response.json();
                setDiseases(data || []);
                const countResponse = await fetch('http://localhost:5000/api/admin/content/diseases/count');
                const countData = await countResponse.json();
                setTotalDiseases(countData.count || 0);
            } catch (error) {
                console.error('Error fetching disease data:', error);
            }
        };

        const fetchFAQs = async () => {
            try {
                const response = await fetch('YOUR_FAQ_API_ENDPOINT'); // Replace with your actual API endpoint
                const data = await response.json();
                setFaqs(data || []);
                // Optionally fetch total FAQ count
                // const countResponse = await fetch('YOUR_FAQ_COUNT_API_ENDPOINT');
                // const countData = await countResponse.json();
                // setTotalFaqs(countData.count || 0);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        const fetchGeneralContent = async () => {
            try {
                const response = await fetch('YOUR_CONTENT_API_ENDPOINT'); // Replace with your actual API endpoint
                const data = await response.json();
                setGeneralContent(data || []);
                // Optionally fetch total content count
                // const countResponse = await fetch('YOUR_CONTENT_COUNT_API_ENDPOINT');
                // const countData = await countResponse.json();
                // setTotalGeneralContent(countData.count || 0);
            } catch (error) {
                console.error('Error fetching general content:', error);
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
    };

    const handleDeleteFAQ = (faqId) => {
        // Implement your delete FAQ logic here (API call, state update)
        console.log(`Deleting FAQ with ID: ${faqId}`);
        // After successful deletion, you might want to refetch FAQ data
    };

    const handleDeleteContent = (contentId) => {
        // Implement your delete content logic here (API call, state update)
        console.log(`Deleting content with ID: ${contentId}`);
        // After successful deletion, you might want to refetch content data
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
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${
                        activeTab === 'disease' ? 'border-b-2 border-white' : ''
                    }`}
                    onClick={() => handleTabChange('disease')}
                >
                    Disease
                </button>
                <button
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${
                        activeTab === 'faq' ? 'border-b-2 border-white' : ''
                    }`}
                    onClick={() => handleTabChange('faq')}
                >
                    FAQ
                </button>
                <button
                    className={`px-4 py-2 text-xl text-white font-semibold focus:outline-none ${
                        activeTab === 'content' ? 'border-b-2 border-white' : ''
                    }`}
                    onClick={() => handleTabChange('content')}
                >
                    Content
                </button>
            </div>

            {/* Content Below Tabs */}
            <div className="bg-white rounded-lg overflow-hidden flex-1 flex flex-col">
                {activeTab === 'disease' && (
                    <>
                        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-700">Skin Disease Details</h2>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-700 text-white sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Disease</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {diseases.map((disease, index) => (
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
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                            <span>&lt; 1-10 &gt;</span> {/* Placeholder for pagination */}
                        </div>
                    </>
                )}

                {activeTab === 'faq' && (
                    <>
                        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-700">Skin Disease Details</h2> {/* Assuming consistent heading */}
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-700 text-white sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Question</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Answer</th>
                                        <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {faqs.map((faq, index) => (
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
                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                            <span>&lt; 1-10 &gt;</span> {/* Placeholder for pagination */}
                        </div>
                    </>
                )}

                {activeTab === 'content' && (
                    <>
                        <div className="bg-gray-100 py-3 px-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold text-gray-700">General Content</h2> {/* You can customize this heading */}
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-700 text-white sticky top-0 z-10">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">S. No.</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-medium font-medium tracking-wider">Body</th>
                                        <th className="px-6 py-3 text-right text-medium font-medium tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {generalContent.map((content, index) => (
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
                        <div className="px-4 py-3 bg-gray-100 text-sm text-gray-500 flex justify-end items-center">
                            <span>&lt; 1-10 &gt;</span> {/* Placeholder for pagination */}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;