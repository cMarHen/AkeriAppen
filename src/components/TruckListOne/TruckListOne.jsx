/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import classes from './TruckListOne.module.css';
import AuthContext from '../../Context/auth-context';
import EditIcon from '../EditIcon/EditIcon';
import FuelIcon from '../FuelIcon/FuelIcon';
import TruckPopup from '../TruckPopup/TruckPopup';
import { fetchPostContent, fetchContent } from '../../hooks/fetch-hook';

/**
 * Component of type TruckListOne.
 *
 * @returns {JSX} JSX Element.
 */
function TruckListOne({
  regNumber,
  nextInspection,
  truckId,
  goodToknow
}) {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showFuelPopup, setShowFuelPopup] = useState(false);
  const [fuelData, setFuelData] = useState(null);
  const authContext = useContext(AuthContext);
  const nextInspectionString = nextInspection ? `Nästa besiktnig är ${nextInspection}.` : 'Ingen besiktning bokad';
  const goodToknowToShow = goodToknow || 'Ingen ytterligare information tillagd.';

  // Fetch fuel data
  useEffect(() => {
    const gatherData = async () => {
      const fuelFetch = await fetchContent(
        authContext.token,
        `${process.env.REACT_APP_TRUCKS_URL}/fuel?regNumber=${regNumber}`
      );

      if (fuelFetch[0].fuelOccation) {
        setFuelData(fuelFetch[0].fuelOccation);
      }
    };
    gatherData();
  }, []);

  const handleCloseBtn = (event) => {
    event.preventDefault();
    setShowEditPopup(false);
  };

  const handleEditPopup = () => {
    setShowEditPopup(true);
  };

  // Submit fuel data
  const handleFuelSubmitAction = async (mileage, fuelLiters) => {
    await fetchPostContent(
      authContext.token,
      `${process.env.REACT_APP_TRUCKS_URL}/fuel/add?regNumber=${regNumber}`,
      'POST',
      {
        mileage,
        fuelLiters
      }
    );

    setShowEditPopup(false);
  };

  const handleFuelPopup = () => {
    setShowFuelPopup(true);
  };

  const handleFuelExitAction = (event) => {
    event.preventDefault();
    setShowFuelPopup(false);
  };

  // Handle truck info submit
  const handleEditSaveAction = async (enteredGoodToknow, enteredNextInspection) => {
    await fetchPostContent(
      authContext.token,
      `${process.env.REACT_APP_TRUCKS_URL}/${truckId}`,
      'PATCH',
      {
        nextInspection: enteredNextInspection,
        goodToknow: enteredGoodToknow
      }
    );
  };

  return (
    <div className={classes.container}>
      {showEditPopup && (
      <div className={classes.popupWindow}>
        <TruckPopup
          regNumber={regNumber}
          handleCloseBtn={handleCloseBtn}
          handleFuelSubmitAction={handleFuelSubmitAction}
          handleEditSaveAction={handleEditSaveAction}
          preNextInspection={nextInspection}
          preGoodToknow={goodToknow}
        />
      </div>
      )}
      <div className={classes.header}>
        <h2>{regNumber}</h2>
        <div className={classes.editArea}>
          <div role="button" tabIndex="0" className={classes.editIcon} onClick={handleEditPopup}>
            <EditIcon />
          </div>
          <div role="button" tabIndex="0" className={classes.fuelIcon} onClick={handleFuelPopup}>
            <FuelIcon />
          </div>
        </div>
      </div>
      <div className={classes.infoDiv}>
        {nextInspectionString && (<p>{nextInspectionString}</p>)}
        <p>{goodToknowToShow}</p>
      </div>
      {(fuelData !== null && showFuelPopup) && (
        <div className={classes.fuelPopup}>
          <h4>De senaste tankningarna:</h4>
          <button className={classes.fuelExitBtn} type="button" onClick={handleFuelExitAction}>X</button>
          {fuelData.map((f) => {
            if (f.mileage !== 0) {
              return (
                <div className={classes.oneFuelOccationDiv}>
                  <p>
                    <span className={classes.fuelPrefix}>Mätarställning: </span>
                    {f.mileage}
                  </p>
                  <p>
                    <span className={classes.fuelPrefix}>Antal liter: </span>
                    {f.fuelLiters}
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}

export default TruckListOne;
