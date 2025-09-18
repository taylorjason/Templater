import React, { useState } from "react";

export default function TemplateForm({
  categories,
  templates,
  newTemplateName,
  setNewTemplateName,
  newTemplateContent,
  setNewTemplateContent,
  newTemplateCategory,
  setNewTemplateCategory,
  newTemplateSubCategory,
  setNewTemplateSubCategory,
  addOrUpdateTemplate,
}) {
  const [newCategoryInput, setNewCategoryInput] = useState(false);
  const [newSubCategoryInput, setNewSubCategoryInput] = useState(false);

  // Get sub-categories for selected category
  const subCategories =
    newTemplateCategory && !newCategoryInput
      ? [
          ...new Set(
            templates
              .filter((t) => t.category === newTemplateCategory)
              .map((t) => t.subCategory)
              .filter(Boolean)
          ),
        ]
      : [];

  return (
    <div className="border rounded p-4 space-y-2">
      <h2 className="font-bold mb-2">Add / Edit Template</h2>
      <input
        placeholder="Template Name"
        value={newTemplateName}
        onChange={(e) => setNewTemplateName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* Category Combo Box */}
      <div>
        <label className="block font-medium">Category</label>
        <select
          value={newCategoryInput ? "__new__" : newTemplateCategory}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              setNewCategoryInput(true);
              setNewTemplateCategory("");
            } else {
              setNewCategoryInput(false);
              setNewTemplateCategory(e.target.value);
            }
            setNewTemplateSubCategory(""); // reset sub-category on category change
            setNewSubCategoryInput(false);
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

      {/* Sub-Category Combo Box */}
      <div>
        <label className="block font-medium">Sub-Category</label>
        <select
          value={newSubCategoryInput ? "__new__" : newTemplateSubCategory}
          onChange={(e) => {
            if (e.target.value === "__new__") {
              setNewSubCategoryInput(true);
              setNewTemplateSubCategory("");
            } else {
              setNewSubCategoryInput(false);
              setNewTemplateSubCategory(e.target.value);
            }
          }}
          className="border p-2 rounded w-full"
          disabled={!newTemplateCategory} // disable if no category selected
        >
          <option value="">Select Sub-Category</option>
          {subCategories.map((sub, i) => (
            <option key={i} value={sub}>
              {sub}
            </option>
          ))}
          <option value="__new__">-- New Sub-Category --</option>
        </select>
        {newSubCategoryInput && (
          <input
            type="text"
            placeholder="Enter new sub-category"
            value={newTemplateSubCategory}
            onChange={(e) => setNewTemplateSubCategory(e.target.value)}
            className="border p-2 rounded w-full mt-2"
          />
        )}
      </div>

      <textarea
        placeholder="Template Content (use {placeholders})"
        value={newTemplateContent}
        onChange={(e) => setNewTemplateContent(e.target.value)}
        className="border p-2 rounded w-full"
        rows="3"
      />

      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        onClick={addOrUpdateTemplate}
      >
        Save Template
      </button>
    </div>
  );
}
