import React from 'react';
import classes from './ConfirmPopup.module.css';

/**
 * Component of type ConfirmPopup.
 *
 * @returns {JSX} JSX Element.
 */
function ConfirmPopup({ message, confirmHandler }) {
  return (
    <div className={classes.container}>
      <h4>{message}</h4>

      <div className={classes.btnArea}>
        <button className={classes.submitBtn} type="button" onClick={() => confirmHandler(true)}>Ja</button>
        <button className={classes.submitBtn} type="button" onClick={() => confirmHandler(false)}>Nej</button>
      </div>
    </div>
  );
}

export default ConfirmPopup;
