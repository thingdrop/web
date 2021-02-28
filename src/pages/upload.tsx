import Head from 'next/head';
import { Heading, Layout, UploadForm } from '@/components';

export default function Upload() {
  return (
    <Layout>
      <Head>
        <title>Thingdrop | Upload</title>
      </Head>
      <div>
        <Heading level={1}>Upload a model</Heading>
        <UploadForm />
      </div>
    </Layout>
  );
}
