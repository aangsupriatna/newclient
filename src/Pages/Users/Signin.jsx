import React from 'react';
import { useMutation } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
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
import { SIGNIN_MUTATION } from '../../Query/Auth';
import { setToken } from '../../Middleware/Token';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = (props) => {
  const classes = useStyles();

  // Input State
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  // Error State
  const [error, setError] = React.useState(false);
  const [message, setMessage] = React.useState({
    severity: 'error',
    value: '',
  });

  // Rember Me State
  const [remember, setRemember] = React.useState(false);

  // Signin mutation
  const [signdata, signin] = useMutation(SIGNIN_MUTATION);

  // Submit forms
  function handleSubmit(e) {
    e.preventDefault();
    signin({
      email: state.email,
      password: state.password,
      expire: remember,
    }).then(result => {
      if (result.error) {
        setError(true);
        setMessage({
          severity: 'error',
          value: result.error.message,
        });
      } else {
        setToken(result.data.signin.accessToken, result.data.signin.refreshToken);
        setError(false);
        props.history.replace("/dashboard");
      }
    })
  };

  // Handle input change
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(false);
  };

  // Handle remember me input
  const handleRemember = (event) => {
    setRemember(event.target.checked);
    console.log(remember)
  };

  // Handle signup link
  const handleLink = (event) => {
    event.preventDefault();
    props.history.replace("/signup")
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h4">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Collapse in={error}>
            <Alert severity={message.severity} onClose={() => { setError(false) }}>{message.value}</Alert>
          </Collapse>
          <TextField
            error={error}
            value={state.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            error={error}
            value={state.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={remember} onChange={handleRemember} />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2" onClick={handleLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Signin);