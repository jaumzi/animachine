import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import DefaultRoute from 'components/Routes/DefaultRoute';
import { RoutesConfig } from 'config/RoutesConfig';


const AplicationRoutes = (
  <Switch>
    {RoutesConfig.map((rc, i) => (
      <DefaultRoute
        // eslint-disable-next-line react/no-array-index-key
        key={`${rc.path}r${i}`}
        exact={!!rc.path}
        path={rc.path}
        component={lazy(() => (rc.component))}
      />
    ))}
  </Switch>
);

function Routes() {
  return (
    <>
      <Router>
        <Suspense fallback={<Loading invisible />}>
          {AplicationRoutes}
        </Suspense>
      </Router>
    </>
  );
}

export default Routes;
