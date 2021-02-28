const apiCall = async ({
  method = "GET",
  payload = {},
  path = '',
  readBody = resp => resp.json(),
  errorMessage = '',
  baseUrl = process.env.VUE_APP_FIREBASE_URL,
  ...others
}) => {
  const options = {
    ...others,
    method
  };
  if (method === "GET") {
    options.query = JSON.stringify(payload);
  } else {
    options.body = JSON.stringify(payload);
  }
  const response = await fetch(baseUrl + path, options)
  const responseBody = await readBody(response) || {};
  if (!response.ok) {
    throw new Error(response.message || errorMessage)
  }
  return responseBody;
};

export default {
  put: ({ payload, path, ...others }) => apiCall({ method: "PUT", path, payload, ...others }),
  get: ({ payload, path, ...others }) => apiCall({ method: "GET", path, payload, ...others }),
  post: ({ payload, path, ...others }) => apiCall({ method: "POST", path, payload, ...others }),
};
