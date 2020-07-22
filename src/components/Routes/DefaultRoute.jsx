// @flow
import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from 'config/AppContext';
import { ROUTES } from 'config/RoutesConfig';

// metedod para pegar a permissão dentro do obj user
const GetUserPermission = (user) => user?.permission;

function DefaultRoute(props) {
  const { component: Component, permissions = [], ...rest } = props;

  const ctx = useContext(AppContext);
  const { user, aplicationInit, showNotification } = ctx;

  function canPermit() {
    if (aplicationInit && (
      permissions.length === 0 || (permissions.length > 0 && !!user && permissions.includes(GetUserPermission(user)))
    )) {
      return true;
    }
    if (!aplicationInit) {
      // como é redirecionamento espera aplicacao iniciar para ter certeza do valor em user
      return true;
    }
    return false;
  }

  const permit = canPermit();

  if (aplicationInit && !permit) {
    showNotification('error', 'Acesso negado!', 'Você não possuí permissão de acesso!', undefined, 4000);
  }

  return (
    <Route
      {...rest}
      render={(props, context) =>
        permit ? (
          <Component {...props} {...context} {...rest} />
        ) : (
            <Redirect to={ROUTES.LOGIN()} />
          )
      }
    />
  );
}

export default DefaultRoute;
