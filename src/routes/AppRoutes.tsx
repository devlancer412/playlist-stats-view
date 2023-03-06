import { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppLayout from '@layout/AppLayout';
import ExternalRedirect from '@routes/ExternalRedirect';
import Routes from './routes';

const PlaylistWrapper = lazy(() => import('@views/PlaylistStatsWrapper'));
const Error404Page = lazy(() => import('@views/errors/Error404Page'));
const GenericErrorPage = lazy(() => import('@views/errors/GenericErrorPage'));

const AppRoutes = () => {
  return (
    <AppLayout>
      <BrowserRouter>
        <Switch>
          <Route path={Routes.Error404.path} component={Error404Page} />
          <Route path={Routes.Error.path} component={GenericErrorPage} />
          <Route path={Routes.Playlist.path} component={PlaylistWrapper} />
          <ExternalRedirect
            exact
            path={Routes.Home.path}
            link={process.env.REACT_APP_SOUND_CREDIT_SITE || ''}
          />
        </Switch>
      </BrowserRouter>
    </AppLayout>
  );
};

export default AppRoutes;
