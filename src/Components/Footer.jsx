import React from 'react';
import {
  Typography,
  Link
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const Footer = (props) => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default withRouter(Footer);