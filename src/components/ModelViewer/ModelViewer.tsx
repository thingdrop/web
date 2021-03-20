/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ReactElement, useRef, Suspense, useEffect } from 'react';
import styled from 'styled-components';
import { Canvas } from 'react-three-fiber';
import {
  useGLTF,
  TrackballControls,
  Html,
  useProgress,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import { usePosition } from '@/hooks';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ThreeCanvas = styled(Canvas)<any>`
  background-color: transparent;

  &:hover {
    border-radius: var(--border-radius-large);
    border: var(--border-thin) solid var(--color-secondary);
  }
`;

const ModelNavContainer = styled.div<any>`
  top: ${({ bottom }) => `${bottom}px`};
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  position: absolute;
  z-index: 999;
  display: none;
  height: 80px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: #c0c0c0;

  ${Container}:hover & {
    display: flex;
  }
`;

const fitCameraToObject = (camera, object, controls) => {
  const offset = 1.25;

  const boundingBox = new THREE.Box3();

  boundingBox.setFromObject(object);

  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  boundingBox.getCenter(center);
  boundingBox.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

  cameraZ *= offset;

  camera.position.z = cameraZ;

  const minZ = boundingBox.min.z;
  const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

  camera.far = cameraToFarEdge * 3;
  camera.updateProjectionMatrix();

  if (controls) {
    controls.target = center;
    controls.maxDistance = cameraToFarEdge * 2;
  } else {
    camera.lookAt(center);
  }
};

const LoadingBar = (): ReactElement => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

const Scene = (): ReactElement => {
  const devUrl =
    'https://dev-thingdrop-public.s3.amazonaws.com/1615055481954-3dbenchy.glb'; // TODO: Take this as a param

  const { scene }: any = useGLTF(devUrl);
  const mesh = useRef(null);
  const camera = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    if (
      mesh.current != null &&
      camera.current != null &&
      controls.current != null
    )
      fitCameraToObject(camera.current, mesh.current, controls.current);
  }, [mesh, camera, controls]);

  return (
    <>
      <hemisphereLight intensity={0.5} />
      <spotLight intensity={0.5} position={[-500, 500, 500]} />
      <pointLight intensity={0.5} position={[2000, -2000, 2000]} />
      <PerspectiveCamera
        near={0.1}
        far={1000}
        aspect={16 / 9}
        lookAt={scene.position}
        ref={camera}
      />

      <mesh
        ref={mesh}
        geometry={scene.children[0].geometry}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial color="#fff" />
      </mesh>
      <TrackballControls ref={controls} />
    </>
  );
};

const ModelViewer = (): ReactElement => {
  const canvas = useRef(null);

  const { left, right, bottom, height, top, width } = usePosition(ThreeCanvas);

  return (
    <Container ref={canvas}>
      <ModelNavContainer
        left={left}
        right={right}
        bottom={bottom}
        height={height}
        top={top}
        width={width}
      />
      <ThreeCanvas concurrent>
        <Suspense fallback={<LoadingBar />}>
          <Scene />
        </Suspense>
      </ThreeCanvas>
    </Container>
  );
};

export default ModelViewer;
