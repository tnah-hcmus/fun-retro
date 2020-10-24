import React, {useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import {connect} from 'react-redux';
import {deleteTaskWServer, updateTaskWServer} from '../../actions/task/action';




const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '80%',
    margin: '5% auto'
  },
  typo: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '95%'
  }
}));
moment.locale('vi');
const Task = ({task, updateTask, deleteTask, boardId}) => {
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
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
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
            <EditIcon />
          </IconButton>
        <IconButton onClick = {() => deleteTask(task.id, boardId)}>
          <DeleteIcon />
        </IconButton>
      </div>
        <Typography variant="body2" color="textSecondary" component="p">
            {task.owner && <em>{`Tạo bởi ${task.owner}`}</em>}
        </Typography>
      </CardActions>
    </Card>
  );
}
const mapDispatchToProps = {
  deleteTask: deleteTaskWServer, updateTask: updateTaskWServer
}
export default connect(null, mapDispatchToProps)(Task);