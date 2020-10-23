import {
    ADD_BOARD,
    SET_BOARD,
    REMOVE_BOARD,
    UPDATE_BOARD,
    PUBLIC_BOARD,
    PRIVATE_BOARD
  } from '../actions/board/types';
  const _createBID = () => {
    let gid = 'xxyxxyxx-xxxx-4xxx-yxxx-xxxxxxxxyxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0,
    v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return gid;
  }
  const INITIAL_STATE = [
      {
          id: _createBID(),
          name: 'test',
          owner: 'kor',
          permission: PUBLIC_BOARD,
          category: []
      }    
  ];
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_BOARD:
            return [ ...state, action.payload];
      case SET_BOARD:
          return [...state,...action.payload.boards];
      case UPDATE_BOARD:
            return state.map((item) => {
              if(item.id === action.payload.id){
                return action.payload.info;
              }
              return item;
            });
      case REMOVE_BOARD:
          return state.filter((item) => {
                    return item.id !== action.payload.id || item.category !== action.payload.category;
          });
      default:
        return state;
    }
  }
  