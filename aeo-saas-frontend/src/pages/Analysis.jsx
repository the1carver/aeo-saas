import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Textarea,
  Button,
  Text,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
  Badge,
  Divider,
  Skeleton,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { aeoService } from '../services/aeoService';

const Analysis = () => {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [faqResults, setFaqResults] = useState(null);
  const [snippetResults, setSnippetResults] = useState(null);
  const toast = useToast();
  const { projectId } = useParams();

  const handleFaqGeneration = async () => {
    if (!content.trim()) {
      return toast({
        title: 'Content required',
        description: 'Please enter some content to analyze',
        status: 'warning',
      });
    }

    setIsLoading(true);
    try {
      const { faqs } = await aeoService.generateFaqs(content, projectId);
      setFaqResults(faqs);
      toast({
        title: 'FAQs generated successfully',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Failed to generate FAQs',
        description: error.message,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnippetAnalysis = async () => {
    if (!content.trim()) {
      return toast({
        title: 'Content required',
        description: 'Please enter some content to analyze',
        status: 'warning',
      });
    }

    setIsLoading(true);
    try {
      const { analysis } = await aeoService.analyzeSnippet(content, projectId);
      setSnippetResults(analysis);
      toast({
        title: 'Snippet analysis completed',
        status: 'success',
      });
    } catch (error) {
      toast({
        title: 'Analysis failed',
        description: error.message,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Heading mb={6}>Content Analysis</Heading>

      <VStack spacing={6} align="stretch">
        <Card>
          <CardBody>
            <VStack spacing={4}>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste your content here for analysis..."
                minH="200px"
              />
              <Button
                colorScheme="blue"
                isLoading={isLoading}
                onClick={handleFaqGeneration}
              >
                Generate FAQs
              </Button>
              <Button
                colorScheme="green"
                isLoading={isLoading}
                onClick={handleSnippetAnalysis}
              >
                Analyze Snippet Potential
              </Button>
            </VStack>
          </CardBody>
        </Card>

        <Tabs>
          <TabList>
            <Tab>FAQ Suggestions</Tab>
            <Tab>Snippet Analysis</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              {isLoading ? (
                <VStack spacing={4}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </VStack>
              ) : faqResults ? (
                <Card>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Badge colorScheme="blue" alignSelf="start">
                        Generated FAQs
                      </Badge>
                      <Text whiteSpace="pre-wrap">{faqResults}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ) : (
                <Text color="gray.500">
                  No FAQ suggestions generated yet. Add content and click "Generate FAQs"
                </Text>
              )}
            </TabPanel>

            <TabPanel>
              {isLoading ? (
                <VStack spacing={4}>
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                  <Skeleton height="20px" />
                </VStack>
              ) : snippetResults ? (
                <Card>
                  <CardBody>
                    <VStack align="stretch" spacing={4}>
                      <Badge colorScheme="green" alignSelf="start">
                        Snippet Analysis
                      </Badge>
                      <Text whiteSpace="pre-wrap">{snippetResults}</Text>
                    </VStack>
                  </CardBody>
                </Card>
              ) : (
                <Text color="gray.500">
                  No snippet analysis yet. Add content and click "Analyze Snippet Potential"
                </Text>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Box>
  );
};

export default Analysis; 