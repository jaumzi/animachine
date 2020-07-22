import React from 'react';
import ResponsiveModal from 'components/Modal/ResponsiveModal';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { ROUTES } from 'config/RoutesConfig';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  link: {
    textDecorationColor: theme.palette.primary,
    margin: '0px 4px !important',
    color: 'inherit',

    '&:hover': {
      color: 'inherit',
    },
  },
}));

function LegalAgeModalForm(props) {
  const { open, confirmLegalAge } = props;
  const classes = useStyles();

  return (
    <ResponsiveModal
      title="Aviso legal (+18)"
      open={open}
      noClose
      actions={(
        <>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            spacing={1}
            style={{ width: '100%' }}
          >
            <Grid item >
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
                spacing={3}
                style={{ width: '100%' }}
              >
                <Grid item xs={6} >
                  <Typography variant="body2" align="right" color="secondary" >
                    <Link href={ROUTES.FAQ.src()} to={ROUTES.FAQ.src()} variant="body2" className={classes.link} >
                      FAQ
              </Link>
                  </Typography>
                </Grid>
                <Grid item xs={6} >
                  <Typography variant="body2" align="left" color="secondary" >
                    <Link href={ROUTES.TERMS.src()} to={ROUTES.TERMS.src()} variant="body2" className={classes.link} >
                      Regulamentos
              </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item >
              <Button onClick={confirmLegalAge} color="primary">
                Sim, tenho mais de 18 anos
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    >
      Este site se destina a somente a adultos maiores de 18 anos, caso não seja um pedimos que não utilize nossos serviços.
      <br />
      <br />
      Você tem mais de 18 anos?
    </ResponsiveModal>
  );
}

export default LegalAgeModalForm;
