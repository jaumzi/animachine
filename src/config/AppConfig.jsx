import React from 'react'
import Theme from 'components/Theme/Theme';
import { AppContextProvider } from './AppContext';
import Routes from 'components/Routes/Routes';
import { CookiesProvider } from 'react-cookie';
import SnackbarConfig from './SnackbarConfig';
import './YupConfig';

export default function AppConfig() {
  return (
    <Theme dark>
      <CookiesProvider>
        <SnackbarConfig>
          <AppContextProvider>
            <Routes />
          </AppContextProvider>
        </SnackbarConfig>
      </CookiesProvider>
    </Theme>
  )
}
