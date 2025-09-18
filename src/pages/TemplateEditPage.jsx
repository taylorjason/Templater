// src/pages/TemplateEditPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function TemplateEditPage({ templates, setTemplates }) {
  const { id } = useParams();
  const editingIndex = id === "new" ? null : parseInt(id);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [content, setContent] = useState("");

  const commonPlaceholders = ["Name", "Date", "User"];

  // Load template if editing
  useEffect(() => {
    if (editingIndex !== null && templates[editingIndex]) {
      const t = templates[editingIndex];
      setName(t.name);
      setCategory(t.category);
      setSubCategory(t.subCategory || "");
      setContent(t.content);
    } else {
      // Reset for new template
      setName("");
      setCategory("");
      setSubCategory("");
      setContent("");
    }
  }, [editingIndex, templates]);

  const saveTemplate = () => {
    if (!name || !category || !content) {
      alert("Please fill in Name, Category, and Content.");
      return;
    }

    const newTemplate = { name, category, subCategory, content };

    if (editingIndex !== null) {
      const updated = [...templates];
      updated[editingIndex] = newTemplate;
      setTemplates(updated);
    } else {
      setTemplates([...templates, newTemplate]);
    }

    navigate("/manage");
  };

  const addPlaceholder = (ph) => {
    setContent((prev) => prev + `{${ph}}`);
  };

  const [newCategoryInput, setNewCategoryInput] = useState(false); // categories = array of existing categories

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-xl font-bold">
        {editingIndex !== null ? "Edit Template" : "Add Template"}
      </h1>
      <input
        className="border p-2 rounded w-full"
        placeholder="Template Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div>
        <label className="block font-medium">Category</label>
        <select
          value={newTemplateCategory}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              setNewCategoryInput(true);
              setNewTemplateCategory("");
            } else {
              setNewCategoryInput(false);
              setNewTemplateCategory(e.target.value);
            }
          }}
          className="border p-2 rounded w-full"
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
          <option value="__new__">-- New Category --</option>
        </select>

        {newCategoryInput && (
          <input
            type="text"
            placeholder="Enter new category"
            value={newTemplateCategory}
            onChange={(e) => setNewTemplateCategory(e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        )}
      </div>
      <input
        className="border p-2 rounded w-full"
        placeholder="Sub-Category"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      />
      <div className="space-x-2 mb-2">
        {commonPlaceholders.map((ph, i) => (
          <button
            key={i}
            type="button"
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={() => addPlaceholder(ph)}
          >
            {ph}
          </button>
        ))}
      </div>
      <textarea
        className="border p-2 rounded w-full"
        placeholder="Template Content (use {placeholders})"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="5"
      />
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={saveTemplate}
        >
          {editingIndex !== null ? "Update Template" : "Add Template"}
        </button>

        <button
          className="px-4 py-2 bg-gray-300 rounded"
          onClick={() => navigate("/manage")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
