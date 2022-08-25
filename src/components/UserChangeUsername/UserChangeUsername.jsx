import React, { useRef } from 'react';
import classes from './UserChangeUsername.module.css';
/**
 * Component of type UserPage.
 *
 * @returns {JSX} JSX Element.
 */
function UserChangeUsername({ username, handleSaveAction }) {
  const enteredUsername = useRef();

  const handleClickAction = (event) => {
    event.preventDefault();
    handleSaveAction(enteredUsername.current.value);
  };
  return (
    <div className={classes.container}>
      <label htmlFor="usernameInput" className={classes.inputLabel}>
        <h4>Ändra ditt användarnamn</h4>
        <input type="text" id="usernameInput" className={classes.inputSubmit} defaultValue={username} ref={enteredUsername} />
      </label>
      <button onClick={handleClickAction} className={classes.submitBtn} type="button">Uppdatera</button>
    </div>
  );
}

export default UserChangeUsername;
