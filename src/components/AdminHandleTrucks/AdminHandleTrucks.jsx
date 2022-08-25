import React, { useState, useContext, useEffect } from 'react';
import classes from './AdminHandleTrucks.module.css';
import { fetchAllTrucks, postTrucks } from '../../hooks/fetchTrucks';
import AuthContext from '../../Context/auth-context';
import IsLoadingContext from '../../Context/isLoading-context';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import TruckListOne from '../TruckListOne/TruckListOne';
import TruckPopup from '../TruckPopup/TruckPopup';

/**
 * Component of type AdminHandleTrucks.
 * @returns {JSX} - JSX Element.
 */
function AdminHandleTrucks() {
  const authContext = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [trucksFromFetch, setTrucksFromFetch] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleNewTruckSave = async (
    enteredMileage,
    enteredRegNumber,
    enteredType,
    enteredManufactorYear
  ) => {
    await postTrucks(
      authContext.token,
      enteredMileage,
      enteredRegNumber,
      enteredType,
      enteredManufactorYear
    );
  };

  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await fetchAllTrucks(authContext.token);
      setTrucksFromFetch(data);
      setIsLoading(false);
    };
    gatherData();
  }, []);

  return (
    <div className={classes.container}>
      {showPopup && (
        <div className={classes.addNewWindow}>
          <TruckPopup saveAction={handleNewTruckSave} newTruck="true" handleCloseBtn={() => setShowPopup(false)} />
        </div>
      )}

      <div className={classes.createNewTruckDiv}>
        <button
          type="button"
          className={classes.openPopupBtn}
          onClick={() => setShowPopup(true)}
        >
          Lägg till ny lastbil
        </button>
      </div>

      <div className={classes.listAllTrucks}>
        {!isLoading
          ? (
            trucksFromFetch !== null && trucksFromFetch.map((truck) => (
              <div className={classes.trucksContainerCard} key={truck.id}>
                <TruckListOne
                  regNumber={truck.regNumber}
                  nextInspection={truck.nextInspection}
                  truckId={truck.id}
                  goodToknow={truck.goodToknow}
                  mileage={truck.mileage}
                  average={truck.average}
                />
              </div>
            ))
          )
          : <LoadingSpinner loadingMessage="Laddar lastbilar ..." />}
      </div>
    </div>
  );
}

export default AdminHandleTrucks;
