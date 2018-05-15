import React, {Component} from 'react';
import http from '../../httpService/httpService';

import CommonTable from '../../common/Tables/CommonTable';
import EntryModal from '../../common/Modal/EntryModal'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'


class Libraries extends Component {

  state = {
    libraries: null,
    library: null,
    isModalOpen: false,
    modalAction: null,
    isDeleteConfirmDialogOpen:false,
    dialogAction:null,
    page: 1,
    queryLimit: {
      page: 1,
      limit: 5,
      Order: 'Id',
      Orientation: 'DESC',
    },
    totalLibraries: 0
  }

  componentDidMount = () =>  {
    this.getData();
  }

  getData = () => {
    http.post('library/getLibraries',this.state.queryLimit)
    .then(response => {
      this.setState({libraries: response.data.Result,totalLibraries: response.data.Count})
    });
  }

  changePage = (newPage) => {
    let queryLimit = {...this.state.queryLimit}
    queryLimit.page = newPage
    this.setState({queryLimit: queryLimit}, () => this.getData())
  }

  openModal = () => {
    this.setState({isModalOpen: true})
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      library:null
    })
  }
  
  modalEditConfirmHandler = (library) =>{
    const oldLibraryId = this.state.library.Id
    const editedLibrary = {Id:oldLibraryId,...library}
    this.editLibrary(editedLibrary)

  }

  editClickedHander = (library) => {
    this.setState({
      library: library,
      isModalOpen: true,
      modalAction:"edit"
    })
  }

  editLibrary = (library) => {
    http.put('library', library)
      .then(response => {
        this.closeModal()
        this.getData()
      })
      .catch(error => this.closeModal())
  }

  addClickedHandler = () => {
    this.setState({
      library: null,
      isModalOpen: true,
      modalAction:"add"
    })
  }

  addLibrary = (library) => {
    http.post('library',library)
      .then( response => {
        this.closeModal()
        this.getData()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteLibrary = (library) => {
    http.post('library/delete',library)
      .then( response => {
        this.getData()
        this.closeDeleteConfirmDialog()
      }
      )
      .catch(error =>
        console.log(error)
      )
  }

  deleteMultiple = (selectedlibraries) => {
    selectedlibraries.forEach(library => {
      this.deleteLibrary(library);
    }); 
  }

  closeDeleteConfirmDialog = () => {
    this.setState({
        isDeleteConfirmDialogOpen:false,
        dialogAction:null,
    })
}

deleteClickedHandler = (library) => {
    const deleteFunction = () =>  this.deleteLibrary(library);
    this.setState({
        isDeleteConfirmDialogOpen:true,
        dialogAction: deleteFunction,
    })
}

deleteMultipleClickedHandler = (libraries) => {
    const deleteMultipleFunction = () => this.deleteMultiple(libraries);
    this.setState({
        isDeleteConfirmDialogOpen:true,
        dialogAction:deleteMultipleFunction,
    })
}
  
  render () {

    let modalTitle = ''
    let modalConfirmAction = null
    if(this.state.modalAction === "edit") {
      modalTitle = "Editar Biblioteca"
      modalConfirmAction = this.modalEditConfirmHandler
    }
    else{
      modalTitle = "Adicionar Biblioteca"
      modalConfirmAction = this.addLibrary
    }

    const table = (
      <CommonTable 
        naming ={{ 
          title:"Bibliotecas",
          entryName:"Bibliteca",
          entryNamePlural:"Bibliotecas"
        }} 
        data={this.state.libraries}
        headers={{
          Name: 'Nome',
          Location: 'Localização',
          Description: 'Descrição',
        }}
        delete={this.deleteClickedHandler}
        edit={this.editClickedHander}
        add={this.addClickedHandler}
        deleteMultiple={this.deleteMultipleClickedHandler}
        totalResults={this.state.totalLibraries}
        page={this.state.queryLimit.page}
        changePage={this.changePage}
      />
    );

    const dialogActions = [
      <FlatButton
        label="Cancelar"
        primary={true}
        onClick={() => this.closeDeleteConfirmDialog()}
      />,
      <FlatButton
        label="Confirmar"
        primary={true}
        onClick={() => this.state.dialogAction()}
      />]


    return (
      <div>
        {table}
        <EntryModal
          textEntry={{
            Name: 'Nome',
            Location: 'Localização',
            Description: 'Descrição',
          }}
          confirmAction={modalConfirmAction}
          defaultValues = {this.state.library}
          open={this.state.isModalOpen}
          cancelAction={this.closeModal}
          title={modalTitle}
        />
        <Dialog
          title="Confirmar exclusão?"
          actions={dialogActions}
          modal={false}
          open={this.state.isDeleteConfirmDialogOpen}
          onRequestClose={this.handleClose}
        />
      </div>
    )
  }
}

export default Libraries;