import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
  cache: new InMemoryCache(),
})

export function useAscensionTokenSubgraph(account: string): {
  totalBalance: number | null
  balance: number | null
  stakedBalance: number | null
} {
  const GET_TOKEN_DATA = gql`
    query User($id: ID!) {
      users(where: { id: $id }) {
        totalBalance
        balance
        stakedBalance
      }
    }
  `

  const { data, loading, error } = useQuery(GET_TOKEN_DATA, {
    variables: { id: account?.toLowerCase() },
    client: client,
  })

  if (loading || error) return { totalBalance: null, balance: null, stakedBalance: null }
  if (data.users.length === 0)
    return {
      totalBalance: 0,
      balance: 0,
      stakedBalance: 0,
    }
  return data.users[0]
}
