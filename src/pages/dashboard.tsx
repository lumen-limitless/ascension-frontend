import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { NextSeo } from 'next-seo'
import Card from '../components/ui/Card'
import { commify } from 'ethers/lib/utils'
import { SCAN_INFO, CHAIN_NAME } from '../constants'
import Loader from '../components/ui/Loader'
import { useTreasuryData } from '../hooks'
import Grid from '../components/ui/Grid'
import { m } from 'framer-motion'
import { last, truncate } from 'lodash'
import ExternalLink from '../components/ui/ExternalLink'
import { ReactElement } from 'react'
import Skeleton from '../components/ui/Skeleton'
import NFTImage from '../components/NFTImage'
import Divider from '../components/ui/Divider'
import { useDefiLlamaPriceChart } from '../hooks'
import { NextPageWithLayout } from '../types'
import AppLayout from '../layouts/AppLayout'
import { ascensionTokenAddress } from '../wagmi/generated'
import { arbitrum } from 'wagmi/chains'
import PriceChart from '../components/dashboard/PriceChart'
import TotalStakedChart from '../components/dashboard/TotalStakedChart'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import dailySnapshotDocument from '../queries/dailySnapshotDocument'
import StatGrid from '../components/ui/StatGrid'
import LogoSVG from 'public/assets/logo.svg'
import { isAddressEqual } from 'viem'
import { formatPercent } from '../functions'

