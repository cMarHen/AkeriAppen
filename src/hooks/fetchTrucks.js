/**
 * Module for fetching Trucks from API.
 */

import { fetchPostContent } from './fetch-hook';

/**
 * Fetch trucks from API.
 *
 * @param {string} token - JWT token.
 * @param {string} regNumber - Id of driver.
 * @returns {Promise<String[]>} - The trucks got from API.
 */
export async function fetchAllTrucks(token) {
  try {
    const response = await fetch(process.env.REACT_APP_TRUCKS_URL, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();
    return json;
  } catch (error) {
    return [];
  }
}

/**
 * Fetch trucks from API.
 *
 * @param {string} token - JWT token.
 * @param {string} regNumber - Id of driver.
 * @returns {Promise<String[]>} - The trucks got from API.
 */
export async function fetchFuelData(token, regNumber) {
  try {
    const response = await fetch(`${process.env.REACT_APP_TRUCKS_URL}/fuel?regNumber=${regNumber}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();
    return json;
  } catch (error) {
    return [];
  }
}

/**
 * Fetch trucks from API.
 *
 * @param {string} token - JWT token.
 * @param {string} driver - Id of driver.
 * @returns {Promise<String[]>} - The trucks got from API.
 */
export async function fetchTrucksByUser(token, driver) {
  try {
    const response = await fetch(`${process.env.REACT_APP_TRUCKS_URL}?drivers=${driver}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    const json = await response.json();

    json.forEach(async (truck, i) => {
      json[i].fuelData = await fetchFuelData(token, truck.regNumber);
    });

    return json;
  } catch (error) {
    return [];
  }
}

/**
 * Create new truck.
 *
 * @param {string} token - JWT token.
 * @param {number} mileage - Mileage for the new truck.
 * @param {string} regNumber - The registration number.
 * @param {string} type - Type of truck.
 * @param {number} year - Manufactor year.
 * @param {string[]} drivers - Drivers for the new truck.
 * @returns {Promise<String[]>} - The news got from API.
 */
export async function postTrucks(token, mileage, regNumber, type, year, drivers = []) {
  try {
    await fetchPostContent(
      token,
      process.env.REACT_APP_TRUCKS_URL,
      'POST',
      {
        mileage,
        regNumber,
        year,
        type,
        drivers
      }
    );
  } catch (error) {
    console.log(error);
  }
}
