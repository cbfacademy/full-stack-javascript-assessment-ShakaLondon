import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/navbar';
import { Container } from './components/utils/containers';
import ProfilePage from './views/profile-page/profile-page';
// import PageScrollStructure from "./components/utils/page-scroll-structure";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Container flex>
        <Outlet />
        </Container>
        <Container flex>
      <ProfilePage />
      </Container>
    </div>
  );
}

export default App;
