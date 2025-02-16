import apiClient from './apiClient';

export async function createProject(projectName, websiteUrl) {
  const res = await apiClient.post('/content/project', { projectName, websiteUrl });
  return res.data;
}

export async function getFaqSuggestions(content) {
  const res = await apiClient.post('/content/faq-suggestions', { content });
  return res.data.faqSuggestions;
}

export async function analyzeSnippet(urlContent) {
  const res = await apiClient.post('/content/snippet-analysis', { urlContent });
  return res.data.snippetSuggestion;
} 