import React from 'react';
import { delToken, getToken, setToken } from './Token';

export const addAuthToOperation = ({ authState, operation, }) => {
  // console.log(authState.accessToken)
  if (!authState || !authState.accessToken) {
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
          "Authorization": `Bearer ${authState.accessToken}`,
        },
      },
    },
  };
};

export const getAuth = async ({ authState, mutate }) => {
  if (!authState) {
    const { accessToken, refreshToken } = getToken();
    // console.log(accessToken)
    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  }

  const refreshMutation = `
  mutation($refreshToken: String){
    refreshLogin(refreshToken: $refreshToken){
      accessToken
      refreshToken
    }
  }
  `
  const result = await mutate(refreshMutation, {
    refreshToken: authState.refreshToken,
  });

  // console.log(result.data?.refreshLogin)
  if (result.data?.refreshLogin) {
    const newAccessToken = result.data.refreshLogin.accessToken;
    const newRefreshToken = result.data.refreshLogin.refreshToken;
    setToken(newAccessToken, newRefreshToken);
    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    }
  }
  delToken();
  return null;
};

export const didAuthError = ({ error }) => {
  // console.log(error)
  // check if the error was an auth error (this can be implemented in various ways, e.g. 401 or a special error code)
  return error.graphQLErrors.some(
    e => e.extensions?.code === 'FORBIDDEN',
  );
};

export const willAuthError = ({ authState }) => {
  if (!authState) return true;
  // console.log(authState)
  // e.g. check for expiration, existence of auth etc
  // console.log("error")
  return false;
};