import { gql } from 'graphql-request'
import { useQuery } from './useQuery'

const GET_TOKEN_DATA = gql`
  query User($id: ID!) {
    users(where: { id: $id }) {
      totalBalance
      balance
      stakedBalance
    }
  }
`
export function useAscendSubgraph(account: string): {
  totalBalance: number
  balance: number
  stakedBalance: number
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
      totalBalance: 0,
      balance: 0,
      stakedBalance: 0,
    }
  return data.users[0]
}

export const useStakingSubgraph = () => {
  const stakingData = useQuery(
    'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
    gql`
      query StakingMetric {
        stakingMetrics {
          id
          totalStaked
        }
      }
    `
  )

  return stakingData
}
