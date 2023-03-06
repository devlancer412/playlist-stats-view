import { useContext, useEffect, useRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';

import { Helmet } from 'react-helmet';

import './PlaylistStatsPage.scss';
import { PlaylistStatsContext } from '@context/PlaylistStatsContext';
import { SimpleMarker } from '@components/markers';

const DEPAUW_BOUNDS = {
  north: 39.653244,
  south: 39.621949,
  west: -86.902833,
  east: -86.831743,
};

const option = {
  restriction: {
    latLngBounds: DEPAUW_BOUNDS,
    strictBounds: false,
  },

  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: false,
  fullscreenControl: false,
  clickableIcons: false,
};

const PlaylistStatsPage = () => {
  const { playlistStats } = useContext<PlaylistStatsContextType | null>(
    PlaylistStatsContext
  ) as PlaylistStatsContextType;
  const [center, setCenter] = useState<PointType | undefined>(
    playlistStats?.center
  );
  const [zoom, setZoom] = useState<number>(0);

  const { slug, fileId } = useParams<{ slug: string; fileId: string }>();

  const map = useMemo(
    () => (
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={playlistStats?.center}
        defaultZoom={11}
        center={center}
        zoom={zoom}
        onChange={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
      >
        {(playlistStats?.listeners ?? []).map((position, index) => (
          <SimpleMarker
            key={index}
            lat={position.lat}
            lng={position.lng}
            count={1}
            name='My Marker'
            color='blue'
          />
        ))}
      </GoogleMapReact>
    ),
    [center, playlistStats?.center, playlistStats?.listeners, zoom]
  );

  return (
    <main className='playlist-stats-page'>
      <Container fluid='xl'>
        <nav className='wave-path'>
          <a href={`/wave-comment/${slug}`}>{slug}</a>
          <span>{'>'}</span>
          <a href=''>{fileId}</a>
        </nav>
        <div className='map-container'>{map}</div>
      </Container>
    </main>
  );
};

export default PlaylistStatsPage;
