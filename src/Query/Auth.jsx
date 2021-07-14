import React from 'react';
import { useMutation } from 'urql';

const SIGNIN_MUTATION = `
  mutation($email: String!, $password: String!, $expire: Boolean) {
    signin(input:{email: $email, password: $password, expire: $expire}){
      accessToken
      refreshToken
    }
  }
`

const SIGNUP_MUTATION = `
  mutation($username: String!, $email: String!, $password: String!) {
    addUser(input: {username: $username, email: $email, password: $password }){
      id
      username
      email
      password
      isAdmin
    }
  }
`
export {
  SIGNIN_MUTATION,
  SIGNUP_MUTATION,
}