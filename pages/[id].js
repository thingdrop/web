
import Layout from '../components/layout'

export default function Model(props) {
  const { id } = props;
  return (
    <Layout>
      <h2>Model ID: {id}</h2>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      ...params,
    }
  }
}
