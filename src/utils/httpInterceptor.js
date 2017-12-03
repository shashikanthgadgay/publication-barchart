import 'whatwg-fetch';

export const httpInterceptor = {
  get: (url) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
    };
    return fetch(url, { mode: 'cors', header: new Headers(headers) })
        .then((response) => {
          if (response.status >= 200 && response.status < 300) {
            return response.json();
          }
          const error = new Error(response.statusText);
          error.response = response;
          throw error;
        });
  },
};
