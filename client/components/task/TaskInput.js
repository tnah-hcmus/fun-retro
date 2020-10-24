import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux';
import {addTaskWServer} from '../../actions/task/action';
const useStyles = makeStyles({
  root: {
    minWidth: '80%',
    margin: '5% auto',
  }
});

const TaskInput = ({category, hide, addTask, boardId}) => {
  const classes = useStyles();
  const textFieldRef = useRef();
  const addNewTask = () => {
    const content = textFieldRef.current.value;
    hide();
    addTask({
        content,
        category,
        timestamp: Date.now()
    }, boardId);
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField
         label="New task" 
         placeholder = "Nhập nội dung task" 
         fullWidth 
         multiline
         inputRef = {textFieldRef}
         />
      </CardContent>
      <CardActions>
        <Button 
        variant="contained" 
        sizes = "small" 
        onClick = {addNewTask}>
          <b>Add</b>
        </Button>
      </CardActions>
    </Card>
  );
}
const mapDispatchToProps = {
  addTask: addTaskWServer
}
export default connect(null, mapDispatchToProps)(TaskInput);