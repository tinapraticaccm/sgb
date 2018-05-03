import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class UserModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      Id: props.user ? props.user.Id : '',
      Nome: props.user ? props.user.Nome : '',
      Sobrenome: props.user ? props.user.Sobrenome : '',
      Email: props.user ? props.user.Email : '',
      CodCPF: props.user ? props.user.CodCPF : '',
      Contato: props.user ? props.user.Contato : '',
      IdUserType: props.user ? props.user.IdUserType : ''
    }
  }
  render () {
    const actions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={this.props.closeModal}
      />,
      <FlatButton
        label="Editar"
        primary={true}
        onClick={() => editUser() } />
    ]

    const editUser = () => { 
      this.props.editUser({
        Id: this.state.Id,
        Nome: this.state.Nome,
        Sobrenome: this.state.Sobrenome,
        CodCPF: this.state.CodCPF,
        Email: this.state.Email,
        Contato: this.state.Contato,
        IdUserType: this.state.IdUserType
      })
    }
  
    return (
      <Dialog
        title="Editar usuário"
        modal={false}
        actions={actions}
        open={this.props.open}
        onRequestClose={this.props.closeModal}
        autoScrollBodyContent={true} >
        <div>
        <TextField 
          id="text-field-default" 
          floatingLabelText="Nome" 
          value={this.state.Nome} 
          onChange={(event) => this.setState({Nome: event.target.value})}
          fullWidth={true} />
        <TextField 
          id="text-field-default"
          floatingLabelText="Sobrenome"
          value={this.state.Sobrenome}
          onChange={(event) => this.setState({Sobrenome: event.target.value})}
          fullWidth={true} />
        <TextField 
          id="text-field-default"
          floatingLabelText="CPF"
          value={this.state.CodCPF}
          onChange={(event) => this.setState({CodCPF: event.target.value})}
          fullWidth={true} />
        <TextField 
          id="text-field-default"
          floatingLabelText="Email"
          value={this.state.Email}
          onChange={(event) => this.setState({Email: event.target.value})}
          fullWidth={true} />
        <TextField 
          id="text-field-default" 
          floatingLabelText="Contato" 
          value={this.state.Contato}
          onChange={(event) => this.setState({Contato: event.target.value})}
          fullWidth={true} />
        <TextField
          id="text-field-default"
          floatingLabelText="Tipo usuário"
          value={this.state.IdUserType}
          onChange={(event) => this.setState({IdUserType: event.target.value})}
          fullWidth={true} />
      </div>
    </Dialog>
    )
  }
}

export default UserModal