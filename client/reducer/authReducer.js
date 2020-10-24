import {LOGIN, LOGOUT, EDIT_NAME} from '../actions/auth/types';
export default (state = {}, action) => {
    switch (action.type) {
      case LOGIN:
        return {
          ...action.payload
        };
      case EDIT_NAME:
        state.name = action.payload.name
        return {
          ...state
        };
      case LOGOUT:
        return {};
      default:
        return state;
    }
  };
  