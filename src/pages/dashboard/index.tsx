import { NextPage } from 'next'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Stat from '../../components/Stat'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { commify } from 'ethers/lib/utils'
import {
  Area,
  AreaChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { addressEqual, useEthers } from '@usedapp/core'
import { useMemo } from 'react'
import {
  ASCENSION,
  ASCENSION_LIQ_ADDRESS,
  ASCENSION_TREASURY_MAINNET,
  DEX_BY_CHAIN,
  HOME_CHAINID,
  WNATIVE_ADDRESS,
} from '../../constants'
import Loader from '../../components/Loader'
import { SwapData } from '../../components/TradingChart'
import { useZerionAssets, useZerionPortfolio } from '../../hooks/useZerion'
import { useAscendSubgraph, useStakingSubgraph } from '../../hooks/useSubgraph'
import { useOpenseaAssets } from '../../hooks/useAPI'

const GET_SWAPS = gql(`
query Swap($pair: String!, $orderBy: BigInt!) {
  swaps(
    orderBy: $orderBy
    orderDirection: asc
    first: 1000
    where: { pair: $pair}
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

const client = new ApolloClient({
  uri: DEX_BY_CHAIN[HOME_CHAINID]['sushiswap'].subgraphUrl,
  cache: new InMemoryCache(),
})

const DashboardPage: NextPage = () => {
  const ascendPrice = useCoingeckoTokenPrice(
    ASCENSION.AscensionToken.address,
    'usd',
    'arbitrum-one'
  )

  const portfolio = useZerionPortfolio()
  console.table(portfolio)

  // const assets = useZerionAssets()
  // console.table(assets)

  const stakingData = useStakingSubgraph()

  const priceData = useQuery<SwapData>(GET_SWAPS, {
    variables: {
      pair: ASCENSION_LIQ_ADDRESS.toLowerCase(),
      orderBy: 'timestamp',
    },
    pollInterval: 60000,
    client: client,
  })

  const priceGraphData = useMemo(() => {
    if (!priceData.data) return null
    if (priceData.loading) return null
    if (priceData.error) return null
    let graphData = []

    for (let i = 0; i < priceData.data.swaps.length; i++) {
      const buyAmountNum = addressEqual(
        priceData.data.swaps[i].pair.token0.id,
        ASCENSION.AscensionToken.address
      )
        ? 'amount0'
        : 'amount1'
      const sellAmountNum = buyAmountNum === 'amount0' ? 'amount1' : 'amount0'
      if (parseFloat(priceData.data.swaps[i][`${buyAmountNum}In`]) > 0) {
        const amountUSD = parseFloat(priceData.data.swaps[i].amountUSD)
        const priceUSD = amountUSD / parseFloat(priceData.data.swaps[i][`${buyAmountNum}In`])
        const amountETH = parseFloat(priceData.data.swaps[i][`${sellAmountNum}Out`])
        const priceETH = amountETH / parseFloat(priceData.data.swaps[i][`${buyAmountNum}In`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'sell',
          time: new Date(priceData.data.swaps[i].timestamp * 1000).toLocaleDateString(),
          timestamp: priceData.data.swaps[i].timestamp,
        })
      } else {
        const amountUSD = parseFloat(priceData.data.swaps[i].amountUSD)
        const priceUSD = amountUSD / parseFloat(priceData.data.swaps[i][`${buyAmountNum}Out`])
        const amountETH = parseFloat(priceData.data.swaps[i][`${sellAmountNum}In`])
        const priceETH = amountETH / parseFloat(priceData.data.swaps[i][`${buyAmountNum}Out`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'buy',
          time: new Date(priceData.data.swaps[i].timestamp * 1000).toLocaleDateString(),
          timestamp: priceData.data.swaps[i].timestamp,
        })
      }
    }

    return graphData
  }, [priceData])

  const stakingGraphData = useMemo(() => {
    if (!stakingData.data) return null
    if (stakingData.loading) return null
    if (stakingData.error) return null
    let stakingGraphData = []

    for (let i = 0; i < stakingData.data.stakingMetrics.length; i++) {
      const metrics = stakingData.data.stakingMetrics[i]
      stakingGraphData.push({
        totalStaked: metrics.totalStaked,
        time: new Date(metrics.id * 1000).toLocaleDateString(),
      })
    }

    return stakingGraphData
  }, [stakingData])
  return (
    <Container maxWidth="7xl">
      <section className="flex h-full w-full flex-col py-12" id="treasury">
        {' '}
        <Stat
          title="Treasury Stats"
          stats={[
            {
              name: 'Total Value Locked',
              stat: portfolio && commify(parseFloat(portfolio.total_value).toFixed(2)),
              before: '$',
            },
            {
              name: 'Liquid Assets',
              stat: portfolio && commify(parseFloat(portfolio.assets_value).toFixed(2)),
              before: '$',
            },
            {
              name: 'NFT Floor Price',
              stat: portfolio && commify(parseFloat(portfolio.nft_floor_price_value).toFixed(2)),
              before: '$',
            },
          ]}
        ></Stat>
        <div className="flex flex-col gap-3">
          {/* <Card title="Portfolio">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                ></Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card> */}
          {/* <Card title="NFT Collection"></Card> */}
        </div>
      </section>

      <section className="flex h-full w-full flex-col pb-12">
        {' '}
        <Stat
          title="Token Stats"
          stats={[
            {
              name: 'Price',
              stat: ascendPrice && commify(parseFloat(ascendPrice).toFixed(3)),
              before: '$',
            },
            {
              name: 'Market Cap',
              stat: ascendPrice && commify((parseFloat(ascendPrice) * 14400000).toFixed(3)),
              before: '$',
            },
            {
              name: 'Staked Supply',
              stat:
                stakingData?.data &&
                (
                  (stakingData.data.stakingMetrics[stakingData.data.stakingMetrics.length - 1]
                    ?.totalStaked /
                    14400000) *
                  100
                ).toFixed(0),
              after: '%',
            },
          ]}
        ></Stat>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card title="Total Staked">
            {stakingData?.loading || stakingData?.error || stakingGraphData.length === 0 ? (
              <Loader />
            ) : (
              <ResponsiveContainer height={500} width="100%">
                <AreaChart
                  data={stakingGraphData}
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
                  <Area
                    type="monotone"
                    dataKey="totalStaked"
                    stroke="#943259"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Card>
          <Card title="ASCEND Price">
            {priceData?.loading || priceData?.error || priceGraphData?.length === 0 ? (
              <Loader />
            ) : (
              <>
                <ResponsiveContainer height={500} width="100%">
                  <AreaChart
                    data={priceGraphData}
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
        </div>
      </section>
    </Container>
  )
}

export default DashboardPage
