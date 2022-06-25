import { FC } from 'react'
import Card from '../../components/ui/Card'
import Stat from '../../components/ui/Stat'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { commify } from 'ethers/lib/utils'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { addressEqual } from '@usedapp/core'
import { useMemo } from 'react'
import { ASCENSION, ASCENSION_LIQ_ADDRESS, DEX_BY_CHAIN, HOME_CHAINID } from '../../constants'
import Loader from '../../components/ui/Loader'
import { useStakingSubgraph, useQuery } from '../../hooks'
import { gql } from 'graphql-request'
import Grid from '../../components/ui/Grid'

const GET_SWAPS = gql`
  query Swap($pair: String!, $orderBy: BigInt!) {
    swaps(orderBy: $orderBy, orderDirection: asc, first: 1000, where: { pair: $pair }) {
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
`

const Dashboard: FC = () => {
  const ascendPrice = useCoingeckoTokenPrice(
    ASCENSION.AscensionToken.address,
    'usd',
    'arbitrum-one'
  )

  // const portfolio = useZerionPortfolio()

  const stakingData = useStakingSubgraph()

  const priceData = useQuery(DEX_BY_CHAIN[HOME_CHAINID]['sushiswap'].subgraphUrl, GET_SWAPS, {
    pair: ASCENSION_LIQ_ADDRESS.toLowerCase(),
    orderBy: 'timestamp',
  })

  const priceGraphData = useMemo(() => {
    if (!priceData.data) return null
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
    <Grid gap="md">
      <div className="col-span-12">
        <Stat
          title="Protocol Stats"
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
        />
      </div>
      <div className="col-span-12 md:col-span-6">
        {' '}
        <Card title="Total Staked">
          {!stakingData?.data || stakingData?.error || stakingGraphData.length === 0 ? (
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
      </div>
      <div className="col-span-12 md:col-span-6">
        <Card title="ASCEND Price">
          {!priceData?.data || priceData?.error || priceGraphData?.length === 0 ? (
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
    </Grid>
  )
}

export default Dashboard
