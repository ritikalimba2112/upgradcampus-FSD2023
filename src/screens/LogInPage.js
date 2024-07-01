import React from 'react'
import { Alert } from '@mui/material';
import Container from '@mui/material/Container';
import LockIcon from '@mui/icons-material/Lock';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { fetchSignIn } from "../store/actions/authActions"
import CircularProgress from '@mui/material/CircularProgress';
import { Navigate } from "react-router-dom"
import "./LogInPage.css"
import FormControl from '@mui/material/FormControl';

const LogInPage = ({ isLogin, isAdmin, isRequestLogin, error, token, onSignIn }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Stack
      display={"flex"}
      spacing={2}
      alignItems={"center"}>

      <Stack
        className="LogInFullForm"
        display={"flex"}
        spacing={2}
        alignItems={"center"}>
        {/* user already logged in, then go to home */}
        {isLogin ? <Navigate to="/" /> : null}
        <Stack direction="row" spacing={2}>
          <LockIcon
            className='LockIcon' />
          <Typography variant="h3">
            Sign In
          </Typography>
        </Stack>
        <FormControl className="SignInForm" fullWidth sx={{ m: 1, width: '50ch' }}>
          <TextField
            className="Input"
            id="outlined-basic"
            label="Email Address *"
            placeholder='Enter your email here...'
            variant="outlined"
            value={email}
            onChange={event => setEmail(event.target.value)} />
          <TextField
            className="Input"
            id="outlined-basic"
            label="Password *"
            type="password"
            variant="outlined"
            value={password}
            onChange={event => setPassword(event.target.value)} />
          {
            error ?
              <Alert severity="error">Can not sign in please check your Email and Password!</Alert> :
              null
          }
          {isRequestLogin ?
            <CircularProgress /> :
            <Button
              variant="contained"
              onClick={() => onSignIn(email, password)}
              style={{ "padding": "10px", "borderRadius": "20px", "marginTop": "10px" }}>
              SIGN IN
            </Button>
          }
        </FormControl>
        <Typography variant='body' ><Link to="/signup" style={{ textDecoration: "none" }}>Don't have an account? Sign Up
        </Link></Typography>

      </Stack >
    </Stack>
  )
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    isAdmin: state.auth.isAdmin,
    isRequestLogin: state.auth.isRequestLogin,
    error: state.auth.error,
    token: state.auth.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (email, password) => dispatch(fetchSignIn(email, password)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);