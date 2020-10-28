import React, {useState, useRef, useEffect} from 'react';

import { Typography, IconButton, TextField, Grid } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Edit from '@material-ui/icons/Edit';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import Axios from 'axios';

import {updateBoardWServer} from '../../actions/board/action';
import {startSetTasks, setTaskWServer, setTasks, addTask, updateTask, deleteTask} from '../../actions/task/action';
import Loading from '../common/LoadingPage';
import WS from '../../helper/socket';
import ListCategories from '../category/listCategories';
import Category from '../category/Category';

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

const sortFn = (a, b) => {
  return a.position - b.position;
};

const BoardView = (props) => {
  const classes = useStyles();
  const [allowEdit, setAllowEdit] = useState(false);
  const [boardName, setBoardName] = useState('');
  const [init, setDone] = useState(false);
  const [err, setErr] = useState(false);
  const editRef = useRef();
  const id = props.match.params.id;
  useEffect(() => {
    //set up data from server
    let promise = [
      props.setTask(id),
      Axios.post('/api/boards/getNameById', {id})
    ];
    Promise.all(promise)
    .then((res) => {
      if(res[0] instanceof Error) setErr(true);
      setBoardName(res[1].data.name);
      setDone(true);
    })
    .catch((e) => console.log(e));

    //Set up WS server for real-time
    WS.connect(id);
    WS.startListenNewName(setBoardName);
    WS.startListenNewTask(props.setTasks);
    WS.startListenAddTask(props.addTask);
    WS.startListenDeleteTask(props.deleteTask);
    WS.startListenEditTask(props.updateTask);
    return () => {
      WS.shutdownWS();
    }
  }, [])
  const handleEditBoardName = () => {
    const value = editRef.current.value;
    WS.submitName(value, id);
    props.newName(id, value);
    setBoardName(value);
    setAllowEdit(false);
  }
  const onDragEnd = result => {
    const {destination, source, draggableId} = result;
    if(!source || !destination) return;
    const newTaskList = reorderTaskPosition(source, destination, draggableId, props.task);
    props.setTaskWServer(id, newTaskList);
  }
  return (
    <DragDropContext onDragEnd = {onDragEnd}>
    <div className={classes.root}>
      {init && !err
        ?
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            {!allowEdit
            ? <Typography variant = "h3" align = "center" >
                  {boardName}
                  <IconButton onClick = {() => setAllowEdit(true)}>
                      <Edit fontSize = "large" className = {classes.icon}/>
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
            {ListCategories.map((category) => 
                <Category category = {category} boardId = {id} tasks = {props.task.filter((item) => item.category === category.id).sort(sortFn)}/>
            )}
      </Grid>
      :
      (!err 
        ? <Loading/>
        : <Typography variant = "h2" align = "center" >
            {"Bạn không có quyền truy cập board này"}
          </Typography>)
      }

    </div>
    </DragDropContext>
  );
}

const reorderTaskPosition = (source, destination, dragId, taskList) => {
  // moving card within same list
  if (source.droppableId === destination.droppableId) {
    return taskList.map((task) => {
      if (task.category === destination.droppableId) {
        if (task.position === source.index) {
          task.position = destination.index;
          return {...task};
        }
        if (
          task.position < Math.min(source.index, destination.index) ||
          task.position > Math.max(source.index, destination.index)
        ) {
          return {...task};
        }
        if (source.index < destination.index) {
          task.position--;
          return {...task};
        }
        task.position++;
      }
      return {...task};
    });
  }
  // moving card between different lists
  else {
    return taskList.map((task) => {
      if (task.id === dragId) {
        task.category = destination.droppableId;
        task.position = destination.index;
      }
      else if (task.category === source.droppableId) {
        if (task.position > source.index) {
          task.position--;
        }
      }
      else if (task.category === destination.droppableId) {
        if (task.position >= destination.index) {
          task.position++;
        }
      }
      return {...task};
    })
  };
}

const mapStateToProps = state => {
    return {
      task: state.task
    };
  };
const mapDispatchToProps = {
    newName: (id, name) => updateBoardWServer(id, 'name', name),
    setTask: startSetTasks,
    setTaskWServer,
    setTasks, addTask, updateTask, deleteTask
}
export default connect(mapStateToProps, mapDispatchToProps)(BoardView);