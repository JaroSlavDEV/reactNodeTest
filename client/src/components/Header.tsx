import React, { useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  Container,
} from '@material-ui/core';
import { UserContext } from '../context/user/userContext';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    navLink: {
      textDecoration: 'none',
      color: '#fff'
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user, signOut } = useContext(UserContext);

  const handleSignIn = (): void => {
    signOut();
    history.push('/');
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <NavLink className={classes.navLink} to="/" exact>
            <Button color="inherit">Main page</Button>
          </NavLink>
          {
            !user ? (
              <NavLink className={classes.navLink} to="/signin" exact>
                <Button color="inherit">Sign In</Button>
              </NavLink>
            ) : (
              <Button color="inherit" onClick={handleSignIn}>Sign Out</Button>
            )
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
