import React from 'react';
import BasePage from '../../Components/BasePage';
import ProjectTable from './Table';

const Projects = () => {
  return (
    <BasePage navigation={"Application / Projects"}>
      <ProjectTable />
    </BasePage>
  )
}

export default Projects;