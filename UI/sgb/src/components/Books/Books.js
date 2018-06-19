import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter } from 'material-ui/Table';
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import http from '../../httpService/httpService'
import classes from './Books.css'
import IconButton from 'material-ui/IconButton';
import EditButton from 'material-ui/svg-icons/content/create';
import DeleteButton from 'material-ui/svg-icons/action/delete';
import BookModal from './BookModal/BookModal'
import { orange500, red500 } from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Pagination from '../../common/Pagination/Pagination'

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
        http.post('book/getBooks', this.state.queryLimit)
        .then(response => {
            this.setState({totalBooks: response.data.Count})
            this.setState({books: response.data.Result})
        })
    }

    refreshTable() {
        http.get('book')
            .then(response => {
                this.setState({books: response.data})
            })
    }

    openBookmodal(book) {
        this.setState({book: book})
        this.setState({isModalOpen: true})
    }
    
    closeModal() {
        this.setState({isModalOpen: false})
    }

    editBook(book) {
        http.put('book', book)
            .then(response => {
                this.closeModal()
                this.refreshTable()
            })
            .catch(error => this.closeModal())
    }

    addBook(book) {
        this.setState({book: book})
        this.setState({isModalOpen: true})
    }

    openDeleteConfirmDialog(book) {
        this.setState({bookDelete: {...book}})
        this.setState({openDeleteConfirmDialog: true})
    }

    closeDeleteConfirmDialog() {
        this.setState({bookDelete: null})
        this.setState({openDeleteConfirmDialog: false})
    }

    deleteBook() {
        http.post('book/delete', this.state.bookDelete)
            .then(response => {
                this.closeDeleteConfirmDialog()
                this.refreshTable()
            })
            .catch(error => this.closeDeleteConfirmDialog())
    }

    changePage(newPage) {
        let queryLimit = {...this.state.queryLimit}
        queryLimit.page = newPage
        this.setState({queryLimit: queryLimit}, () => this.getBooks)
    }

    render() {
        const modal = this.state.isModalOpen ?
        (
            <BookModal
                book={{...this.state.book}}
                open={this.state.isModalOpen}
                closeModal={() => this.closeModal()}
                editBook={(book) => this.editBook(book)} >
            </BookModal>
        ) : null

        const dialogActions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={() => this.closeDeleteConfirmDialog()}/>,
            <FlatButton
                label="Confirmar"
                primary={true}
                onClick={() => this.deleteBook()} />
        ];

        let table = null;
        if (this.state.books) {
            table = this.state.books.map(book => {
                return (
                    <TableRow key={book.Id}>
                        <TableRowColumn>{book.Titulo}</TableRowColumn>
                        <TableRowColumn>{book.Autor}</TableRowColumn>
                        <TableRowColumn>{book.Editora}</TableRowColumn>
                        <TableRowColumn>
                            <IconButton tooltip="SVG Icon" onClick={() => this.openBookModal(book)}>
                                <EditButton color={orange500} />
                            </IconButton>
                            <IconButton tooltip="SVG Icon" onClick={() => this.openDeleteConfirmDialog(book)}>
                                <DeleteButton color={red500} />
                            </IconButton>
                        </TableRowColumn>
                    </TableRow>
                )
            })
        }

        return (
            <div>
                <Card className={classes.BooksCard}>
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {table}
                        </TableBody>
                        <TableFooter>
                            <Pagination
                                totalResults={this.state.totalBooks}
                                page={this.state.queryLimit.page}
                                changePage={(page) => this.changePage(page)}
                                minPageShowed="1" >
                            </Pagination>
                        </TableFooter>
                    </Table>
                </Card>

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
