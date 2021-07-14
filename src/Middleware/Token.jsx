import React from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const setToken = (accessToken, refreshToken) => {
  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);

  return {}
}

export const getToken = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  return {
    accessToken,
    refreshToken,
  }
}

export const delToken = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');

  return {}
}

export const checkAuth = () => {
  const { accessToken } = getToken();
  let currentDate = new Date()
  if (accessToken) {
    const decoded = jwt_decode(accessToken, import.meta.env.VITE_JWT_KEY)
    // const d = new Date(0);
    // d.setUTCSeconds(decoded.exp);
    // console.log(d);
    if (decoded.exp * 1000 < currentDate.getTime()) {
      // console.log("Token expired.");
      return false
    } else {
      // console.log("Valid token");
      return true
    }
  }
  return false
}