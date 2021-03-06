import { createApi } from '@rtk-incubator/rtk-query';
import { fetcher } from '@/utils';
import { gql } from 'graphql-request';

// create a basic `baseQuery` util
const graphqlBaseQuery = ({ baseUrl } = {}) => async ({
  body,
  variables = {},
}) => {
  const result = await fetcher.request(body, variables);
  return { data: result };
};

export const api = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:8080/graphql',
  }),
  endpoints: (builder) => ({
    createModel: builder.mutation({
      query: (createModelInput) => {
        const json = JSON.stringify(createModelInput);
        const unquoted = json.replace(/"([^"]+)":/g, '$1:');
        return {
          body: gql`
          mutation {
            createModel(
              createModelInput: ${unquoted}
            ) {
              name
              id
              uploadToken
            }
          }
        `,
        };
      },
      transformResponse: (response) => response.createModel,
    }),
    createModelFile: builder.mutation({
      query: ({ id, fileDto }) => {
        const json = JSON.stringify(fileDto);
        const unquoted = json.replace(/"([^"]+)":/g, '$1:');
        return {
          body: gql`
          mutation {
            createModelFile(
              id: "${id}"
              createFileInput: ${unquoted}
            ) {
              id
              name
              contentType
              postPolicy
            }
          }
        `,
        };
      },
      transformResponse: (response) => response.createModelFile,
    }),
    getModels: builder.query({
      query: () => ({
        body: gql`
          query {
            models(filterInput: {}) {
              name
              id
              uploadToken
              dateCreated
              status
            }
          }
        `,
      }),

      transformResponse: (response) => response.models,
    }),
    getModel: builder.query({
      query: (id) => ({
        body: gql`
          query {
            model(id: "${id}") {
              name
              id
              uploadToken
              dateCreated
              status
              file {
                id
                name
              }
              printConfig {
                infill
                resolution
              }
            }
          }
        `,
      }),
      transformResponse: (response) => response.model,
    }),
  }),
});

export const {
  useGetModelsQuery,
  useGetModelQuery,
  useCreateModelMutation,
  useCreateModelFileMutation,
} = api;