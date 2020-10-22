import {
    ADD_CATEGORY, 
    DELETE_CATEGORY,
    SET_CATEGORIES
} from '../actions/category/types';

const createID = () => {
    let guid = 'xxyyx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    return guid;
}
const INITIAL_STATE = [
    {
        id: createID(),
        name: 'Went well'
    },
    {
        id: createID(),
        name: 'To improve'
    },
    {
        id: createID(),
        name: 'Action items'
    }
]

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_CATEGORY:
          if(state.filter((item) => item.name === action.payload.name).length === 0) {
            return [...state, action.payload];
          } 
          else return state;
      case DELETE_CATEGORY:
        return state.filter((item) => {
          return item.name !== action.payload;
        });
      case SET_CATEGORIES:
        return [...action.payload];
      default:
        return state;
    }
  }