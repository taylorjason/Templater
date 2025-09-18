// src/pages/DefaultPlaceholdersPage.js
import React from "react";
import { Link } from "react-router-dom";

export default function DefaultPlaceholdersPage({ defaults, setDefaults }) {
  const handleChange = (key, value) => {
    setDefaults({ ...defaults, [key]: value });
  };

  const addPlaceholder = () => {
    const key = prompt("Enter placeholder name (e.g., Name, User, StartDate):");
    if (key && !defaults[key]) {
      setDefaults({ ...defaults, [key]: "" });
    }
  };

  const deletePlaceholder = (key) => {
    const updated = { ...defaults };
    delete updated[key];
    setDefaults(updated);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Default Placeholders</h1>
        <Link to="/" className="px-4 py-2 bg-gray-300 rounded">
          Back
        </Link>
      </div>

      <button
        onClick={addPlaceholder}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Placeholder
      </button>

      <ul className="space-y-2 mt-4">
        {Object.keys(defaults).length === 0 && (
          <li>No default placeholders defined.</li>
        )}
        {Object.entries(defaults).map(([key, value]) => (
          <li
            key={key}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div className="flex-1 space-x-2">
              <span className="font-medium">{key}:</span>
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                className="border p-1 rounded w-40"
              />
            </div>
            <button
              className="px-2 py-1 bg-red-600 text-white rounded"
              onClick={() => deletePlaceholder(key)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
