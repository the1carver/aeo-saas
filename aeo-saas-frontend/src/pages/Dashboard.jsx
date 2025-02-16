import React, { useState, useEffect } from 'react';
import { createProject, getFaqSuggestions, analyzeSnippet } from '../services/contentService';

function Dashboard() {
  const [projectName, setProjectName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [analysisInput, setAnalysisInput] = useState('');
  const [faqResult, setFaqResult] = useState('');
  const [snippetResult, setSnippetResult] = useState('');

  const handleCreateProject = async () => {
    try {
      const project = await createProject(projectName, websiteUrl);
      alert('Project created: ' + project._id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFaqSuggestions = async () => {
    try {
      const data = await getFaqSuggestions(analysisInput);
      setFaqResult(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnippetAnalysis = async () => {
    try {
      const snippet = await analyzeSnippet(analysisInput);
      setSnippetResult(snippet);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <div>
        <h3>Create Project</h3>
        <input
          placeholder='Project Name'
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          placeholder='Website URL'
          value={websiteUrl}
          onChange={(e) => setWebsiteUrl(e.target.value)}
        />
        <button onClick={handleCreateProject}>Create</button>
      </div>

      <div>
        <h3>AEO Tools</h3>
        <textarea
          placeholder='Paste content here...'
          value={analysisInput}
          onChange={(e) => setAnalysisInput(e.target.value)}
        />
        <div>
          <button onClick={handleFaqSuggestions}>Generate FAQ Suggestions</button>
          <button onClick={handleSnippetAnalysis}>Analyze Snippet Potential</button>
        </div>
      </div>

      {faqResult && (
        <div>
          <h4>FAQ Suggestions</h4>
          <pre>{faqResult}</pre>
        </div>
      )}
      {snippetResult && (
        <div>
          <h4>Snippet Suggestion</h4>
          <p>{snippetResult}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard; 