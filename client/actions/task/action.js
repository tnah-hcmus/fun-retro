import { ADD_TASK, SET_TASK, REMOVE_TASK, UPDATE_TASK,  REMOVE_ALL_TASKS } from "./types";
import Axios from 'axios';
import WS from '../../helper/socket';

const _createID = () => {
  let gid = 'xyxxyx'.replace(/[xy]/g, (c) => {
  let r = Math.random() * 16 | 0,
  v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  return gid;
}
//Delete all task
export const deleteAll = () => ({
    type: REMOVE_ALL_TASKS
});
/*export const deleteAllWServer = () => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    return database.deleteData({path}).then(() => {
      dispatch(deleteAll());
    })
  }
}*/

//Delete a task
export const deleteTask = (id) => ({
    type: REMOVE_TASK, 
    payload: {id}
  });
export const deleteTaskWServer = (id, boardId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    WS.deleteTask(id, boardId);
    return Axios.post('/api/task/delete', {token, boardId, id})
    .then((res) => {
      dispatch(deleteTask(id));
    })
    .catch((e) => console.log(e));
  }
}

//Add a task
export const addTask = (task) => ({
  type: ADD_TASK, 
  payload: task
});
export const addTaskWServer = (task, boardId) => {
  return (dispatch, getState) => {
    task.owner = getState().auth.name || 'Người dùng ẩn danh';
    task.position = getState().task.filter((item) => item.category === task.category).length;
    task.id = _createID();
    WS.addTask(task, boardId);
    const token = getState().auth.token;
    return Axios.post('/api/task/add', {token, boardId, task})
          .then((res) => {
            dispatch(addTask(task));
          })
          .catch((e) => console.log(e));
  }
}
export const addFakeTask = (task) => {
  return (dispatch, getState) => {
    const owner = getState().auth.id;
    const id = Date.now();
    dispatch({
      type: ADD_TASK,
      payload: {
        ...task,
        owner,
        id
      }
    })
    
  }
}
//Update a task
export const updateTask = (id, newInfo) => {
  return {
      type: UPDATE_TASK,
      payload: {id: id, task: newInfo}
  };
}
export const updateTaskWServer = (id, boardId, newInfo) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    WS.editTask(id, boardId, newInfo);
    return Axios.post('/api/task/update', {token, boardId, id, newTask: newInfo})
          .then((success) => {
            dispatch(updateTask(id, newInfo));
          })
          .catch((e) => console.log(e));
  }
}


//Init task
export const setTasks = (tasks) => ({
  type: SET_TASK, 
  payload: {tasks}
});

export const setTaskWServer = (boardId, newTaskList) => {
  return (dispatch, getState) => {
    dispatch(setTasks(newTaskList))
    WS.submitTaskList(newTaskList, boardId);
    const token = getState().auth.token;
    return Axios.post('/api/task/updateAll', {token, boardId, newTaskList})
          .then((success) => {
          })
          .catch((e) => console.log(e));
  }
}
export const startSetTasks = (boardId) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return Axios.post('/api/task/getByBoardId', {token, boardId})
          .then((res) => {
            dispatch(setTasks(res.data || []));
          })
          .catch((e) => {return new Error('Not your board')});
  }
}