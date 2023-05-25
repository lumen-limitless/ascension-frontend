/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigDecimal: { input: any; output: any; }
  BigInt: { input: any; output: any; }
  Bytes: { input: any; output: any; }
};

export type BlockChangedFilter = {
  number_gte: Scalars['Int']['input'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']['input']>;
  number?: InputMaybe<Scalars['Int']['input']>;
  number_gte?: InputMaybe<Scalars['Int']['input']>;
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
  stakingSnapshot?: Maybe<StakingSnapshot>;
  stakingSnapshots: Array<StakingSnapshot>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryStakingSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryStakingSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakingSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakingSnapshot_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type StakingSnapshot = {
  __typename?: 'StakingSnapshot';
  id: Scalars['ID']['output'];
  totalAssets: Scalars['BigDecimal']['output'];
  totalSupply: Scalars['BigDecimal']['output'];
};

export type StakingSnapshot_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<StakingSnapshot_Filter>>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<StakingSnapshot_Filter>>>;
  totalAssets?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalAssets_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalAssets_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalSupply_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum StakingSnapshot_OrderBy {
  Id = 'id',
  TotalAssets = 'totalAssets',
  TotalSupply = 'totalSupply'
}

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  stakingSnapshot?: Maybe<StakingSnapshot>;
  stakingSnapshots: Array<StakingSnapshot>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionStakingSnapshotArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionStakingSnapshotsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<StakingSnapshot_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<StakingSnapshot_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID']['input'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type User = {
  __typename?: 'User';
  balance: Scalars['BigDecimal']['output'];
  id: Scalars['ID']['output'];
  stakedBalance: Scalars['BigDecimal']['output'];
  totalBalance: Scalars['BigDecimal']['output'];
};

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  balance?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  id?: InputMaybe<Scalars['ID']['input']>;
  id_gt?: InputMaybe<Scalars['ID']['input']>;
  id_gte?: InputMaybe<Scalars['ID']['input']>;
  id_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_lt?: InputMaybe<Scalars['ID']['input']>;
  id_lte?: InputMaybe<Scalars['ID']['input']>;
  id_not?: InputMaybe<Scalars['ID']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']['input']>>;
  or?: InputMaybe<Array<InputMaybe<User_Filter>>>;
  stakedBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  stakedBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  stakedBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBalance?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_gt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_gte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
  totalBalance_lt?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_lte?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_not?: InputMaybe<Scalars['BigDecimal']['input']>;
  totalBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']['input']>>;
};

export enum User_OrderBy {
  Balance = 'balance',
  Id = 'id',
  StakedBalance = 'stakedBalance',
  TotalBalance = 'totalBalance'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']['output']>;
  /** The block number */
  number: Scalars['Int']['output'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']['output']>;
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
  deployment: Scalars['String']['output'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']['output'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type StakingSnapshotQueryVariables = Exact<{ [key: string]: never; }>;


export type StakingSnapshotQuery = { __typename?: 'Query', stakingSnapshots: Array<{ __typename?: 'StakingSnapshot', id: string, totalSupply: any, totalAssets: any }> };


export const StakingSnapshotDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StakingSnapshot"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stakingSnapshots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1000"}},{"kind":"Argument","name":{"kind":"Name","value":"orderDirection"},"value":{"kind":"EnumValue","value":"asc"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalSupply"}},{"kind":"Field","name":{"kind":"Name","value":"totalAssets"}}]}}]}}]} as unknown as DocumentNode<StakingSnapshotQuery, StakingSnapshotQueryVariables>;