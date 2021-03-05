import { GraphQLClient } from 'graphql-request';

export const fetcher = new GraphQLClient('http://localhost:8080/graphql');
