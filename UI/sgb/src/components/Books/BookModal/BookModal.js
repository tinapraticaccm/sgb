import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class BookModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Id: '',
            Titulo: '',
            Autor: ''
        }
    }

    render() {
        const addBook = () => {
            const data = {
                id: this.state.id,
                title: this.state.Titulo,
                body: this.state.Autor
            }
            axios.post('https://jsonplaceholder.typicode.com/posts', data);
        }

        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.props.closeModal} >
            </FlatButton>,

            <FlatButton
                label="Salvar"
                primary={true}
                onClick={() => this.addBook()} >
            </FlatButton>
        ]

        return (
            <Dialog
                title="Adicionar livro"
                modal={false}
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.closeModal}
                autoScrollBodyContent={true} >
                <div>
                    <TextField
                        id="text-field-default"
                        floatingLabelText="Título"
                        value={this.state.Titulo}
                        onChange={(event) => this.setState({Titulo: event.target.value})}
                        fullWidth={true} >
                    </TextField>

                    <TextField
                        id="text-field-default"
                        floatingLabelText="Autor"
                        value={this.state.Autor}
                        onChange={(event) => this.setState({Autor: event.target.value})}
                        fullWidth={true} >
                    </TextField>
                </div>
            </Dialog>
        )
    }
}

export default BookModal;