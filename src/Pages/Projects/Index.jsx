import { Button, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import BasePage from '../../Components/BasePage';
import BaseToolbar from '../../Components/BaseToolbar';
import ProjectTable from './Table';

const useClasses = makeStyles((theme) => ({
  Link: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(2),
  },
}));

const Projects = (props) => {
  const classes = useClasses();
  const handleClick = (e) => {
    alert('Hello from projects');
  }
  return (
    <React.Fragment>
      <BaseToolbar navigation={"Application / Projects"}>
        <Typography className={classes.Link}>
          <Link href="#" color='default' onClick={handleClick}>Hapus</Link>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleClick}>Tambah</Button>
      </BaseToolbar>
      <BasePage>
        <ProjectTable />
      </BasePage>
    </React.Fragment>
  )
}

export default Projects;