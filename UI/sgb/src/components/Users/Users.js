import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import http from '../../httpService/httpService'
import classes from './Users.css'
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import EditButton from 'material-ui/svg-icons/content/create';
import DeleteButton from 'material-ui/svg-icons/action/delete';
import UserModal from './UserModal/UserModal'
import { orange500, red500, blue500 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Pagination from '../../common/Pagination/Pagination'
import Spinner from '../../common/Spinner/Spinner'

class Users extends Component {

  state = {
    users: null,
    user: null,
    isModalOpen: false,
    openDeleteConfirmDialog: false,
    userDelete: null,
    page: 1,
    queryLimit: {
      page: 1,
      limit: 5,
      Order: 'Id',
      Orientation: 'DESC'
    },
    totalUsers: 0,
    loading: true
  }

  componentDidMount () {
    this.getUsers();
  }

  getUsers () {
    this.setState({loading: true})
    http.post('user/getUsers', this.state.queryLimit)
      .then(response => {
        this.setState({
          totalUsers: response.data.Count,
          users: response.data.Result,
          loading: false
        })
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

  openDeleteConfirmDialog (user) {
    this.setState({userDelete: {...user}})
    this.setState({openDeleteConfirmDialog: true})
  }

  closeDeleteConfirmDialog () {
    this.setState({userDelete: null})
    this.setState({openDeleteConfirmDialog: false})
  }

  deleteUser () {
    http.post('user/delete', this.state.userDelete)
      .then(response => {
        this.closeDeleteConfirmDialog()
        this.refreshTable()
      })
      .catch(error => this.closeDeleteConfirmDialog())
  }

  changePage (newPage) {
    let queryLimit = {...this.state.queryLimit}
    queryLimit.page = newPage
    this.setState({queryLimit: queryLimit}, () => this.getUsers())
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

    const dialogActions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={() => this.closeDeleteConfirmDialog()}
      />,
      <FlatButton
        label="Confirmar"
        primary={true}
        onClick={() => this.deleteUser()}
      />,
    ];

    let table = <Spinner />
    if (this.state.users && !this.state.loading) {
      table = this.state.users.map(user => {
        return (
          <TableRow key={user.Id}>
            <TableRowColumn>{user.Nome}</TableRowColumn>
            <TableRowColumn>{user.Sobrenome}</TableRowColumn>
            <TableRowColumn>{user.CodCPF}</TableRowColumn>
            <TableRowColumn>{user.Contato}</TableRowColumn>
            <TableRowColumn>{user.UserType.Type}</TableRowColumn>
            <TableRowColumn>
              <IconButton tooltip="SVG Icon" onClick={() => this.openUserModal(user)}>
                <EditButton color={orange500} />
              </IconButton>
              <IconButton tooltip="SVG Icon" onClick={() => this.openDeleteConfirmDialog(user)}>
                <DeleteButton color={red500} />
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
            <TableFooter>
              <Pagination 
                totalResults={this.state.totalUsers} 
                page={this.state.queryLimit.page}
                changePage={(page) => this.changePage(page)}
                minPageShowed="1" />
            </TableFooter>
          </Table>
        </Card>

        {modal}

        <Dialog
          title="Confirmar exclusão?"
          actions={dialogActions}
          modal={false}
          open={this.state.openDeleteConfirmDialog}
          onRequestClose={this.handleClose}
        />

      </div>
    )
  }
}

export default Users;