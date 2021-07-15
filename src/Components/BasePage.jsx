import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Button, Grid, Paper } from '@material-ui/core';

const useClasses = makeStyles((theme) => ({
  Paper: {
    paddingTop: theme.spacing(2)
  },
  clear: {
    clear: "both"
  },
}));

const BasePage = (props) => {
  const classes = useClasses();

  return (
    <React.Fragment>
      {/* <span className={classes.Navigation}>{navigation}</span>
      <div className={classes.Button}>
        <Button>Example</Button>
      </div> */}

      {/* <Grid container spacing={3} className={classes.Grid}>
        <Grid item xs={8} className={classes.NavigationGrid}><span className={classes.Navigation}>{navigation}</span></Grid>
        <Grid item xs={4} className={classes.Button}><Button variant="contained" color="primary">Tambah</Button></Grid>
      </Grid> */}
      <Paper className={classes.Paper}>
        {props.children}
        <div className={classes.clear} />
      </Paper>
    </React.Fragment>
  )
}

BasePage.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
};
export default BasePage