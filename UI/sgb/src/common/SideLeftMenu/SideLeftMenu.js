import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import UserOptions from './UserOptions/UserOptions'
import {Link} from 'react-router-dom';
import classes from './SideLeftMenu.css'

class SideLeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {openSideLeftMenu: false};
  }

  openMenu = () => this.setState({openSideLeftMenu: !this.state.openSideLeftMenu});

  closeMenu = () => this.setState({openSideLeftMenu: false});

  render() {
    return (
      <div>
        <AppBar
          title="Sistema Gestão de Bibliotecas"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.openMenu}
          iconElementRight={<UserOptions /> } />
        <Drawer
          docked={false}
          width={200}
          open={this.state.openSideLeftMenu}
          onRequestChange={(open) => this.setState({openSideLeftMenu: open})}
        >
          <Link to="/">
            <MenuItem onClick={this.closeMenu} className={classes.link}>Home</MenuItem>
          </Link>
          <Link to="/usuarios">  
            <MenuItem onClick={this.closeMenu}>Usuários</MenuItem>
          </Link>
          <Link to="/bibliotecas">
            <MenuItem onClick={this.closeMenu}>Bibliotecas</MenuItem>
          </Link>
        </Drawer>
      </div>
    );
  }
}

export default SideLeftMenu;
