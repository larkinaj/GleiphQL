import { GraphQLSchema } from 'graphql';

export interface TokenBucket {
  [key: string]: {
    tokens: number;
    lastRefillTime: number;
  };
};

export interface RateLimitConfig {
  complexityLimit: number,
  paginationLimit: number,
  schema: GraphQLSchema,
  refillTime: number,
  refillAmount: number,
  redis?: boolean
};

export interface ApolloConfig {
  complexityLimit: number,
  paginationLimit: number,
  refillTime: number,
  refillAmount: number,
  redis?: boolean
};

export interface MonitorConfig {
  gliephqlUsername: string,
  gleiphqlPassword: string,
};

export interface EndpointData {
  depth: number;
  ip: string;
  url: string;
  timestamp: string;
  objectTypes: any;
  queryString: string;
  complexityScore: number;
  blocked: boolean;
  complexityLimit: number;
  email: string;
  password: string;
};