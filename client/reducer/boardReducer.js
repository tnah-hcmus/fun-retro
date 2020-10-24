import {
    ADD_BOARD,
    SET_BOARDS,
    DELETE_BOARD,
    UPDATE_BOARD,
    PUBLIC_BOARD,
    PRIVATE_BOARD
  } from '../actions/board/types';
  const INITIAL_STATE = [  
  ];
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_BOARD:
          return [ ...state, action.payload];
      case SET_BOARDS:
          return [...action.payload];
      case UPDATE_BOARD:
            return state.map((item) => {
              if(item.id === action.payload.id){
                item[action.payload.key] = action.payload.value;
                return {...item};
              }
              return item;
            });
      case DELETE_BOARD:
          return state.filter((item) => {
            return item.id !== action.payload;
          });
      default:
        return state;
    }
  }
  