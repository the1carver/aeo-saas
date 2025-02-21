import React from 'react';
import { Box, Flex, Button, Text, useColorMode } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box px={4} py={2} bg="gray.100" shadow="sm">
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Text fontSize="xl" fontWeight="bold" as={RouterLink} to="/">
          AEO SaaS
        </Text>
        
        <Flex align="center" gap={4}>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? '🌙' : '☀️'}
          </Button>
          
          {user ? (
            <>
              <Button as={RouterLink} to="/dashboard" variant="ghost">
                Dashboard
              </Button>
              <Button onClick={logout} colorScheme="red" variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="blue">
                Sign Up
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 