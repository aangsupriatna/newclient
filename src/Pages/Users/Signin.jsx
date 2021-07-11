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
} from '@material-ui/core';
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

  const [state, setState] = React.useState({
    email: '',
    password: '',
  })
  const [error, setError] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

  const [signdata, signin] = useMutation(SIGNIN_MUTATION);

  function handleSubmit(e) {
    e.preventDefault();

    signin({
      email: state.email,
      password: state.password
    }).then(({ data }) => {
      if (!data.signin) return setError(true);
      if (data.signin.accessToken !== null && data.signin.refreshToken !== null) {
        setToken(data.signin.accessToken, data.signin.refreshToken);
        props.history.replace("/dashboard");
      } {
        setError(true)
      }
    })
  };

  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }));
    setError(false);
  };

  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };

  const handleLink = (event) => {
    event.preventDefault();
    props.history.replace("/signup")
  }

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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