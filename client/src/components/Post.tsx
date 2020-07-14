import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      maxWidth: 345,
      height: '100%',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    actionArea: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    media: {
      width: 345,
      height: 140,
    },
    content: {
      width: 345,
      boxSizing: 'border-box',
    },
    title: {
      textOverflow: 'ellipsis',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    body: {
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: 4,
    },
    remove: {
      width: '100%',
    },
  })
);

type PostProps = {
  id: number;
  title: string;
  body: string;
  removePost: (id: number) => void;
};

const Post: React.FC<PostProps> = ({ id, title, body, removePost }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.actionArea}>
        <CardMedia
          className={classes.media}
          image="https://devblog.axway.com/wp-content/uploads/blog-572x320-image-device.png"
          title="Image"
        />
        <CardContent className={classes.content}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.title}
          >
            {title[0].toUpperCase() + title.slice(1)}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.body}
          >
            {body[0].toUpperCase() + body.slice(1)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          color="secondary"
          className={classes.remove}
          onClick={() => removePost(id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
