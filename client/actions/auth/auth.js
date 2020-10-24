import {LOGIN, LOGOUT, EDIT_NAME} from './types';
import Axios from 'axios';
import * as queryString from 'query-string';
export const login = (token, name) => ({
  type: LOGIN,
  payload: {token, name}
});

export const editName = (name) => ({
  type: EDIT_NAME,
  payload: {name}
});

export const logout = () => ({
  type: LOGOUT
});

export const editNameWServer = (name) => {
  return (dispatch, getState) => {
      const token = getState().auth.token;
      Axios.post('/api/users/edit', {token, key: 'name', value: name})
      .then((res) => {
          dispatch(editName(name));
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

export const getFacebookUrl = () => {
    const stringifiedParams = queryString.stringify({
      client_id: process.env.FB_APP_ID,
      redirect_uri: process.env.FB_REDIRECT_URL,
      scope: 'email', // comma seperated string
      response_type: 'code',
      auth_type: 'rerequest',
      display: 'popup',
    });
    return `https://www.facebook.com/v8.0/dialog/oauth?${stringifiedParams}`;
}

export const getGoogleUrl = () => {
    return Axios.get('/google/url')
    .then((res) => {
      return res.data;
    })
    .catch((e) =>{
      console.log(e);
    });
}
export const startLogin = (email, password, setError, history) => {
    return (dispatch, getState) => {
        Axios.post('/api/users/login', {email, password})
        .then((res) => {
            const {user, token} = res.data;
            dispatch(login(token, user.name));
            history.push('/')
        })
        .catch((e) => {
          console.log(e);
          const error = e.response && e.response.data && e.response.data.error;
          setError(error || e.response.statusText);
        });
    }
}
export const startLoginThirdParty = (path, code, history) => {
    return (dispatch, getState) => {
        Axios.post(`/api/users/login${path}`, {code})
        .then((res) => {
            const {user, token} = res.data;
            dispatch(login(token, user.name));
            history.push('/')
        })
        .catch((e) => {
          console.log(e.response);
        });
    }
}
export const startSignUp = (data, setError, history) => {
  return (dispatch, getState) => {
      Axios.post('/api/users/signup', {...data})
      .then((res) => {
          const {user, token} = res.data;
          dispatch(login(token, user.name));
          history.push('/')
      })
      .catch((e) => {
        const error = e.response && e.response.data && e.response.data.error;
        setError(error || e.response.statusText);
      });
  }
}