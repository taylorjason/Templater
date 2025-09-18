// src/pages/TemplateListPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function TemplateListPage({ templates = [], defaults = {} }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [output, setOutput] = useState("");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");

  // When "Use Template" is clicked
  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);

    const matches = template.content.match(/{(.*?)}/g) || [];
    const placeholders = {};

    matches.forEach((m) => {
      const key = m.replace(/[{}]/g, "");
      // Case-insensitive match to defaults
      const defaultEntry = Object.entries(defaults).find(
        ([defKey]) => defKey.toLowerCase() === key.toLowerCase()
      );
      placeholders[key] = defaultEntry ? defaultEntry[1] : "";
    });

    setFormData(placeholders);
    setOutput("");
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    let text = selectedTemplate.content;
    Object.entries(formData).forEach(([key, val]) => {
      text = text.replace(new RegExp(`{${key}}`, "g"), val);
    });
    setOutput(text);
  };

  const filteredTemplates = templates.filter(
    (t) =>
      (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase()) ||
        (t.subCategory || "").toLowerCase().includes(search.toLowerCase())) &&
      (categoryFilter ? t.category === categoryFilter : true) &&
      (subCategoryFilter ? t.subCategory === subCategoryFilter : true)
  );

  const categories = [...new Set(templates.map((t) => t.category))];
  const subCategories = categoryFilter
    ? [
        ...new Set(
          templates
            .filter((t) => t.category === categoryFilter)
            .map((t) => t.subCategory)
        ),
      ]
    : [];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Header with navigation */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Templates</h1>
        <div className="space-x-2">
          <Link
            to="/manage"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Manage Templates
          </Link>
          <Link
            to="/defaults"
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Default Placeholders
          </Link>
        </div>
      </div>

      {/* Search and filters */}
      <div className="border rounded p-4 flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0">
        <input
          type="text"
          placeholder="Search by name, category, sub-category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setSubCategoryFilter("");
          }}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {categoryFilter && (
          <select
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Sub-Categories</option>
            {subCategories.map((sub, i) => (
              <option key={i} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Template list */}
      <ul className="space-y-2">
        {filteredTemplates.length === 0 && <li>No templates found.</li>}
        {filteredTemplates.map((t, i) => (
          <li
            key={i}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              {t.name} ({t.category}/{t.subCategory || "-"})
            </span>
            <button
              onClick={() => handleUseTemplate(t)}
              className="px-2 py-1 bg-green-600 text-white rounded"
            >
              Use Template
            </button>
          </li>
        ))}
      </ul>

      {/* Placeholder form */}
      {selectedTemplate && (
        <form onSubmit={handleSubmit} className="border p-4 rounded space-y-2">
          {/* Display Template Name */}
          <h2 className="font-bold text-lg mb-2">{selectedTemplate.name}</h2>
          <h3 className="font-bold mb-2">Fill in Placeholders</h3>
          {Object.keys(formData).map((key) => {
            const isDate = key.toLowerCase().includes("date");
            return (
              <div key={key}>
                <label className="block font-medium">{key}</label>
                {isDate ? (
                  <input
                    type="date"
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <input
                    type="text"
                    value={formData[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                )}
              </div>
            );
          })}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Process Template
          </button>
        </form>
      )}

      {/* Processed output */}
      {output && (
        <div className="border p-4 rounded">
          <h2 className="font-bold mb-2">Processed Template</h2>
          <textarea
            className="border p-2 rounded w-full"
            rows="5"
            readOnly
            value={output}
          />
          <button
            className="mt-2 px-4 py-2 bg-gray-600 text-white rounded"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
}
