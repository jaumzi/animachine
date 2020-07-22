import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Typography, Link, Toolbar } from '@material-ui/core';
import LayoutConfig from 'config/LayoutConfig';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { NAMEAPP } from 'config/ConstantsConfig';
import { ROUTES } from 'config/RoutesConfig';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  container: {
    height: '100%',
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

function InstitucionalLayout(props) {
  const { children, title, size } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <LayoutConfig title={title}>
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              {NAMEAPP}
            </Typography>
            <nav>
              <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Features
              </Link>
              <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Enterprise
              </Link>
              <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Support
              </Link>
            </nav>
            <Button
              color="primary"
              variant="outlined"
              className={classes.link}
              onClick={() => history.push({ pathname: ROUTES.LOGIN.src() })}
            >
              Login
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth={size ?? 'lg'} className={classes.container}>
          {children}
        </Container>
      </LayoutConfig>
    </>
  );
}

export default InstitucionalLayout;
