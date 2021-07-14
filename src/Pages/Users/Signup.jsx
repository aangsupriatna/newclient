import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Paper,
  Collapse,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useMutation } from 'urql';
import { SIGNUP_MUTATION } from '../../Query/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  collapse: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  }
}));

const Signup = (props) => {
  const classes = useStyles();

  const [signupdata, signup] = useMutation(SIGNUP_MUTATION);
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState({
    severity: 'error',
    value: '',
  });
  const [state, setState] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    signup({
      username: state.username,
      email: state.email,
      password: state.password
    }).then(result => {
      console.log(result)
      if (result.error) {
        setError(true);
        setMessage({
          severity: 'error',
          value: result.error.message,
        });
      } else {
        setState({
          username: '',
          email: '',
          password: ''
        });
        setError(false);
        setMessage({
          severity: 'success',
          value: 'User added success',
        });
      }
    });
  }

  const handleLink = (event) => {
    event.preventDefault();
    props.history.replace("/signin")
  }
  return (
    <Paper className={classes.root}>
      <Typography component="h1" variant="h4">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Collapse in={error} className={classes.collapse}>
          <Alert severity={message.severity} onClose={() => { setError(false) }}>{message.value}</Alert>
        </Collapse>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              value={state.username}
              error={error}
              variant="outlined"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              value={state.email}
              error={error}
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handleChange}
              value={state.password}
              error={error}
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justifycontent="flex-end">
          <Grid item>
            <Link href="/signin" variant="body2" onClick={handleLink}>
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default Signup;