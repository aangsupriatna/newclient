import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, makeStyles, TextField, Typography, Paper, Grid, Link, FormControlLabel, Checkbox, Collapse } from '@material-ui/core';
import { withRouter } from 'react-router';
import { useMutation } from 'urql';
import Alert from '@material-ui/lab/Alert';
import { setToken } from '../../Middleware/Token';
import { trimGQLError } from '../../Helpers/Utils';

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

const signinMutation = `
  mutation($email: String!, $password: String!, $expire: Boolean) {
    signin(input:{email: $email, password: $password, expire: $expire}){
      accessToken
      refreshToken
    }
  }
`

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const SigninForm = (props) => {
  const classes = useStyles();

  const [remember, setRemember] = React.useState(false);
  const [res, executeMutation] = useMutation(signinMutation)

  const handleRemember = (event) => {
    setRemember(event.target.checked);
  };

  const handleLink = (event) => {
    event.preventDefault();
    props.history.push("/signup")
  }

  const formik = useFormik({
    initialValues: {
      email: "john@email.com",
      password: "topsecret",
    },
    validationSchema: validationSchema,
    onSubmit: (value, { setSubmitting, setErrors, setStatus, resetForm }) => {
      executeMutation({
        email: value.email, password: value.password, expire: remember,
      }).then(result => {
        if (result.error) {
          const errorMessage = trimGQLError(result.error.message);
          setErrors({ email: errorMessage });
        } else {
          setToken(result.data.signin.accessToken, result.data.signin.refreshToken);
          props.history.push("/dashboard");
        }
      });
    }
  });
  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Typography component="h1" variant="h4">Sign in</Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            margin="normal"
            autoComplete="email"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            margin="normal"
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={remember} onChange={handleRemember} />}
            label="Remember me"
          />
          <Button className={classes.submit} fullWidth color='primary' variant='contained' type='submit'>Submit</Button>
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

export default withRouter(SigninForm);