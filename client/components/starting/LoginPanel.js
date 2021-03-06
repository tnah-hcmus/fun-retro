import React, {useState, useEffect} from 'react';
import {Button, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Copyright from '../common/Copyright';

const useStyles = makeStyles((theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));


const LoginPanel = (props) => {
    const classes = useStyles();
    const [googleUrl, setGoogleUrl] = useState('#');
    const [error, setError] = useState(null);
    useEffect(() => {
      props.getGoogleUrl().then((url) => setGoogleUrl(url))
    }, []);
    const handleSubmitLogin = (e) => {
      e.preventDefault();
      const email = e.target.elements.email.value;
      const password = e.target.elements.password.value;
      props.login(email, password, setError, props.history);
    }  
    return (
      <>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate onSubmit = {handleSubmitLogin}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In
        </Button>
        <Button
          href = {googleUrl}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In With Google
        </Button>
        <Button
          href = {props.facebookUrl}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Log In With Facebook
        </Button>
        {!!error && 
        <Typography variant="body2" color = "error">
          {error}
        </Typography>}
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link onClick = {() => props.toSignUp(false)} variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}>
          <Copyright />
        </Box>
      </form>
    </>
    );
}
export default React.memo(LoginPanel);