import { useGLTF } from '@react-three/drei';

type LoaderProps = {
  url: string;
};

const Loader = ({ url }: LoaderProps) => {
  const file = useGLTF(url);
  return file;
};

export default Loader;
