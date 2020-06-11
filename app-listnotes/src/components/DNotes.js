import React, { useState, useEffect } from 'react'
import { connect} from "react-redux";
import * as actions from "../actions/dNote";
import { Grid, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, withStyles, ButtonGroup, Button } from "@material-ui/core";
import DNoteForm from "./DNoteForm";

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

    // const[x,setX] = useState(0)
    // setX(5)

    useEffect(()=>{
        props.fetchAllDNotes()

    },[])// componentDidMount


    return(
        <Paper className={classes.paper} elevation={3}>
            <Grid container>
            <Grid item xs={6}>
                <DNoteForm />
            </Grid>
            <Grid item xs={6}>
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
                                        <TableCell>{record.createdDate}</TableCell>
                                        <TableCell>{record.title}</TableCell>
                                        <TableCell>{record.description}</TableCell>
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
    fetchAllDNotes: actions.fetchAll
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(DNotes));
 