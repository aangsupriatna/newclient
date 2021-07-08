import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

const SidebarItem = (props) => {
  const handleListItem = () => {
    props.history.push(props.path);
  }

  return (
    <ListItem button onClick={handleListItem} path={props.path}>
      <ListItemIcon>
        {props.children}
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  )
}

SidebarItem.propTypes = {
  path: PropTypes.string,
  handle: PropTypes.func,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default withRouter(SidebarItem)