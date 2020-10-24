import React, {useState} from 'react';
import { makeStyles, Button, Typography, Avatar, Paper, Grid, Divider } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { grey } from '@material-ui/core/colors';
import TaskInput from '../task/TaskInput';
const useStyles = (color) => {
    return makeStyles((theme) => ({
        avatarContainer: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            paddingBottom: '10px'
        },
        typo: {
            paddingLeft: '10px',
            color: grey[800],
            fontWeight: "bold"
        },
        colored: {
            color: '#fff',
            backgroundColor: color
        },
        divider: {
            marginTop: '3%',
            color: grey['A400'],
            height: 3
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }));
}
const Category = ({children, category, boardId}) => {
  const [showAddTask, setAddTask] = useState(false);
  const {color, icon, name} = category;
  const classes = useStyles(color)();
  return (
    <Grid item xs={12} sm={4}>
          <Paper className={classes.paper}>
            <div className = {classes.avatarContainer}>
                <Avatar variant="rounded" className={classes.colored}>
                    {icon}
                </Avatar>
                <Typography variant="h6" className = {classes.typo}>
                    {name}
                </Typography>
            </div>
            <Button
            variant="contained"
            fullWidth = {true}
            className = {classes.colored}
            onClick = {() => setAddTask(true)}
            >
                <AddCircleOutlineIcon fontSize = "large"/>
            </Button>
            {(!!children.length || showAddTask) && <Divider variant="middle" className = {classes.divider} />}
            {showAddTask && <TaskInput boardId = {boardId} category = {category.id} hide = {() => setAddTask(false)}/>}
            {children}
          </Paper>
    </Grid>
  );
}

export default Category;