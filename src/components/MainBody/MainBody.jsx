import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';

import classes from './MainBody.module.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import Home from '../Home/Home';
import News from '../News/News';
import UserPage from '../UserPage/UserPage';
import TruckPage from '../TruckPage/TruckPage';
import ChatPage from '../ChatPage/ChatPage';
import AdminPage from '../AdminPage/AdminPage';
import AdminHandleNews from '../AdminHandleNews/AdminHandleNews';
import AdminHandleTrucks from '../AdminHandleTrucks/AdminHandleTrucks';
import AdminHandleUsers from '../AdminHandleUsers/AdminHandleUsers';
import AuthContext from '../../Context/auth-context';

/**
 * Main function for the application.
 *
 * @returns {JSX} JSX Element.
 */
function MainBody() {
  const { isAdmin } = useContext(AuthContext);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.navBar}>
        <NavigationBar isAdmin={isAdmin} />
      </div>
      <div className={classes.mainBody}>
        <Routes>
          <Route exact path="/" element={<Home isAdmin={isAdmin} />} />
          <Route path="/news" element={<News isAdmin={isAdmin} />} />
          <Route path="/forums" element={<ChatPage isAdmin={isAdmin} />} />
          <Route path="/trucks/*" element={<TruckPage isAdmin={isAdmin} />} />
          <Route path="/user" element={<UserPage isAdmin={isAdmin} />} />
          <Route path="/admin/*" element={isAdmin ? <AdminPage isAdmin={isAdmin} /> : <Home isAdmin={isAdmin} />}>
            <Route path="addNews" element={<AdminHandleNews />} />
            <Route path="handleTrucks" element={<AdminHandleTrucks />} />
            <Route path="handleUsers" element={<AdminHandleUsers />} />
          </Route>
          <Route path="*" element={<Home isAdmin={isAdmin} />} />
        </Routes>
      </div>
    </div>
  );
}

export default MainBody;
