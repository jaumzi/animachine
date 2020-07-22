import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { ROUTES } from 'config/RoutesConfig';
import { makeStyles } from '@material-ui/core/styles';
import { NAMEAPP } from 'config/ConstantsConfig';
import StylezedLink from 'components/Link/DefaultLink';

const useStyles = makeStyles(theme => ({
  link: {
    textDecorationColor: theme.palette.primary,
    margin: '0px 4px !important',
    color: 'inherit',

    '&:hover': {
      color: 'inherit',
    },
  },
  copyrightContract: {
    fontSize: '0.8rem !important',
  },
}));
export default function DefaultCopyright(props) {
  const { styles } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      style={{ width: '100%', marginTop: '4px', ...styles }}
    >
      <Grid item xs={6} >
        <Typography variant="body2" align="right" color="secondary" className={classes.copyrightContract} >

          <StylezedLink
            to={ROUTES.TERMS.src()}
            variant="body2"
            className={classes.link}
          >
            {'Termos'}
          </StylezedLink>
        </Typography>
      </Grid>
      <Grid item xs={6} >
        <Typography variant="body2" align="left" color="secondary" className={classes.copyrightContract} >
          <StylezedLink
            to={ROUTES.POLICY.src()}
            variant="body2"
            className={classes.link}
          >
            {'Política'}
          </StylezedLink>
        </Typography>
      </Grid>
      <Grid item xs={12} >
        <Typography variant="body2" align="center" color="textSecondary" className="copyright-text">
          {`Copyright © ${NAMEAPP} ${new Date().getFullYear()}`}
        </Typography>
      </Grid>
    </Grid>
  );
}
