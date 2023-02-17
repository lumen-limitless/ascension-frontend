import { gql } from 'graphql-request'
import { useMemo } from 'react'
import { useQuery } from './useQuery'

const GET_STAKING_DATA = gql`
  query StakingMetric {
    stakingMetrics(first: 1000, orderDirection: asc, where:{id_gt: ${Math.floor(
      Date.now() / 1000 - 2629743
    )}}) {
      id
      totalStaked
    }
  }
`
export const useStakingSubgraph = () => {
  const res = useQuery(
    'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
    GET_STAKING_DATA
  )

  return useMemo(() => {
    if (!res.data) return null
    if (res.error) return null
    let stakingGraphData = []

    for (let i = 0; i < res.data.stakingMetrics.length; i++) {
      const metrics = res.data.stakingMetrics[i]
      stakingGraphData.push({
        totalStaked: metrics.totalStaked,
        time: metrics.id,
      })
    }

    console.debug('STAKING GRAPH DATA:')
    console.debug(stakingGraphData)
    return stakingGraphData
  }, [res])
}

// const GET_TOKEN_DATA = gql`
//   query User($id: ID!) {
//     users(where: { id: $id }) {
//       totalBalance
//       balance
//       stakedBalance
//       votes
//       stakedVotes
//     }
//   }
// `
// export function useAscendSubgraph(account: string): {
//   totalBalance: string
//   balance: string
//   stakedBalance: string
//   votes: string
//   stakedVotes: string
// } | null {
//   const { data, error } = useQuery(
//     'https://api.thegraph.com/subgraphs/name/ascension-group/ascension-token',
//     GET_TOKEN_DATA,
//     {
//       id: account?.toLowerCase(),
//     }
//   )

//   if (!data || error) return null
//   if (data.users.length === 0)
//     return {
//       totalBalance: '0.0',
//       balance: '0.0',
//       stakedBalance: '0.0',
//       votes: '0.0',
//       stakedVotes: '0.0',
//     }
//   return data.users[0]
// }

// const GET_SWAPS = gql`
//   query Swap($pair: String!, $orderBy: BigInt!) {
//     swaps(
//       orderBy: $orderBy
//       orderDirection: asc
//       first: 1000
//       where: { pair: $pair }
//     ) {
//       timestamp
//       transaction {
//         id
//       }
//       pair {
//         token0 {
//           id
//           symbol
//         }
//         token1 {
//           id
//           symbol
//         }
//       }
//       sender
//       to
//       amount0In
//       amount0Out
//       amount1In
//       amount1Out
//       amountUSD
//     }
//   }
// `

// export const useDEXSubgraph = (
//   chainId: number,
//   dex: string,
//   pair: string,
//   token: string
// ):
//   | {
//       priceUSD: number
//       priceETH: number
//       amountUSD: number
//       amountETH: number
//       type: 'Buy' | 'Sell'
//       time: Date
//       timestamp: number
//     }[]
//   | null => {
//   const res = useQuery(DEX_BY_CHAIN[chainId][dex].subgraphUrl, GET_SWAPS, {
//     pair: pair.toLowerCase(),
//     orderBy: 'timestamp',
//   })

//   return useMemo(() => {
//     if (!res.data) return null
//     if (res.error) return null
//     let graphData = []

//     for (let i = 0; i < res.data.swaps.length; i++) {
//       const buyAmountNum =
//         res.data.swaps[i].pair.token0.id === token ? 'amount0' : 'amount1'
//       const sellAmountNum = buyAmountNum === 'amount0' ? 'amount1' : 'amount0'
//       if (parseFloat(res.data.swaps[i][`${buyAmountNum}In`]) > 0) {
//         const amountUSD = parseFloat(res.data.swaps[i].amountUSD)
//         const priceUSD =
//           amountUSD / parseFloat(res.data.swaps[i][`${buyAmountNum}In`])
//         const amountETH = parseFloat(res.data.swaps[i][`${sellAmountNum}Out`])
//         const priceETH =
//           amountETH / parseFloat(res.data.swaps[i][`${buyAmountNum}In`])
//         graphData.push({
//           priceUSD,
//           priceETH,
//           amountUSD,
//           amountETH,
//           type: 'Sell',
//           time: new Date(
//             res.data.swaps[i].timestamp * 1000
//           ).toLocaleDateString(),
//           timestamp: res.data.swaps[i].timestamp,
//         })
//       } else {
//         const amountUSD = parseFloat(res.data.swaps[i].amountUSD)
//         const priceUSD =
//           amountUSD / parseFloat(res.data.swaps[i][`${buyAmountNum}Out`])
//         const amountETH = parseFloat(res.data.swaps[i][`${sellAmountNum}In`])
//         const priceETH =
//           amountETH / parseFloat(res.data.swaps[i][`${buyAmountNum}Out`])
//         graphData.push({
//           priceUSD,
//           priceETH,
//           amountUSD,
//           amountETH,
//           type: 'Buy',
//           time: new Date(
//             res.data.swaps[i].timestamp * 1000
//           ).toLocaleDateString(),
//           timestamp: res.data.swaps[i].timestamp,
//         })
//       }
//     }

//     return graphData
//   }, [res, token])
// }
