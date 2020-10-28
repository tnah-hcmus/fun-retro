import React from 'react';
import { deepPurple } from '@material-ui/core/colors';
import { Card, CardContent, Typography, IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {AddBox} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
      card: {
        backgroundColor: 'none',
        border: '6px dashed',
        borderRadius: '5%',
        color: deepPurple[600],
        width: 380,
        height: 210,
        padding: '5% auto',
        textAlign: 'center',
        margin: '30px 50px'
      },
      buttonIcon: {
        width: 100,
        height: 100,
        color: deepPurple[600]
      },
      typo: {
        fontWeight: 'bold',
        paddingBottom: '3%'
      }
  }));
const AddBoard = (props) => {
  const classes = useStyles();
  return (
    <Card className = {classes.card}>
        <CardContent>
            <IconButton onClick = {props.addBoard}>
                <AddBox className = {classes.buttonIcon}/>
            </IconButton>
            <Typography variant="h4" className = {classes.typo}>
                {"Add board"}
            </Typography>
        </CardContent>
    </Card>
  );
};


export default AddBoard;
