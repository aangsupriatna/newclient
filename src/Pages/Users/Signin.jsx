import React from 'react';
import { useQuery, useMutation, gql, } from 'urql';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
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

  let isAuthenticated = false;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isErrorInput, setIsErrorInput] = React.useState(null);
  const [remember, setRemember] = React.useState(true);
  const [date, setDate] = React.useState(new Date());

  const UserQuery = gql`
  query {
      isSignin
    }
  `
  // const [result] = useQuery({ query: UserQuery })
  // const { fetching, data } = result
  // if (!fetching) {
  //   if (data) {
  //     isAuthenticated = data.isSignin
  //   }
  // }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, []);

  // SIGNIN
  const [signdata, signin] = useMutation(`
    mutation($email: String!, $password: String!) {
      signin(input:{email: $email, password: $password}){
        accessToken
        refreshToken
      }
    }
  `);

  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ email, password }).then(({ data }) => {
      // console.log(data.signin)
      if (!data.signin) return setIsErrorInput(true)
      if (data.signin.accessToken !== null && data.signin.refreshToken !== null) {
        Cookies.set("accessToken", data.signin.accessToken);
        Cookies.set("refreshToken", data.signin.refreshToken);
        if (remember) {
          Cookies.set("rememberMe", true)
        } else {
          Cookies.remove("rememberMe")
        }
        props.history.replace("/dashboard");
      } {
        setIsErrorInput(true)
      }
    });
  }

  const handleEmail = (event) => {
    setIsErrorInput(false);
    setEmail(event.target.value);
  }
  const handlePassword = (event) => {
    setIsErrorInput(false);
    setPassword(event.target.value);
  }
  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };
  const handleLink = (event) => {
    event.preventDefault();
    props.history.replace("/signup")
  }

  // if (isAuthenticated) return <Redirect to="/dashboard" />
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            error={isErrorInput}
            value={email}
            onChange={handleEmail}
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
            error={isErrorInput}
            value={password}
            onChange={handlePassword}
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