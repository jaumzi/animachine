import React, { createContext, useState } from 'react'
import { axiosConfig } from './ApiConfig';
import Loading from 'components/Loading/Loading';
import { useCookies } from 'react-cookie';
import { STORAGE_USER, STORAGE_HAVE_LEGAL_AGE } from 'config/ConstantsConfig';
import { useSnackbar } from 'notistack'; 
import DefaultSnackbar from 'components/Snackbar/DefaultSnackbar';
import { SnackbarVariants } from 'components/Snackbar/SnackbarVariants';

const COOKIE_TIME = () => {
  const now = new Date();
  const days = 120; // numero de dias
  const expire = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate() + days);

  return expire;
};
const COOKIE_OPTIONS = { path: '/', expires: COOKIE_TIME() };

const AppContext = createContext({
  loading: false,
  aplicationInit: false,
  user: undefined,
  notification: false,
  loadingMsg: () => { },
  verifyLogin: async () => { },
  login: () => { },
  logout: () => { },
  showNotification: () => { },
  api: () => { },
});

function AppContextProviderComponent(props) {
  const { children } = props;
  const { 
    enqueueSnackbar, 
    // closeSnackbar 
  } = useSnackbar();

  const [cookies, setCookie, removeCookie] = useCookies([STORAGE_USER, STORAGE_HAVE_LEGAL_AGE]);

  const [state, setState] = useState({
    loading: false,
    loadingText: "Carregando",
    user: cookies[STORAGE_USER] || undefined,
    aplicationInit: true, // false, // usado para verificar antes se existe cookie e um usuario logado, executa 'verifyLogin' 
    notification: undefined,
    haveLegalAge: cookies[STORAGE_HAVE_LEGAL_AGE] || false,
  });
  const { loading, loadingText, user } = state;

  const loadingMsg = (show = false, loadingText = "Carregando") => {
    setState((prev) => {
      return {
        ...prev,
        loading: show,
        loadingText,
      };
    });
  };
  const verifyLogin = async () => {
    if (user) {
      //   const axios = await api();
      //   setState((prev) => {
      //     return {
      //       ...prev,
      //       aplicationInit: false,
      //     };
      //   });
      //   axios
      //     .post("/usuario/login_validate")
      //     .then(({ data }) => {
      //        login(data);
      //     })
      //     .catch(
      //       ({
      //         response: {
      //           data: { error },
      //         },
      //       }) => {
      //         setState((prev) => {
      //           return {
      //             ...prev,
      //             aplicationInit: true,
      //             user: undefined,
      //           };
      //         });
      //       }
      //     );
    } else {
      //   setState((prev) => {
      //     return {
      //       ...prev,
      //       aplicationInit: true,
      //       user: undefined,
      //     };
      //   });
    }
  };

  const login = (user) => {
    enqueueSnackbar('I love hooks', {
      variant: SnackbarVariants.WARNING,
      autoHideDuration: 99000,
      preventDuplicate: true,
      persist: false,
      hideIconVariant: false,
      content: (key, message) => (
        <DefaultSnackbar id={key} message={message} variant='warning' />
      ),
    });
    // setCookie(STORAGE_USER, user, COOKIE_OPTIONS);

    // setState((prev) => {
    //   return {
    //     ...prev,
    //     aplicationInit: true,
    //     user,
    //   };
    // });
  };
  const logout = () => {
    removeCookie(STORAGE_USER, COOKIE_OPTIONS);

    setState((prev) => {
      return {
        ...prev,
        user: undefined,
      };
    });
  };

  const showNotification = (
    type = "info",
    title,
    msg = "",
    action = undefined,
    showTime = 2500
  ) => {
    setState((prev) => {
      return {
        ...prev,
        notification: {
          type,
          msg,
          action,
          title,
        },
      };
    });
    if (showTime > 0) {
      setTimeout(() => {
        closeNotification();
      }, showTime);
    }
  };
  const closeNotification = () => {
    setState((prev) => {
      return {
        ...prev,
        notification: undefined,
      };
    });
  };

  const api = () => {
    return axiosConfig(showNotification, loadingMsg);
  }

  const confirmLegalAge = () => {
    setCookie(STORAGE_HAVE_LEGAL_AGE, true, COOKIE_OPTIONS);

    setState((prev) => {
      return {
        ...prev,
        haveLegalAge: true,
      };
    });
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        loadingMsg,
        verifyLogin,
        login,
        logout,
        showNotification,
        api,
        confirmLegalAge,
      }}
    >
      <Loading open={loading} text={loadingText} />
      {/* <Toast notification={notification} close={closeNotification} /> */}
      {children}
    </AppContext.Provider>
  );
}

const AppContextProvider = AppContextProviderComponent;

export { AppContextProvider, AppContext };
