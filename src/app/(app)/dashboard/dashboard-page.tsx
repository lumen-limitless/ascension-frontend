'use client'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { SCAN_INFO, CHAIN_NAME } from '@/constants'
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
import { formatUnits, isAddressEqual } from 'viem'
import { commify, formatPercent } from '@/utils'
import { TokenData } from '@/types'
import { useMemo } from 'react'

export default function DashboardPage({ tokens }: { tokens: TokenData[] }) {
  // const treasuryData = useTreasuryData()
  console.debug(tokens)

  const totalValueUSD = useMemo(() => {
    if (!tokens) return null
    const t = tokens.reduce(
      (sum, token) =>
        sum +
        token.priceUSD *
          parseFloat(
            formatUnits(
              BigInt(token.tokenBalance),
              token.tokenMetadata.decimals || 18
            )
          ),
      0
    )

    return t
  }, [tokens])
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
                    {tokens ? (
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
                          {tokens.map((t, i) => (
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
                                  {commify(
                                    parseFloat(
                                      formatUnits(
                                        BigInt(t.tokenBalance),
                                        t.tokenMetadata.decimals || 18
                                      )
                                    ).toFixed(2)
                                  )}
                                </span>
                              </td>
                              <td className="px-2 py-2">
                                {t.priceUSD === 0
                                  ? '$--'
                                  : t.priceUSD &&
                                    t.tokenBalance &&
                                    `$${commify(
                                      (
                                        t.priceUSD *
                                        parseFloat(
                                          formatUnits(
                                            BigInt(t.tokenBalance),
                                            t.tokenMetadata.decimals || 18
                                          )
                                        )
                                      ).toFixed(2)
                                    )}`}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Divider />
                  <div className="flex w-full items-center justify-end gap-1">
                    <h2 className="text-xl">Total Value: </h2>
                    <span className="text-green">
                      ${commify(totalValueUSD) || <Skeleton />}
                    </span>
                  </div>
                </div>
              </div>

              {/* <div className="col-span-12">
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
              </div> */}
            </Grid>
          </m.div>
        </Container>
      </Section>
    </>
  )
}
