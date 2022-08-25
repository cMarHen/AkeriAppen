import React from 'react';
import classes from './FuelIcon.module.css';
import fuelImg from './images/1298760517.svg';

/**
 * Component of type EditIcon.
 *
 * @returns {JSX} - JSX Element.
 */
function FuelIcon() {
  return (
    <button type="button" className={classes.icon}>
      <img src={fuelImg} alt="edit" />
    </button>
  );
}

export default FuelIcon;
