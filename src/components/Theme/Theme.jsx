import React, { useMemo } from 'react';
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
  CssBaseline
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemePalleteConfig } from 'config/ThemeConfigs';

import 'typeface-roboto';

function Theme(props) {
  const { children, dark } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const type = prefersDarkMode || dark ? 'dark' : 'light';

  let theme = useMemo(
    () => {
      // eslint-disable-next-line dot-notation
      ThemePalleteConfig.palette['type'] = type;
      return createMuiTheme(ThemePalleteConfig);
    },
    [type],
  );

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default Theme;
