import React, {useState} from 'react';
import {Avatar, CssBaseline, Paper, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import LockOutlined from '@material-ui/icons/LockOutlined';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import SignUpPanel from './SignUpPanel';
import LoginPanel from './LoginPanel';
import {getFacebookUrl, startLogin, startSignUp, getGoogleUrl} from '../../actions/auth/auth';

const facebookUrl = getFacebookUrl();
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const StartPage = (props) => {
  const classes = useStyles();
  const [panel, SetPanel] = useState(true);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          {panel 
           ? <LoginPanel
               facebookUrl = {facebookUrl}
               history = {props.history}
               login = {props.startLogin}
               getGoogleUrl = {getGoogleUrl}
               toSignUp = {SetPanel}
             /> 
           : <SignUpPanel
               facebookUrl = {facebookUrl}
               signup = {props.startSignUp}
               history = {props.history}
               getGoogleUrl = {getGoogleUrl}
               toLogin = {SetPanel}
             />
          }
        </div>
      </Grid>
    </Grid>
  );
}
const mapDispatchToProps = {
  startLogin, startSignUp
}
export default connect(null, mapDispatchToProps)(withRouter(React.memo(StartPage)));