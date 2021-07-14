import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";
import PropTypes from 'prop-types';
import { Button, Grid, Paper } from '@material-ui/core';

const useClasses = makeStyles((theme) => ({
  Navigation: {
    fontSize: 15,
    fontWeight: 300,
    color: grey[600],
    // paddingBottom: 15,
    display: "block"
  },
  Title: {
    fontSize: 24,
    fontWeight: 300,
    marginBottom: 20,
    marginTop: 0,
    flex: '1 1 100%',
  },
  Paper: {
    paddingTop: theme.spacing(2)
  },
  clear: {
    clear: "both"
  },
  NavigationGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  Grid: {
    // paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  Button: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const BasePage = (props) => {
  const { title, navigation } = props;
  const classes = useClasses();

  return (
    <React.Fragment>
      {/* <span className={classes.Navigation}>{navigation}</span>
      <div className={classes.Button}>
        <Button>Example</Button>
      </div> */}

      <Grid container spacing={3} className={classes.Grid}>
        <Grid item xs={8} className={classes.NavigationGrid}><span className={classes.Navigation}>{navigation}</span></Grid>
        <Grid item xs={4} className={classes.Button}><Button variant="contained" color="primary">Tambah</Button></Grid>
      </Grid>
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