import { useContext, useEffect, useRef, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import GoogleMapReact from 'google-map-react';
import { BBox, GeoJsonProperties } from "geojson";
import * as Supercluster from "supercluster";
import useSuperCluster from 'use-supercluster';

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
  const [bounds, setBounds] = useState<any[4]>();
  const [zoom, setZoom] = useState(10);
  const { playlistStats } = useContext<PlaylistStatsContextType | null>(
    PlaylistStatsContext
  ) as PlaylistStatsContextType;

  const { slug, fileId } = useParams<{ slug: string; fileId: string }>();

  const { clusters } = useSuperCluster({
    points: playlistStats?.listeners ?? [],
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 25
    }
  });

  return (
    <main className='playlist-stats-page'>
      <Container fluid='xl'>
        <nav className='wave-path'>
          <a href={`/wave-comment/${slug}`}>{slug}</a>
          <span>{'>'}</span>
          <a href=''>{fileId}</a>
        </nav>
        <div className='map-container'>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={playlistStats?.center}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                bounds.nw.lng,
                bounds.se.lat,
                bounds.se.lng,
                bounds.nw.lat,
              ]);
            }}
          >
            {
              clusters.map((cluster, index) => {
                const [longitude, latitude] = cluster.geometry.coordinates;
                const { cluster: isCluster, point_count: pointCount } =
                  cluster.properties as any;

                return (
                  <SimpleMarker
                    key={index}
                    lat={latitude}
                    lng={longitude}
                    count={isCluster ? pointCount : 1}
                    name='My Marker'
                    color='blue'
                  />
                );
              })
            }
          </GoogleMapReact>
        </div>
      </Container>
    </main>
  );
};

export default PlaylistStatsPage;
