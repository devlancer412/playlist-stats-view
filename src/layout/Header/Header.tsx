import { useContext } from 'react';
import { Container, Image, Navbar } from 'react-bootstrap';

import { ThemeContext } from '@context/ThemeContext';
import './Header.scss';

const Header = () => {
  const { isMobile } = useContext<ThemeContextType | null>(
    ThemeContext
  ) as ThemeContextType;

  return (
    <Navbar bg='primary' className='header'>
      <Container fluid='xl'>
        <Navbar.Brand href={process.env.REACT_APP_SOUND_CREDIT_SITE}>
          <Image
            src={isMobile ? '/img/sound-credit-white-logo.svg' : '/logo.svg'}
            alt='sound credit logo'
          />
        </Navbar.Brand>
        {isMobile && (
          <Navbar.Collapse className='justify-content-end'>
            <h1>SOUND CREDIT PLAYLIST</h1>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
