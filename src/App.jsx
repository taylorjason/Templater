// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TemplateListPage from "./pages/TemplateListPage";
import ManageTemplatesPage from "./pages/ManageTemplatesPage";
import TemplateEditPage from "./pages/TemplateEditPage";
import DefaultPlaceholdersPage from "./pages/DefaultPlaceholdersPage";
import defaultTemplates from "./defaultTemplates";

export default function App() {
  const [templates, setTemplates] = useState(defaultTemplates);
  const [defaults, setDefaults] = useState({});

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem("customTemplates");
    if (savedTemplates) setTemplates(JSON.parse(savedTemplates));
  }, []);

  // Save templates to localStorage
  useEffect(() => {
    localStorage.setItem("customTemplates", JSON.stringify(templates));
  }, [templates]);

  // Load default placeholders from localStorage
  useEffect(() => {
    const savedDefaults = localStorage.getItem("defaultPlaceholders");
    if (savedDefaults) setDefaults(JSON.parse(savedDefaults));
  }, []);

  // Save defaults whenever they change
  useEffect(() => {
    localStorage.setItem("defaultPlaceholders", JSON.stringify(defaults));
  }, [defaults]);

  return (
    <Router>
      <Routes>
        {/* Main template list page */}
        <Route
          path="/"
          element={
            <TemplateListPage templates={templates} defaults={defaults} />
          }
        />

        {/* Manage templates page */}
        <Route
          path="/manage"
          element={
            <ManageTemplatesPage
              templates={templates}
              setTemplates={setTemplates}
            />
          }
        />

        {/* Add/Edit template page */}
        <Route
          path="/edit/:id"
          element={
            <TemplateEditPage
              templates={templates}
              setTemplates={setTemplates}
            />
          }
        />

        {/* Default placeholders page */}
        <Route
          path="/defaults"
          element={
            <DefaultPlaceholdersPage
              defaults={defaults}
              setDefaults={setDefaults}
            />
          }
        />
      </Routes>
    </Router>
  );
}
