import { Layout } from '@/components';

type ModelProps = {
  id: string;
};

export default function Model(props: ModelProps) {
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
    },
  };
}
