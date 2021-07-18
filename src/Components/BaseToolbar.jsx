import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { grey } from "@material-ui/core/colors";

const useClasses = makeStyles((theme) => ({
  Navigation: {
    fontSize: 15,
    fontWeight: 300,
    color: grey[600],
    display: "block"
  },
  NavigationGrid: {
    display: 'flex',
    alignItems: 'center',
  },
  Grid: {
    paddingBottom: theme.spacing(2),
  },
  Center: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const BaseToolbar = (props) => {
  const { navigation } = props;
  const classes = useClasses();

  return (
    <Grid container spacing={3} className={classes.Grid}>
      <Grid item xs={8} className={classes.NavigationGrid}>
        <span className={classes.Navigation}>
          {navigation}
        </span>
      </Grid>
      <Grid item xs={4} className={classes.Center}>
        {props.children}
      </Grid>
    </Grid>
  )
};

BaseToolbar.propTypes = {
  navigation: PropTypes.string,
  children: PropTypes.object,
};

export default BaseToolbar;