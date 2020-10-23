import { ADD_TASK, SET_TASK, REMOVE_TASK, UPDATE_TASK,  REMOVE_ALL_TASKS } from "./types";
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
export const deleteTask = (id, category) => ({
    type: REMOVE_TASK, 
    payload: {id: id, category: category}
  });
/*export const deleteTaskWServer = (id, category) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}`;
    return database.deleteData({path}).then(() => {
      dispatch(deleteTask(id, category));
    })
  }
}*/

//Add a task
/*export const addTask = (task) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    if(task.id) {
      const path = `users/${id}/tabs/${task.id}`;
      return database.setData({path, data: task}).then(() => {
        dispatch({
          type: ADD_TASK,
          payload: task
        })
      })
    }
    else {
      const path = `users/${id}/tabs`;
      return database.pushData({path, data: task}).then((ref) => {
        task.id = ref;
        dispatch({
          type: ADD_TASK,
          payload: task
        });
      })
    }
  }
}*/
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
      payload: {id: id, info: newInfo}
  };
}
/*export const updateTaskWServer = (id, newInfo) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}`;
    return database.setData({path, data: newInfo}).then(() => {
      dispatch(updateTask(id, newInfo));
    })
  }
}*/

/*export const updateCommentsWServer = (id, trans) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}/trans`;
    return database.updateData({path, data: trans}).then(() => {
      dispatch(updateComments(id, trans));
    })
  }
}*/

//Init tabs
export const setTasks = (tabs) => ({
  type: SET_TASK, 
  payload: {tabs}
});
/*export const startSetTasks = () => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs`;
    return database.readData({path}).then((snapshot) => {
      let tabs = [];
      if(snapshot) {
        tabs = Object.keys(snapshot).map((key) => snapshot[key].id ? snapshot[key] : Object.assign(snapshot[key], {id: key}))
      }
      dispatch(setTasks(tabs));
    });
  };
};*/