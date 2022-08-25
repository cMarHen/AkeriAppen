import React, { useContext } from 'react';
import AuthContext from './Context/auth-context';

import MainBody from './components/MainBody/MainBody';
import AuthForm from './components/AuthForm/AuthForm';

/**
 * Main function for the application.
 *
 * @returns {JSX} JSX Element.
 */
function App() {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;
  return (
    <div>
      {!isLoggedIn && (
        <AuthForm />
      )}
      {isLoggedIn && (
        <MainBody />
      )}
    </div>
  );
}

export default App;
