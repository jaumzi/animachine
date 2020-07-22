/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import {
  AppBar,
  Grid,
  IconButton,
  Container,
  Toolbar,
  Typography,
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { HideOnScroll } from 'util/Methods';
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import LayoutConfig from 'config/LayoutConfig';
// import { EnumPermissions } from 'util/Constants';
import { AppContext } from 'config/AppContext';
import { red } from '@material-ui/core/colors';
import logo from 'images/logo.svg';
import { ROUTES } from 'config/RoutesConfig';
import { NAMEAPP } from 'config/ConstantsConfig';
import LegalAgeModalForm from 'config/LegalAgeModalForm';

import './DefaultLayout.css';
import FooterLayout from './FooterLayout';
import DefaultCopyright from 'components/Copyright/DefaultCopyright';

const optionsMenu = [
  {
    name: 'Início',
    to: ROUTES.HOME.src(),
    regex: match => ROUTES.HOME.path(match),
  },
  {
    name: 'Login',
    to: ROUTES.LOGIN.src(),
    regex: match => ROUTES.LOGIN.path(match),
  },
  {
    name: 'Recuperar conta',
    to: ROUTES.ACCOUNT_RECOVERY.src(),
    regex: match => ROUTES.ACCOUNT_RECOVERY.path(match),
  },
  {
    name: 'Esqueci senha',
    to: ROUTES.FORGOT_PASSWORD.src(),
    regex: match => ROUTES.FORGOT_PASSWORD.path(match),
  },
  {
    name: 'Cadastro de usuário',
    to: ROUTES.CREATE_ACCOUNT.src(),
    regex: match => ROUTES.CREATE_ACCOUNT.path(match),
  },
];

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  avatar: {
    backgroundColor: red[500],
  },
  userDetails: {
    paddingBottom: '8px',
    borderRadius: '12px',
    margin: '12px',
    fontWeight: 'bold',
  },
  logo: {
    margin: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px 0px',
    borderRadius: '12px',
    backgroundColor: `${theme.palette.content} !important`,
  },
  userDetailsText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toolbarRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  listRoot: {
    margin: '0px 12px !important',
    maxHeight: '560px',
    overflowY: 'auto',
  },
  listItemRoot: {
    padding: '6px 12px !important',
    borderRadius: '4px',
    paddingTop: '4px',
    paddingBottom: '4px',
    marginBottom: '8px',
  },
  listItemText: {
    margin: '0 !important',
  },
}));

function DefaultLayout(props) {
  const ctx = useContext(AppContext);
  const { user, aplicationInit, haveLegalAge, confirmLegalAge } = ctx;

  const {
    children,
    title,
    container,
    size,
    location: { pathname: path },
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = aplicationInit && (
    <div id="drawer">
      <div
        className={classes.logo}
      >
        <Avatar
          alt="logo"
          variant="rounded"
          sizes=""
          src={logo}
          className="logo-img"
        />
        {/* <Typography
          variant="h6"
          color="secondary"
        >
          <strong>{NAMEAPP}</strong>
        </Typography> */}
      </div>
      <Divider />
      {!!user && (
        <div className={classes.userDetails}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            <Typography className={classes.userDetailsText}>
              {user.name}
            </Typography>
            <Typography className={classes.userDetailsText}>
              {user.email}
            </Typography>
          </Grid>
        </div>
      )}
      <Divider />
      <List
        classes={{
          root: classes.listRoot,
        }}
      >
        {/* <ListItem
          button
          onClick={() => {
            logout();
            history.push('/login');
          }}
        >
          <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
          <ListItemText primary="Sair desta conta" />
        </ListItem> */}

        {optionsMenu.map(({ name, to, regex }, i) => (
          <ListItem
            key={`${i}-${to}`}
            button
            component={Link}
            to={to}
            selected={regex(path)}
            style={{
              backgroundColor: regex(path) ? theme.palette.primary.light : '',
            }}
            classes={{
              root: classes.listItemRoot
            }}
          >
            {/* <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon> */}
            <ListItemText
              primary={name}
              classes={{
                root: classes.listItemText
              }}
              primaryTypographyProps={{
                variant: "body2"
              }}
            />
          </ListItem>
        ))}

      </List>
      <DefaultCopyright
        styles={{
          position: 'absolute',
          bottom: '10px',
        }}
      />
    </div >
  );

  return (
    <>
      <LegalAgeModalForm
        open={!haveLegalAge}
        confirmLegalAge={confirmLegalAge}
      />
      <LayoutConfig title={title}>
        <div className={classes.root}>
          <HideOnScroll {...props}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar
                classes={{
                  root: classes.toolbarRoot,
                }}
              >
                <IconButton
                  color="primary"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  className={classes.title}
                  color="textPrimary"
                >
                  {`${title || NAMEAPP}`}
                </Typography>
              </Toolbar>
            </AppBar>
          </HideOnScroll>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {drawer && (
              <>
                <Hidden smUp implementation="css">
                  <Drawer
                    container={container}
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                      keepMounted: true,
                    }}
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                  <Drawer
                    classes={{
                      paper: classes.drawerPaper,
                    }}
                    variant="permanent"
                    open
                  >
                    {drawer}
                  </Drawer>
                </Hidden>
              </>
            )}
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            {haveLegalAge ? (
              <Container maxWidth={size ?? 'lg'}>
                {children}
                <FooterLayout />
              </Container>
            ) : null}
            
          </main>
        </div>
      </LayoutConfig>
    </>
  );
}

export default withRouter(DefaultLayout);
