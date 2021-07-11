import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

const SidebarItem = (props) => {
  const isActive = props.history.location.pathname === props.path;
  const selected = isActive ? true : false;

  const handleListItem = () => {
    props.history.push({
      pathname: props.path
    });
  }

  return (
    <ListItem selected={selected} button onClick={handleListItem} path={props.path}>
      <ListItemIcon>
        {props.children}
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  )
}

SidebarItem.propTypes = {
  path: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default withRouter(SidebarItem)