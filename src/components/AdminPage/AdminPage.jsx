import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import classes from './AdminPage.module.css';

/**
 * Component of type AdminPage.
 * @returns {JSX} - JSX Element.
 */
function AdminPage({ isAdmin }) {
  return (
    <div className={classes.container}>
      <nav className={classes.adminNav}>
        <ul>
          <li className={classes.adminNavLi}>
            <NavLink to={isAdmin ? './addNews' : '../'}>
              <p>Hantera nyheter</p>
            </NavLink>
          </li>
          <li className={classes.adminNavLi}>
            <NavLink to={isAdmin ? './handleTrucks' : '../'}>
              <p>Hantera Lastbilar</p>
            </NavLink>
          </li>
          <li className={classes.adminNavLi}>
            <NavLink to={isAdmin ? './handleUsers' : '../'}>
              <p>Hantera chaufförer</p>
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className={classes.adminMain}>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminPage;
