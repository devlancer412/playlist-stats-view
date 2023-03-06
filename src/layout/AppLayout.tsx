import { useContext, useEffect } from 'react';

import { ThemeContext } from '@context/ThemeContext';

import Header from './Header';

import themeVariables from '@styles/variables.module.scss';
import { ErrorBoundary } from 'react-error-boundary';
import GenericErrorPage from '@views/errors/GenericErrorPage';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = (props: AppLayoutProps) => {
  const { isMobile } = useContext<ThemeContextType | null>(
    ThemeContext
  ) as ThemeContextType;
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  useEffect(() => {
    window.addEventListener('resize', appHeight);
    appHeight();
    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  return (
    <>
      <Header />
      <ErrorBoundary FallbackComponent={GenericErrorPage}>
        <div
          style={{
            height: isMobile
              ? themeVariables.mobileContentHeight
              : themeVariables.contentHeight,
            overflowY: 'auto',
          }}
        >
          {props.children}
        </div>
      </ErrorBoundary>
    </>
  );
};

export default AppLayout;
