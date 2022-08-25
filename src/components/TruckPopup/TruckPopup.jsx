import React, { useRef, useState } from 'react';
import classes from './TruckPopup.module.css';

/**
 * Component of type TruckPopup.
 *
 * @returns {JSX} - JSX Element.
 */
function TruckPopup({
  regNumber,
  handleCloseBtn,
  saveAction,
  handleEditSaveAction,
  handleFuelSubmitAction,
  newTruck,
  preNextInspection,
  preGoodToknow
}) {
  const [showEditPart, setShowEditPart] = useState(false);
  const mileage = useRef();
  const litres = useRef();
  const goodToknow = useRef();
  const nextInspection = useRef();
  const enteredRegNumber = useRef();
  const enteredMileage = useRef();
  const enteredManufactorYear = useRef();
  const enteredType = useRef();

  const handleTabs = (event) => {
    event.preventDefault();
    setShowEditPart((prev) => !prev);
  };

  const handleFuelSubmit = (event) => {
    event.preventDefault();
    handleFuelSubmitAction(mileage.current.value, litres.current.value);
  };

  const handleEditTruckSubmit = (event) => {
    event.preventDefault();
    handleEditSaveAction(
      goodToknow.current.value,
      nextInspection.current.value
    );
  };

  const handleSaveNewTruck = (event) => {
    event.preventDefault();
    saveAction(
      enteredMileage.current.value,
      enteredRegNumber.current.value,
      enteredType.current.value,
      enteredManufactorYear.current.value
    );
  };

  return (
    <div className={classes.trucksPopupContainer}>
      <div className={classes.truckFormHeader}>
        <h3>{regNumber}</h3>
        <button className={classes.closeBtn} onClick={handleCloseBtn} type="submit">X</button>
      </div>

      {newTruck ? (
        <nav className={classes.truckPopupNav}>
          <button className={classes.fuelTab} type="button" onClick={handleTabs}>Lägg till en ny lastbil</button>
        </nav>
      )
        : (
          <nav className={classes.truckPopupNav}>
            <button className={classes.fuelTab} type="button" onClick={handleTabs}>Bränsle</button>
            <button className={classes.editTab} type="button" onClick={handleTabs}>Uppgifter</button>
          </nav>
        )}
      {!newTruck ? (
        <div className={classes.editTruckDiv}>
          {showEditPart
            ? (
              <form className={classes.editTruckForm} onSubmit={handleEditTruckSubmit}>
                <h4>Ändra information om lastbilen: </h4>
                <label htmlFor="nextInspection" className={classes.editFormLabel}>
                  Nästa besiktning:
                  <input defaultValue={preNextInspection} type="text" name="nextInspection" id="nextInspection" ref={nextInspection} />
                </label>
                <label htmlFor="nextInspection" className={classes.editFormLabel}>
                  Bra att veta:
                  <textarea defaultValue={preGoodToknow} name="goodToknow" id="goodToknow" ref={goodToknow} rows="5" />
                </label>

                <button className={classes.send} type="submit">Skicka</button>
              </form>
            )
            : (
              <form className={classes.editFuelForm} onSubmit={handleFuelSubmit}>
                <h4>Fyll i mätarställning, och liter: </h4>
                <label htmlFor="mileage" className={classes.editFormLabel}>
                  Fyll i mätarställning (km):
                  <input type="number" name="mileage" id="mileage" ref={mileage} required placeholder="Mätarställning" />
                </label>
                <label htmlFor="fuelAmount" className={classes.editFormLabel}>
                  Antal liter:
                  <input type="number" name="fuelAmount" id="fuelAmount" ref={litres} required placeholder="Antal liter" />
                </label>

                <button className={classes.send} type="submit">Skicka</button>
              </form>
            )}

        </div>
      )
        : (
          <form className={classes.editTruckForm} onSubmit={handleSaveNewTruck}>
            <h4>Fyll i information om lastbilen: </h4>
            <label htmlFor="enteredRegNumber" className={classes.editFormLabel}>
              Registreringsnummer:
              <input type="text" name="enteredRegNumber" id="enteredRegNumber" ref={enteredRegNumber} required />
            </label>
            <label htmlFor="mileage" className={classes.editFormLabel}>
              Mätarställning (km):
              <input type="text" name="mileage" id="mileage" ref={enteredMileage} required />
            </label>
            <label htmlFor="manufactorYear" className={classes.editFormLabel}>
              Tillverkningsår:
              <input type="text" name="manufactorYear" id="manufactorYear" ref={enteredManufactorYear} required />
            </label>
            <label htmlFor="enteredType" className={classes.editFormLabel}>
              Lastbilstyp:
              <input type="text" name="enteredType" id="enteredType" ref={enteredType} required />
            </label>

            <button className={classes.send} type="submit">Skicka</button>
          </form>
        )}
    </div>
  );
}

export default TruckPopup;
