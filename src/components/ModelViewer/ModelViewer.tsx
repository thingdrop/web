/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ReactElement } from 'react';
import { Suspense } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';

import Controls from './Helpers/Controls';
import Loader from './Helpers/Loader';

const ThreeCanvas = styled(Canvas)<any>`
  background-color: transparent;

  &:hover {
    border-radius: var(--border-radius-large);
    border: var(--border-thin) solid var(--color-secondary);
  }
`;

const ModelNav = styled.nav``;

const ModelViewer = (): ReactElement => {
  const devUrl =
    'https://dev-thingdrop-public.s3.amazonaws.com/1615055481954-3dbenchy.glb'; // TODO: Take this as a param

  return (
    <ThreeCanvas concurrent>
      <Suspense fallback={null}>
        <hemisphereLight intensity={0.5} />
        <spotLight intensity={0.5} position={[-500, 500, 500]} />
        <pointLight intensity={0.5} position={[2000, -2000, 2000]} />
        <perspectiveCamera
          fov={35}
          aspect={16 / 9}
          near={0.1}
          far={1000}
          position={[-350, -100, 1000]}
          up={[0, 0, 1]}
        />
        <Controls />
        <Loader url={devUrl} />
      </Suspense>
    </ThreeCanvas>
  );
};

export default ModelViewer;
