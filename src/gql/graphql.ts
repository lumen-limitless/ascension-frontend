/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  stakingMetric?: Maybe<StakingMetric>;
  stakingMetrics: Array<StakingMetric>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryStakingMetricArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakingMetricsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StakingMetric_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakingMetric_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type StakingMetric = {
  __typename?: 'StakingMetric';
  id: Scalars['ID'];
  totalStaked: Scalars['BigDecimal'];
};

export type StakingMetric_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StakingMetric_Filter>>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<StakingMetric_Filter>>>;
  totalStaked?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalStaked_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_not?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum StakingMetric_OrderBy {
  Id = 'id',
  TotalStaked = 'totalStaked'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  stakingMetric?: Maybe<StakingMetric>;
  stakingMetrics: Array<StakingMetric>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionStakingMetricArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakingMetricsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<StakingMetric_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakingMetric_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  stakedBalance: Scalars['BigDecimal'];
  stakedVotes: Scalars['BigDecimal'];
  totalBalance: Scalars['BigDecimal'];
  votes: Scalars['BigDecimal'];
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  stakedBalance?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stakedBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  stakedBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stakedVotes?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_gt?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_gte?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stakedVotes_lt?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_lte?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_not?: InputMaybe<Scalars['BigDecimal']>;
  stakedVotes_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalance?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  totalBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  votes?: InputMaybe<Scalars['BigDecimal']>;
  votes_gt?: InputMaybe<Scalars['BigDecimal']>;
  votes_gte?: InputMaybe<Scalars['BigDecimal']>;
  votes_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  votes_lt?: InputMaybe<Scalars['BigDecimal']>;
  votes_lte?: InputMaybe<Scalars['BigDecimal']>;
  votes_not?: InputMaybe<Scalars['BigDecimal']>;
  votes_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum User_OrderBy {
  Balance = 'balance',
  Id = 'id',
  StakedBalance = 'stakedBalance',
  StakedVotes = 'stakedVotes',
  TotalBalance = 'totalBalance',
  Votes = 'votes'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type StakingMetricQueryVariables = Exact<{ [key: string]: never; }>;


export type StakingMetricQuery = { __typename?: 'Query', stakingMetrics: Array<{ __typename?: 'StakingMetric', id: string, totalStaked: any }> };


export const StakingMetricDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StakingMetric"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stakingMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_gt"},"value":{"kind":"IntValue","value":"1672531200"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalStaked"}}]}}]}}]} as unknown as DocumentNode<StakingMetricQuery, StakingMetricQueryVariables>;