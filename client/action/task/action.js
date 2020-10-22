import { ADD_TASK, SET_TASK, REMOVE_TASK, UPDATE_TASK,  REMOVE_ALL_TASKS } from "./types";
import database from '../../firebase/firebase';
//Delete all tab
export const deleteAll = () => ({
    type: REMOVE_ALL_TASKS
});
export const deleteAllWServer = () => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    return database.deleteData({path}).then(() => {
      dispatch(deleteAll());
    })
  }
}

//Delete a tab
export const deleteTask = (id, category) => ({
    type: REMOVE_TASK, 
    payload: {id: id, category: category}
  });
export const deleteTaskWServer = (id, category) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}`;
    return database.deleteData({path}).then(() => {
      dispatch(deleteTask(id, category));
    })
  }
}

//Add a tab
export const addTask = (tab) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    if(tab.id) {
      const path = `users/${id}/tabs/${tab.id}`;
      return database.setData({path, data: tab}).then(() => {
        dispatch({
          type: ADD_TASK,
          payload: tab
        })
      })
    }
    else {
      const path = `users/${id}/tabs`;
      return database.pushData({path, data: tab}).then((ref) => {
        tab.id = ref;
        dispatch({
          type: ADD_TASK,
          payload: tab
        });
      })
    }
  }
}

//Update a tab
export const updateTask = (id, newInfo) => {
  return {
      type: UPDATE_TASK,
      payload: {id: id, info: newInfo}
  };
}
export const updateTaskWServer = (id, newInfo) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}`;
    return database.setData({path, data: newInfo}).then(() => {
      dispatch(updateTask(id, newInfo));
    })
  }
}

//Update trans in a tab
export const updateComments = (id,trans) => {
  return {
      type: UPDATE_COMMENTS,
      payload: {id: id,trans: trans}
  };
}
export const updateCommentsWServer = (id, trans) => {
  return (dispatch, getState) => {
    const id = getState().auth.id;
    const path = `users/${id}/tabs/${id}/trans`;
    return database.updateData({path, data: trans}).then(() => {
      dispatch(updateComments(id, trans));
    })
  }
}

//Init tabs
export const setTasks = (tabs) => ({
  type: SET_TASK, 
  payload: {tabs}
});
export const startSetTasks = () => {
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
};