import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.css';
import { MenuDrop } from './components/menu-dropdown';
import { Navbar } from './components/navbar';
import { Container } from './components/utils/containers';
import { usePathString } from './hooks/location-path-hooks';
import { menuOpen, profileOpen } from './redux/slices/app-state-slice';
import ProfilePage from './views/profile-page/profile-page';

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
      <DndProvider backend={HTML5Backend}>
      <Container nameID='home-view' flex size='size' width='100vw' justify='center' align='center' classes='min-page fixed'>
        <Outlet />
        </Container>
      </DndProvider>
    </div>
  );
}

export default App;
