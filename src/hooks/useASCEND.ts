import { ApolloClient, gql, InMemoryCache, useApolloClient, useQuery } from '@apollo/client'
import { useContractCalls, useTokenBalance } from '@usedapp/core'
import { BigNumber, ethers } from 'ethers'
import { useMemo } from 'react'
import { ASCENSION } from '../constants'

export function useASCENDBalance(address: string) {
  return useTokenBalance(ASCENSION.AscensionToken.address, address) ?? ethers.constants.Zero
}

export function useStakedASCENDBalance(address: string) {
  return useTokenBalance(ASCENSION.AscensionStakedToken.address, address) ?? ethers.constants.Zero
}

export function useASCENDVotes(address: string) {
  return useContractCalls([]) ?? []
}

export function useASCENDTokenDataQuery(account: string) {
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
      totalBalance: '0.0',
      balance: '0.0',
      stakedBalance: '0.0',
    }
  else return data.users[0]
}
