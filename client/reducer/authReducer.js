import {LOGIN, LOGOUT} from '../action/auth/type';
export default (state = {}, action) => {
    switch (action.type) {
      case LOGIN:
        console.log(action.payload);
        return {
          ...action.payload
        };
      case LOGOUT:
        return {};
      default:
        return state;
    }
  };
  