import React from 'react';
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles, Card, CardContent, Typography, IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';

const useStyles = makeStyles((theme) => ({
      card: {
        backgroundColor: 'none',
        border: '6px dashed',
        borderRadius: '5%',
        color: deepPurple[600],
        width: 360,
        height: 200,
        padding: '5% auto',
      },
      buttonIcon: {
        width: 100,
        height: 100,
        color: deepPurple[600]
      },
  }));
const BoardItem = () => {
  const classes = useStyles();
  return (
    <Card className = {classes.card}>
        <CardContent>
            <IconButton>
                <AddBoxIcon className = {classes.buttonIcon}/>
            </IconButton>
            <Typography variant="h4">
                {"Add"}
            </Typography>
        </CardContent>
    </Card>
  );
};


export default BoardItem;
