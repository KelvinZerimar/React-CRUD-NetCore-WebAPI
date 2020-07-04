import React, {useState, useEffect} from 'react'
import { Grid, TextField, withStyles, FormControl, InputLabel, Select, MenuItem, Button, FormHelperText } from "@material-ui/core";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dNote";
import { useToasts } from "react-toast-notifications";

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            minWidth: 230,
        }
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin: {
        margin: theme.spacing(1)
    }
})

const initialFieldValues = {
    title: '',
    description: ''
}

const DNoteForm = ({ classes, ...props })=> {
    //toast msg.
    const { addToast } = useToasts()

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
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e =>{
        e.preventDefault()
        if (validate()) {
            //props.createDNote(values,()=>{window.alert('inserted.')})
            const onSuccess = () => {
            resetForm()
            addToast("Submitted successfully", { appearance: 'success' })
            }
            if (props.currentId == 0)
                props.createDNote(values, onSuccess)
            else
                props.updateDNote(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId != 0) {
            setValues({
                ...props.dNoteList.find(x => x.id == props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return(
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={12}>
                <TextField 
                name="title" 
                variant="outlined"
                label="Title" 
                margin="normal"
                style={{paddingRight: "20px", width: "400px"}}
                value={values.title}
                onChange={handleInputChange}
                {...(errors.title && { error: true, helperText: errors.title })}
                />
                
            </Grid>
            <Grid item xs="auto">
            <TextField
                name="description" 
                variant="outlined"
                label="Description" 
                margin="normal"
                style={{paddingRight: "20px", width: "400px"}}
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
                        onClick={resetForm}
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
