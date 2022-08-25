import React, { useContext, useEffect, useState } from 'react';
import classes from './TruckPage.module.css';
import IsLoadingContext from '../../Context/isLoading-context';
import AuthContext from '../../Context/auth-context';
import TruckListOne from '../TruckListOne/TruckListOne';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import bannerImg from './images/banner.png';
import { fetchContent } from '../../hooks/fetch-hook';

/**
 * Component of type TruckPage.
 *
 * @returns {JSX} JSX Element.
 */
function TruckPage() {
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const authContext = useContext(AuthContext);
  const [trucksFromFetch, setTrucksFromFetch] = useState(null);

  // Gather trucks on render
  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);

      const currentUser = await fetchContent(
        authContext.token,
        `${process.env.REACT_APP_USER_URL}?sub=${authContext.uid}`
      );
      // Get trucks from current user
      const { trucks } = currentUser[0];

      if (trucks.length > 0) {
        const arr = trucks.reduce((val, truck) => `${val}&regNumber=${truck}`, '');

        const truckObjects = await fetchContent(
          authContext.token,
          `${process.env.REACT_APP_TRUCKS_URL}?${arr}`
        );

        setTrucksFromFetch(truckObjects);
      }
      setIsLoading(false);
    };
    gatherData();
  }, []);

  return (
    !isLoading
      ? (
        <div className={classes.container}>
          <div className={classes.mainContainer}>
            {trucksFromFetch !== null ? trucksFromFetch.map((truck) => (
              <div className={classes.truckCard} key={truck.id}>
                <TruckListOne
                  key={truck.id}
                  regNumber={truck.regNumber}
                  truckId={truck.id}
                  nextInspection={truck.nextInspection}
                  goodToknow={truck.goodToknow}
                />
              </div>
            ))
              : (
                <p className={classes.noTrucks}>Du har inga bilar inlagda på ditt konto</p>
              )}
          </div>
          <div className={classes.asideContainer}>
            <img src={bannerImg} alt="A truck" />
          </div>
        </div>
      )
      : <LoadingSpinner loadingMessage="Laddar lastbilar ..." />
  );
}

export default TruckPage;
