import React, {useState} from 'react';
import { Button, Typography, Avatar, Paper, Grid, Divider } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { grey } from '@material-ui/core/colors';
import { Droppable } from 'react-beautiful-dnd';


import TaskInput from '../task/TaskInput';
import Task from '../task/Task';

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
const Category = ({tasks, category, boardId}) => {
  const [showAddTask, setAddTask] = useState(false);
  const {color, icon, name, id} = category;
  const classes = useStyles(color)();
  return (
    <Grid item xs={12} sm={4}>
            <Droppable droppableId={id} isCombineEnabled>
                {(provided, snapshot) => (
                        <Paper
                            className={classes.paper}
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            >
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
                                <AddCircleOutline fontSize = "large"/>
                            </Button>
                            {(!!tasks.length || showAddTask) && <Divider variant="middle" className = {classes.divider} />}
                            {showAddTask && <TaskInput boardId = {boardId} category = {id} hide = {() => setAddTask(false)}/>}
                            {tasks.map((task, index) => <Task task = {task} index = {index} boardId = {boardId}/>)}
                            {provided.placeholder}
                        </Paper>

                )}                
            </Droppable>
            
          
    </Grid>
  );
}
export default Category;