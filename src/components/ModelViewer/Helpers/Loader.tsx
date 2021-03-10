import { ReactElement, Suspense, useRef } from 'react';
import { Html, useGLTF, useProgress } from '@react-three/drei';

type LoaderProps = {
  url: string;
};

const LoadingBar = (): ReactElement => {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
};

function Mesh({ object }: any) {
  const mesh = useRef();

  return (
    <mesh ref={mesh} geometry={object.children[0].geometry}>
      <meshStandardMaterial color="#fff" />
    </mesh>
  );
}

const Loader = ({ url }: LoaderProps): ReactElement => {
  const { scene } = useGLTF(url);

  return (
    <Suspense fallback={<LoadingBar />}>
      <Mesh object={scene} />
    </Suspense>
  );
};

export default Loader;
