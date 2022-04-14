import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
  cache: new InMemoryCache(),
})

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
  const { data, loading, error } = useQuery(GET_TOKEN_DATA, {
    variables: { id: account?.toLowerCase() },
    client: client,
  })

  if (loading || error) return null
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
    gql`
      query StakingMetric {
        stakingMetrics {
          id
          totalStaked
        }
      }
    `,
    {
      client: client,
    }
  )

  return stakingData
}
