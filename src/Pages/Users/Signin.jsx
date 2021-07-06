import React from 'react';
import { useQuery, useMutation, gql } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signin = () => {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const UserQuery = gql`
    query {
      isSignin
    }
  `
  const [result] = useQuery({ query: UserQuery })
  if (!result.fetching) {
    console.log(result.data);
    // if (result.data.isSignin === true) history.push("/dashboard")
  }

  // SIGNIN
  const [data, signin] = useMutation(`
    mutation($email: String!, $password: String!) {
      signin(input:{email: $email, password: $password})
    }
  `);

  const handleSubmit = (e) => {
    e.preventDefault(); // no page reload due to submit
    signin({ email, password }).then(({ data }) => {
      if (data.signin) {
        localStorage.setItem("token", data.signin);
      }
    })
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
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
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
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
          control={<Checkbox value="remember" color="primary" />}
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
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  )
}

export default Signin;