import React, { memo } from 'react';
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function Loading(props) {
  const { text, open = false } = props;
  const classes = useStyles();
  return (
    <Backdrop {...props} className={classes.backdrop} open={open}>
      <Grid container direction="column" justify="center" alignItems="center" spacing={1} >
        <Grid item>
          <CircularProgress color="primary" disableShrink />
        </Grid>
        {text && (
          <Grid item>
            <Typography variant="h5" >{text}</Typography>
          </Grid>
        )}
      </Grid>
    </Backdrop>
  );
}

export default memo(Loading);
