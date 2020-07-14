import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Container } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    title: {
      width: '100%',
      textAlign: 'center',
    },
  })
);

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            VYV posts system
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
