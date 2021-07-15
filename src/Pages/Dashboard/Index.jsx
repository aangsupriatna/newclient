import React from 'react';
import BasePage from '../../Components/BasePage';
import BaseToolbar from '../../Components/BaseToolbar';

const Dashboard = () => {
  return (
    <React.Fragment>
      <BaseToolbar navigation={"Application / Dashboard"} />
      <BasePage>
        <div>Hello dashboard</div>
      </BasePage>
    </React.Fragment>
  )
}

export default Dashboard;