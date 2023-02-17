import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { NextSeo } from 'next-seo'
import Card from '../components/ui/Card'
import Stat from '../components/ui/Stat'
import { commify, getAddress } from 'ethers/lib/utils'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import {
  ASCENSION,
  ASCENSION_TREASURY_ADDRESS,
  WETH9_ADDRESS,
  SCAN_INFO,
  CHAIN_NAME,
} from '../constants'
import Loader from '../components/ui/Loader'
import { TokenData, useStakingSubgraph, useTokenData } from '../hooks'
import Grid from '../components/ui/Grid'
import { motion } from 'framer-motion'
import Typography from '../components/ui/Typography'
import { last, truncate } from 'lodash'
import Button from '../components/ui/Button'
import ExternalLink from '../components/ui/ExternalLink'
import Logo from '../components/ui/Logo'
import { ethers } from 'ethers'
import { ReactElement, useMemo } from 'react'
import Skeleton from '../components/ui/Skeleton'
import { useBalance } from 'wagmi'
import NFTImage from '../components/NFTImage'
import Divider from '../components/ui/Divider'
import { useNFTData } from '../hooks/useNFTData'
import { useDefiLlamaPriceChart } from '../hooks'
import { NextPageWithLayout } from '../types'
import AppLayout from '../layouts/AppLayout'
import { ascensionTokenAddress } from '../wagmi/generated'

// TODO: automatically filter out scam tokens
const FILTERED_TOKENS = [
  getAddress('0xed12AE3Af6b21Be01788Ec84C6BD213d31364988'),
]

