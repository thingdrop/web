import Head from 'next/head';
import { Layout, Grid } from '@/components';
import { useGetModelsQuery } from '@/store';

export default function Home() {
  const { data: models } = useGetModelsQuery({});
  return (
    <Layout>
      <main className="full-bleed">
        <Head>
          <title>Thingdrop | Find and share 3D models!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid>
          {models?.map((model) => {
            return (
              <div key={model.id}>
                <img
                  style={{ maxWidth: '200px' }}
                  src={model?.file?.imagePreview}
                  alt={`model ${model.name} preview`}
                />
                {model.name}
              </div>
            );
          })}
        </Grid>
      </main>
    </Layout>
  );
}
