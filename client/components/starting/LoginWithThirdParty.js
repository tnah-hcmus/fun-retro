import React, {useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import {startLoginThirdParty} from '../../actions/auth/auth';
import {connect} from 'react-redux';
import * as queryString from 'query-string';
import Loading from '../common/LoadingPage';


const LoadingLogin = (props) => {
  useEffect(() => {
    const params = queryString.parse(props.location.search);
    const path = props.location.pathname.includes('google') ? 'Google' : 'FB';
    if(params.error) props.history.push('/');
    else {
      props.loginThirdParty(path, params.code, props.history)
    }
  })
  return (
    <Loading/>
  );
}
const mapDispatchToProps = {
  loginThirdParty: startLoginThirdParty,
}
export default connect(null, mapDispatchToProps)(withRouter(LoadingLogin));