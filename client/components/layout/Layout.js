import React, {useState} from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { HomeOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import SessionButton from '../common/button/SessionButton';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import {editNameWServer} from '../../actions/auth/auth';
import TextDialog from '../common/dialog/TextDialog';
const useStyles = makeStyles(() => ({
    mainTitle: {
        flexGrow: 1,
        color: 'white',
        cursor: 'pointer',
        textDecoration: 'none'
    },
    homeButton: {
        flex: 1,
        display: 'none',
    },
}));


const App = (props) => {
  const classes = useStyles();
  const [modal, setModal] = useState(false);
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className = {classes.mainTitle} variant="h6" color="inherit" component = {Link} to = '/'>
            Retrospected
          </Typography>
          <div className = {classes.homeButton}>
            <IconButton color="inherit" aria-label="Home">
              <HomeOutlined />
            </IconButton>
          </div>
          <SessionButton user = {props.isAuthenticated}/>
          {props.isAuthenticated && 
          <IconButton>
            <SettingsIcon fontSize = "large" style = {{color: 'white'}} onClick = {() => setModal(true)}/>
          </IconButton>}          
        </Toolbar>
      </AppBar>
      {props.children}
      <TextDialog openStatus = {modal} handleClose = {() => setModal(false)} ifAccept = {props.editName}/>
    </>
  );
}


const mapStateToProps = state => {
    return {
      isAuthenticated: !!state.auth.token
    };
  };
const mapDispatchToProps = {
  editName: editNameWServer
}
  
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(App));