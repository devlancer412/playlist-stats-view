import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { PlaylistStatsContext } from '@context/PlaylistStatsContext';
import PlaylistPage from '@views/PlaylistStatsPage';
import SoundCreditLoader from '../../components/SoundCreditLoader';
import Routes from '@routes/routes';

const PlaylistWrapper = () => {
  const { playlistStats, isLoading, fetchPlaylistStats, error } =
    React.useContext(PlaylistStatsContext) as PlaylistStatsContextType;

  const { slug, fileId } = useParams<{ slug: string; fileId: string }>();
  const history = useHistory();

  const showLoading = useMemo(() => {
    return isLoading || (!isLoading && error);
  }, [isLoading, error]);

  useEffect(() => {
    if (!playlistStats && !isLoading && !error) {
      fetchPlaylistStats(slug, parseInt(fileId)).catch((err: any) => {
        const errorCode = err?.response?.status;
        switch (errorCode) {
          case 404:
            history.push(Routes.Error404.path);
            return;
          case 403:
            const errorParams403 = {
              errorCode: null,
              title: 'Time expired!',
              subtitle: 'Tickets are only valid for a certain amount of time',
              description: '',
            };

            history.push({
              pathname: Routes.Error.path,
              state: errorParams403,
            });
            return;
          case 410:
            const errorParams410 = {
              errorCode: null,
              title: 'Sold out!',
              subtitle: 'Tickets are no longer available',
              description: '',
            };

            history.push({
              pathname: Routes.Error.path,
              state: errorParams410,
            });
            return;
          default:
            const errorParams = {
              errorCode: null,
              title: 'Whoops! Something went wrong',
              subtitle: 'Sorry about that',
              description: errorCode ? `Error Code: ${errorCode}` : '',
            };

            history.push({
              pathname: Routes.Error.path,
              state: errorParams,
            });
            return;
        }
      });
    }
  }, [
    fetchPlaylistStats,
    isLoading,
    playlistStats,
    slug,
    error,
    history,
    fileId,
  ]);

  return showLoading ? <SoundCreditLoader theme='dark' /> : <PlaylistPage />;
};

export default PlaylistWrapper;
