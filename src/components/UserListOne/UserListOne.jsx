import React, { useState, useContext, useEffect } from 'react';
import classes from './UserListOne.module.css';
import AuthContext from '../../Context/auth-context';
import { getSalaryCollectionByUser } from '../../hooks/fetchUser';
import TrashIcon from '../TrashIcon/TrashIcon';

/**
 * Calculate worked time for a month.
 * OBS! Not an accurate function.
 *
 * @param {number} month - The month to summarize.
 * @param {object[]} salaryArr - Array with salary objects.
 * @returns {string} - A string representing worked time.
 */
function calculateWorkedTimePerMonth(month, salaryArr) {
  const minutesTotal = salaryArr
    .filter((day) => day.month === month)
    .reduce((prevVal, currObj) => prevVal + currObj.minutesWorked, 0);

  return `${Math.trunc(minutesTotal / 60)}h ${minutesTotal % 60}min`;
}

/**
 * Component of type UserListOne.
 * @returns {JSX} - JSX Element.
 */
function UserListOne({
  user,
  trucks,
  editAction,
  deleteAction
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [workedTimeLastMonth, setWorkedTimeLastMonth] = useState(0);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const gatherData = async () => {
      const data = await getSalaryCollectionByUser(authContext.token, user.sub);

      // Calculate last month working time
      const currentMonth = new Date().getMonth();
      setWorkedTimeLastMonth(calculateWorkedTimePerMonth(currentMonth, data));
    };
    gatherData();
  }, []);

  const handleCollapseAction = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const checkedRegNumbers = Array.from(event.target.querySelectorAll('input[type="checkbox"]:checked')).map((t) => t.id);
    editAction(checkedRegNumbers, user.id);
    setIsCollapsed(false);
  };

  const handleDeleteClick = (event) => {
    event.preventDefault();
    deleteAction(user.id);
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h3 className={classes.usernameHead}>
          Användarnamn:
          <span>{user.username}</span>
        </h3>
        <p className={classes.workedTime}>
          Arbetad tid föregående månad
          <span>{workedTimeLastMonth}</span>
        </p>
        {deleteAction && (
          <button type="button" className={classes.binIcon} onClick={handleDeleteClick}>
            <TrashIcon />
          </button>
        )}
      </div>
      <div className={classes.userListBody}>
        <div className={classes.listUserTrucks}>
          {user.trucks.length
            ? user.trucks.map((t) => (
              <p>{t}</p>
            ))
            : <p>Inga lastbilar valda</p>}
        </div>
        <div className={classes.listCompanyTrucks}>
          <button className={classes.collapseBtn} type="button" onClick={handleCollapseAction}>Klicka för att välja lastbil för denna chaufför</button>
          {isCollapsed && (
            <form className={classes.trucksUl} onSubmit={handleSubmit}>
              {trucks.length && trucks.map((t) => (
                <label className={classes.trucksCheckbox} htmlFor={t.regNumber}>
                  {t.regNumber}
                  <input
                    type="checkbox"
                    name={t.regNumber}
                    id={t.regNumber}
                    defaultChecked={user.trucks.includes(t.regNumber)}
                  />
                </label>
              ))}
              <button className={classes.submitBtn} type="submit">Spara</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserListOne;
