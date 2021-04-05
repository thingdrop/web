/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ReactElement, useRef, Suspense, useEffect, useState } from 'react';
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
import { SketchPicker } from 'react-color';

import { Select, Button } from '@/components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ThreeCanvas = styled(Canvas)<any>`
  background-color: transparent;
  border-radius: var(--border-radius-large);
  border: var(--border-thin) solid transparent;

  &:hover {
    border: var(--border-thin) solid var(--color-secondary);
  }
`;

const ModelNavContainer = styled.div<any>`
  bottom: 0;
  width: 100%;
  position: absolute;
  z-index: 999;
  display: none;
  height: 80px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: var(--color-secondary);

  ${Container}:hover & {
    display: flex;
  }
`;

const NavSelect = styled(Select)`
  min-width: 200px;
`;

const fitCameraToObject = (camera, object) => {
  const fov = 60 * (Math.PI / 180);
  const objectSize = Math.sin(Date.now() * 0.001);
  object.scale.copy(new THREE.Vector3(objectSize, objectSize, objectSize));
  const cameraPosition = new THREE.Vector3(
    0,
    object.position.y + Math.abs(objectSize / Math.sin(fov / 2)),
    0,
  );

  camera.position.copy(cameraPosition);
  //camera.lookAt(new THREE.Vector3(0, 0, 0));
};

const LoadingBar = (): ReactElement => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

type SceneProps = {
  material: string;
  color: string;
};

const Scene = ({ material, color }: SceneProps): ReactElement => {
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
      fitCameraToObject(camera.current, mesh.current);
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
        {material === 'wire' ? (
          <meshStandardMaterial color={color} wireframe />
        ) : (
          <meshPhongMaterial color={color} />
        )}
      </mesh>
      <TrackballControls ref={controls} />
    </>
  );
};

const ModelViewer = (): ReactElement => {
  const canvas = useRef(null);
  const [material, setMaterial] = useState('std');
  const [color, setColor] = useState('#fff');

  return (
    <Container ref={canvas}>
      <ModelNavContainer>
        <SketchPicker color={color} onChange={(color) => setColor(color.hex)} />
        <NavSelect
          options={[
            { label: 'Standard', value: 'std' },
            { label: 'Wireframe', value: 'wire' },
          ]}
          name="material"
          label="Material"
          id="material-select"
          onChange={(e) => setMaterial(e.target.value)}
        />
      </ModelNavContainer>
      <ThreeCanvas concurrent>
        <Suspense fallback={<LoadingBar />}>
          <Scene material={material} color={color} />
        </Suspense>
      </ThreeCanvas>
    </Container>
  );
};

export default ModelViewer;
