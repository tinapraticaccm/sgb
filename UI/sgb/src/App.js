import React, { Component } from 'react';
import SideLeftMenu from './common/SideLeftMenu/SideLeftMenu'
import {Route, Switch} from 'react-router-dom';
import Users from './components/Users/Users'
import classes from './App.css'

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <SideLeftMenu />
                
        <Switch>
          <Route path="/usuarios" component={Users} />
        </Switch>
      </div>
    );
  }
}

export default App;
