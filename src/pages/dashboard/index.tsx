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
import { ASCENSION, DEX_BY_CHAIN, HOME_CHAINID, WNATIVE_ADDRESS } from '../../constants'
import { useCREATE2PairAddress } from '../../hooks/useCREATE2Address'
import Loader from '../../components/Loader'
import { SwapData } from '../../components/TradingChart'
import { useZerionAssets, useZerionPortfolio } from '../../hooks/useZerion'
import { useAscensionTokenSubgraph } from '../../hooks/useSubgraph'

const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const GET_SWAPS = gql(`
query Swap($pair: String!, $orderBy: BigInt, $orderDirection: String) {
  swaps(
    orderBy: $orderBy
    orderDirection: $orderDirection
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
  const stakingData = useAscensionTokenSubgraph(ASCENSION.AscensionStaking.address)
  console.log(assets)
  const pair = useCREATE2PairAddress(
    'sushiswap',
    HOME_CHAINID,
    ASCENSION.AscensionToken.address,
    WNATIVE_ADDRESS[HOME_CHAINID]
  )

  const { data, loading, error } = useQuery<SwapData>(GET_SWAPS, {
    variables: {
      pair: pair.toLowerCase(),
      orderBy: 'timestamp',
      orderDirection: 'asc',
    },
    pollInterval: 60000,
    client: client,
  })

  const graphData = useMemo(() => {
    if (!data) return null
    if (loading) return null
    if (error) return null
    let graphData = []

    for (let i = 0; i < data.swaps.length; i++) {
      const buyAmountNum = addressEqual(data.swaps[i].pair.token0.id, ASCENSION.AscensionToken.address)
        ? 'amount0'
        : 'amount1'
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
          time: new Date(data.swaps[i].timestamp * 1000).toLocaleDateString(),
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
          time: new Date(data.swaps[i].timestamp * 1000).toLocaleDateString(),
          timestamp: data.swaps[i].timestamp,
        })
      }
    }

    return graphData
  }, [data, loading, error])

  return (
    <Container maxWidth="7xl">
      <div className="flex w-full flex-col pb-24">
        {' '}
        <Stat
          title="Token Stats"
          stats={[
            { name: 'ASCEND Price', stat: ascendPrice && commify(parseFloat(ascendPrice).toFixed(3)), before: '$' },
            {
              name: 'Market Cap',
              stat: ascendPrice && commify((parseFloat(ascendPrice) * 14400000).toFixed(3)),
              before: '$',
            },
            {
              name: 'ASCEND Staked',
              stat: stakingData && ((stakingData.balance / 14400000) * 100).toFixed(0),
              after: '%',
            },
          ]}
        ></Stat>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Card title="Total Staked">
            <ResponsiveContainer height={500} width="100%">
              <AreaChart
                data={[
                  { x: 1, y: 5 },
                  { x: 1, y: 4.5 },
                  { x: 1, y: 7 },
                  { x: 1, y: 9 },
                ]}
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
                  dataKey="y"
                  stroke="#943259"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
          <Card title="ASCEND Price">
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
        </div>
      </div>
      <div className="flex w-full flex-col pb-24" id="treasury">
        {' '}
        <Stat
          title="Treasury Stats"
          stats={[
            {
              name: 'Total Value Locked(TVL)',
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
                <Pie
                  data={assets}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
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
