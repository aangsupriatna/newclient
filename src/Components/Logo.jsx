
import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 120,
  }
}));

const Logo = (props) => {
  const classes = useStyles();
  return (
    <img
      className={classes.logo}
      alt="Logo"
      src="/static/google.svg"
      {...props}
    />

  )
}

export default Logo;
