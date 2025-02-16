import apiClient from './apiClient';

export { createProject, getFaqSuggestions, analyzeSnippet } from './contentService';

export const generateFAQs = async (content) => {
  const response = await apiClient.post('/content/faq-suggestions', { content });
  return response.data;
}; 