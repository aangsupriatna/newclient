import { Box, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { withRouter } from 'react-router';
import BaseToolbar from '../../Components/BaseToolbar';

const useClasses = makeStyles((theme) => ({
  Title: {
    flex: '1 1 100%',
    fontSize: 24,
    fontWeight: 300,
  },
}));

const Dashboard = (props) => {
  const classes = useClasses();
  return (
    <React.Fragment>
      <BaseToolbar navigation={"Application / Dashboard"} />
      <Paper>
        <Box>
          <Box px={2} py={2}>
            <Typography className={classes.Title} color="inherit" variant="h6" component="div">Dashboard</Typography>
          </Box>
          <Divider />
          <p>Hello dashboard</p>
        </Box>
      </Paper>
    </React.Fragment>
  )
}

export default withRouter(Dashboard);