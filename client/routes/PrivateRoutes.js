import React from 'react';
import { Route, Redirect, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import StartPage from '../components/starting/StartingTemplate';
import LoadingLogin from '../components/starting/LoginWithThirdParty';
import Copyright from '../components/common/Copyright';
import ListBoard from '../components/board/ListBoard';
import BoardView from '../components/board/BoardView';
import NotFound from '../components/common/404';
import App from '../components/layout/Layout.js';

const PrivateRoutes = props => {
  if (props.isAuthenticated) {
    return (
      <App>
        <Switch>
              <Route path="/" component={ListBoard} exact/>
              <Route path="/boards" component = {ListBoard}/>
              <Route path= "/board/:id" component = {BoardView}/>
              <Route path="/404" component={NotFound} />         
              <Redirect to="/404" />
        </Switch>
      </App>
    );
  } else {
    return (
        <Switch>
            <Route path="/" component={StartPage} exact/>
            <Route path= "/board/:id" render = {({match}) => <App><BoardView match = {match}/></App>}/>
            <Route path="/login" component={StartPage} exact/>
            <Route path="/auth/google" component={LoadingLogin} />
            <Route path="/auth/facebook" component={LoadingLogin} />
            <Route path="/404" component={NotFound} />         
            <Redirect to="/404" />
        </Switch>
    );
  }
};


const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export default connect(mapStateToProps)(PrivateRoutes);