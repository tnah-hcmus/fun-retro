import {
    ADD_TASK,
    SET_TASK,
    REMOVE_TASK,
    REMOVE_ALL_TASKS,
    REMOVE_ALL_TASKS_BY_CATEGORY,
    UPDATE_TASK,
  } from '../actions/task/types';
  
  const INITIAL_STATE = [  
    ];
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TASK:
            return [ ...state, action.payload];
      case SET_TASK:
          return [...state,...action.payload.tasks];
      case UPDATE_TASK:
            return state.map((item) => {
              if(item.id === action.payload.id){
                return action.payload.info;
              }
              return item;
            });
      case REMOVE_TASK:
          return state.filter((item) => {
                    return item.id !== action.payload.id || item.category !== action.payload.category;
          });
      case REMOVE_ALL_TASKS_BY_CATEGORY:
            return state.filter((item) => {
                return item.category !== action.payload.category;
            });                    
      case REMOVE_ALL_TASKS:
        return INITIAL_STATE;
      default:
        return state;
    }
  }
  