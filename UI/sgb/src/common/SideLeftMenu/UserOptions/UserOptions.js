import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import UserIcon from 'material-ui/svg-icons/social/person';

const UserOptions = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><UserIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
  >
    <MenuItem primaryText="Ver perfil" />
    <MenuItem primaryText="Trocar senha" />
    <MenuItem primaryText="Sair" />
  </IconMenu>
);

export default UserOptions