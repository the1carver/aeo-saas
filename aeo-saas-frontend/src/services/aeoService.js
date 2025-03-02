import httpClient from './httpClient';

export const aeoService = {
  generateFaqs: async (content, projectId) => {
    const response = await httpClient.post('/aeo/faq-suggestions', {
      content,
      projectId,
    });
    return response.data;
  },

  analyzeSnippet: async (content, projectId) => {
    const response = await httpClient.post('/aeo/snippet-analysis', {
      content,
      projectId,
    });
    return response.data;
  },

  getProjectAnalysis: async (projectId) => {
    const response = await httpClient.get(`/aeo/project/${projectId}/analysis`);
    return response.data;
  },
}; 