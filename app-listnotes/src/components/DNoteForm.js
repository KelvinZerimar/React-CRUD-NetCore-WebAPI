import React, {useState} from 'react'
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dNote";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    title: '',
    description: ''
}

const DNoteForm = ({classes, ...props})=> {

    //validate()
    //validate({title:'amaru'})
    const validate =(fieldValues = values) =>{
        let temp = {}
        if ('title' in fieldValues) 
            temp.title = fieldValues.title?"":"this field required."
        
        if ('description' in fieldValues) 
            temp.description = fieldValues.description?"":"this field required."
        
        setErrors({
            ...temp
        })

        if (fieldValues == values) 
            return Object.values(temp).every(x => x == "")
        
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(initialFieldValues, validate)

    const handleSubmit = e =>{
        e.preventDefault()
        if (validate()) {
            props.createDNote(values,()=>{window.alert('inserted.')})
        }
    }

    return(
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <TextField
                name="title" 
                variant="outlined"
                label="Title" 
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
                />
                
            </Grid>
            <Grid item xs={6}>
                <TextField
                name="description" 
                variant="outlined"
                label="Description" 
                multiline
                rows={4}
                value={values.description}
                onChange={handleInputChange}
                {...(errors.description && { error: true, helperText: errors.description })}
                />

                <div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                    >
                        Submit
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.smMargin}
                    >
                        Reset
                    </Button>
                </div>
            </Grid>
        </Grid>
    </form>
    );
}

const mapStateToProps = state => ({
    dNoteList: state.dNote.list
})

const mapActionToProps = {
    createDNote: actions.create,
    updateDNote: actions.update
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DNoteForm));
