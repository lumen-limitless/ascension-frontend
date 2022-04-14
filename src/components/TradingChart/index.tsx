import { ApolloClient, gql, InMemoryCache, QueryHookOptions, useQuery } from '@apollo/client'
import { addressEqual, ChainId, useEthers } from '@usedapp/core'
import { useMemo, useState } from 'react'
import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../Card'
import Loader from '../Loader'
import Tabs from '../Tabs'
import { DEX_BY_CHAIN, WNATIVE_ADDRESS } from '../../constants'
import { useCREATE2PairAddress } from '../../hooks/useCREATE2Address'
import { Token } from '../../types'

export interface TradingChartProps {
  buyToken: Token
  dex: string
}

export interface Swap {
  timestamp: number
  transaction: {
    id: string
    timestamp: number
  }
  pair: {
    token0: {
      id: string
      symbol: string
    }
    token1: {
      id: string
      symbol: string
    }
  }
  sender: string
  to: string
  amount0In: string
  amount0Out: string
  amount1In: string
  amount1Out: string
  amountUSD: string
}

export interface SwapData {
  swaps: Swap[]
}

const GET_SWAPS = gql(`
query Swap($timestamp: BigInt!, $pair: String!, $orderBy: BigInt!) {
  swaps(
    orderBy: $orderBy
    orderDirection: asc
    first: 1000
    where: { pair: $pair, timestamp_gt: $timestamp }
  ) {
    timestamp
    transaction {
      id
    }
    pair {
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
    }
    sender
    to
    amount0In
    amount0Out
    amount1In
    amount1Out
    amountUSD
  }
}
`)
const times = [900, 3600, 21600, 86400, 604800]

export default function TradingChart({ buyToken, dex }: TradingChartProps) {
  const { chainId } = useEthers()

  const pair = useCREATE2PairAddress(dex, chainId, buyToken.address, WNATIVE_ADDRESS[chainId])

  const [timeframe, setTimeframe] = useState<number>(times[0])

  const afterTimestamp = useMemo(() => {
    return parseInt((Date.now() / 1000).toFixed(0)) - timeframe
  }, [timeframe])

  const client = useMemo(() => {
    return new ApolloClient({
      uri: DEX_BY_CHAIN[chainId][dex]?.subgraphUrl,
      cache: new InMemoryCache(),
    })
  }, [chainId, dex])

  const { data, loading, error } = useQuery<SwapData>(GET_SWAPS, {
    variables: {
      pair: pair?.toLowerCase(),
      timestamp: afterTimestamp,
      orderBy: 'timestamp',
    },
    pollInterval: 60000,
    client: client,
  })

  const graphData = useMemo(() => {
    if (!data) return null
    let graphData = []

    for (let i = 0; i < data.swaps.length; i++) {
      const buyAmountNum = addressEqual(data.swaps[i].pair.token0.id, buyToken.address) ? 'amount0' : 'amount1'
      const sellAmountNum = buyAmountNum === 'amount0' ? 'amount1' : 'amount0'
      if (parseFloat(data.swaps[i][`${buyAmountNum}In`]) > 0) {
        const amountUSD = parseFloat(data.swaps[i].amountUSD)
        const priceUSD = amountUSD / parseFloat(data.swaps[i][`${buyAmountNum}In`])
        const amountETH = parseFloat(data.swaps[i][`${sellAmountNum}Out`])
        const priceETH = amountETH / parseFloat(data.swaps[i][`${buyAmountNum}In`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'sell',
          time: new Date(data.swaps[i].timestamp * 1000).toLocaleTimeString(),
          timestamp: data.swaps[i].timestamp,
        })
      } else {
        const amountUSD = parseFloat(data.swaps[i].amountUSD)
        const priceUSD = amountUSD / parseFloat(data.swaps[i][`${buyAmountNum}Out`])
        const amountETH = parseFloat(data.swaps[i][`${sellAmountNum}In`])
        const priceETH = amountETH / parseFloat(data.swaps[i][`${buyAmountNum}Out`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'buy',
          time: new Date(data.swaps[i].timestamp * 1000).toLocaleTimeString(),
          timestamp: data.swaps[i].timestamp,
        })
      }
    }

    return graphData
  }, [data, buyToken])

  return (
    <>
      <Card
        className="grow"
        header={
          <div className="flex items-center justify-between p-3">
            <Tabs
              options={['15M', '1H', '6H', '1D', '1W']}
              onTabChange={(e) => {
                setTimeframe(times[e])
              }}
            />
          </div>
        }
      >
        {loading ? (
          <Loader message="Loading graph..." />
        ) : error ? (
          <Loader message={`Error loading graph`} />
        ) : graphData?.length == 0 ? (
          <Loader message="No Data to show." />
        ) : (
          <>
            <ResponsiveContainer height={500} width="100%">
              <AreaChart
                data={graphData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#943259" stopOpacity={0.66} />
                    <stop offset="95%" stopColor="#2d1a62" stopOpacity={0.33} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="priceUSD"
                  stroke="#943259"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </>
        )}
      </Card>
    </>
  )
}
