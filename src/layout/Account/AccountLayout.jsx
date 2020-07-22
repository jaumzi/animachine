import React from 'react';
import { Container, Grid } from '@material-ui/core';
import LayoutConfig from 'config/LayoutConfig';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: '100vh'
  },
  container: {
    height: '100%'
  }
}));

function AccountLayout(props) {
  const { children, title, size } = props;
  const classes = useStyles();
  return (
    <>
      <LayoutConfig title={title} >
        <div className={classes.root}>
          <main className={classes.content}>
            <Container maxWidth={size ?? 'lg'} className={classes.container}>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.container}
              >
                {children}
              </Grid>
            </Container>
          </main>
        </div>
      </LayoutConfig>
    </>
  );
}

export default AccountLayout;
