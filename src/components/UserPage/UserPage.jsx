import React, {
  useEffect,
  useRef,
  useState,
  useContext
} from 'react';
import { differenceInCalendarDays, isValid } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './UserPage.css';
import { fetchUserPatch, getSalaryCollectionByUser, postToSalaryCollection } from '../../hooks/fetchUser';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserChangeUsername from '../UserChangeUsername/UserChangeUsername';
import IsLoadingContext from '../../Context/isLoading-context';
import AuthContext from '../../Context/auth-context';

/**
 * Calculate time.
 * @param {Date} userMarkedDate - The date marked.
 * @param {number} hourUntil - Hour until.
 * @param {number} minuteUntil - Minute until.
 * @param {number} hourFrom - Hour from.
 * @param {number} minuteFrom - Minute from.
 * @returns {number} - Calculated time.
 */
function calculateTime(userMarkedDate, hourUntil, minuteUntil, hourFrom, minuteFrom) {
  const until = new Date(userMarkedDate).setHours(hourUntil, minuteUntil);
  const from = new Date(userMarkedDate).setHours(hourFrom, minuteFrom);

  const calcOverMidnight = () => {
    const timeToMidnight = ((24 - Number(hourFrom)) * 60) + Number(minuteFrom);
    const timeAfterMidnight = (Number(hourUntil) * 60) + Number(minuteUntil);

    return timeToMidnight + timeAfterMidnight;
  };
  // Set amount of minutes work time
  const calc = until > from
    ? Math.floor((until - from) / 60000)
    : calcOverMidnight();

  return calc;
}

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
 * Component of type UserPage.
 *
 * @returns {JSX} JSX Element.
 */
function UserPage() {
  const [userCompletedDate, setUserCompletedDate] = useState([]);
  const [showFillSalary, setShowFillSalary] = useState(false);
  const [userMarkedDate, setUserMarkedDate] = useState(null);
  const [collectionFetched, setCollectionFetched] = useState(false);
  const [workedTime, setWorkedTime] = useState(null);
  const [salaryCollection, setSalaryCollection] = useState(null);
  const [workedTimeLastMonth, setWorkedTimeLastMonth] = useState(0);

  const enteredFromTime = useRef();
  const enteredUntilTime = useRef();
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const authContext = useContext(AuthContext);

  // Fetch salary data
  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await getSalaryCollectionByUser(authContext.token, authContext.uid);
      setSalaryCollection(data);

      setCollectionFetched(true);
    };
    gatherData();
  }, []);

  // Create a Date object for each salary object.
  useEffect(() => {
    if (salaryCollection && collectionFetched) {
      salaryCollection.forEach((day) => {
        const dayToAdd = new Date(`2022 ${day.month} ${day.date}`);

        if (isValid(dayToAdd)) {
          setUserCompletedDate((prev) => [...prev, dayToAdd]);
        }
      });
      setIsLoading(false);

      // Calculate last month working time
      const currentMonth = new Date().getMonth();
      setWorkedTimeLastMonth(calculateWorkedTimePerMonth(currentMonth, salaryCollection));
    }
  }, [collectionFetched]);

  // When click on calendar
  const handleChangeAction = (value) => {
    setShowFillSalary(true);
    setUserMarkedDate(value);
  };

  // When saving new salary.
  const handleSaveAction = async (event) => {
    event.preventDefault();
    if (workedTime) {
      const res = await postToSalaryCollection(
        authContext.token,
        authContext.uid,
        userMarkedDate.getMonth() + 1, // To get i.e January as 1
        userMarkedDate.getDate(),
        workedTime
      );
      if (res) {
        setUserCompletedDate((prev) => [...prev, userMarkedDate]);
        setShowFillSalary(false);
      }
    }
  };

  const handleUsernameSaveAction = async (enteredUsername) => {
    await fetchUserPatch(authContext.token, authContext.uidForDb, enteredUsername);
    authContext.username = enteredUsername;
  };

  // Close salary window.
  const handleAbortAction = (event) => {
    event.preventDefault();
    setShowFillSalary(false);
  };

  // Calculate entered time
  const handleTimeSetAction = () => {
    const [hourUntil, minuteUntil] = enteredUntilTime.current.value.split(':');
    const [hourFrom, minuteFrom] = enteredFromTime.current.value.split(':');

    if (enteredFromTime && enteredUntilTime) {
      const calc = calculateTime(userMarkedDate, hourUntil, minuteUntil, hourFrom, minuteFrom);

      setWorkedTime(calc);
    }
  };

  // Set tile classname if salary
  const tileClassName = ({ date, view }) => {
    if (
      view === 'month'
      && userCompletedDate.find((dDate) => differenceInCalendarDays(dDate, date) === 0)
    ) {
      return 'highlight';
    }
    return null;
  };

  return (
    <div className="container">
      {showFillSalary
      && (
        <div className="user-popup-container">
          <div className="user-popup-input">
            <div className="user-popup-input-row">
              <h4>Från: </h4>
              <input type="time" pattern="[0-9]{2}:[0-9]{2}" ref={enteredFromTime} onChange={handleTimeSetAction} data-testid="time-input-from" />
            </div>
            <div className="user-popup-input-row">
              <h4>Till: </h4>
              <input type="time" pattern="[0-9]{2}:[0-9]{2}" ref={enteredUntilTime} onChange={handleTimeSetAction} data-testid="time-input-until" />
            </div>
            <div className="user-popup-input-row">
              <h3>Totalt: </h3>
              {workedTime
                ? (
                  <p data-testid="time-total">
                    {`${Math.trunc(workedTime / 60)} timmar och ${workedTime % 60} minuter.`}
                  </p>
                )
                : <p>Fyll i dina tider</p>}
            </div>
          </div>
          <div className="user-popup-submitArea">
            <button className="user-popup-send" onClick={handleSaveAction} type="submit">Spara</button>
            <button className="user-popup-send" onClick={handleAbortAction} type="submit">Avbryt</button>
          </div>
        </div>
      )}

      <div className="calendar">
        <div className="headerArea">
          <h3>Här kan du lägga in arbetad tid</h3>
          <p>
            <span className="greenDay" />
            = Färdigifylld dag
          </p>
          <p>
            <span className="yellowDay" />
            = Dagens datum
          </p>
          {workedTimeLastMonth && (
            <h4>
              Arbetad tid föregående månad:
              {workedTimeLastMonth}
            </h4>
          )}

        </div>
        {!isLoading
          ? <Calendar onClickDay={handleChangeAction} tileClassName={tileClassName} />
          : <LoadingSpinner loadingMessage="Laddar löner ..." />}
      </div>
      <div className="usernameChange">
        <UserChangeUsername
          handleSaveAction={handleUsernameSaveAction}
          username={authContext.username}
        />
      </div>
    </div>
  );
}

export default UserPage;
