/**
 * Hook for handling news.
 */

import { fetchContent, fetchPostContent } from './fetch-hook';

/**
 * Fetch news from API.
 *
 * @param {string} token - JWT token.
 * @returns {Promise<Object[]>} - The news got from API.
 */
export async function fetchNews(token) {
  try {
    const data = await fetchContent(
      token,
      `${process.env.REACT_APP_NEWS_URL}?sort=-createdAt`
    );

    return data;
  } catch (error) {
    return [];
  }
}

/**
 * Fetch news from API.
 *
 * @param {string} token - JWT token.
 * @param {string} enteredTitle - JWT token.
 * @param {string} enteredContent - JWT token.
 * @returns {Promise<number>} - The news got from API.
 */
export async function postNews(token, enteredTitle, enteredContent) {
  try {
    const response = await fetchPostContent(
      token,
      process.env.REACT_APP_NEWS_URL,
      'POST',
      {
        title: enteredTitle,
        content: enteredContent
      }
    );
    return response;
  } catch (error) {
    return null;
  }
}

/**
 * Edit a resource.
 *
 * @param {string} token - JWT token.
 * @param {string} id - Identifier for the resource.
 * @param {string} enteredTitle - Title of the edited resource.
 * @param {string} enteredContent - Content of the edited resource.
 * @returns {Promise<number>} - Status code.
 */
export async function patchNews(token, id, enteredTitle, enteredContent) {
  try {
    const response = await fetchPostContent(
      token,
      `${process.env.REACT_APP_NEWS_URL}/${id}`,
      'PATCH',
      {
        title: enteredTitle,
        content: enteredContent
      }
    );

    return response;
  } catch (error) {
    return null;
  }
}

/**
 * Delete news post from API.
 *
 * @param {string} token - JWT token.
 * @param {string} id - JWT token.
 * @returns {Promise<number>} - The news got from API.
 */
export async function deleteNews(token, id) {
  try {
    const response = await fetchPostContent(
      token,
      `${process.env.REACT_APP_NEWS_URL}/${id}`,
      'DELETE'
    );

    return response;
  } catch (error) {
    return null;
  }
}
