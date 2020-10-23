import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import {connect} from 'react-redux';
import {addFakeTask} from '../../actions/task/action';
const useStyles = makeStyles({
  root: {
    minWidth: '80%',
    margin: '5% auto',
  }
});

const TaskInput = ({category, hide, addTask}) => {
  const classes = useStyles();
  const addNewTask = () => {
    const content = this.refs.task.getValue();
    hide();
    addTask({
        content,
        category,
        timestamp: Date.now()
    });
  }
  return (
    <Card className={classes.root}>
      <CardContent>
        <TextField ref = "task" label="Task" placeholder = "Nhập nội dung task" fullWidth multiline/>
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
  addTask: addFakeTask
}
export default connect(null, mapDispatchToProps)(TaskInput);