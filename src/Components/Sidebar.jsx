import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';
import { withRouter } from "react-router-dom";
import {
  IconButton,
  Drawer,
  Divider,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
  Dashboard,
  ChevronLeft,
  Ballot,
  Fingerprint,
  PersonAdd,
  Person,
  People,
} from '@material-ui/icons';
import SidebarItem from './SidebarItem';
import Logo from './Logo';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: theme.drawer.width,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7),
    },
  },
  title: {
    flexGrow: 1,
  },
  centerMiddle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, (!props.open) && classes.drawerPaperClose),
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <span className={classes.centerMiddle}><Logo /></span>
        {/* <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>KONSULTAN 4.0</Typography> */}
        {/* <Logo /> */}
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeft />
        </IconButton>
      </div>

      <Divider />

      <SidebarItem path="/dashboard" title={'Dashboard'}>
        <Dashboard />
      </SidebarItem>
      <SidebarItem path="/projects" title={'Projects'}>
        <Ballot />
      </SidebarItem>
      <SidebarItem path="/experts" title={'Experts'}>
        <People />
      </SidebarItem>
      <SidebarItem path="/users" title={'Users'}>
        <Person />
      </SidebarItem>

      <Divider />

      <SidebarItem path="/signin" title={'Signin'}>
        <Fingerprint />
      </SidebarItem>
      <SidebarItem path="/signup" title={'Signup'}>
        <PersonAdd />
      </SidebarItem>
    </Drawer>
  )
};

Sidebar.propTypes = {
  handleDrawerClose: PropTypes.func,
  open: PropTypes.bool
}

export default withRouter(Sidebar);