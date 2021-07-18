import React from 'react';

export const meQuery = `
  query {
    me {
      id
      username
      isAdmin
    }
  }
`

export const signinMutation = `
  mutation($email: String!, $password: String!, $expire: Boolean) {
    signin(input:{email: $email, password: $password, expire: $expire}){
      accessToken
      refreshToken
      user {
        id
        username
        isAdmin
      }
    }
  }
`

export const signupMutation = `
  mutation($username: String!, $email: String!, $password: String!) {
    addUser(input: {username: $username, email: $email, password: $password }){
      accessToken
      refreshToken
      user {
        id
        username
        email
        isAdmin
      }
    }
  }
`

export const refreshMutation = `
    mutation($refreshToken: String){
      refreshLogin(refreshToken: $refreshToken){
        accessToken
        refreshToken
      }
    }
  `