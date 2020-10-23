import { ADD_BOARD, DELETE_BOARD, SET_BOARDS } from "./types";
import database from '../../firebase/firebase';
//Delete a board
export const deleteBoard  = (board) => {
  return {
    type: DELETE_BOARD,
    payload:  board
  }
};
export const deleteBoardWServer = (board) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const cat = getState().board.filter((item) => item.name === board);
    if(cat.length > 0) {
      const path = `users/${uid}/board/${cat[0].id}`;
      return database.deleteData({path},() => {
        dispatch(deleteBoard(board));
      }) 
    }
    else {
      return dispatch(deleteBoard(board));
    }
  }
}

//Add a board
export const addBoard = (board, id) => ({
    type: ADD_BOARD,
    payload: {name: board, id}
  });
export const addBoardWServer = (board) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const path = `users/${uid}/board`;
    return database.pushData({path, data: board},(ref) => {
      dispatch(addBoard(board, ref.key));
    })
  }
}

export const setBoard = (board) => ({
  type: SET_BOARDS, 
  payload: board
});
export const startSetBoards = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const path = `users/${uid}/board`;
    return database.readData({path}).then((snapshot) => {
      let board = [];
      if(snapshot) {
        board = Object.keys(snapshot).map((key) => ({id: key, name: snapshot[key]}))
      }
      dispatch(setBoard(board));
    });
  };
};