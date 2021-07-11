import React from 'react';
import { Redirect, Route } from 'react-router-dom';
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
import { checkAuth } from '../Middleware/Token';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(6),
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
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

const SigninLayout = ({ component: Component, ...rest }) => {
  const authed = checkAuth();

  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <SignIn><Component {...props} /></SignIn>
        : <Redirect to="/dashboard" />}
    />
  );
};

export default SigninLayout;