const DashboardPage: NextPageWithLayout = () => {
  const treasuryData = useTreasuryData()
  console.debug('TREASURY DATA', treasuryData)

  const { data: dailySnapshots } = useQuery(['dailySnapshots'], async () => {
    const { dailySnapshots } = await request(
      'https://api.thegraph.com/subgraphs/name/lumen-limitless/ascension-subgraph',
      dailySnapshotDocument
    )
    return dailySnapshots
  })
  console.debug('DAILY SNAPSHOTS', dailySnapshots)

  const { data: priceData, isFetched: isFetchedPriceData } =
    useDefiLlamaPriceChart(
      ascensionTokenAddress,
      arbitrum.id,
      1638234087, //timestamp of ascend launch
      1000 //max data points
    )
  console.debug('PRICE DATA', priceData)

  return (
    <>
      <NextSeo title="Dashboard" description="Ascension Protocol Dashboard" />

      <Section className="pb-24 pt-9">
        <Container className="max-w-7xl">
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.66 }}
          >
            <Grid gap="md">
              <div className="col-span-12">
                <StatGrid
                  stats={[
                    {
                      name: 'Price',
                      stat: !isFetchedPriceData ? (
                        <Skeleton />
                      ) : (
                        '$' +
                        parseFloat(
                          (
                            last(
                              priceData?.coins[
                                `${
                                  CHAIN_NAME[arbitrum.id]
                                }:${ascensionTokenAddress}`
                              ]?.prices
                            ) as any
                          )?.price
                        ).toFixed(3)
                      ),
                    },
                    {
                      name: 'Market Cap',
                      stat: !isFetchedPriceData ? (
                        <Skeleton />
                      ) : (
                        `$${commify(
                          (
                            (
                              last(
                                priceData?.coins[
                                  `${
                                    CHAIN_NAME[arbitrum.id]
                                  }:${ascensionTokenAddress}`
                                ]?.prices
                              ) as any
                            )?.price * 14400000
                          ).toFixed(2)
                        )}`
                      ),
                    },
                    {
                      name: 'Staked Supply',
                      stat: dailySnapshots ? (
                        `${formatPercent(
                          (parseFloat(last(dailySnapshots)?.totalAssets) /
                            14400000) *
                            100
                        )}`
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
                    <TotalStakedChart stakingData={dailySnapshots} />
                  </Card.Body>
                </Card>
              </div>
              <div className="col-span-12 md:col-span-6">
                <Card>
                  <Card.Header>
                    <h2 className="text-lg">ASCEND Price</h2>
                  </Card.Header>
                  <Card.Body>
                    <PriceChart priceData={priceData} />
                  </Card.Body>
                </Card>
              </div>

              <div className="col-span-12">
                <div className="w-full py-12">
                  <h2 className="mb-3 text-2xl">Treasury Token Portfolio</h2>
                  <Divider />
                  <div className="max-h-[2400px] overflow-x-auto overflow-y-scroll">
                    {treasuryData ? (
                      <table className="min-w-full divide-y divide-gray-900">
                        <thead>
                          <tr>
                            <th className="py-2 text-left text-xs font-semibold text-primary">
                              Token
                            </th>
                            <th className="hidden py-2 text-left text-xs font-semibold text-primary md:table-cell">
                              Balance
                            </th>
                            <th className="py-2 text-left text-xs font-semibold text-primary">
                              Value
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-900">
                          {treasuryData.tokens.map((t, i) => (
                            <tr key={i} className="text-sm md:text-base">
                              <td className="flex items-center gap-2 px-2 py-2">
                                {t.tokenMetadata.logo ? (
                                  <img
                                    className="h-8 w-8 md:h-10 md:w-10"
                                    src={t.tokenMetadata.logo}
                                    alt={t.tokenMetadata.name || ''}
                                  />
                                ) : isAddressEqual(
                                    t.contractAddress as `0x${string}`,
                                    ascensionTokenAddress
                                  ) ? (
                                  <LogoSVG className="h-8 md:h-10" />
                                ) : (
                                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-center text-xs md:h-10 md:w-10">
                                    {t.tokenMetadata.symbol}
                                  </div>
                                )}
                                <ExternalLink
                                  href={`https://${
                                    SCAN_INFO[t.chainId].name
                                  }/token/${t.contractAddress}`}
                                  className="truncate after:content-['_↗']"
                                >
                                  {t.tokenMetadata.name}
                                </ExternalLink>
                              </td>
                              <td className="hidden px-2 py-2 md:table-cell">
                                <span className="text-xs text-secondary md:text-sm">
                                  {commify(t.tokenBalance.toFixed(2))}
                                </span>
                              </td>
                              <td className="px-2 py-2">
                                {t.priceUSD === 0
                                  ? '$-'
                                  : t.priceUSD &&
                                    t.tokenBalance &&
                                    `$${commify(
                                      (t.priceUSD * t.tokenBalance).toFixed(2)
                                    )}`}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <table className="min-w-full">
                        <tbody>
                          {Array(7)
                            .fill(true)
                            .map((_, i) => (
                              <tr key={i} className="text-sm md:text-base">
                                <td className="flex items-center gap-2 px-2 py-2">
                                  <div className="h-8 w-8 animate-pulse rounded-full bg-gray-500/60 md:h-10 md:w-10"></div>
                                  <div className="h-4 w-1/2 animate-pulse bg-gray-500/60"></div>
                                </td>
                                <td className="hidden px-2 py-2 md:table-cell">
                                  <div className="h-4 w-1/2 animate-pulse bg-gray-500/60"></div>
                                </td>
                                <td className="px-2 py-2">
                                  <div className="h-4 w-1/2 animate-pulse bg-gray-500/60"></div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  <Divider />
                  <div className="flex w-full">
                    <h2 className="ml-auto flex gap-1 text-xl">
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
                      <Grid gap="sm">
                        {treasuryData.nftData.map((nftData) =>
                          nftData.nfts?.map((nft) => (
                            <ExternalLink
                              href={`https://opensea.io/assets/${
                                CHAIN_NAME[nftData.chainId]
                              }/${nft.contract.address}/${nft.tokenId}`}
                              className="col-span-12 w-full md:col-span-6 xl:col-span-3"
                              key={nft.title}
                              title={`View ${nft.title} on OpenSea`}
                            >
                              <div className="flex h-full  flex-col items-center justify-center gap-3 overflow-clip rounded border-2 border-purple bg-purple-900 text-center ring  ring-black drop-shadow transition-colors hover:border-yellow">
                                <NFTImage nft={nft} />

                                <div className="h-10 w-full px-2 text-left ">
                                  <p className="text-lg">
                                    {nft.contract.name || '--'} #
                                    {truncate(nft.tokenId, { length: 10 })}
                                  </p>
                                </div>
                              </div>
                            </ExternalLink>
                          ))
                        )}
                      </Grid>
                    )}
                  </div>
                </div>
              </div>
            </Grid>
          </m.div>
        </Container>
      </Section>
    </>
  )
}

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>
}

export default DashboardPage
