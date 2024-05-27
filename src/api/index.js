
import { setInterceptors, convertResponse } from '@api/interceptor';

const BASE_API_URL = `http://localhost:8080`;

const createFetchInstance = (url, options) => {
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
  };

  const fetchInstance = (endpoint, method, requestOptions) => {
    const mergedRequestOptions = {
      ...mergedOptions,
      ...requestOptions,
      method,
    };

    return fetch(`${url}${endpoint}`, mergedRequestOptions)
      .then((response) => {
        console.log("response", response)
        return convertResponse(response);
      })
      .catch((error) => {
        if (error.headers && error.headers.get('Content-Type') === 'application/json') {
          return error.json().then((response) => {
            return Promise.reject(convertResponse(response));
          });
        } else {
          return Promise.reject(convertResponse(error));
        }
      });
  };

  const interceptedFetchInstance = setInterceptors(mergedOptions.withAuth, fetchInstance);

  return {
    get: (endpoint, requestOptions) =>
      interceptedFetchInstance(endpoint, 'GET', requestOptions),
    post: (endpoint, requestOptions) =>
      interceptedFetchInstance(endpoint, 'POST', requestOptions),
    put: (endpoint, requestOptions) =>
      interceptedFetchInstance(endpoint, 'PUT', requestOptions),
    delete: (endpoint, requestOptions) =>
      interceptedFetchInstance(endpoint, 'DELETE', requestOptions),
    patch: (endpoint, requestOptions) =>
      interceptedFetchInstance(endpoint, 'PATCH', requestOptions),
  };
};

export const auth = createFetchInstance(BASE_API_URL, { withAuth: true });
export const instance = createFetchInstance(BASE_API_URL);