const useTreasuryData = () => {
  const ethNFTData = useNFTData(ASCENSION_TREASURY_ADDRESS[1], 1)
  const arbNFTData = useNFTData(ASCENSION_TREASURY_ADDRESS[42161], 42161)
  const ethTokens = useTokenData(ASCENSION_TREASURY_ADDRESS[1], 1)
  const arbTokens = useTokenData(ASCENSION_TREASURY_ADDRESS[42161], 42161)
  const ethBalance = useBalance({
    address: ASCENSION_TREASURY_ADDRESS[1] as `0x${string}`,
    chainId: 1,
  })
  const arbBalance = useBalance({
    address: ASCENSION_TREASURY_ADDRESS[42161] as `0x${string}`,
    chainId: 42161,
  })

  return useMemo(() => {
    if (
      !ethTokens ||
      !arbTokens ||
      !ethBalance ||
      !arbBalance ||
      !ethNFTData ||
      !arbNFTData
    ) {
      return null
    }
    const tokens = [
      {
        tokenBalance: parseFloat(arbBalance?.data?.formatted || '0'),
        contractAddress: ethers.constants.AddressZero,
        owner: ASCENSION_TREASURY_ADDRESS[42161],
        priceUSD:
          ethTokens.find(
            (token) => token.contractAddress === WETH9_ADDRESS[1].toLowerCase()
          )?.priceUSD ?? 0,
        chainId: 42161,
        tokenMetadata: {
          name: 'Arbitrum Ether',
          symbol: 'AETH',
          decimals: 18,
          logo: '',
        },
      } as TokenData,
      {
        tokenBalance: parseFloat(ethBalance?.data?.formatted || '0'),
        contractAddress: ethers.constants.AddressZero,
        owner: ASCENSION_TREASURY_ADDRESS[1],
        priceUSD:
          ethTokens.find(
            (token) => token.contractAddress === WETH9_ADDRESS[1].toLowerCase()
          )?.priceUSD ?? 0,
        chainId: 1,
        tokenMetadata: {
          name: 'Ether',
          symbol: 'ETH',
          decimals: 18,
          logo: '',
        },
      } as TokenData,
    ]
      .concat([...ethTokens, ...arbTokens])
      .filter(
        (t) =>
          t.tokenBalance !== 0 &&
          !FILTERED_TOKENS.includes(getAddress(t.contractAddress))
      )
    const totalValueUSD = tokens.reduce(
      (sum, token) => sum + token.priceUSD * token.tokenBalance,
      0
    )

    const nftData = [ethNFTData, arbNFTData]
    return {
      nftData: nftData,
      tokens: tokens,
      totalValueUSD: totalValueUSD,
    }
  }, [arbBalance, ethBalance, arbTokens, ethTokens, ethNFTData, arbNFTData])
}
const DashboardPage: NextPageWithLayout = () => {
  const treasuryData = useTreasuryData()

  const stakingData = useStakingSubgraph()
  // console.debug(stakingData)
  const priceData = useDefiLlamaPriceChart(
    ascensionTokenAddress[42161],
    42161,
    1643432260,
    1000
  )

  return (
    <>
      <NextSeo title="Dashboard" description="Ascension Protocol Dashboard" />

      <Section className="pb-24 pt-9">
        <Container className="max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.66 }}
          >
            <Grid gap="md" className="">
              <div className="col-span-12">
                <Stat
                  stats={[
                    {
                      name: 'Price',
                      stat:
                        priceData.isLoading || priceData.error ? (
                          <Skeleton />
                        ) : (
                          '$' +
                          parseFloat(
                            (
                              last(
                                priceData.data.coins[
                                  `${CHAIN_NAME[42161]}:${ASCENSION.AscensionToken.address}`
                                ].prices
                              ) as any
                            ).price
                          ).toFixed(3)
                        ),
                    },
                    {
                      name: 'Market Cap',
                      stat:
                        priceData.isLoading || priceData.error ? (
                          <Skeleton />
                        ) : (
                          `$${commify(
                            (
                              (
                                last(
                                  priceData.data.coins[
                                    `${CHAIN_NAME[42161]}:${ASCENSION.AscensionToken.address}`
                                  ].prices
                                ) as any
                              ).price * 14400000
                            ).toFixed(2)
                          )}`
                        ),
                    },
                    {
                      name: 'Staked Supply',
                      stat: stakingData ? (
                        `${(
                          (stakingData[stakingData.length - 1].totalStaked /
                            14400000) *
                          100
                        ).toFixed(0)}%`
                      ) : (
                        <Skeleton />
                      ),
                    },
                  ]}
                />
              </div>

              <div className="col-span-12 md:col-span-6">
                <Card>
                  <Card.Header>
                    <h2 className="text-lg">Total Staked</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="h-[500px] w-full">
                      {!stakingData || stakingData.length === 0 ? (
                        <Loader />
                      ) : (
                        <ResponsiveContainer height={500}>
                          <AreaChart
                            data={stakingData}
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
                            <XAxis
                              dataKey="time"
                              tickFormatter={(value) =>
                                new Date(value * 1000).toLocaleDateString()
                              }
                            />
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
                  </Card.Body>
                </Card>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Card>
                  <Card.Header>
                    <h2 className="text-lg">ASCEND Price</h2>
                  </Card.Header>
                  <Card.Body>
                    <div className="h-[500px] w-full">
                      {priceData.isLoading ? (
                        <Loader />
                      ) : priceData.error ? (
                        <Loader />
                      ) : (
                        <>
                          <ResponsiveContainer height={500}>
                            <AreaChart
                              data={
                                priceData.data.coins[
                                  `${CHAIN_NAME[42161]}:${ASCENSION.AscensionToken.address}`
                                ].prices
                              }
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
                              <XAxis
                                dataKey="timestamp"
                                tickFormatter={(value) =>
                                  new Date(value * 1000).toLocaleDateString()
                                }
                              />
                              <YAxis />
                              <Tooltip />
                              <Area
                                type="monotone"
                                dataKey="price"
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
                  </Card.Body>
                </Card>
              </div>
              <div className="col-span-12">
                <div className="w-full py-12">
                  <h2 className="mb-3 text-2xl">Treasury Token Portfolio</h2>
                  <Divider />
                  <div className=" max-h-[2400px] overflow-x-hidden overflow-y-scroll">
                    {treasuryData ? (
                      <>
                        {treasuryData.tokens.map((t, i) => (
                          <div
                            className="mr-3 flex w-full flex-row items-center  gap-1 py-3 md:mr-6 lg:mr-9"
                            key={i}
                          >
                            <div className="flex items-center gap-1">
                              <div className="flex items-center gap-1">
                                {t.tokenMetadata.logo ? (
                                  <img
                                    className="h-10 w-10"
                                    src={t.tokenMetadata.logo}
                                    alt={t.tokenMetadata.name || ''}
                                  />
                                ) : getAddress(t.contractAddress) ===
                                  ASCENSION.AscensionToken.address ? (
                                  <Logo className="h-10" />
                                ) : (
                                  <div className=" flex h-10 w-10 items-center justify-center rounded-full  bg-gray-800 text-center text-xs">
                                    {t.tokenMetadata.symbol}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-col">
                                <ExternalLink
                                  href={`https://${
                                    SCAN_INFO[t.chainId].name
                                  }/token/${t.contractAddress}`}
                                  className=" truncate text-sm after:content-['_↗'] md:text-base"
                                >
                                  {`${t.tokenMetadata.name}`}
                                </ExternalLink>
                                <span className="text-xs text-secondary md:text-sm">
                                  {commify(t.tokenBalance.toFixed(2))}
                                </span>
                              </div>
                            </div>

                            <p className="ml-auto truncate text-sm md:text-base">
                              {t.priceUSD === 0
                                ? '$-'
                                : t.priceUSD &&
                                  t.tokenBalance &&
                                  `$${commify(
                                    (t.priceUSD * t.tokenBalance).toFixed(2)
                                  )}`}
                            </p>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        {Array(7)
                          .fill(true)
                          .map((_, i) => (
                            <div key={i} className="w-full">
                              <div className="mr-3  flex  items-center gap-1 py-3 md:mr-6 lg:mr-9">
                                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200/30 backdrop-blur" />

                                <div className="w-1/4">
                                  <Skeleton />
                                </div>
                                <div className="ml-auto ">
                                  <Skeleton />
                                </div>
                              </div>
                            </div>
                          ))}
                      </>
                    )}
                  </div>
                  <Divider />
                  <div className="flex w-full">
                    <h2 className="ml-auto flex gap-1  text-xl">
                      Total Value:{' '}
                      <span className="text-green">
                        {treasuryData ? (
                          `$${commify(treasuryData.totalValueUSD.toFixed(2))}`
                        ) : (
                          <Skeleton />
                        )}
                      </span>{' '}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="col-span-12">
                <div className="w-full py-12">
                  <h2 className="mb-3 text-2xl">Treasury NFT Collection</h2>
                  <Divider />
                  <div className="flex h-full flex-col gap-3  p-3">
                    {!treasuryData ? (
                      <Loader />
                    ) : (
                      <Grid gap="sm" className="max-h-[2400px] overflow-y-auto">
                        {treasuryData.nftData.map((nftData) =>
                          nftData.nfts?.map((nft) => (
                            <div
                              className=" col-span-12 flex flex-col items-center justify-center gap-3 rounded bg-gradient-to-br from-gray-800 to-gray-900 p-3 text-center ring ring-black drop-shadow md:col-span-6 xl:col-span-4"
                              key={nft.title}
                            >
                              <NFTImage nft={nft} />

                              <div className="  space-y-1 ">
                                <Typography as="h3" variant="lg">
                                  {nft.contract.name}
                                  {nft.contract.symbol} #
                                  {truncate(nft.tokenId, { length: 8 })}
                                </Typography>

                                <Typography>
                                  {truncate(nft.description, {
                                    length: 40,
                                  })}
                                </Typography>
                                <ExternalLink
                                  href={`https://opensea.io/assets/${
                                    CHAIN_NAME[nftData.chainId]
                                  }/${nft.contract.address}/${nft.tokenId}`}
                                  className="w-full"
                                >
                                  <Button color="blue" className="max-w-sm">
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
                          ))
                        )}
                      </Grid>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          </motion.div>
        </Container>
      </Section>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default DashboardPage
