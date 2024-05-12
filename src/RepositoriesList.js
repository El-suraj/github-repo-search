import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Input,
  Button,
  ButtonGroup,
  Form,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Divider,
  Stack,
  Flex,
  Spinner,
  GridItem,
} from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';
import { useParams } from 'react-router-dom';
import CreateRepoModal from './CreateRepoModal';
import DeleteRepoModal from './DeleteRepoModal';
// import { Logo } from './Logo';

function RepositoriesList() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [repoToDelete, setRepoToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(4); //number of repositories per page
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRepositories = async () => {
      setIsLoading(true);
      // try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=${perPage}`
      );
      setRepositories(response.data);
      // } catch (error) {
      // setError(error);
      // } finally {
      setIsLoading(false);
      // }
    };

    if (username) {
      fetchRepositories();
    }
  }, [username, currentPage, perPage, searchTerm]);
  const handleCreateRepo = newRepoData => {
    setRepositories([...repositories, newRepoData]); ///add new repo to local state
  };
  const handleDeleteClick = repo => {
    setRepoToDelete(repo); ///store repo details for deletion
    setIsDeleteModalOpen(true); //open delete modal
  };
  const handleDeleteConfirmed = async () => {
    const response = await axios.delete(
      `https://api.github.com/users/${username}/repos/${repoToDelete.name}`
    );

    if (response.status === 204) {
      setRepositories(repositories.filter(repo => repo.id !== repoToDelete.id));
      setIsDeleteModalOpen(false); //cclose modal after successful deletion
    } else {
      <Text>FAILED !!!</Text>;
      console.error('failed to delete repository:', response.statusText);
    }
  };
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const handlePerPageChange = event => {
    setPerPage(event.target.value); // Update items per page
  };
  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const renderRepositories = () => {
    if (isLoading) {
      return <Spinner />;
    }
    if (!filteredRepositories.length) {
      return <Text>No Repositories Found</Text>;
    }
    return (
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={4}>
        {filteredRepositories.map(repo => (
          <ChakraProvider theme={theme}>
            <GridItem key={repo.id} as="article">
              <Card maxW="sm" className="carrd">
                <CardBody>
                  <Stack mt="6" spacing="3">
                    <Link to={`/repos/${repo.name}`}>
                      <Heading size="md">{repo.name}</Heading>
                    </Link>
                    <Text color="gray.500">{repo.description}</Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue">
                      <Link href={repo.html_url} isExternal target="_blank">
                        View on github
                      </Link>
                    </Button>
                    <Button
                variant="ghost"
                color="red.500"
                onClick={() => handleDeleteClick(repo)}
              >
                Delete
              </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            </GridItem>
          </ChakraProvider>
        ))}
      </Grid>
    );
  };
  return (
    <ChakraProvider>
      <Box>
        <div className="navbar">
          <img src="" />
          <Text fontSize="20px">{username} Github profile</Text>
        </div>
        <div className="search">
          <Input
            placeholder="search repositories"
            value={searchTerm}
            onChange={handleSearch}
            mb={4}
            width="auto"
          />
          <Button colorScheme="blue">Search</Button>
        </div>
        <Flex justifyContent="space-between" mb={4}>
          <Text fontSize="xl">
            showing {filteredRepositories.length} repositories
          </Text>
          {handlePerPageChange}
          <div className="buttons">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              variant="solid"
              colorScheme="blue"
            >
              prev.
            </Button>
            <Text>
              page {currentPage} of {currentPage + 1}
            </Text>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              variant="solid"
              colorScheme="blue"
            >
              Next
            </Button>
          </div>
        </Flex>
        {/* <Grid templateColumns="repeat(auto-fit,minmax(250px, 1fr))" gap={4}>
          {filteredRepositories.map(repo => (
            // <GridItem key={repo.id} as="article">
               
              
            // </GridItem>
          ))}
        </Grid> */}
        <Button onClick={handleOpenCreateModal}>Create new repository</Button>
        <CreateRepoModal
          isOpen={isCreateModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateRepo}
        />
        <Input placeholder='search repositories' value={searchTerm} onChange={handleSearch} mb={4} />
        {renderRepositories()}
        <DeleteRepoModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteConfirmed}
        />
      </Box>
      <p className='copyright'>copyright &copy; {new Date().getFullYear()} EL-suraj.</p>
    </ChakraProvider>
  );
  // return (
  //     <Box>

  //     </Box>
  //   )

  //   return (
  //     <ChakraProvider theme={theme}>
  //       <div className="search">
  //         <Input placeholder="enter github username" width="auto" />
  //         <Button colorScheme="blue">Search</Button>
  //       </div>
  //       <div className="card">
  //         <Card maxW="sm">
  //           <CardBody>
  //             <Image
  //               src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
  //               alt="Green double couch with wooden legs"
  //               borderRadius="lg"
  //             />
  //             <Stack mt="6" spacing="3">
  //               <Heading size="md">Living room Sofa</Heading>
  //               <Text>
  //                 This sofa is perfect for modern tropical spaces, baroque
  //                 inspired spaces, earthy toned spaces and for people who love a
  //                 chic design with a sprinkle of vintage design.
  //               </Text>
  //               <Text color="blue.600" fontSize="2xl">
  //                 $450
  //               </Text>
  //             </Stack>
  //           </CardBody>
  //           <Divider />
  //           <CardFooter>
  //             <ButtonGroup spacing="2">
  //               <Button variant="solid" colorScheme="blue">
  //                 Buy now
  //               </Button>
  //             </ButtonGroup>
  //           </CardFooter>
  //         </Card>
  //       </div>
  //     </ChakraProvider>
  //   );
}

export default RepositoriesList;
