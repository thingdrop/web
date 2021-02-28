import Head from 'next/head';
import { Layout, Grid } from '@/components';
import { useEffect, useState } from 'react';

export default function Home() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    async function fetchModels() {
      const res = await fetch('http://localhost:8080/models');
      const models = await res.json();
      setModels(models);
    }
    fetchModels();
  }, []);

  return (
    <Layout>
      <main className="full-bleed">
        <Head>
          <title>Thingdrop | Find and share 3D models!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid>
          {models.map((model) => {
            return <div key={model.id}>{model.name}</div>;
          })}
        </Grid>
      </main>
    </Layout>
  );
}
