import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from "@material-ui/core/colors";
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';

const useClasses = makeStyles((theme) => ({
  Navigation: {
    fontSize: 15,
    fontWeight: 300,
    color: grey[600],
    paddingBottom: 15,
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
}));

const BasePage = (props) => {
  const { title, navigation } = props;
  const classes = useClasses();

  return (
    <React.Fragment>
      <span className={classes.Navigation}>{navigation}</span>
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