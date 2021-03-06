import React from 'react';
import { cacheExchange } from '@urql/exchange-graphcache';
import { setToken } from './Token';
import { meQuery } from '../Query/Auth';
import { projectsQuery, updateProjectMutation } from '../Query/Projects';

export const cache = cacheExchange({
  updates: {
    Mutation: {
      removeProject: (result, args, cache, info) => { // execute delete project
        cache.invalidate({ __typename: 'Project', id: args.id }); //delete project in cache
      },
      signin: (result, args, cache, info) => {
        if (result.signin) {
          const { accessToken, refreshToken } = result.signin;
          setToken(accessToken, refreshToken);
          cache.updateQuery({ query: meQuery }, () => ({
            me: result.signin.user
          }));
        }
      },
      addUser: (result, args, cache, info) => {
        if (result.addUser) {
          const { accessToken, refreshToken } = result.addUser;
          setToken(accessToken, refreshToken);
          cache.updateQuery({ query: meQuery }, () => ({
            me: result.addUser.user
          }));
        }
      },
      addProject: (result, args, cache, info) => {
        cache.updateQuery({ query: projectsQuery }, (data) => {
          return { ...data, projects: [...data.projects, result.addProject] }
          // if (data) {
          //   const newThread = result.addProject;
          //   const hasThread = data.projects.some(
          //     (x) => x && x.id === newThread.id
          //   );
          //   if (!hasThread) data.projects.unshift(newThread);
          // }
          // return data
        });
      },
      updateProject: (result, args, cache, info) => {
        cache.invalidate({ __typename: 'Project', id: result.updateProject.id });
      }
    },
  },
});