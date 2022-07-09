import Card from '../../components/ui/Card'
import Stat from '../../components/ui/Stat'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { commify } from 'ethers/lib/utils'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { addressEqual, ChainId, shortenAddress } from '@usedapp/core'
import { useMemo } from 'react'
import {
  ASCENSION,
  ASCENSION_LIQ_ADDRESS,
  ASCENSION_TREASURY_MAINNET,
  DEX_BY_CHAIN,
} from '../../constants'
import Loader from '../../components/ui/Loader'
import { useStakingSubgraph, useQuery } from '../../hooks'
import { gql } from 'graphql-request'
import Grid from '../../components/ui/Grid'

import { useMoralisNFT } from '../../hooks/useMoralis'
import Typography from '../ui/Typography'
import ImageComponent from '../ui/ImageComponent'
import { endsWith, slice } from 'lodash'
import { Icon } from '@iconify/react'
import Button from '../ui/Button'
import ExternalLink from '../ui/ExternalLink'

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

export default function Dashboard() {
  const ascendPrice = useCoingeckoTokenPrice(
    ASCENSION.AscensionToken.address,
    'usd',
    'arbitrum-one'
  )

  const { data, error } = useMoralisNFT(ASCENSION_TREASURY_MAINNET)
  console.log(data)
  const stakingData = useStakingSubgraph()

  const priceData = useQuery(DEX_BY_CHAIN[ChainId.Arbitrum]['sushiswap'].subgraphUrl, GET_SWAPS, {
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
          <div className="h-[500px] w-full">
            {!stakingData?.data || stakingData?.error || stakingGraphData.length === 0 ? (
              <Loader />
            ) : (
              <ResponsiveContainer height={500}>
                <AreaChart
                  data={stakingGraphData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 20,
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
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-6">
        <Card title="ASCEND Price">
          <div className="h-[500px] w-full">
            {!priceData?.data || priceData?.error || priceGraphData?.length === 0 ? (
              <Loader />
            ) : (
              <>
                <ResponsiveContainer height={500}>
                  <AreaChart
                    data={priceGraphData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 20,
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
          </div>
        </Card>
      </div>

      <div className="col-span-12">
        <Card title="Treasury NFT Portfolio">
          <div className="flex h-[500px] flex-col gap-3 overflow-y-scroll p-3">
            {!data ? (
              <Loader />
            ) : error ? (
              <Loader message="error" />
            ) : data?.result.length === 0 ? (
              <>NO NFTS</>
            ) : (
              data.result.map((nft) => (
                <Card key={nft.name}>
                  <div className="flex flex-col items-center  gap-12 md:flex-row">
                    {JSON.parse(nft.metadata).image ? (
                      <>
                        {endsWith(JSON.parse(nft.metadata).image, 'webm') && (
                          <video
                            src={JSON.parse(nft.metadata).image}
                            className="h-[160px] w-[160px]"
                            controls
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, 'mp4') && (
                          <video
                            src={JSON.parse(nft.metadata).image}
                            className="h-[160px] w-[160px]"
                            controls
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, 'jpg') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, 'jpg') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, 'png') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, 'webp') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image, '/image') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                      </>
                    ) : JSON.parse(nft.metadata).image_url ? (
                      <>
                        {endsWith(JSON.parse(nft.metadata).image_url, 'webm') && (
                          <video
                            src={JSON.parse(nft.metadata).image_url}
                            className="h-[160px] w-[160px]"
                            controls
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, 'mp4') && (
                          <video
                            src={JSON.parse(nft.metadata).image_url}
                            className="h-[160px] w-[160px]"
                            controls
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, 'jpg') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image_url}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, 'svg') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image_url}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, 'png') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image_url}
                            height={160}
                            width={160}
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, 'webp') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image_url}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                        {endsWith(JSON.parse(nft.metadata).image_url, '/image') && (
                          <ImageComponent
                            src={JSON.parse(nft.metadata).image_url}
                            height={160}
                            width={160}
                            unoptimized
                          />
                        )}
                      </>
                    ) : (
                      <div className="h-[160px] w-[160px]"> </div>
                    )}

                    <Grid gap="md">
                      <div className="col-span-12 space-y-1 truncate">
                        <Typography as="h3" variant="lg">
                          {nft.name}({nft.symbol}) #{nft.token_id}
                        </Typography>
                        <div className="flex items-center gap-1 ">
                          <Icon
                            icon="fa-solid:file-contract"
                            height={24}
                            className="inline-block"
                          />
                          <Typography className="inline text-secondary">
                            {shortenAddress(nft.token_address)}
                          </Typography>
                        </div>{' '}
                        <Typography>{JSON.parse(nft.metadata).description.slice(0, 80)}</Typography>
                        <ExternalLink
                          href={`https://opensea.io/assets/ethereum/${nft.token_address}/${nft.token_id}`}
                          className="w-full"
                        >
                          <Button color="blue">
                            <Icon icon="simple-icons:opensea" height={24} />
                            View on OpenSea
                          </Button>
                        </ExternalLink>
                      </div>
                    </Grid>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>
      </div>
    </Grid>
  )
}
