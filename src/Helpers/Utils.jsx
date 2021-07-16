import React from 'react';

export const trimGQLError = (message) => {
  const firstStr = message.split(' ')[0]
  return message.replace(firstStr, "")
}