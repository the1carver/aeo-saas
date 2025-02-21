import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Box bg="white" p={6} rounded="lg" shadow="base">
      <VStack align="stretch" spacing={4}>
        <Heading size="md">{project.projectName}</Heading>
        <Text color="gray.600" noOfLines={2}>
          {project.websiteUrl}
        </Text>
        
        <HStack>
          <Badge colorScheme="green">
            {project.contentAnalysis?.length || 0} Analyses
          </Badge>
          <Badge colorScheme="blue">
            {project.faqSuggestions?.length || 0} FAQs
          </Badge>
        </HStack>

        <Button
          colorScheme="blue"
          variant="outline"
          onClick={() => navigate(`/analysis/${project._id}`)}
        >
          View Analysis
        </Button>
      </VStack>
    </Box>
  );
};

export default ProjectCard; 