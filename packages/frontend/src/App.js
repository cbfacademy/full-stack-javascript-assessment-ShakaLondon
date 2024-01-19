import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import './App.css';
import { MenuDrop } from './components/menu-dropdown';
import { Navbar } from './components/navbar';
import { Container } from './components/utils/containers';
import { usePathString } from './hooks/location-path-hooks';
import { menuOpen, profileOpen } from './redux/slices/app-state-slice';
import ProfilePage from './views/profile-page/profile-page';
// import PageScrollStructure from "./components/utils/page-scroll-structure";

const App = () => {

  // const appDispatch = useDispatch();
  // const pathString = usePathString();

  // Callback stores location.pathname and checks pathname has changed and runs this function every time the 
  //pathname updates forcing useEffect to run every time pathname updates
//   const setPathString = useCallback(() => { 
//     appDispatch( profileOpen( pathString !== 'profile' ? false : true ) );
//     appDispatch( menuOpen( false )) }, [pathString]);

// useEffect(() => {
//   setPathString()
// }, [setPathString])

  return (
    <div className="app">
      <Navbar />
      <MenuDrop />
      <Container nameID='home-view' flex size='size' width='100vw' justify='center' align='center' classes='min-page fixed'>
        <Outlet />
        </Container>
        {/* <Container nameID='profile-view' flex size='size' width='100vw' justify='center' align='center' classes='min-page'>
      <ProfilePage />
      </Container> */}
    </div>
  );
}

export default App;
