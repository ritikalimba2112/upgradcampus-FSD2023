import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { Link } from "react-router-dom"
import { connect } from "react-redux";
import { setSearchItemName } from '../../store/actions/searchBarActions';
import './NavBar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import AddBoxIcon from '@mui/icons-material/AddBox';



const Search = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginRight: theme.spacing(2),
   marginLeft: 0,
   width: 'auto',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing("5%"),
      marginRight: theme.spacing("5%"),
      width: 'auto',
      minWidth: '40%'
   },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
         width: '20ch',
      },
   },
}));

let MenuAppBar = ({ isLogin, isAdmin, onSignOut, onSetSearchItemName }) => {
   const onSearchBoxChange = (e) => {
      // console.log(e.target.value)
      onSetSearchItemName(e.target.value)
   }
   return (
      <Box>
         <AppBar className="NavBar" position="fixed">
            <Toolbar>
               <Link className="link" to="/">
                  <IconButton
                     className="IconButton"
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                  >

                     <ShoppingCartIcon />

                  </IconButton>
               </Link>
               <Link className="link" to="/">
                  <Typography variant="h6">
                     upGrad E-shop
                  </Typography>
               </Link>
               {isLogin &&
                  <Search
                     className='SearchBox'
                  >
                     <SearchIconWrapper>
                        <SearchIcon />
                     </SearchIconWrapper>
                     <StyledInputBase

                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={(e) => onSearchBoxChange(e)}
                     />
                  </Search>
               }
               {!isLogin &&
                  <Stack direction="row" spacing={2} padding={1} style={{ marginLeft: 'auto' }}>
                     <Link
                        className="link"
                        to="/login">
                        <Button color="inherit">
                           Login
                        </Button>
                     </Link>

                     <Link
                        className="link"
                        to="/signup">
                        <Button color="inherit">
                           Sign Up
                        </Button>
                     </Link>
                  </Stack>
               }

               {isLogin &&
                  <Stack
                     direction="row"
                     spacing={2}
                     padding={1}
                     style={{ marginLeft: 'auto' }}>
                     <Link className="link" to="/">
                        <Button color="inherit">
                           Home
                        </Button>
                     </Link>
                     {isAdmin && <Link
                        className="link"
                        to="/addproduct">
                        <Button
                           color="inherit"
                           startIcon={<AddBoxIcon />}>
                           Add Product
                        </Button>
                     </Link>}
                     <Button
                        className="LogoutButton"
                        variant='contained'
                        onClick={() => onSignOut()}
                        startIcon={<LogoutIcon />}>
                        Logout
                     </Button>
                  </Stack>
               }



            </Toolbar>
         </AppBar>
      </Box >
   );
}
const mapSateToProps = (state) => {
   return {
      isLogin: state.auth.isLogin,
      isAdmin: state.auth.isAdmin,
      searchItemName: state.searchBar.searchItemName
   }
}
const mapDispatchToProps = (dispatch) => {
   return {
      onSignOut: () => {
         //clear token from local storage
         localStorage.removeItem('token');
         dispatch({ type: 'SIGN_OUT' })
      },
      onSetSearchItemName: (name) => dispatch(setSearchItemName(name))
   }
}
export default connect(mapSateToProps, mapDispatchToProps)(MenuAppBar);