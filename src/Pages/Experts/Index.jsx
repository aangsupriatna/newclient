import React from 'react';
import BasePage from '../../Components/BasePage';
import BaseToolbar from '../../Components/BaseToolbar';

const Experts = () => {
  return (
    <React.Fragment>
      <BaseToolbar navigation={"Application / Experts"} />
      <BasePage>
        <div>Hello experts</div>
      </BasePage>
    </React.Fragment>
  )
}

export default Experts;