import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import ErrorBoundary from "./ErrorBoundary";
import UsernameInput from './UsernameInput';
import RepositoriesList from "./RepositoriesList";
import RepositoriesDetails from './RepositoriesDetails';
import NotFound from "./NotFound";

function App(){
  return(
    <ErrorBoundary>
    <Router>
      <Routes>
        <Route path="/" element={<UsernameInput/>} />
        <Route path="/user/:username" element={<RepositoriesList/>} />
        <Route path="/repos/:repoName" element={<RepositoriesDetails/>}/>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </Router>
    </ErrorBoundary>
  );
}

export default App;