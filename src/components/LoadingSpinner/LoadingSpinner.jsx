import React from 'react';
import classes from './LoadingSpinner.module.css';
import truckImg from './icons/truck.svg';
import globeImg from './icons/globe-svgrepo-com.svg';

/**
 * Component of type LoadingSpinner.
 *
 * @returns {JSX} - JSX Element.
 */
function LoadingSpinner({ loadingMessage }) {
  return (
    <div className={classes.container}>
      <div className={classes.spinnerArea}>
        <img className={classes.truckIcon} src={truckImg} alt="truck" />
        <img className={classes.globeIcon} src={globeImg} alt="globe" />
      </div>
      {loadingMessage && (
        <div className={classes.loadingMessage}>
          <p>{loadingMessage}</p>
        </div>
      )}
    </div>
  );
}

export default LoadingSpinner;
