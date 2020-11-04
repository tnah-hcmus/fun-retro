import React, {useState, useRef} from 'react';
import {Card, CardHeader, CardContent, CardActions, Typography, IconButton, TextField}  from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Delete, Edit, MoreVert} from '@material-ui/icons';
import {Draggable} from 'react-beautiful-dnd';
import moment from 'moment';
import {connect} from 'react-redux';

import {deleteTaskWServer, updateTaskWServer} from '../../actions/task/action';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5% 2%'
  },
  typo: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '95%'
  }
}));
moment.locale('vi');
const Task = ({task, updateTask, deleteTask, boardId, index}) => {
  const classes = useStyles();
  const [allowEdit, setEdit] = useState(false);
  const editRef = useRef();
  const handleEditTask = () => {
    const value = editRef.current.value;
    task.content = value;
    updateTask(task.id, boardId, task);
    setEdit(false);
  }
  return (
    <Draggable draggableId = {task.id} index = {index} key = {task.id}>
    {(provided) => {
      return (
        <div {...provided.dragHandleProps} {...provided.draggableProps} ref = {provided.innerRef}>
        <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={moment(Number(task.timestamp)).fromNow()}
          titleTypographyProps = {{variant: "body", color: "textSecondary", className: classes.typo}}
        />
        <CardContent>
          {!allowEdit
            ? <Typography variant="body1" color="textPrimary" component="p">
                {task.content}
              </Typography>
            :   <TextField
              label="Edit task" 
              placeholder = "Nhập nội dung mới của task" 
              fullWidth 
              multiline
              inputRef = {editRef}
              onBlur={() => handleEditTask()}
              />
          }
        </CardContent>
        <CardActions disableSpacing className = {classes.typo}>
        <div>
          <IconButton onClick = {() => setEdit(true)}>
              <Edit />
            </IconButton>
          <IconButton onClick = {() => deleteTask(task.id, boardId)}>
            <Delete />
          </IconButton>
        </div>
          <Typography variant="body2" color="textSecondary" component="p">
              {task.owner && <em>{`Tạo bởi ${task.owner}`}</em>}
          </Typography>
        </CardActions>
      </Card>
        </div>
    )}}
    </Draggable>
    
  );
}
const mapDispatchToProps = {
  deleteTask: deleteTaskWServer, updateTask: updateTaskWServer
}
export default connect(null, mapDispatchToProps)(React.memo(Task));