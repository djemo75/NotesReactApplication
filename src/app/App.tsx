import React, { useContext } from 'react';
import Login from 'pages/Login';
import { Switch, Route } from 'react-router-dom';
import Register from 'pages/Register';
import Users from 'pages/Users';
import UserProfile from 'pages/UserProfile';
import { AuthContext } from 'components/context/authContext';
import Tasks from 'pages/Tasks';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Switch>
      {!user ? (
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </>
      ) : (
        <>
          <Route exact path="/" component={Tasks} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/:id" component={UserProfile} />
        </>
      )}
    </Switch>
  );
}

export default App;
