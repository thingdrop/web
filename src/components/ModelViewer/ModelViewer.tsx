/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ReactElement } from 'react';
import { Suspense, lazy, useRef, useState } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';

const Controls = lazy(() => import('./Helpers/Controls'));

const ThreeCanvas = styled(Canvas)<any>``;

function Box(props) {
  const mesh = useRef();
  const [state, setState] = useState({ isHovered: false, isActive: false });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={state.isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setState({ ...state, isActive: !state.isActive })}
      onPointerOver={() => setState({ ...state, isHovered: true })}
      onPointerOut={() => setState({ ...state, isHovered: false })}
    >
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={state.isActive ? '#820263' : '#D90368'} />
    </mesh>
  );
}

const ModelViewer = (): ReactElement => {
  const devUrl = 'https://dev-thingdrop-public.s3.amazonaws.com/3DBenchy.stl';

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
        <Box />
      </Suspense>
    </ThreeCanvas>
  );
};

export default ModelViewer;
