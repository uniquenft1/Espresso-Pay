import { ESPRESSO_BASE_URL } from '../constants';
import type { ApiBlockResponse } from '../types';

/**
 * A wrapper around fetch that includes a retry mechanism with exponential backoff.
 * @param path The API path to fetch (e.g., '/v0/status/block-height').
 * @param retries The number of times to retry on failure.
 * @param initialDelay The initial delay in ms for the backoff.
 * @returns A promise that resolves to the Response object.
 * @throws An error if the fetch fails after all retries.
 */
const apiFetch = async (path: string, retries = 2, initialDelay = 400): Promise<Response> => {
    const url = `${ESPRESSO_BASE_URL}${path}`;
    for (let attempt = 1; attempt <= retries + 1; attempt++) {
        try {
            const response = await fetch(url);
            // If response is ok, or it's a client error (4xx) that shouldn't be retried, return immediately.
            if (response.ok || (response.status >= 400 && response.status < 500)) {
                return response;
            }
            console.warn(`API request to ${url} failed with server status ${response.status}. Attempt ${attempt} of ${retries + 1}.`);
        } catch (error) {
            // This catches network errors (e.g., DNS, TCP, etc.)
            console.warn(`API request to ${url} failed with a network error. Attempt ${attempt} of ${retries + 1}.`);
        }
        
        // Don't wait after the last attempt
        if (attempt <= retries) {
            const delay = initialDelay * Math.pow(2, attempt - 1);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    // If all retries fail, we will get here and throw an error.
    throw new Error(`Failed to fetch from API at ${url} after ${retries + 1} attempts.`);
};

export const fetchBlockHeight = async (): Promise<number> => {
  const response = await apiFetch('/v0/status/block-height');
  if (!response.ok) {
    throw new Error(`Failed to fetch block height: ${response.status} ${response.statusText}`);
  }
  try {
    return await response.json();
  } catch(jsonError) {
    console.error('Failed to parse block height response as JSON.', jsonError);
    throw new Error('Received invalid data for block height.');
  }
};

export const fetchBlock = async (height: number): Promise<ApiBlockResponse | null> => {
  const path = `/v0/availability/block/${height}`;
  try {
    const response = await apiFetch(path);
    if (!response.ok) {
      if (response.status !== 404) {
          console.warn(`Request for block ${height} failed with status: ${response.status}`);
      }
      return null;
    }

    // Attempt to parse the JSON response, but handle errors gracefully.
    // The API might return a 200 OK with an invalid body (e.g., HTML error page from a gateway).
    try {
        return await response.json();
    } catch (jsonError) {
        console.warn(`Failed to parse JSON response for block ${height}.`, jsonError);
        return null; // Treat as a failed fetch.
    }

  } catch (err) {
    // This catches the final error from apiFetch after all retries are exhausted.
    // We log it as a warning since the app can continue running with partial data.
    console.warn(`Could not fetch block ${height} after multiple retries.`, err);
    return null;
  }
};