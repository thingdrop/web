import Head from 'next/head';
import { Layout, Grid } from '@/components';
import styled from 'styled-components';

const Footer = styled.footer`
  background: var(--color-background-secondary);
  padding: var(--spacing-loosest);
`;
export default function Home({ posts }) {
  return (
    <Layout>
      <main className="full-bleed">
        <Head>
          <title>Thingdrop | Find and share 3D models!</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Grid items={posts}></Grid>
      </main>
      <Footer className="full-bleed">&copy; 2020 - Present</Footer>
    </Layout>
  );
}

export async function getServerSideProps() {
  // const { params } = context;

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
