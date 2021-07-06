import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';

const SidebarItem = (props) => {
  const history = useHistory();

  return (
    <ListItem button onClick={() => { history.push(props.path) }}>
      <ListItemIcon>
        {props.children}
      </ListItemIcon>
      <ListItemText primary={props.title} />
    </ListItem>
  )
}

SidebarItem.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default SidebarItem