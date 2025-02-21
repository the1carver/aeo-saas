import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Heading,
  Button,
  useDisclosure,
  VStack,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import NewProjectModal from '../components/project/NewProjectModal';
import ProjectCard from '../components/project/ProjectCard';
import { useAuth } from '../contexts/AuthContext';
import { projectService } from '../services/projectService';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await projectService.getProjects();
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = await projectService.createProject(projectData);
      setProjects([...projects, newProject]);
      onClose();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Box>
      <Grid templateColumns="1fr auto" alignItems="center" mb={6}>
        <Heading size="lg">Dashboard</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={onOpen}>
          New Project
        </Button>
      </Grid>

      <SimpleGrid columns={3} spacing={6} mb={8}>
        <Stat bg="white" p={4} rounded="lg" shadow="base">
          <StatLabel>Total Projects</StatLabel>
          <StatNumber>{projects.length}</StatNumber>
          <StatHelpText>Active projects</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} rounded="lg" shadow="base">
          <StatLabel>FAQ Suggestions</StatLabel>
          <StatNumber>24</StatNumber>
          <StatHelpText>Generated this month</StatHelpText>
        </Stat>
        <Stat bg="white" p={4} rounded="lg" shadow="base">
          <StatLabel>Snippet Opportunities</StatLabel>
          <StatNumber>12</StatNumber>
          <StatHelpText>Potential featured snippets</StatHelpText>
        </Stat>
      </SimpleGrid>

      {loading ? (
        <Text>Loading projects...</Text>
      ) : projects.length > 0 ? (
        <SimpleGrid columns={3} spacing={6}>
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </SimpleGrid>
      ) : (
        <VStack spacing={4} py={8}>
          <Text>No projects yet. Create your first project to get started!</Text>
          <Button colorScheme="blue" onClick={onOpen}>
            Create Project
          </Button>
        </VStack>
      )}

      <NewProjectModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleCreateProject}
      />
    </Box>
  );
};

export default Dashboard; 