import { Suspense } from 'react';
import AppRoutes from './routes';

import SuspensePage from '@views/Suspense';

import '@styles/styles.scss';
import PlaylistContextProvider from '@context/PlaylistStatsContext';
import ThemeContextProvider from '@context/ThemeContext';

function App() {
  return (
    <Suspense fallback={<SuspensePage />}>
      <PlaylistContextProvider>
        <ThemeContextProvider>
          <AppRoutes />
        </ThemeContextProvider>
      </PlaylistContextProvider>
    </Suspense>
  );
}

export default App;
