import { setInterceptors, convertResponse } from '@api/interceptor';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

// 가장 근본의 요청을 만들어주는 함수
export const originalFetch = async (url, endpoint, method, requestOptions) => {
  const response = await fetch(`${url}${endpoint}`, {
    ...requestOptions,
    method,
  });
  return response;
};

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

  const fetchInstance = async (endpoint, method, requestOptions) => {
    const mergedRequestOptions = {
      ...mergedOptions,
      ...requestOptions, // json 형태로 들어오는 요청
      headers:{
        ...mergedOptions.headers,
        ...requestOptions.headers
      },
      method
    };

    console.log(mergedRequestOptions)

    try {
      const response = await originalFetch(url, endpoint, method, mergedRequestOptions);
      console.log("1. 여기서 기본적인 요청에 대한 응답(from createFetchInstance -> fetchInstance)", response);

      return convertResponse(response, endpoint, method, mergedRequestOptions);
    } catch (error) {
      if (error.headers && error.headers.get('Content-Type') === 'application/json') {
        return error.json().then((response_1) => {
          return Promise.reject(convertResponse(response_1));
        });
      } else {
        return Promise.reject(convertResponse(error));
      }
    }
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