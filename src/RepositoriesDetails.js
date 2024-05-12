import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Box,Text,Link,Spinner} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import App from './App';

function RepositoriesDetails (){
    const {username} = useParams();
  const {repoName } =useParams();
  const [repository, setRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =useState(null);

  useEffect(()=>{
    const fetchRepository = async ()=>{
        setIsLoading(true);
        setError(null);
        const baseUrl = 'https://api.github.com/users/';
        try{
        const response = await axios.get(`${baseUrl}/${username}/${repoName}`);
        setRepository(response.data);
    }catch(error){
        setIsLoading(false);
    }
    };
    fetchRepository();
  },[repoName, username]);

  const renderContent = ()=>{
    if(isLoading){
        return<Spinner/>;
    }
    if(!repository){
        return<Text>Repository not found</Text>;
    }
    return(
        <Box>
        <Text fontSize="xl">{repoName}</Text>
        <Link href={repository.html_url} isExternal target='_blank'>View on github
        </Link>
        </Box>
    );
  };
  return<div>{renderContent()}
  <p className='copyright'>copyright &copy; {new Date().getFullYear()} EL-suraj.</p>
  </div>;
  
}

export default RepositoriesDetails;
