import React from 'react';
import { Box, VStack, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { name: 'Projects', path: '/dashboard' },
    { name: 'AEO Analysis', path: '/analysis' },
    { name: 'FAQ Generator', path: '/faq-generator' },
    { name: 'Billing', path: '/billing' },
    { name: 'Settings', path: '/settings' }
  ];

  return (
    <Box w="240px" bg="gray.50" p={4} minH="calc(100vh - 60px)">
      <VStack spacing={2} align="stretch">
        {links.map((link) => (
          <Link
            key={link.path}
            as={RouterLink}
            to={link.path}
            p={2}
            rounded="md"
            bg={location.pathname === link.path ? 'blue.100' : 'transparent'}
            _hover={{ bg: 'blue.50' }}
          >
            <Text>{link.name}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar; 