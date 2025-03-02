import React from 'react';
import { VStack, Skeleton } from '@chakra-ui/react';

const ContentSkeleton = () => {
  return (
    <VStack spacing={4} w="100%">
      <Skeleton height="40px" width="200px" />
      <Skeleton height="20px" width="100%" />
      <Skeleton height="20px" width="100%" />
      <Skeleton height="20px" width="80%" />
      <Skeleton height="40px" width="150px" />
    </VStack>
  );
};

export default ContentSkeleton; 