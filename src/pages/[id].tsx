import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  Button,
  Heading,
  Layout,
  List,
  PrintConfigForm,
  ProgressBar,
  Spinner,
  Tabs,
} from '@/components';
import { fetcher, getTimeAgo } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { gql } from 'graphql-request';

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

const Main = styled.main`
  margin-top: var(--spacing-loosest);
  display: grid;
  grid-template-columns: 1fr 35ch;
  grid-column-gap: var(--spacing-loosest);
  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  @media only screen and (max-width: 750px) {
    display: none;
  }
  flex-grow: 1;
  flex-basis: 250px;
  align-self: start;
  position: sticky;
  top: var(--spacing-loosest);
  margin-right: var(--spacing-loosest);
`;

const Content = styled.article`
  flex-basis: 0;
  flex-grow: 999;
  min-width: 40%;
`;

type ModelProps = {
  model: any;
};

export default function Model(props: ModelProps) {
  const { model } = props;
  const router = useRouter();

  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const upload = useSelector((state) => state.upload.uploads[model.file.id]);
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
      <div>
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

        <Tabs
          style={{ marginTop: 'var(--spacing-looser)' }}
          selected={selected}
          onSelect={handleTabChange}
          tabs={[
            { id: 'description', content: 'Description' },
            { id: 'printConfig', content: 'Print Config' },
            { id: 'comments', content: 'Comments' },
            { id: 'versions', content: 'Versions' },
          ]}
        >
          <Main>
            <Content>
              {selected === 0 && <p>{model.description}</p>}
              {selected === 1 && (
                <PrintConfigForm printConfig={model.printConfig} />
              )}
            </Content>
            <Sidebar>
              <Button fullWidth>Download</Button>
              <List>
                <List.Item>Likes</List.Item>
                <List.Item>Downloads</List.Item>
                <List.Item>License: {model.license || 'Unspecified'}</List.Item>
                <List.Item>
                  Date Created: {getTimeAgo(model.dateCreated)}
                </List.Item>
              </List>
            </Sidebar>
          </Main>
        </Tabs>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const query = gql`
    {
      model(id: "${id}") {
        name
        description
        dateCreated
        status
        file {
          id
          name
        }
        printConfig{ infill, resolution }
      }
    }
  `;
  const modelResponse = await fetcher.request(query);
  const { model } = modelResponse;
  console.log({ model });
  return {
    props: {
      model,
    },
  };
}
