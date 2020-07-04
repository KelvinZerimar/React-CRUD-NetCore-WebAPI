import React, { useState, useEffect } from 'react'
import Moment from 'react-moment';
import { connect} from "react-redux";
import * as actions from "../actions/dNote";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DNoteForm from "./DNoteForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts } from "react-toast-notifications";

const styles = theme =>({
    root: {
        "& .MuiTableCell-head": {
            fontSize: "1.25rem"
        }
    },
    paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

//props.classes
// const [classes, ...props] = props
const DNotes = ({ classes, ...props }) => {
    const [currentId, setCurrentId] = useState(0)
    // const[x,setX] = useState(0)
    // setX(5)

    useEffect(()=>{
        props.fetchAllDNotes()

    },[])// componentDidMount

    //toast msg.
    const { addToast } = useToasts()

    const onDelete = id => {
        if (window.confirm('Are you sure to delete this record?'))
            props.deleteDNote(id,()=>addToast("Deleted successfully", { appearance: 'info' }))
    }

    return(
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
            <Grid item xs={5}>
                <DNoteForm {...({ currentId, setCurrentId })}/>
            </Grid>
            <Grid item xs={7}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                props.dNoteList.map((record, index) => {
                                    return (<TableRow key = {index} hover>
                                        <TableCell><Moment format="DD/MM/YYYY">
                                                {record.createdDate}
                                            </Moment>
                                        </TableCell>
                                        <TableCell>{record.title}</TableCell>
                                        <TableCell>{record.description}</TableCell>
                                        <TableCell>
                                                <ButtonGroup variant="text">
                                                    <Button><EditIcon color="primary"
                                                        onClick={() => { setCurrentId(record.id) }} /></Button>
                                                    <Button><DeleteIcon color="secondary"
                                                        onClick={() => onDelete(record.id)} /></Button>
                                                </ButtonGroup>
                                            </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
        </Grid>
        </Paper>
        
    );
}


const mapStateToProps = state =>({
        dNoteList: state.dNote.list
    })

const mapActionToProps = {
    fetchAllDNotes: actions.fetchAll,
    deleteDNote: actions.Delete
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DNotes));
 