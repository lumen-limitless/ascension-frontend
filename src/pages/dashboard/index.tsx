import { NextPage } from 'next'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Stat from '../../components/Stat'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { commify } from 'ethers/lib/utils'
import { Area, AreaChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ApolloClient, gql, InMemoryCache, useQuery } from '@apollo/client'
import { addressEqual } from '@usedapp/core'
import { useMemo } from 'react'
import { ASCENSION, ASCENSION_LIQ_ADDRESS, DEX_BY_CHAIN, HOME_CHAINID, WNATIVE_ADDRESS } from '../../constants'
import Loader from '../../components/Loader'
import { SwapData } from '../../components/TradingChart'
import { useZerionAssets, useZerionPortfolio } from '../../hooks/useZerion'
import { useAscendSubgraph, useStakingSubgraph } from '../../hooks/useSubgraph'

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
  const ascendPrice = useCoingeckoTokenPrice(ASCENSION.AscensionToken.address, 'usd', 'arbitrum-one')

  const portfolio = useZerionPortfolio()
  const assets = useZerionAssets()

  const stakingData = useStakingSubgraph()
  const priceData = useQuery<SwapData>(GET_SWAPS, {
    variables: {
      pair: ASCENSION_LIQ_ADDRESS.toLowerCase(),
      orderBy: 'timestamp',
    },
    pollInterval: 60000,
    client: client,
  })

  const graphData = useMemo(() => {
    if (!priceData.data) return null
    if (priceData.loading) return null
    if (priceData.error) return null
    let graphData = []

    for (let i = 0; i < priceData.data.swaps.length; i++) {
      const buyAmountNum = addressEqual(priceData.data.swaps[i].pair.token0.id, ASCENSION.AscensionToken.address)
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

  return (
    <Container maxWidth="7xl">
      <div className="flex w-full flex-col pb-24">
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
                  (stakingData.data.stakingMetrics[stakingData.data.stakingMetrics.length - 1]?.totalStaked /
                    14400000) *
                  100
                ).toFixed(0),
              after: '%',
            },
          ]}
        ></Stat>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card title="Total Staked">
            {stakingData?.loading ? (
              <Loader />
            ) : stakingData?.error ? (
              <Loader message="Error" />
            ) : stakingData.data.stakingMetrics.length === 0 ? (
              <Loader message="No data available" />
            ) : (
              <ResponsiveContainer height={500} width="100%">
                <AreaChart
                  data={stakingData.data.stakingMetrics}
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
                  <XAxis dataKey="id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
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
            {priceData?.loading ? (
              <Loader />
            ) : priceData?.error ? (
              <Loader message="Error" />
            ) : graphData?.length == 0 ? (
              <Loader message="No Data available" />
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
        </div>
      </div>
      <div className="hidden w-full flex-col pb-24" id="treasury">
        {' '}
        <Stat
          title="Treasury Stats"
          stats={[
            {
              name: 'Treasury Balance',
              stat: portfolio && commify(parseFloat(portfolio.total_value).toFixed(2)),
              before: '$',
            },
            {
              name: 'Value Change(24h)',
              stat:
                portfolio && portfolio?.absolute_change_24h === 0 ? '0.0' : portfolio?.absolute_change_24h.toFixed(2),
              before: '$',
            },
            {
              name: 'Other Stat',
              stat: '0',
            },
          ]}
        ></Stat>
        <div className="flex flex-col gap-3">
          <Card title="Portfolio">
            <ResponsiveContainer width="100%" height={500}>
              <PieChart>
                <Pie data={assets} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
                  {assets &&
                    Object.keys(assets).map((asset, i) => {
                      return <Cell key={asset} />
                    })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>
          <Card title="NFT Collection"></Card>
        </div>
      </div>
    </Container>
  )
}

export default DashboardPage
