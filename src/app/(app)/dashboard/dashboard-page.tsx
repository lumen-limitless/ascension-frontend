'use client'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { commify } from 'ethers/lib/utils'
import { SCAN_INFO, CHAIN_NAME } from '@/constants'
import Loader from '@/components/ui/Loader'
import { useTreasuryData } from '@/hooks'
import Grid from '@/components/ui/Grid'
import { m } from 'framer-motion'
import { last, truncate } from 'lodash'
import Skeleton from 'react-loading-skeleton'
import NFTImage from '@/components/NFTImage'
import Divider from '@/components/ui/Divider'
import { useDefiLlamaPriceChart } from '@/hooks'
import { ascensionTokenAddress } from '@/wagmi/generated'
import { arbitrum } from 'wagmi/chains'
import ExternalLink from '@/components/ui/ExternalLink'
import PriceChart from './PriceChart'
import TotalStakedChart from './TotalStakedChart'
import { useQuery } from '@tanstack/react-query'
import request from 'graphql-request'
import stakingSnapshotDocument from '@/queries/stakingSnapshotDocument'
import StatGrid from '@/components/StatGrid'
import LogoSVG from 'public/assets/logo.svg'
import { isAddressEqual } from 'viem'
import { formatPercent } from '@/utils'

export default function DashboardPage() {
  const treasuryData = useTreasuryData()
  console.debug('TREASURY DATA', treasuryData)

  const { data: stakingSnapshots } = useQuery(
    ['stakingSnapshots'],
    async () => {
      const { stakingSnapshots } = await request(
        'https://api.thegraph.com/subgraphs/name/lumen-limitless/ascension-subgraph',
        stakingSnapshotDocument
      )
      return stakingSnapshots
    }
  )
  console.debug('staking SNAPSHOTS', stakingSnapshots)

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
                      stat:
                        isFetchedPriceData &&
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
                        ).toFixed(3),
                    },
                    {
                      name: 'Market Cap',
                      stat:
                        isFetchedPriceData &&
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
                        )}`,
                    },
                    {
                      name: 'Staked Supply',
                      stat:
                        stakingSnapshots &&
                        `${formatPercent(
                          (parseFloat(last(stakingSnapshots)?.totalAssets) /
                            14400000) *
                            100
                        )}`,
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
                    <TotalStakedChart stakingData={stakingSnapshots} />
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
                                    className="h-8 w-8 rounded-full md:h-10 md:w-10"
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
                                  ? '$--'
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
                        <tbody className="divide-y divide-gray-900">
                          {Array(10)
                            .fill(true)
                            .map((_, i) => (
                              <tr key={i} className="text-sm md:text-base">
                                <td className="flex items-center gap-2 px-2 py-2">
                                  <Skeleton
                                    circle={true}
                                    height={32}
                                    width={32}
                                  />
                                  <Skeleton />
                                </td>
                                <td className="hidden px-2 py-2 md:table-cell">
                                  <Skeleton />
                                </td>
                                <td className="px-2 py-2">
                                  <Skeleton />
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
