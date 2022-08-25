import React, { useState, useContext, useEffect } from 'react';
import classes from './AdminHandleUsers.module.css';
import { fetchContent, fetchPostContent } from '../../hooks/fetch-hook';
import { fetchAllTrucks } from '../../hooks/fetchTrucks';
import AuthContext from '../../Context/auth-context';
import IsLoadingContext from '../../Context/isLoading-context';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import UserListOne from '../UserListOne/UserListOne';
import ConfirmPopup from '../ConfirmPopup/ConfirmPopup';

/**
 * Component of type AdminHandleUsers.
 * @returns {JSX} - JSX Element.
 */
function AdminHandleUsers() {
  const authContext = useContext(AuthContext);
  const { isLoading, setIsLoading } = useContext(IsLoadingContext);
  const [usersFromFetch, setUsersFromFetch] = useState(null);
  const [trucksFromFetch, setTrucksFromFetch] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleEditTrucksAction = async (trucks, userId) => {
    try {
      await fetchPostContent(
        authContext.token,
        `${process.env.REACT_APP_USER_URL}/${userId}`,
        'PATCH',
        { trucks }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Get trucks
  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await fetchAllTrucks(authContext.token);
      setTrucksFromFetch(data);
      setIsLoading(false);
    };
    gatherData();
  }, []);

  // Get users
  useEffect(() => {
    const gatherData = async () => {
      setIsLoading(true);
      const data = await fetchContent(authContext.token, process.env.REACT_APP_USER_URL);

      setUsersFromFetch(data);
      setIsLoading(false);
    };
    gatherData();
  }, []);

  // Get id for user to delete.
  const deleteClickHandler = async (userId) => {
    setUserToDelete(userId);
    setConfirm(true);
  };

  // Handle delete confirm.
  const deleteActionHandler = async (isConfirm) => {
    if ((isConfirm && userToDelete) && (userToDelete !== authContext.uidForDb)) {
      await fetchPostContent(
        authContext.token,
        `${process.env.REACT_APP_USER_URL}/${userToDelete}`,
        'DELETE'
      );
    }
    setConfirm(false);
  };

  return (
    <div className={classes.container}>
      {!isLoading
        ? (
          <div className={classes.userContainer}>
            {usersFromFetch && usersFromFetch.map((u) => (
              <div className={classes.oneUserDiv} key={u.id}>
                <UserListOne
                  key={u.id}
                  user={u}
                  trucks={trucksFromFetch || []}
                  editAction={handleEditTrucksAction}
                  deleteAction={deleteClickHandler}
                />
              </div>
            ))}
            {confirm && (
              <div className={classes.confirmPopup}>
                <ConfirmPopup
                  confirmHandler={deleteActionHandler}
                  message="Vill du ta bort den här användaren?"
                />
              </div>
            )}
          </div>
        )
        : <LoadingSpinner loadingMessage="Laddar chaufförer ..." />}
    </div>
  );
}

export default AdminHandleUsers;
