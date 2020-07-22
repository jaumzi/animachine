import React from 'react';
import { SnackbarProvider } from 'notistack';

function SnackbarConfig(props) {
  const { children } = props;

  return (
    <SnackbarProvider
      preventDuplicate
      maxSnack={4}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children}
    </SnackbarProvider>
  )
}

export default SnackbarConfig;
