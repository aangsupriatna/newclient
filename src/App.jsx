import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory
} from 'react-router-dom';
import SigninLayout from './Layouts/Signin';
import DashboardLayout from './Layouts/Dashboard';
import Dashboard from './Pages/Dashboard';
import Projects from './Pages/Projects';
import Users from './Pages/Users';
import Signin from './Pages/Users/Signin';
import Signup from './Pages/Users/Signup';

const App = () => {
  const history = useHistory();
  return (
    <Router>
      <Switch>
        <Route exact path="/"><Redirect to="/dashboard" /></Route>
        <DashboardLayout exact path="/dashboard" component={Dashboard} />
        <DashboardLayout exact path="/projects" component={Projects} />
        <DashboardLayout exact path="/users" component={Users} />
        <SigninLayout exact path="/signin" component={Signin} />
        <SigninLayout exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  )
};

export default App
