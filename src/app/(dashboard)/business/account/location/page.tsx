// import React from "react";

// const Location = () => {
//   return <div>Location</div>;
// };

// export default Location;
"use client";

import React, { useState, useEffect } from "react";
import { Edit, Trash2, QrCode } from "lucide-react";

const LocationManager = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API call - replace with your actual API endpoint
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        const mockData = [
          { id: 1, name: "Banquet Hall" },
          { id: 2, name: "Chicken Pie Shop" },
          { id: 3, name: "Essentiaaa" },
          { id: 4, name: "Tasty Bites Co Cafe & Bistro" },
        ];

        setLocations(mockData);
      } catch (err) {
        setError("Failed to fetch locations");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit location:", id);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log("Delete location:", id);
    // Implement delete functionality
    if (window.confirm("Are you sure you want to delete this location?")) {
      setLocations(locations.filter((location) => location.id !== id));
    }
  };

  const handleCreateLocation = () => {
    console.log("Create new location");
    // Implement create functionality
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium">
              Create Location
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="text-center text-gray-500">
              Loading locations...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-medium text-blue-500">
              Manage Locations
            </h1>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-medium">
              Create Location
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-medium text-blue-500">
            Manage Locations
          </h1>
          <button
            onClick={handleCreateLocation}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Create Location
          </button>
        </div>

        {/* Locations List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
          {locations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No locations found. Create your first location to get started.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {locations.map((location, index) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* QR Code Icon */}
                    <div className="text-blue-500">
                      <QrCode size={32} />
                    </div>

                    {/* Location Name */}
                    <h3 className="text-lg font-medium text-gray-900">
                      {location?.name}
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleEdit(location.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit location"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(location.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete location"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationManager;
