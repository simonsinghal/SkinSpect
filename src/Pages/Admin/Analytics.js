import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  // Dummy data (same as before)
  const analysisData = [
    { month: "Jan", count: 100 },
    { month: "Feb", count: 150 },
    { month: "Mar", count: 2500 },
    { month: "Apr", count: 180 },
    { month: "May", count: 220 },
    { month: "Jun", count: 120 },
    { month: "Jul", count: 300 },
  ];

  const genderData = [
    { name: "Male", value: 1200 },
    { name: "Female", value: 1500 },
    { name: "Others", value: 300 },
  ];
  const genderColors = ["#8884d8", "#82ca9d", "#ffc658"];

  const ageData = [
    { name: "0-17", value: 200 },
    { name: "18-25", value: 800 },
    { name: "26-35", value: 1300 },
    { name: "36-45", value: 1100 },
    { name: "46-55", value: 900 },
    { name: "56-65", value: 700 },
    { name: "66+", value: 400 },
  ];
  const ageColors = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    "#e377c2",
  ];

  const locationData = [
    { name: "Maharashtra", value: 900 },
    { name: "New Delhi", value: 750 },
    { name: "Karnataka", value: 600 },
    { name: "Haryana", value: 550 },
    { name: "Uttar Pradesh", value: 400 },
    { name: "Bihar", value: 350 },
    { name: "Orissa", value: 300 },
    { name: "Rajasthan", value: 250 },
  ];
  const locationColors = [
    "#a6cee3",
    "#1f78b4",
    "#b2df8a",
    "#33a02c",
    "#fb9a99",
    "#e31a1c",
    "#fdbf6f",
    "#ff7f00",
  ];

  const diseaseData = [
    { name: "Eczema", value: 600 },
    { name: "Acne", value: 800 },
    { name: "Psoriasis", value: 450 },
    { name: "Skin Cancer", value: 300 },
    { name: "Rosacea", value: 350 },
    { name: "Melanoma", value: 200 },
    { name: "Allergic Dermatitis", value: 500 },
  ];
  const diseaseColors = [
    "#1b9e77",
    "#d95f02",
    "#7570b3",
    "#e7298a",
    "#66a61e",
    "#e6ab02",
    "#a6761d",
  ];

  const symptomsData = [
    { name: "Itching", value: 700 },
    { name: "Swelling", value: 500 },
    { name: "Redness", value: 900 },
    { name: "Whiteheads", value: 650 },
    { name: "Pimples", value: 800 },
    { name: "Burning", value: 400 },
    { name: "Pain", value: 350 },
    { name: "Inflamed Skin", value: 750 },
  ];
  const symptomColors = [
    "#377eb8",
    "#e41a1c",
    "#4daf4a",
    "#984ea3",
    "#ff7f00",
    "#ffff33",
    "#a65628",
    "#f781bf",
  ];

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto p-6 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Analysis */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Analysis:
          </h3>
          <p className="text-3xl font-bold text-blue-700">2.5K</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Total Users:
          </h3>
          <p className="text-3xl font-bold text-green-700">1.8K</p>
        </div>
      </div>

      {/* Analysis Distribution */}
      <div className="bg-white rounded shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3 px-3">
          Analysis Distribution based on months
        </h3>
        <ResponsiveContainer width="95%" height={300}>
          <LineChart data={analysisData}>
            <XAxis dataKey="month" tick={{ fill: "#4B5563" }} />
            <YAxis tick={{ fill: "#4B5563" }} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#00008B"
              name="Analysis Count"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gender Distribution and Age Distribution (Side-by-Side) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Gender Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={genderData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Count">
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={genderColors[index % genderColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Age Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ageData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Count">
                {ageData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ageColors[index % ageColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Location Distribution */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Location Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={locationData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Count">
              {locationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={locationColors[index % locationColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skin Disease Distribution */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Skin Disease Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={diseaseData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Count">
              {diseaseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={diseaseColors[index % diseaseColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Symptoms Distribution */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Symptoms Distribution
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={symptomsData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" name="Count">
              {symptomsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={symptomColors[index % symptomColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;