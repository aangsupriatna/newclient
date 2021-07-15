
import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  logo: {
    maxWidth: 130,
    maxHeight: 60,
  }
}));

const Logo = (props) => {
  const classes = useStyles();
  return (
    <img
      className={classes.logo}
      alt="Logo"
      src="/static/logo_mak.svg"
      {...props}
    />

  )
}

export default Logo;
