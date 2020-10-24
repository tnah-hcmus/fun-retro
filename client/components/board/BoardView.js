import React, {useState, useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListCategories from '../category/listCategories';
import Category from '../category/Category';
import Task from '../task/Task';
import { Typography, IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {connect} from 'react-redux';
import { green } from '@material-ui/core/colors';
import {updateBoardWServer} from '../../actions/board/action';
import {startSetTasks, updateTaskWServer} from '../../actions/task/action';
import Loading from '../common/LoadingPage';
import Axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: '20px 3%'
  },
  boardName: {
    fontWeight: 300,
  },
  icon: {
    marginLeft: 5,
    color: green[600]
  }
}));

const BoardView = (props) => {
  const classes = useStyles();
  const [allowEdit, setAllowEdit] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [init, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const editRef = useRef();
  const id = props.match.params.id;
  useEffect(() => {
    let promise = [];
    promise.push(props.setTask(id));
    promise.push(Axios.post('/api/boards/getNameById', {id}));
    Promise.all(promise)
    .then((res) => {
      if(res[0] instanceof Error) setErr(true);
      setBoardName(res[1].data.name);
      setDone(true);
    })
    .catch((e) => console.log(e));
  }, [])
  const handleEditBoardName = () => {
    const value = editRef.current.value;
    props.newName(id, value);
    setBoardName(value);
    setAllowEdit(false);
  }
  const onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if(!destination) return;
    if(source.droppableId !== destination.droppableId) {
      let newTask = props.task.filter(item => item.id === draggableId)[0];
      newTask.category = destination.droppableId;
      props.updateTask(draggableId, id,  newTask);
    }
  }
  return (
    <div className={classes.root}>
      {init && !err
        ?
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {!allowEdit
            ? <Typography variant = "h3" align = "center" >
                  {boardName}
                  <IconButton onClick = {() => setAllowEdit(true)}>
                      <EditIcon fontSize = "large" className = {classes.icon}/>
                  </IconButton>
              </Typography>
            :   <TextField
              label="Edit board name" 
              placeholder = "Nhập tên mới cho board" 
              fullWidth 
              multiline
              inputRef = {editRef}
              onBlur={handleEditBoardName}
              />
          }
          </Grid>
          <DragDropContext onDragEnd = {onDragEnd}>
            {ListCategories.map((category) => 
                <Category category = {category} boardId = {id}>
                    {props.task.filter((task) => task.category === category.id)
                              .map((task, index) => <Task task = {task} index = {index} boardId = {id}/>)}
                </Category>
            )}
          </DragDropContext>
      </Grid>
      :
      (!err 
        ? <Loading/>
        : <Typography variant = "h2" align = "center" >
            {"Bạn không có quyền truy cập board này"}
          </Typography>)
      }

    </div>
  );
}
const mapStateToProps = state => {
    return {
      task: state.task
    };
  };
const mapDispatchToProps = {
    newName: (id, name) => updateBoardWServer(id, 'name', name),
    setTask: startSetTasks,
    updateTask: updateTaskWServer
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardView);