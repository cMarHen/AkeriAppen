/**
 * Hook for handling messages.
 */

import { fetchContent, fetchPostContent } from './fetch-hook';

/**
 * Fetch chat messages from API.
 *
 * @param {string} token - JWT token.
 * @returns {Promise<String[]>} - The chat messages from API.
 */
export async function fetchChat(token) {
  try {
    const data = await fetchContent(
      token,
      process.env.REACT_APP_CHAT_URL
    );

    return data;
  } catch (error) {
    return [];
  }
}

/**
 * Post chat message.
 *
 * @param {string} token - JWT token.
 * @param {string} enteredUsername - JWT token.
 * @param {string} enteredContent - JWT token.
 * @returns {Promise<number>} - Status code.
 */
export async function postMessage(token, enteredUsername, enteredContent) {
  try {
    const response = await fetchPostContent(
      token,
      process.env.REACT_APP_CHAT_URL,
      'POST',
      {
        username: enteredUsername,
        content: enteredContent
      }
    );
    return response;
  } catch (error) {
    return null;
  }
}

/**
 * Delete chat message.
 *
 * @param {string} token - JWT token.
 * @param {string} id - Id of message.
 * @returns {Promise<number>} - Status code.
 */
export async function deleteMessage(token, id) {
  try {
    const response = await fetchPostContent(
      token,
      `${process.env.REACT_APP_CHAT_URL}/${id}`,
      'DELETE'
    );
    return response;
  } catch (error) {
    return null;
  }
}
