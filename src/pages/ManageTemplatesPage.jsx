// src/pages/ManageTemplatesPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TemplateForm from "../components/TemplateForm"; // adjust path if needed

export default function ManageTemplatesPage({ templates, setTemplates }) {
  const [showTemplateForm, setShowTemplateForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  // Form state
  const [newTemplateName, setNewTemplateName] = useState("");
  const [newTemplateContent, setNewTemplateContent] = useState("");
  const [newTemplateCategory, setNewTemplateCategory] = useState("");
  const [newTemplateSubCategory, setNewTemplateSubCategory] = useState("");

  const commonPlaceholders = ["Name", "Date", "User"];

  const addOrUpdateTemplate = () => {
    if (!newTemplateName || !newTemplateContent || !newTemplateCategory) return;

    if (editingIndex !== null) {
      // Update existing template
      const updated = [...templates];
      updated[editingIndex] = {
        name: newTemplateName,
        content: newTemplateContent,
        category: newTemplateCategory,
        subCategory: newTemplateSubCategory,
      };
      setTemplates(updated);
      setEditingIndex(null);
    } else {
      // Add new template
      setTemplates([
        ...templates,
        {
          name: newTemplateName,
          content: newTemplateContent,
          category: newTemplateCategory,
          subCategory: newTemplateSubCategory,
        },
      ]);
    }

    // Reset form
    setNewTemplateName("");
    setNewTemplateContent("");
    setNewTemplateCategory("");
    setNewTemplateSubCategory("");
    setShowTemplateForm(false);
  };

  const handleEditTemplate = (index) => {
    const t = templates[index];
    setEditingIndex(index);
    setNewTemplateName(t.name);
    setNewTemplateContent(t.content);
    setNewTemplateCategory(t.category);
    setNewTemplateSubCategory(t.subCategory || "");
    setShowTemplateForm(true);
  };

  const handleDeleteTemplate = (index) => {
    if (window.confirm(`Delete template "${templates[index].name}"?`)) {
      const updated = templates.filter((_, i) => i !== index);
      setTemplates(updated);
    }
  };

  const addPlaceholder = (placeholder) => {
    setNewTemplateContent((prev) => prev + `{${placeholder}}`);
  };

  const categories = [...new Set(templates.map((t) => t.category))];

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Manage Templates</h1>
        <Link to="/" className="px-4 py-2 bg-gray-300 rounded">
          Back
        </Link>
      </div>

      {/* Add Template Button */}
      {!showTemplateForm && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            setShowTemplateForm(true);
            setEditingIndex(null);
            setNewTemplateName("");
            setNewTemplateContent("");
            setNewTemplateCategory("");
            setNewTemplateSubCategory("");
          }}
        >
          Add Template
        </button>
      )}

      {/* Add/Edit Template Form */}
      {showTemplateForm && (
        <TemplateForm
          categories={categories}
          templates={templates}
          newTemplateName={newTemplateName}
          setNewTemplateName={setNewTemplateName}
          newTemplateContent={newTemplateContent}
          setNewTemplateContent={setNewTemplateContent}
          newTemplateCategory={newTemplateCategory}
          setNewTemplateCategory={setNewTemplateCategory}
          newTemplateSubCategory={newTemplateSubCategory}
          setNewTemplateSubCategory={setNewTemplateSubCategory}
          addOrUpdateTemplate={addOrUpdateTemplate}
          commonPlaceholders={commonPlaceholders}
          addPlaceholder={addPlaceholder}
        />
      )}

      {/* Existing Templates List */}
      <ul className="space-y-2">
        {templates.length === 0 && <li>No templates added yet.</li>}
        {templates.map((t, i) => (
          <li
            key={i}
            className="border p-2 rounded flex justify-between items-center"
          >
            <span>
              {t.name} ({t.category}/{t.subCategory || "-"})
            </span>
            <div className="space-x-2">
              <button
                className="px-2 py-1 bg-yellow-400 text-white rounded"
                onClick={() => handleEditTemplate(i)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-600 text-white rounded"
                onClick={() => handleDeleteTemplate(i)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
