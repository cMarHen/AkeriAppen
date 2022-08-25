import React, { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdToken,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';
import { app } from '../config/firebase-config';
import { fetchContent, fetchPostContent } from '../hooks/fetch-hook';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  isAdmin: false,
  username: '',
  uid: '',
  uidForDb: '',
  register: () => {},
  login: () => {},
  logout: () => {}
});

const authentication = getAuth(app);

/**
 * Provide Auth.
 *
 * @param {*} props - Props
 * @returns {JSX} - JSX Element.
 */
export function AuthContextProvider({ children }) {
  const initialToken = sessionStorage.getItem('Auth Token');
  const [token, setToken] = useState(initialToken);
  const [userIsAdmin, setUserIsAdmin] = useState(null);
  const [username, setUsername] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);
  const [dbUid, setDbUid] = useState(null);
  const [userIsLoggedin, setUserIsLoggedin] = useState(!!token);

  const userFetch = async () => {
    if (token) {
      const data = await fetchContent(token, `${process.env.REACT_APP_USER_URL}/isAdmin`);
      if (data !== null) {
        setUserIsAdmin(data.isAdmin === true);
        setUsername(data.username);
        setDbUid(data.id);
      }
    }
  };

  onAuthStateChanged(authentication, async (user) => {
    try {
      if (user) {
        const newToken = await getIdToken(authentication.currentUser, true);

        sessionStorage.setItem('Auth Token', newToken);
        setToken(newToken);
        setCurrentUid(user.uid);
        userFetch();
      } else {
        throw new Error();
      }
    } catch (error) {
      setUserIsLoggedin(false);
      setToken(null);
      setCurrentUid(null);
      setUserIsAdmin(false);
      setCurrentUid(null);
      sessionStorage.removeItem('Auth Token');
    }
  });

  /**
   * Takes email and password and authenticate to firebase.
   *
   * @param {string} enteredEmail - The email.
   * @param {string} enteredPassword - The password.
   * @returns {Promise<boolean>} - Boolean if login succeded.
   */
  const registerHandler = async (enteredEmail, enteredPassword) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        authentication,
        enteredEmail,
        enteredPassword
      );

      const newUserStatusCode = await fetchPostContent(
        userCredentials.user.accessToken,
        process.env.REACT_APP_USER_URL,
        'POST',
        {
          sub: userCredentials.user.uid,
          username: userCredentials.user.email,
          salaryReportThisMonth: false,
          trucks: [],
          isAdmin: false
        }
      );
      return newUserStatusCode;
    } catch (error) {
      return false;
    }
  };

  /**
   * Takes email and password and authenticate to firebase.
   *
   * @param {string} enteredEmail - The email.
   * @param {string} enteredPassword - The password.
   * @returns {Promise<boolean>} - Boolean if login succeded.
   */
  const loginHandler = async (enteredEmail, enteredPassword) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        authentication,
        enteredEmail,
        enteredPassword
      );

      setCurrentUid(userCredentials.user.uid);
      sessionStorage.setItem('Auth Token', userCredentials.user.accessToken);
      setToken(userCredentials.user.accessToken);
      setUserIsLoggedin(true);

      userFetch();

      return true;
    } catch (error) {
      return false;
    }
  };

  const logoutHandler = () => {
    authentication.signOut();
    setToken(null);
    setCurrentUid(null);
    setUserIsAdmin(false);
    setCurrentUid(null);
    sessionStorage.removeItem('Auth Token');
  };

  // Disabled because I want this to check every render.
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    token,
    isLoggedIn: userIsLoggedin,
    isAdmin: userIsAdmin,
    username,
    uid: currentUid,
    uidForDb: dbUid,
    register: registerHandler,
    login: loginHandler,
    logout: logoutHandler
  };

  // Wrap index.js with  <AuthContext.Provider>
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
