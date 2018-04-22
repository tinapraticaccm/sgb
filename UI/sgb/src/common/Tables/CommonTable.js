import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import EditButton from 'material-ui/svg-icons/content/create';
import DeleteButton from 'material-ui/svg-icons/action/delete';
import {orange500, grey900, red600} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle} from 'material-ui/Card';

import React ,{Component}from 'react';
import classes from './CommonTable.css'

class CommonTable extends Component {
    constructor(props) {
        super(props);
        const isRowSelected = props.data.map(() => false);
        this.state ={
            selectedEntries: [],
            isRowSelected: isRowSelected,
        }
    }
    
    rowSelectedHander = (rows) => {
        if(rows === 'all') {
            const selectedEntries = this.props.data;
            const isRowSelected = this.props.data.map(() => true);
            this.setState({
                selectedEntries: selectedEntries,
                isRowSelected: isRowSelected,
            });

        }
        else if(rows === 'none') {
            const selectedEntries = [];
            const isRowSelected = this.props.data.map(() => false);
            this.setState({
                selectedEntries: selectedEntries,
                isRowSelected: isRowSelected,
            });
        }
        else{
            const isRowSelected = this.props.data.map(() => false);
            const selectedEntries = rows.map(row => {
                isRowSelected[row] = true;
                return this.props.data[row];
            });
            this.setState({
                selectedEntries: selectedEntries,
                isRowSelected: isRowSelected,
            });
        }


    }
    render () {
        const tableHeader = Object.keys(this.props.headers)
        .map( header => {
            return (
                <TableHeaderColumn key={header} >{this.props.headers[header] }</TableHeaderColumn>
            );
        });

        let isActionActive = false;
        if( this.props.edit || this.props.delete ) {
            isActionActive = true;
        }


        const tableRows= this.props.data.map( (entry,index) => {

            const singleRow = Object.keys(this.props.headers).map(header =>(
                <TableRowColumn key={header + entry['Id']} >{entry[header] }</TableRowColumn>
            ) );
            
            const editAction = this.props.edit ? (
                    <IconButton tooltip="SVG Icon" onClick={() => this.props.edit(entry)}>
                            <EditButton color={orange500} />
                    </IconButton>
            ) : null;

            const deleteAction = this.props.delete ? (
                    <IconButton tooltip="SVG Icon" onClick={() => this.props.delete(entry)}>
                            <DeleteButton color={grey900} hoverColor={red600} />
                    </IconButton>
            ) : null;

            const actions = isActionActive ? (
                <TableRowColumn>
                    {editAction}
                    {deleteAction}
                </TableRowColumn>
            ) : null;


            return (
                <TableRow key={entry['Id']} selected={this.state.isRowSelected[index] } >
                    {singleRow}
                    {actions}
                </TableRow>
            );
            
        });


        const buttons = ( this.props.add || this.props.deleteMultiple) ? (
            <div className={classes.Buttons}>
                    {this.props.add ? (
                        <RaisedButton 
                            label={'Adicionar ' + this.props.entryName}
                            primary={true} 
                            onClick={() => this.props.add()} 
                        />
                    ): null}
                    <div style={{width: '5px',height: 'auto', display: 'inline-block' }} ></div>
                    {this.props.deleteMultiple ?(
                        <RaisedButton 
                            label={'Apagar ' + this.props.entryNamePlural} 
                            primary={true} 
                            onClick={() => this.props.deleteMultiple(this.state.selectedEntries)} 
                        />
                    ) :null}
            </div>
        ) : null;

        return (
            <Card className={classes.UsersCard}>
                <CardTitle 
                    title={this.props.title} 
                    className={classes.UsersCardTitle} 
                    titleStyle={{color: 'white'}}
                />
                {buttons}
                <Divider />
                <Table onRowSelection={(row) => this.rowSelectedHander(row)} multiSelectable	 >
                    <TableHeader>
                        <TableRow>
                            {tableHeader}
                            {isActionActive ? <TableRowColumn>Ações</TableRowColumn> : null}
                        </TableRow>
                    </TableHeader>
                    <TableBody deselectOnClickaway={false}>
                        {tableRows}
                    </TableBody>         
                </Table>
            
            </Card>
        )
    }

}

export default CommonTable;