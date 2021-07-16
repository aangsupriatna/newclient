import { Button, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import BaseToolbar from '../../Components/BaseToolbar';

const useStyles = makeStyles((theme) => ({
  Link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
}));

const ProjectForm = (props) => {
  const classes = useStyles();
  const handleClick = () => {
    props.history.push("/projects")
  }
  return (
    <React.Fragment>
      <BaseToolbar navigation='Application / Projects / Forms' >
        <Typography className={classes.Link}>
          <Link href="#" color='primary' onClick={handleClick}>Cancel</Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>Save</Button>
      </BaseToolbar>
    </React.Fragment>
  )
};

export default withRouter(ProjectForm);