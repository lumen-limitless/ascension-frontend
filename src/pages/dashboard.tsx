import { NextPage } from 'next'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { NextSeo } from 'next-seo'
import Card from '../components/ui/Card'
import Stat from '../components/ui/Stat'
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import { commify } from 'ethers/lib/utils'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  addressEqual,
  ChainId,
  shortenAddress,
  TypedFilter,
  useEthers,
  useLogs,
} from '@usedapp/core'
import { useMemo } from 'react'
import {
  ASCENSION,
  ASCENSION_LIQ_ADDRESS,
  ASCENSION_TREASURY_MAINNET,
  DEX_BY_CHAIN,
  HOME_CHAINID,
} from '../constants'
import Loader from '../components/ui/Loader'
import {
  useStakingSubgraph,
  useQuery,
  useAscendTokenContract,
  useAscendStakingContract,
} from '../hooks'
import { gql } from 'graphql-request'
import Grid from '../components/ui/Grid'

import { useMoralisNFT } from '../hooks/useMoralis'
import Typography from '../components/ui/Typography'
import ImageComponent from '../components/ImageComponent'
import { endsWith } from 'lodash'
import Button from '../components/ui/Button'
import ExternalLink from '../components/ui/ExternalLink'
import Skeleton from '../components/ui/Skeleton'
import { parseBalance } from '../functions'
import { ethers } from 'ethers'

const GET_SWAPS = gql`
  query Swap($pair: String!, $orderBy: BigInt!) {
    swaps(
      orderBy: $orderBy
      orderDirection: asc
      first: 1000
      where: { pair: $pair }
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
`

