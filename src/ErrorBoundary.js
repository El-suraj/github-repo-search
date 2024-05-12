import React from "react";
import {Box,Text} from '@chakra-ui/react'

class ErrorBoundary extends
React.Component{
    constructor(props){
        super(props);
        this.state = {hasError : false};
    }
    static getDerivedStateFromError(error){
        return{hasError : true};
    }

    componentDidCatch(error,errorInfo){
        console.error('Error Boundary caught an error:', error, errorInfo);
    }
    render(){
        if (this.state.hasError){
            return(
                <Box textAlign="center" mt={8}>
                    <Text fontSize="xl" >Something went wrong.</Text>
                    <Text>We Are working on fixing the issue</Text>
                </Box>
            );
        }
        return this.props.children;
    }
}
export default ErrorBoundary;