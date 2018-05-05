import React, { Component } from 'react';
import SideLeftMenu from './common/SideLeftMenu/SideLeftMenu'
import {Route, Switch} from 'react-router-dom';
import Users from './components/Users/Users'
import classes from './App.css'
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import ConfigIcon from 'material-ui/svg-icons/action/build';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>        

        <SideLeftMenu />

        <div className="container">
          <div class="row">
            <div class="col">
              <Card>
                <CardTitle>
                  Configurações  
                </CardTitle>
                <CardText>
                  <ConfigIcon/>
                </CardText>
              </Card>
            </div>
            <div class="col">
              <Card>
                <CardTitle>Controle de Estoque</CardTitle>
              </Card>
            </div>
            <div class="col">
              <Card>
                <CardTitle>Análise Preditiva</CardTitle>
              </Card>
            </div>
          </div>
        </div>

        <Switch>
          <Route path="/usuarios" component={Users} />
        </Switch>
      </div>
    );
  }
}

export default App;
