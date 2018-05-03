import React, {Component} from 'react';
import http from '../../httpService/httpService';

import CommonTable from '../../common/Tables/CommonTable';
import Modal from '../../common/Modal/EntryModal'


class Libraries extends Component {

  state = {
    libraries: null,
    library: null,
    isModalOpen: false,
    modalAction: null
  }

  componentDidMount = () =>  {
    this.refreshTable();
  }

  refreshTable = () => {
    http.get('library')
    .then(response => {
      this.setState({libraries: response.data})
    });
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
        this.refreshTable()
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

  modalAddConfirmHandler = (library) => {
    console.log(library)
    http.post('library',library)
      .then( response => {
        this.closeModal()
        this.refreshTable()
      })
      .catch(error => {
        console.log(error)
      })
  }

  deleteClickedHandler = (library) => {
    console.log(library)
    http.delete('library/',library)
      .then(
        this.refreshTable()
      )
      .catch(error =>
        console.log(error)
      )
  }

  deleteMultiple = (selectedlibraries) => {
    console.log(selectedlibraries);
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
      modalConfirmAction = this.modalAddConfirmHandler
    }

    let table = null;

    if (this.state.libraries) {
      table = <CommonTable 
            title="Bibliotecas"
            entryName="Bibliteca"
            entryNamePlural="Bibliotecas" 
            data={this.state.libraries}
            headers={{
              Location: 'Localização',
              Name: 'Nome',
              Description: 'Descrição',
            }}
            delete={this.deleteClickedHandler}
            edit={this.editClickedHander}
            add={this.addClickedHandler}
            deleteMultiple={this.deleteMultiple}
            />
    }

    return (
      <div>
        {table}
        <Modal
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
      </div>
    )
  }
}

export default Libraries;