import { gql } from 'graphql-request'
import { useQuery } from './useQuery'

const GET_TOKEN_DATA = gql`
  query User($id: ID!) {
    users(where: { id: $id }) {
      totalBalance
      balance
      stakedBalance
      votes
      stakedVotes
    }
  }
`
export function useAscendSubgraph(account: string): {
  totalBalance: string
  balance: string
  stakedBalance: string
  votes: string
  stakedVotes: string
} | null {
  const { data, error } = useQuery(
    'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
    GET_TOKEN_DATA,
    {
      id: account?.toLowerCase(),
    }
  )

  if (!data || error) return null
  if (data.users.length === 0)
    return {
      totalBalance: '0.0',
      balance: '0.0',
      stakedBalance: '0.0',
      votes: '0.0',
      stakedVotes: '0.0',
    }
  return data.users[0]
}

const GET_STAKING_DATA = gql`
  query StakingMetric {
    stakingMetrics {
      id
      totalStaked
    }
  }
`
export const useStakingSubgraph = () => {
  const stakingData = useQuery(
    'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
    GET_STAKING_DATA
  )

  return stakingData
}
