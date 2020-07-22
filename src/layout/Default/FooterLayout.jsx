import React, { memo } from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ROUTES } from 'config/RoutesConfig';
import DefaultCopyright from 'components/Copyright/DefaultCopyright';
import DefaultLink from 'components/Link/DefaultLink';

const useStyles = makeStyles((theme) => ({ 
  link: {
    margin: theme.spacing(1, 1.5),
  },
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  content: {
    padding: theme.spacing(8, 0, 6),
  },
  paper: {
    width: '100%',
    height: '100%',
    padding: '4px 12px 16px',
  }
}));

function FooterLayout() {
  const classes = useStyles();

  const footers = [
    {
      title: 'Sobre',
      description: [
        { label: 'Apresentação', url: ROUTES.DEFAULT.src() },
      ],
    },
    {
      title: 'Top 5 Profissionais',
      description: [
        { label: 'Cute Cat', url: ROUTES.DEFAULT.src() },
        { label: 'Cute Cat', url: ROUTES.DEFAULT.src() },
        { label: 'Cute Cat', url: ROUTES.DEFAULT.src() },
        { label: 'Cute Cat', url: ROUTES.DEFAULT.src() },
        { label: 'Cute Cat', url: ROUTES.DEFAULT.src() },
      ],
    },
    {
      title: 'Categorias',
      description: [
        { label: 'Apresentação', url: ROUTES.DEFAULT.src() },
      ],
    },
    {
      title: 'Informações legais',
      description: [
        { label: 'Politica de privacidade', url: ROUTES.POLICY.src() },
        { label: 'Termos de uso', url: ROUTES.TERMS.src() }
      ],
    },
  ];

  return (
    <>
      <div className={classes.content}>
        <Container component="footer" className={classes.footer}>
          <Grid container spacing={4} justify="space-evenly" alignItems="stretch">
            {footers.map((footer) => (
              <Grid item xs={6} sm={3} key={footer.title} >
                <Paper variant="outlined" className={classes.paper}>
                  <Typography variant="h6" color="secondary" gutterBottom>
                    {footer.title}
                  </Typography>
                  <ul>
                    {footer.description.map((item, i) => (
                      <li key={`${i}-${item.label}`}>
                        <DefaultLink
                          to={item.url}
                          variant="subtitle1"
                          color="textSecondary"
                          className={classes.link}
                        >
                          {item.label}
                        </DefaultLink>
                      </li>
                    ))}
                  </ul>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Box mt={5}>
            <DefaultCopyright />
          </Box>
        </Container>
      </div>
    </>
  );
}

export default memo(FooterLayout);
