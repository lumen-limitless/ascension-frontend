import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { useMemo } from 'react'

export function useAscensionTokenSubgraph(account: string) {
  const GET_TOKEN_DATA = gql`
    query User($id: ID!) {
      users(where: { id: $id }) {
        totalBalance
        balance
        stakedBalance
      }
    }
  `

  const client = useMemo(() => {
    return new ApolloClient({
      uri: 'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
      cache: new InMemoryCache(),
    })
  }, [])

  const { data, loading, error } = useQuery(GET_TOKEN_DATA, {
    variables: { id: account?.toLowerCase() },
    client: client,
  })

  if (loading) return null
  else if (error) return null
  else if (data.users.length === 0)
    return {
      totalBalance: '0',
      balance: '0',
      stakedBalance: '0',
    }
  else return data.users[0]
}
