import Head from 'next/head';
import styled from 'styled-components';
import {
  Heading,
  Layout,
  ProgressBar,
  UploadForm,
  Button,
  Link,
  VisuallyHidden,
} from '@/components';
import { useState } from 'react';

const Callout = styled.div`
  padding: calc(var(--spacing-loosest) * 3);
  text-align: center;
`;
const modelId = '12l3nl12jn3o';

export default function Upload() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('START'); // START, LOADING, COMPLETE

  const handleClick = () => {
    setProgress(0);
    setStatus('START');
  };

  const showUploadForm = status === 'START';
  const uploadComplete = status === 'COMPLETE';

  return (
    <Layout>
      <Head>
        <title>Thingdrop | Upload</title>
      </Head>
      <div>
        <Heading level={1}>Upload a model</Heading>
        {showUploadForm && (
          <UploadForm
            setProgress={setProgress}
            setStatus={setStatus}
            status={status}
          />
        )}

        {!showUploadForm && (
          <Callout>
            <Heading level={3}>
              {uploadComplete ? 'Upload Successful!' : 'Uploading...'}
            </Heading>

            <ProgressBar progress={progress} />

            {uploadComplete && (
              <>
                <p>View the model or upload a new one!</p>
                <Button.Group>
                  <Link href={`/${modelId}`}>
                    <Button>View Model</Button>
                  </Link>
                  <Button onClick={handleClick}>Upload</Button>
                </Button.Group>
              </>
            )}
          </Callout>
        )}
      </div>
    </Layout>
  );
}
