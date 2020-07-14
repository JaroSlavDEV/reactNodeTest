import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Header';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Posts from './components/Posts';
import Footer from './components/Footer';
import PrivateRoute from './hoc/PrivateRoute';
import { UserState } from './context/user/UserState';
import { PostState } from './context/post/PostState';
import { makeStyles, createStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      flex: 1,
    },
  })
);

const App: React.FC = () => {
  const classes = useStyles();
  
  return (
    <Fragment>
      <UserState>
        <PostState>
          <BrowserRouter>
            <Navbar />
            <Container className={classes.container}>
              <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute
                  path="/posts"
                  component={Posts}
                />
              </Switch>
            </Container>
            <Footer />
          </BrowserRouter>
        </PostState>
      </UserState>
    </Fragment>
  );
};

export default App;
