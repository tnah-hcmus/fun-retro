import React from 'react';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';

const LoginButton = (props) => {
    return (
      <div style={{ position: 'relative' }}>
        <Button
        variant="contained"
        color="secondary"
        startIcon={<AccountIcon />}
        >
         {props.user ? 'Logout' : 'Login'}
        </Button>
      </div>
    );
};

export default LoginButton;
