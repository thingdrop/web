import { Layout } from '@/components';

type ResultsProps = {
  query: any;
};

export default function Results(props: ResultsProps) {
  const { query } = props;
  const { search } = query;
  return (
    <Layout>
      <h2>Model Search: {search}</h2>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: {
      query,
    },
  };
}
