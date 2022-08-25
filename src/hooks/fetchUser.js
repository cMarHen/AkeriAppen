/**
 * Hook for handling users.
 */

import { fetchContent, fetchPostContent } from './fetch-hook';

/**
 * Get user from API.
 *
 * @param {string} token - JWT token.
 * @param {string} userId - User ID, empty string as default.
 * @returns {Promise<String[]>} - The chat messages from API.
 */
export async function fetchUsers(token, userId = '') {
  try {
    const data = await fetchContent(
      token,
      `${process.env.REACT_APP_USER_URL}/${userId}`
    );
    return data;
  } catch (error) {
    return [];
  }
}

/**
 * Patch a username.
 *
 * @param {string} token - JWT token.
 * @param {string} id - User identifier.
 * @param {string} username - Entered username.
 * @returns {Promise<number>} - Status code.
 */
export async function fetchUserPatch(
  token,
  id,
  username
) {
  try {
    const response = await fetchPostContent(
      token,
      `${process.env.REACT_APP_USER_URL}/${id}`,
      'PATCH',
      { username }
    );
    return response;
  } catch (error) {
    return null;
  }
}

/**
 * Create a new user.
 *
 * @param {string} token - JWT token.
 * @param {string} sub - Unique id.
 * @param {string} username - Username.
 * @param {string[]} trucks - Trucks availiable for user.
 * @returns {Promise<String[]>} - The news got from API.
 */
export async function postUser(
  token,
  sub,
  username,
  trucks = []
) {
  try {
    const body = {
      sub,
      username,
      trucks: [...trucks]
    };

    // Se till att öppna upp en lönecollection också.

    await fetch(process.env.REACT_APP_USER_URL, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * Create a new user.
 *
 * @param {string} token - JWT token.
 * @param {string} sub - Unique id.
 * @returns {Promise<String[]>} - The news got from API.
 */
export async function getSalaryCollectionByUser(token, sub) {
  try {
    const response = await fetch(`${process.env.REACT_APP_USER_URL}/salary?sub=${sub}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const { salaryFromDb } = await response.json();

    if (!salaryFromDb) {
      return [];
    }
    const collection = salaryFromDb[0].salaryCollection;
    return [...collection];
  } catch (error) {
    return [];
  }
}

/**
 * Create a new user.
 *
 * @param {string} token - JWT token.
 * @param {string} sub - Unique id.
 * @param {number} month - Month.
 * @param {number} date - Day of month.
 * @param {number} minutesWorked - Amount of minutes.
 * @returns {Promise<String[]>} - The news got from API.
 */
export async function postToSalaryCollection(
  token,
  sub,
  month,
  date,
  minutesWorked
) {
  try {
    const body = {
      sub,
      salaryCollection: {
        month,
        date,
        minutesWorked
      }
    };

    const response = await fetchPostContent(
      token,
      `${process.env.REACT_APP_USER_URL}/salary/add`,
      'POST',
      body
    );

    return response;
  } catch (error) {
    return false;
  }
}
