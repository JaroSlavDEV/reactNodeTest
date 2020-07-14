import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, makeStyles, createStyles } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { UserContext } from '../context/user/userContext';
import { PostContext } from '../context/post/postContext';
import { validateApi } from '../context/api';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: 'calc(100vh - 128px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    greeting: {
      marginTop: -100,
      marginBottom: 50,
    },
  })
);

const Main: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { fetchPosts } = useContext(PostContext);
  const { successSignIn, failSignIn } = useContext(UserContext);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const { data, headers } = await validateApi();
        const { authorization } = headers;
        successSignIn(data, authorization);
        fetchPosts();
        history.push('/posts');
      } catch (e) {
        failSignIn();
      }
    };

    validateUser();
  }, []);

  return (
    <Container className={classes.container}>
      <Typography variant="h2" className={classes.greeting}>
        Welcome to VYV posts system...
      </Typography>
      <Typography variant="h4">
        If you want to look at posts, please sign in
      </Typography>
    </Container>
  );
};

export default Main;
