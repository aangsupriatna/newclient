import React from "react";
import { IconButton, ListItemText, ListItemIcon, Menu, MenuItem, Divider } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/info";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useMutation } from "urql";


const deleteProjectMutation = `
  mutation($id: ID){
    removeProject(id:$id){
          id
      }
  }
`

const MenuActionsTable = ({ row, handleEdit, handleDelete, handleDetails }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [res, executeMutation] = useMutation(deleteProjectMutation);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuEdit = (id, e) => {
    e.preventDefault();
    handleEdit(id, e);
    setAnchorEl(null);
  };

  const handleMenuDelete = (id, e) => {
    e.preventDefault();
    handleDelete(id, e);
    setAnchorEl(null);
  };

  const handleMenuDetails = (id, e) => {
    e.preventDefault();
    handleDetails(id, e);
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
        <MenuItem onClick={(e) => handleMenuEdit(row.id, e)}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={(e) => handleMenuDelete(row.id, e)}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={(e) => handleMenuDetails(row.id, e)}>
          <ListItemIcon>
            <InfoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Details" />
        </MenuItem>
      </Menu>
      <IconButton aria-label="simple-menu" aria-controls="simple-menu" aria-haspopup="true" onClick={handleMenuClick}>
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </>
  );
}

export default MenuActionsTable;