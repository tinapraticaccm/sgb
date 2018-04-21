import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import UserOptions from './UserOptions/UserOptions'
import {Link} from 'react-router-dom';

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
          <MenuItem onClick={this.closeMenu}><Link to="/usuarios">Usuários</Link></MenuItem>
          <MenuItem onClick={this.closeMenu}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }
}

export default SideLeftMenu;
