/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavigationBar.module.css';
import homeImg from './icons/house-door.svg';
import megaphoneImg from './icons/megaphone.svg';
import chatImg from './icons/chat-square-text.svg';
import trucksImg from './icons/truck.svg';
import workspaceImg from './icons/person-workspace.svg';
import adminImg from './icons/gear.svg';
import logoutImg from './icons/box-arrow-left.svg';
import logoImg from './icons/logo.png';
import menuImg from './icons/list.svg';
import AuthContext from '../../Context/auth-context';

/**
 * Component of type NavigationBar.
 *
 * @returns {JSX} JSX Element.
 */
function NavigationBar({ isAdmin }) {
  const authContext = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const logoutHandler = () => {
    authContext.logout();
  };

  const collapseHandler = (event) => {
    event.preventDefault();
    if (window.innerWidth < 700) {
      setIsCollapsed((prev) => !prev);
    }
  };

  const linkClickHandle = (event) => {
    event.preventDefault();
    if (window.innerWidth < 700) {
      setIsCollapsed(true);
    }
  };

  return (
    <div className={classes.container}>
      <button onClick={collapseHandler} className={classes.navBtn} type="button">
        <img src={menuImg} alt="menu" />
      </button>
      <div className={classes.logo}>
        <img src={logoImg} alt="logo" />
      </div>

      {!isCollapsed && (
        <div className={classes.navList}>
          <ul className={classes.navUl}>
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink to="./">
                <img src={homeImg} alt="home" />
                <p>Hem</p>
              </NavLink>
            </li>
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink to="./news">
                <img src={megaphoneImg} alt="news" />
                <p>Nyheter</p>
              </NavLink>
            </li>
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink to="./forums">
                <img src={chatImg} alt="chat" />
                <p>Forum</p>
              </NavLink>
            </li>
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink to="./trucks">
                <img src={trucksImg} alt="trucks" />
                <p>Mina bilar</p>
              </NavLink>
            </li>
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink to="./user">
                <img src={workspaceImg} alt="workspace" />
                <p>Min sida</p>
              </NavLink>
            </li>
            {isAdmin && (
              <li className={classes.navLi} onClick={linkClickHandle}>
                <NavLink to="./admin/addNews">
                  <img src={adminImg} alt="admin" />
                  <p>Admin</p>
                </NavLink>
              </li>
            )}
            <li className={classes.navLi} onClick={linkClickHandle}>
              <NavLink onClick={logoutHandler} className={classes.navLogoutLink} to="./">
                <img src={logoutImg} alt="logout" />
                <p>Logga ut</p>
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavigationBar;
