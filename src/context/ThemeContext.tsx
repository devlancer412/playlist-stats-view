import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface ThemeContextProviderProps {
  children: React.ReactNode;
}
export const ThemeContext = React.createContext<ThemeContextType | null>(null);

const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 932px)' });

  return (
    <ThemeContext.Provider value={{ isMobile }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