const DashboardPage: NextPage = () => {
  const ascendPrice = useCoingeckoTokenPrice(
    ASCENSION.AscensionToken.address,
    'usd',
    'arbitrum-one'
  )

  const { data, error } = useMoralisNFT(ASCENSION_TREASURY_MAINNET)

  const stakingData = useStakingSubgraph()

  const priceData = useQuery(
    DEX_BY_CHAIN[ChainId.Arbitrum]['sushiswap'].subgraphUrl,
    GET_SWAPS,
    {
      pair: ASCENSION_LIQ_ADDRESS.toLowerCase(),
      orderBy: 'timestamp',
    }
  )

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
        const priceUSD =
          amountUSD / parseFloat(priceData.data.swaps[i][`${buyAmountNum}In`])
        const amountETH = parseFloat(
          priceData.data.swaps[i][`${sellAmountNum}Out`]
        )
        const priceETH =
          amountETH / parseFloat(priceData.data.swaps[i][`${buyAmountNum}In`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'sell',
          time: new Date(
            priceData.data.swaps[i].timestamp * 1000
          ).toLocaleDateString(),
          timestamp: priceData.data.swaps[i].timestamp,
        })
      } else {
        const amountUSD = parseFloat(priceData.data.swaps[i].amountUSD)
        const priceUSD =
          amountUSD / parseFloat(priceData.data.swaps[i][`${buyAmountNum}Out`])
        const amountETH = parseFloat(
          priceData.data.swaps[i][`${sellAmountNum}In`]
        )
        const priceETH =
          amountETH / parseFloat(priceData.data.swaps[i][`${buyAmountNum}Out`])
        graphData.push({
          priceUSD,
          priceETH,
          amountUSD,
          amountETH,
          type: 'buy',
          time: new Date(
            priceData.data.swaps[i].timestamp * 1000
          ).toLocaleDateString(),
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
    <>
      <NextSeo title="Dashboard" description="Ascension Protocol Dashboard" />

      <Section fullscreen padding="md">
        <Container>
          <Grid gap="md">
            <div className="col-span-12">
              <Stat
                title="Protocol Stats"
                stats={[
                  {
                    name: 'Price',
                    stat:
                      ascendPrice &&
                      commify(parseFloat(ascendPrice).toFixed(3)),
                    before: '$',
                  },
                  {
                    name: 'Market Cap',
                    stat:
                      ascendPrice &&
                      commify((parseFloat(ascendPrice) * 14400000).toFixed(3)),
                    before: '$',
                  },
                  {
                    name: 'Staked Supply',
                    stat:
                      stakingData?.data &&
                      (
                        (stakingData.data.stakingMetrics[
                          stakingData.data.stakingMetrics.length - 1
                        ]?.totalStaked /
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
                  {!stakingData?.data ||
                  stakingData?.error ||
                  stakingGraphData.length === 0 ? (
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
                          <linearGradient
                            id="colorUv"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#943259"
                              stopOpacity={0.66}
                            />
                            <stop
                              offset="95%"
                              stopColor="#2d1a62"
                              stopOpacity={0.33}
                            />
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
                  {!priceData?.data ||
                  priceData?.error ||
                  priceGraphData?.length === 0 ? (
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
                            <linearGradient
                              id="colorUv"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#943259"
                                stopOpacity={0.66}
                              />
                              <stop
                                offset="95%"
                                stopColor="#2d1a62"
                                stopOpacity={0.33}
                              />
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
                <div className="flex h-full flex-col gap-3  p-3">
                  {!data ? (
                    <Loader />
                  ) : error ? (
                    <Loader message="error" />
                  ) : data?.result.length === 0 ? (
                    <>NO NFTS</>
                  ) : (
                    data.result.map((nft) => (
                      <Card key={nft.name}>
                        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
                          <div className="flex min-w-max">
                            {JSON.parse(nft.metadata).image ? (
                              <>
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'webm'
                                ) && (
                                  <video
                                    src={JSON.parse(nft.metadata).image}
                                    className="h-64 w-64"
                                    controls
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'mp4'
                                ) && (
                                  <video
                                    src={JSON.parse(nft.metadata).image}
                                    className="h-64 w-64"
                                    controls
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'jpg'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image}
                                    height={256}
                                    width={256}
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'jpg'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image}
                                    height={256}
                                    width={256}
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'png'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image}
                                    height={256}
                                    width={256}
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  'webp'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image}
                                    height={256}
                                    width={256}
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image,
                                  '/image'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image}
                                    height={256}
                                    width={256}
                                    unoptimized
                                  />
                                )}
                              </>
                            ) : JSON.parse(nft.metadata).image_url ? (
                              <>
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'webm'
                                ) && (
                                  <video
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    controls
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'mp4'
                                ) && (
                                  <video
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    controls
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'jpg'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'svg'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'png'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  'webp'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    unoptimized
                                  />
                                )}
                                {endsWith(
                                  JSON.parse(nft.metadata).image_url,
                                  '/image'
                                ) && (
                                  <ImageComponent
                                    src={JSON.parse(nft.metadata).image_url}
                                    className="h-64 w-64"
                                    unoptimized
                                  />
                                )}
                              </>
                            ) : (
                              <div className="h-64 w-64">
                                <Skeleton />
                              </div>
                            )}
                          </div>
                          <div className="w-full">
                            <div className=" max-w-xl space-y-1 truncate">
                              <Typography as="h3" variant="lg">
                                {nft.name}({nft.symbol}) #{nft.token_id}
                              </Typography>
                              <div className="flex items-center gap-1 ">
                                <Typography className="inline text-secondary">
                                  {shortenAddress(nft.token_address)}
                                </Typography>
                              </div>{' '}
                              <Typography>
                                {JSON.parse(nft.metadata).description.slice(
                                  0,
                                  80
                                )}
                              </Typography>
                              <ExternalLink
                                href={`https://opensea.io/assets/ethereum/${nft.token_address}/${nft.token_id}`}
                                className="w-full"
                              >
                                <Button color="blue" className="max-w-sm">
                                  {' '}
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 fill-current"
                                    preserveAspectRatio="xMidYMid meet"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12s12-5.374 12-12S18.629 0 12 0ZM5.92 12.403l.051-.081l3.123-4.884a.107.107 0 0 1 .187.014c.52 1.169.972 2.623.76 3.528c-.088.372-.335.876-.614 1.342a2.405 2.405 0 0 1-.117.199a.106.106 0 0 1-.09.045H6.013a.106.106 0 0 1-.091-.163zm13.914 1.68a.109.109 0 0 1-.065.101c-.243.103-1.07.485-1.414.962c-.878 1.222-1.548 2.97-3.048 2.97H9.053a4.019 4.019 0 0 1-4.013-4.028v-.072c0-.058.048-.106.108-.106h3.485c.07 0 .12.063.115.132c-.026.226.017.459.125.67c.206.42.636.682 1.099.682h1.726v-1.347H9.99a.11.11 0 0 1-.089-.173l.063-.09c.16-.231.391-.586.621-.992c.156-.274.308-.566.43-.86c.024-.052.043-.107.065-.16c.033-.094.067-.182.091-.269a4.57 4.57 0 0 0 .065-.223c.057-.25.081-.514.081-.787c0-.108-.004-.221-.014-.327c-.005-.117-.02-.235-.034-.352a3.415 3.415 0 0 0-.048-.312a6.494 6.494 0 0 0-.098-.468l-.014-.06c-.03-.108-.056-.21-.09-.317a11.824 11.824 0 0 0-.328-.972a5.212 5.212 0 0 0-.142-.355c-.072-.178-.146-.339-.213-.49a3.564 3.564 0 0 1-.094-.197a4.658 4.658 0 0 0-.103-.213c-.024-.053-.053-.104-.072-.152l-.211-.388c-.029-.053.019-.118.077-.101l1.32.357h.01l.173.05l.192.054l.07.019v-.783c0-.379.302-.686.679-.686a.66.66 0 0 1 .477.202a.69.69 0 0 1 .2.484V6.65l.141.039c.01.005.022.01.031.017c.034.024.084.062.147.11c.05.038.103.086.165.137a10.351 10.351 0 0 1 .574.504c.214.199.454.432.684.691c.065.074.127.146.192.226c.062.079.132.156.19.232c.079.104.16.212.235.324c.033.053.074.108.105.161c.096.142.178.288.257.435c.034.067.067.141.096.213c.089.197.159.396.202.598a.65.65 0 0 1 .029.132v.01c.014.057.019.12.024.184a2.057 2.057 0 0 1-.106.874c-.031.084-.06.17-.098.254c-.075.17-.161.343-.264.502c-.034.06-.075.122-.113.182c-.043.063-.089.123-.127.18a3.89 3.89 0 0 1-.173.221c-.053.072-.106.144-.166.209c-.081.098-.16.19-.245.278c-.048.058-.1.118-.156.17c-.052.06-.108.113-.156.161c-.084.084-.15.147-.208.202l-.137.122a.102.102 0 0 1-.072.03h-1.051v1.346h1.322c.295 0 .576-.104.804-.298c.077-.067.415-.36.816-.802a.094.094 0 0 1 .05-.03l3.65-1.057a.108.108 0 0 1 .138.103z"
                                    />
                                  </svg>
                                  View on OpenSea
                                </Button>
                              </ExternalLink>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default DashboardPage
