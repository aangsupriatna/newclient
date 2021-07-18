import React from 'react';
import {
  Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import SigninLayout from './Layouts/SigninLayout';
import DashboardLayout from './Layouts/DashboardLayout';
import Dashboard from './Pages/Dashboard';
import Projects from './Pages/Projects';
import Users from './Pages/Users';
import Experts from './Pages/Experts';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './Theme';
import ProjectForm from './Pages/Projects/ProjectForm';
import SigninForm from './Pages/Users/SigninForm';
import SignupForm from './Pages/Users/SignupForm';

const App = (props) => {
  const history = useHistory();

  return (
    <ThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/"><Redirect to="/dashboard" /></Route>
          <DashboardLayout exact path="/dashboard" component={Dashboard} />
          <DashboardLayout exact path="/projects" component={Projects} />
          <DashboardLayout exact path="/projects/forms" component={ProjectForm} />
          <DashboardLayout exact path="/experts" component={Experts} />
          <DashboardLayout exact path="/employee" component={Experts} />
          <DashboardLayout exact path="/users" component={Users} />
          <SigninLayout exact path="/signin" component={SigninForm} />
          <SigninLayout exact path="/signup" component={SignupForm} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
};

export default App
