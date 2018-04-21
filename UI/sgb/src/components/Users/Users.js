import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {Card, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import http from '../../httpService/httpService'
import classes from './Users.css'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import EditButton from 'material-ui/svg-icons/content/create';
import UserModal from './UserModal/UserModal'
import {orange500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class Users extends Component {

  state = {
    users: null,
    user: null,
    isModalOpen: false
  }

  componentDidMount () {
    http.get('user')
      .then(response => {
        this.setState({users: response.data})
      })
  }

  refreshTable () {
    http.get('user')
    .then(response => {
      this.setState({users: response.data})
    })
  }

  openUserModal (user) {
    this.setState({user: user})
    this.setState({isModalOpen: true})
  }

  closeModal () {
    this.setState({isModalOpen: false})
  }

  editUser (user) {
    http.put('user', user)
      .then(response => {
        this.closeModal()
        this.refreshTable()
      })
      .catch(error => this.closeModal())
  }

  addUser () {
    this.setState({user: null})
    this.setState({isModalOpen: true})
  }
  
  render () {
    
    const modal = this.state.isModalOpen ?
    (
      <UserModal
      user={{...this.state.user}}
      open={this.state.isModalOpen} 
      closeModal={() => this.closeModal()}
      editUser={(user) => this.editUser(user)} />
    ) : null

    let table = null
    if (this.state.users) {
      table = this.state.users.map(user => {
        return (
          <TableRow key={user.Id}>
            <TableRowColumn>{user.Nome}</TableRowColumn>
            <TableRowColumn>{user.Sobrenome}</TableRowColumn>
            <TableRowColumn>{user.CodCPF}</TableRowColumn>
            <TableRowColumn>{user.Contato}</TableRowColumn>
            <TableRowColumn>{user.IdUserType}</TableRowColumn>
            <TableRowColumn>
              <IconButton tooltip="SVG Icon" onClick={() => this.openUserModal(user)}>
                <EditButton color={orange500} />
              </IconButton>
            </TableRowColumn>
          </TableRow>
        )
      })
    }

    return (
      <div>
        <Card className={classes.UsersCard}>
          <CardTitle title="Usuários" className={classes.UsersCardTitle} titleStyle={{color: 'white'}}/>
          <div className={classes.addUser}>
            <RaisedButton label="Adicionar Usuário" primary={true} onClick={() => this.addUser()} />
          </div>
          <Divider />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>Nome</TableHeaderColumn>
                <TableHeaderColumn>Sobrenome</TableHeaderColumn>
                <TableHeaderColumn>CPF</TableHeaderColumn>
                <TableHeaderColumn>Contato</TableHeaderColumn>
                <TableHeaderColumn>Tipo Usuário</TableHeaderColumn>
                <TableRowColumn>Ações</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {table}
            </TableBody>
          </Table>
        </Card>
        {modal}
      </div>
    )
  }
}

export default Users;