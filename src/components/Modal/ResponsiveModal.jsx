import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import './ResponsiveModal.css';

function ResponsiveModal(props) {
  const {
    noClose,
    open,
    children,
    title,
    actions
  } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={null}
      aria-labelledby="responsive-dialog-title"
      scroll="paper"

      {...(noClose ? {
        disableBackdropClick: true,
        disableEscapeKeyDown: true,
      } : {})}

      classes={{
        paper: 'responsiveModalDialog',
      }}
    >
      <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      {!!actions && (
        <DialogActions>
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default ResponsiveModal;
