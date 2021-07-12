import React from 'react';
import { Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Avatar,
  CssBaseline,
  Link,
  Box,
  Typography,
} from '@material-ui/core';
import {
  LockOutlined
} from '@material-ui/icons';
import Footer from '../Components/Footer';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  box: {
    marginTop: theme.spacing(6),
  },
}));

const SignIn = ({ children, ...rest }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined fontSize="large" />
        </Avatar>
        {children}
      </div>
      <Box mt={8} className={classes.box}>
        <Footer />
      </Box>
    </Container>
  );
}

const SigninLayout = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={(props) => <SignIn><Component {...props} /></SignIn>}
    />
  );
};

export default SigninLayout;