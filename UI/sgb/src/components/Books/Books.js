import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TablePagination, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import { CardTitle } from 'material-ui/Card';
import classes from './Books.css';
import IconButton from 'material-ui/IconButton';
import EditButton from 'material-ui/svg-icons/content/create';
import DeleteButton from 'material-ui/svg-icons/action/delete';
import BookModal from './BookModal/BookModal'
import {orange500, red500} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { Paper } from 'material-ui';

class Books extends Component {
    state = {
        books: null,
        book: null,
        isModalOpen: false,
        openDeleteConfirmDialog: false,
        bookDelete: null,
        page: 1,
        queryLimit: {
            page: 1,
            limit: 5,
            Order: 'Id',
            Orientation: 'DESC'
        },
        totalBooks: 0
    }

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        axios.get('http://localhost:54512/api/book', this.state.queryLimit).then(response => {
            this.setState({books: response.data})
            const totalBooks = this.state.books.length
            this.setState({totalBooks: totalBooks})
        });
    }

    refreshTable() {
        this.getBooks()
    }

    openBookmodal(book) {
        this.setState({book: book})
        this.setState({isModalOpen: true})
    }

    closeModal() {
        this.setState({isModalOpen: false})
    }

    openDeleteConfirmDialog(book) {
        this.setState({bookDelete: {...book}})
        this.setState({openDeleteConfirmDialog: true})
    }

    closeDeleteConfirmDialog() {
        this.setState({bookDelete: null})
        this.setState({openDeleteConfirmDialog: false})
    }

    changePage(newPage) {
        let queryLimit = {...this.state.queryLimit}
        queryLimit.page = newPage
        this.setState({queryLimit: queryLimit}, () => this.getBooks)
    }

    addBook() {
        this.setState({book: null})
        this.setState({isModalOpen: true})
    }

    editBook(book) {
        axios.put('http://localhost:54512/api/book', book).then(response => {
            this.closeModal()
            this.refreshTable()
        }).catch(error => this.closeModal())
    }

    deleteBook () {
        console.log(this.state.bookDelete)
        axios.delete('http://localhost:54512/api/book', this.state.bookDelete).then(response => {
            this.closeDeleteConfirmDialog()
            this.refreshTable()
        }).catch(error => this.closeDeleteConfirmDialog())
    }

    render() {
        const modal = this.state.isModalOpen ?
        (
            <BookModal
                book={{...this.state.book}}
                open={this.state.isModalOpen}
                closeModal={() => this.closeModal()}
                editBook={(book) => this.editBook(book)}>
            </BookModal>
        ) : null

        const dialogActions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={() => this.closeDeleteConfirmDialog()} >
            </FlatButton>,

            <FlatButton
                label="Sim"
                primary={true}
                onClick={() => this.deleteBook()} >
            </FlatButton>
        ]


        let table = null;
        if (this.state.books) {
            table = this.state.books.map(book => {
                return (
                    <TableRow key={book.Id}>
                        <TableRowColumn>{book.Titulo}</TableRowColumn>
                        <TableRowColumn>{book.Autor}</TableRowColumn>
                        <TableRowColumn>{book.Editora}</TableRowColumn>
                        <TableRowColumn>{book.Edicao}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton tooltip="SVG Icon" onClick={() => {this.setState({book: book}); this.setState({isModalOpen: true})}}>
                                <EditButton color={orange500} />
                            </IconButton>

                            <IconButton tooltip="SVG Icon" onClick={() => {this.setState({bookDelete: book}); this.setState({openDeleteConfirmDialog: true})}}>
                                <DeleteButton color={red500} />
                            </IconButton>

                        </TableRowColumn>
                    </TableRow>
                )
            })
        }
        return (
            <div>
                <Paper className={classes.BooksPaper}>
                    <CardTitle title="Livros" className={classes.BooksCardTitle} titleStyle={{color: 'white'}} />
                    <div className={classes.addBook}>
                        <RaisedButton label="Adicionar livro" primary={true} onClick={() => this.addBook()} />
                    </div>
                    <Divider />
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Título</TableHeaderColumn>
                                <TableHeaderColumn>Autor</TableHeaderColumn>
                                <TableHeaderColumn>Editora</TableHeaderColumn>
                                <TableHeaderColumn>Edição</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {table}
                        </TableBody>
                    </Table>
                </Paper>
                {modal}
                <Dialog
                    title="Confirmar exclusão?"
                    actions={dialogActions}
                    modal={false}
                    open={this.state.openDeleteConfirmDialog}
                    onRequestClose={this.handleClose} >
                </Dialog>
            </div>
        )
    }
}

export default Books;
