import React from "react";
import {Box, Text} from '@chakra-ui/react';

function NotFound(){
    return (
        <Box textAlign="center" mt={8}>
            <Text fontSize="50px" >404-Page Not found</Text>
            <Text>The Page you requested could not be found</Text>
        </Box>
    );
}
export default NotFound;