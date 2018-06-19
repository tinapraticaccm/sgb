import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class BookModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: props.book ? props.book.Id: '',
            Titulo: props.book ? props.book.Titulo: '',
            Autor: props.book ? props.book.Autor: '',
            Editora: props.book ? props.book.Editora: ''
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.props.closeModal} >
            </FlatButton>,
            <FlatButton
                label="Salvar"
                primary={true}
                onClick={() => addBook()} >
            </FlatButton>
        ]

        const addBook = () => {
            this.props.editBook({
                Id: this.state.Id,
                Titulo: this.state.Nome,
                Autor: this.state.Autor,
                Editora: this.state.Editora
            })
        }

        return (
            <Dialog
                title="Editar livro"
                modal={false}
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.closeModal}
                autoScrollBodyContent={true}>

                <div>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Título"
                        value={this.state.Titulo}
                        onChange={(event) => this.setState({Titulo: event.target.value})}
                        fullWidth={true}>
                    </TextField>

                    <TextField
                        id="text-field-default"
                        floatingLabelText="Autor"
                        value={this.state.Autor}
                        onChange={(event) => this.setState({Autor: event.target.value})}
                        fullWidth={true}>
                    </TextField>

                    <TextField
                        id="text-field-default"
                        floatingLabelText="Editora"
                        value={this.state.Editora}
                        onChange={(event) => this.setState({Editora: event.target.value})}
                        fullWidth={true}>
                    </TextField>
                </div>
            </Dialog>
        )
    }
}

export default BookModal;