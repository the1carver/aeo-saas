import httpClient from './httpClient';

export const projectService = {
  getProjects: async () => {
    const response = await httpClient.get('/aeo/projects');
    return response.data;
  },

  getProject: async (projectId) => {
    const response = await httpClient.get(`/aeo/project/${projectId}`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await httpClient.post('/aeo/project', projectData);
    return response.data;
  },

  updateProject: async (projectId, projectData) => {
    const response = await httpClient.put(`/aeo/project/${projectId}`, projectData);
    return response.data;
  },

  deleteProject: async (projectId) => {
    const response = await httpClient.delete(`/aeo/project/${projectId}`);
    return response.data;
  },
}; 