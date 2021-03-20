import dyanmic from 'next/dynamic';

const ModelViewer = dyanmic(() => import('./ModelViewer'), { ssr: false });

export default ModelViewer;
