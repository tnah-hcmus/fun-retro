import React from 'react';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';
import {logout} from '../../../actions/auth/auth';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
const SessionButton = (props) => {
    return (
      <div style={{ position: 'relative' }}>
        <Button
        variant="contained"
        color="secondary"
        startIcon={<AccountIcon />}
        onClick={props.user ? props.logout : () => props.history.push('/login')}
        >
         {props.user ? 'Logout' : 'Login'}
        </Button>
      </div>
    );
};

const mapDispatchToProps = {
  logout
}
export default connect(null, mapDispatchToProps)(withRouter(SessionButton));
