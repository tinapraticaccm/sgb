import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class EntryModal extends Component {
    constructor(props) {
        super(props);
        const entryValues = [];
        if(props.defaultValues) {
            Object.keys(props.textEntry).forEach((key) => {
                entryValues[key] = props.defaultValues[key] ;
            } );
            console.log(props.defaultValues)
        }
        else {
            Object.keys(props.textEntry).forEach((key) => {
                entryValues[key] = '';
            } );
        }   

        this.state = {
            entryValues: entryValues,
        }

    }
    static getDerivedStateFromProps(nextProps, prevState) {
        const entryValues = {...prevState.entryValues}
        if(nextProps.defaultValues) {
            Object.keys(nextProps.textEntry).forEach((key) => {
                entryValues[key] = nextProps.defaultValues[key] ;
            } );
        }
        else {
            Object.keys(nextProps.textEntry).forEach((key) => {
                entryValues[key] = '';
            } );
        }   
        return {entryValues: entryValues}
        
    }

    changeEntryValue(entry,value) {
        const newEntryValues = {...this.state.entryValues}
        newEntryValues[entry] = value;
        this.setState({entryValues: newEntryValues })
    }

    render() {


        const inputFields = Object.keys(this.props.textEntry)
        .map( input => (
            <TextField 
                key={input}
                id="text-field-default"
                floatingLabelText={this.props.textEntry[input]}
                value={this.state.entryValues[input]}
                onChange={(event) => this.changeEntryValue(input,event.target.value)}
                fullWidth={true} 
            />
        ))


        const actions = [
            <FlatButton 
                label="Cancelar"
                primary={true}
                onClick={this.props.cancelAction}
            />,
            <FlatButton 
                label="Confirmar"
                primary={true}
                onClick={() => this.props.confirmAction({...this.state.entryValues} )}
            />
        ]

        return (
            <Dialog
                title={this.props.title}
                modal={false}
                actions={actions}
                open={this.props.open}
                onRequestClose={this.props.closeModal} 
            >
                {inputFields}
            </Dialog>
        )
    }
    
    

}

export default EntryModal