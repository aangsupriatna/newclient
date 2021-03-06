import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import NotificationsIcon from '@material-ui/icons/Notifications'
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import Search from './Search';
import { withRouter } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { delToken } from '../Middleware/Token';
import { useQuery } from 'urql';
import { meQuery } from '../Query/Auth';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: theme.drawer.width,
    width: `calc(100% - ${theme.drawer.width}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  small: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  rootList: {
    width: theme.spacing(20),
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nestedList: {
    paddingLeft: theme.spacing(4),
  },
}));

function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopup = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopupClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    delToken()
    props.history.push("/signin");
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [{ data, fetching }, refetch] = useQuery({ query: meQuery });

  return (
    <AppBar position="absolute" className={clsx(classes.appBar, (props.open) && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          className={clsx(classes.menuButton, (props.open) && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Search />
        <div className={classes.title}></div>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton aria-describedby={id} color="inherit" onClick={handlePopup} aria-controls="simple-menu" aria-haspopup="true">
          <Avatar className={classes.small}>{fetching ? "AS" : (data.me.username).slice(0, 2).toUpperCase()}</Avatar>
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopupClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List
            component="nav"
            subheader={
              <ListSubheader component="div"> Personalisasi</ListSubheader>
            }
            className={classes.rootList}
            dense
          >
            <ListItem button>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PersonRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
          <Divider />
          <List
            component="nav"
            className={classes.rootList}
            dense
          >
            <ListItem button onClick={handleSignOut}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Popover>
      </Toolbar>
    </AppBar>
  )
};

Header.propTypes = {
  handleDrawerOpen: PropTypes.func,
  open: PropTypes.bool
}

export default withRouter(Header);