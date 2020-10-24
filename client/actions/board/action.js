import { ADD_BOARD, DELETE_BOARD, SET_BOARDS, UPDATE_BOARD, PUBLIC_BOARD, PRIVATE_BOARD } from "./types";
import Axios from 'axios'
//import database from '../../firebase/firebase';
//Delete a board
export const deleteBoard  = (id) => {
  return {
    type: DELETE_BOARD,
    payload:  id
  }
};
export const deleteBoardWServer = (id) => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return Axios.post('/api/boards/delete', {token, id})
          .then((success) => {
            dispatch(deleteBoard(id));
          })
          .catch((e) => console.log(e));
  }
}

//Add a board
export const addBoard = (board) => ({
    type: ADD_BOARD,
    payload: board
  });
export const addBoardWServer = (board) => {
  board.timestamp = Date.now();
  board.permission = PRIVATE_BOARD;
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return Axios.post('/api/boards/add', {token, board})
          .then((res) => {
            console.log(res.data);
            dispatch(addBoard(res.data));
          })
          .catch((e) => console.log(e));
  }
}

export const setBoard = (boards) => ({
  type: SET_BOARDS, 
  payload: boards
});
export const startSetBoards = () => {
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return Axios.post('/api/boards/getByToken', {token})
          .then((res) => {
            dispatch(setBoard(res.data || []));
          })
          .catch((e) => console.log(e));
  };
};

export const shareBoard = (id) => ({
  type: UPDATE_BOARD,
  payload: {id, key: 'permission', value: PUBLIC_BOARD}
});
export const protectBoard = (id) => ({
  type: UPDATE_BOARD,
  payload: {id, key: 'permission', value: PRIVATE_BOARD}
});
export const updateBoardName = (id, newName) => ({
  type: UPDATE_BOARD,
  payload: {id, key: 'name', value: newName}
});
export const updateBoardWServer = (id, type, name) => {
  const define = {
    'share': {
      func: shareBoard,
      key: 'permission',
      value: PUBLIC_BOARD
    },
    'protect': {
      func: protectBoard,
      key: 'permission',
      value: PRIVATE_BOARD
    },
    'name': {
      func: updateBoardName,
      key: 'name',
      value: name
    }
  }
  const {key, value, func} = define[type];
  return (dispatch, getState) => {
    const token = getState().auth.token;
    return Axios.post('/api/boards/update', {token, id, key, value})
          .then((success) => {
            dispatch(func(id, name));
          })
          .catch((e) => console.log(e));
  };
};