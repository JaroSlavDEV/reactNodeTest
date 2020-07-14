import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import Post from './Post';
import { PostContext } from '../context/post/postContext';

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      padding: '75px 0 100px',
    },
    posts: {
      textAlign: 'center',
      marginBottom: 50,
    },
    gripPost: {
      width: '30%',
    },
  })
);

const Posts: React.FC = () => {
  const classes = useStyles();
  const { loading, posts, removePost } = useContext(PostContext);

  return (
    <Container className={classes.container}>
      <Typography variant="h4" className={classes.posts}>
        Posts
      </Typography>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
          {loading ? (
            <CircularProgress />
          ) : (
            posts.map(({ id, title, body }) => (
              <Grid key={id} item className={classes.gripPost}>
                <Post
                  id={id}
                  title={title}
                  body={body}
                  removePost={removePost}
                />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
