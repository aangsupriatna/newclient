import React from 'react';
import { useMutation } from 'urql';

 const SIGNIN_MUTATION = `
  mutation($email: String!, $password: String!) {
    signin(input:{email: $email, password: $password}){
      accessToken
      refreshToken
    }
  }
`

export {
  SIGNIN_MUTATION
}