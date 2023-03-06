import React, { useMemo, useEffect } from 'react';
import { MockedFilesApiService } from '@api/filesApi';

interface PlaylistStatsContextProviderProps {
  children: React.ReactNode;
}
export const PlaylistStatsContext =
  React.createContext<PlaylistStatsContextType | null>(null);

const PlaylistStatsContextProvider = ({
  children,
}: PlaylistStatsContextProviderProps) => {
  const [playlistStats, setPlaylistStats] =
    React.useState<PlaylistStatsType | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<any>(null);

  const isDrip = useMemo(
    () => playlistStats?.displayMode === 'drip',
    [playlistStats?.displayMode]
  );

  const fetchPlaylistStats = async (slug: string, fileId: number) => {
    try {
      setIsLoading(true);
      console.log('fetching playlistStats');

      const fetchedPlaylistStats = await (process.env.REACT_APP_IS_DRIP ===
        'true'
        ? MockedFilesApiService.viewDripStats
        : MockedFilesApiService.viewPlaylistStats)(slug, fileId);

      setPlaylistStats(fetchedPlaylistStats);
    } catch (err: any) {
      const errorCode = err?.response?.status;
      switch (errorCode) {
        case 401:
          throw err;
        default:
          setError(err);

          throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PlaylistStatsContext.Provider
      value={{
        playlistStats,
        fetchPlaylistStats,
        isDrip,
        isLoading,
        error,
      }}
    >
      {children}
    </PlaylistStatsContext.Provider>
  );
};

export default PlaylistStatsContextProvider;
