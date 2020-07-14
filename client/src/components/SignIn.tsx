import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Container,
  CssBaseline,
  Typography,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { UserContext } from '../context/user/userContext';
import { PostContext } from '../context/post/postContext';
import { signInApi } from '../context/api';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      height: 'calc(100vh - 128px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: -200,
    },
    avatar: {
      margin: 8,
      backgroundColor: '#f50057',
    },
    form: {
      width: '100%',
      marginTop: 8,
    },
    submit: {
      margin: '24px 0px 16px',
    },
    error: {
      color: 'red',
    },
  })
);

const SignIn: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const { fetchPosts } = useContext(PostContext);
  const { loading, startSignIn, successSignIn, failSignIn } = useContext(
    UserContext
  );
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: FormEvent): Promise<any> => {
    event.preventDefault();
    startSignIn();

    try {
      const { data, headers } = await signInApi(credentials);
      const { authorization } = headers;
      successSignIn(data, authorization);
      fetchPosts();
      history.push('/posts');
    } catch (e) {
      const { message } = e.response.data;
      failSignIn();
      setError(message);
    }
  };

  return (
    <Container className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
            value={credentials.email}
            onChange={handleChange}
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
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
        </form>
        <div className={classes.error}>{error}</div>
      </div>
    </Container>
  );
};

export default SignIn;
