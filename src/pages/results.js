import { Layout } from "@/components";

export default function Results(props) {
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
