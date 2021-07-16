import React from "react";
import { IconButton, ListItemText, ListItemIcon, Menu, MenuItem } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles({
  
})

const MenuActionsTable = ({ row, handleEdit, handleDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id={`actions-${row.id}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={2}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={(e) => handleEdit(row.id, e)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={(e) => handleDelete(row.id, e)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>
      <IconButton aria-label="simple-menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
        <MoreVert fontSize="small" />
      </IconButton>
    </>
  );
}

export default MenuActionsTable;