import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Heading, Layout, ProgressBar } from '@/components';
import { fetcher } from '@/utils';
import { useEffect } from 'react';
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
};

export default function Model(props: ModelProps) {
  const { model } = props;
  const router = useRouter();

  const upload = useSelector((state) => state.upload.uploads[model.fileId]);
  const activeUpload = upload?.progress < 100;

  useEffect(() => {
    if (model.status === 'CREATED') {
      const eventSource = new EventSource(
        `http://localhost:8080/models/${model.id}/subscribe`,
      );
      eventSource.onmessage = ({ data }) => {
        const { status } = JSON.parse(data);
        if (status === 'COMPLETE') {
          router.replace(router.asPath);
        }
      };
      return () => {
        eventSource.close();
      };
    }
  }, [model.status, model.id, router]);

  return (
    <Layout>
      <Heading level={3}>{model.name}</Heading>
      {activeUpload ? (
        <Callout>
          <Heading level={3}>Uploading...</Heading>
          <ProgressBar progress={upload.progress} />
        </Callout>
      ) : (
        <ModelView>
          {model.status === 'CREATED' && (
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
  const modelResponse = await fetcher.get(`/models/${id}`);
  const { data: model } = modelResponse;
  return {
    props: {
      model,
    },
  };
}
