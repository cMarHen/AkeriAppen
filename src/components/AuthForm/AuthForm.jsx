/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useContext } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../Context/auth-context';

/**
 * Component of type AuthForm.
 *
 * @param {func} param0 - A function.
 * @returns {JSX} JSX Element.
 */
function AuthForm(/* { handleAction } */) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [loginSuccess, setLoginSuccess] = useState(true);

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let succeded;
    if (!isLogin) {
      succeded = await authContext.register(enteredEmail, enteredPassword);
      emailInputRef.current.value = '';
      passwordInputRef.current.value = '';
    } else {
      succeded = await authContext.login(enteredEmail, enteredPassword);
    }
    setLoginSuccess(succeded);

    setIsLoading(false);
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Logga in' : 'Registrera dig'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Lösenord</label>
          <input type="password" id="password" required ref={passwordInputRef} />
        </div>
        {!loginSuccess && <p className={classes.invalid}>Felaktig email eller lösenord</p>}
        <div className={classes.actions}>
          {!isLoading && <button type="submit">{isLogin ? 'Logga in' : 'Skapa ett nytt konto'}</button>}
          {isLoading && <p>Loading</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Skapa ett nytt konto' : 'Logga in med befintligt konto'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
