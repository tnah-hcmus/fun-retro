import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { HomeOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import LoginButton from '../common/button/LoginButton';
import {connect} from 'react-redux';
import Full from '../../Full';
const useStyles = makeStyles(() => ({
    mainTitle: {
        flexGrow: 1,
        color: 'white',
        cursor: 'pointer',
    },
    homeButton: {
        flex: 1,
        display: 'none',
    },
}));


const App = (props) => {
  const classes = useStyles();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className = {classes.mainTitle} variant="h6" color="inherit">
            Retrospected
          </Typography>
          <div className = {classes.homeButton}>
            <IconButton color="inherit" aria-label="Home">
              <HomeOutlined />
            </IconButton>
          </div>
          <LoginButton user = {props.isAuthenticated}/>
        </Toolbar>
      </AppBar>
      <Full/>
    </>
  );
}


const mapStateToProps = state => {
    return {
      isAuthenticated: !!state.auth.token
    };
  };
  
export default connect(mapStateToProps)(App);