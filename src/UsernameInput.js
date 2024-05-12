import React, { useState } from 'react';
import { Box, Input, Button, ChakraProvider, theme, Container } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';

function UsernameInput() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); //use usenavigate hook

  const handleSubmit = event => {
    event.preventDefault();
    //use navigate to users repositories page using username.
    navigate(`/user/${username}`);
  };

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  return (
    <ChakraProvider theme={theme} className="body">
      <div className="navbar">
      <SearchIcon boxSize={6}/>
        Github search
        </div>
        <Container className='container'>
        <div className="search">
          <Box as="form" onSubmit={handleSubmit}>
            <Input
              placeholder="Enter your github username"
              value={username}
              onChange={handleUsernameChange}
              mb={4}
              width="auto"
            /><SearchIcon boxSize={6}/><br></br>
            <Button type="submit" colorScheme="blue" id='search-btn'>
              Get repositories
            </Button>
          </Box>
        </div>
        </Container>
        <p className='copyright'>copyright &copy; {new Date().getFullYear()} EL-suraj.</p>
    </ChakraProvider>
    
  );
}

export default UsernameInput;
