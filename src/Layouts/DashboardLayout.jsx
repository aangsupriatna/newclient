import React from 'react';
import {
  CssBaseline,
  Container,
  Box,
  makeStyles
} from '@material-ui/core';
import { Redirect, Route, withRouter } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import { checkAuth } from '../Middleware/Token';
import { grey } from '@material-ui/core/colors';
import { useQuery } from 'urql';
import { meQuery } from '../Query/Auth';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    // background: grey[20]
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
}))
const Layout = ({ children, ...rest }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header handleDrawerOpen={handleDrawerOpen} open={open} />
      <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  )
}

const DashboardLayout = ({ component: Component, ...rest }) => {
  const authed = checkAuth();
  // const [{ data, fetching }, refetch] = useQuery({ query: meQuery });
  // const me = fetching ? "" : data.me
  // console.log(authed);
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Layout><Component {...props} /></Layout>
        : <Redirect to="/signin" />}
    />
  )
}

export default withRouter(DashboardLayout);