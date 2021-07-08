import Cookies from 'js-cookie';

const addAuthToOperation = ({ authState, operation, }) => {
  // console.log(authState)
  if (!authState || !authState.token) {
    return operation;
  }
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          "Authorization": authState.token,
        },
      },
    },
  };
};

const getAuth = async ({ authState, mutate }) => {
  // console.log(authState)
  if (!authState) {
    const token = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    if (token && refreshToken) {
      return { token, refreshToken };
    }
    return null;
  }

  const refreshMutation = `
  mutation($token: String){
    refreshLogin(token: $token){
      accessToken
      refreshToken
    }
  }
  `
  const result = await mutate(refreshMutation, {
    token: authState.token,
  });

  console.log(result.data?.refreshLogin)
  if (result.data?.refreshLogin) {
    Cookies.set("accessToken", result.data.refreshLogin.accessToken);
    Cookies.set("refreshToken", result.data.refreshLogin.refreshToken);
    return {
      accessToken: result.data.refreshLogin.accessToken,
      refreshToken: result.data.refreshLogin.refreshToken,
    }
  }
  // console.log(result)

  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
  return null;
};

const didAuthError = ({ error }) => {
  console.log(error)
  // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
  return error.graphQLErrors.some(
    e => e.extensions?.code === 'FORBIDDEN',
  );
};

const willAuthError = ({ authState }) => {
  if (!authState) return true;
  // e.g. check for expiration, existence of auth etc
  // console.log("error")
  return false;
};

export {
  addAuthToOperation,
  getAuth,
  didAuthError,
  willAuthError,
}