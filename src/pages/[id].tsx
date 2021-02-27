import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Heading, Layout, ProgressBar, useToast } from '@/components';
import { fetcher } from '@/utils';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';

const ModelView = styled.div`
  background-color: black;
  height: 50vh;
`;

const Callout = styled.div`
  padding: calc(var(--spacing-loosest) * 3);
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

type ModelProps = {
  model: any;
  files?: any[];
};

export default function Model(props: ModelProps) {
  const { model, files } = props;
  const { addToast } = useToast();
  const [status, setStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [filesProcessing, setFilesProcessing] = useState(false);
  const router = useRouter();

  const uploads = useSelector((state) => state.upload.uploads);

  useEffect(() => {
    if (model.status !== 'COMPLETE' && !status) {
      const fileUploads = files
        .filter((file) => uploads[file.id])
        .map((file) => uploads[file.id]);
      const isUploading =
        fileUploads.length &&
        !fileUploads.every((upload) => upload.progress === 100);

      if (isUploading) {
        setStatus('UPLOADING');
      } else {
        setStatus('PROCESSING');
      }
    }
  }, [model.status, status, files, uploads]);

  useEffect(() => {
    if (status === 'UPLOADING') {
      const fileUploads = files
        .filter((file) => uploads[file.id])
        .map((file) => uploads[file.id]);

      const totalProgress =
        fileUploads.reduce(
          (totalProgress: number, upload: any) =>
            totalProgress + upload.progress,
          0,
        ) / fileUploads.length;
      setUploadProgress(totalProgress);

      if (totalProgress === 100) {
        addToast({ content: 'Upload complete!' });
        setStatus('PROCESSING');
      }
    }
  }, [status, files, uploads, addToast]);

  useEffect(() => {
    if (status === 'PROCESSING') {
      const eventSource = new EventSource(
        `http://localhost:8080/models/${model.id}/subscribe`,
      );
      eventSource.onmessage = ({ data }) => {
        const { status } = JSON.parse(data);
        if (status === 'COMPLETE') {
          setStatus(null);
          router.replace(router.asPath);
        }
      };
      return () => {
        eventSource.close();
      };
    }
  }, [status, router]);

  console.log({ uploadProgress });
  return (
    <Layout>
      <Heading level={3}>{model.name}</Heading>
      {status === 'UPLOADING' ? (
        <Callout>
          <Heading level={3}>
            {uploadProgress === 100 ? 'Upload Successful!' : 'Uploading...'}
          </Heading>
          <ProgressBar progress={uploadProgress} />
        </Callout>
      ) : (
        <ModelView>
          {status === 'PROCESSING' && (
            <Callout>
              <div style={{ marginBottom: '20px' }}>
                <Spinner size={40} />
              </div>
              <p>Your model is processing, chilll for a sec...</p>
            </Callout>
          )}
        </ModelView>
      )}
      <p>{model.description}</p>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const [modelResponse, filesResponse] = await Promise.all([
    fetcher.get(`/models/${id}`),
    fetcher.get(`/models/${id}/files`),
  ]);
  const { data: model } = modelResponse;
  const { data: files } = filesResponse;

  return {
    props: {
      model,
      files,
    },
  };
}
