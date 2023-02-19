import React from 'react'
// import Container from '../../components/ui/Container'
// import Swap from '../../components/Swap'
// import { NextPageWithLayout, Token } from '../../types'
// import Section from '../../components/ui/Section'
// import Grid from '../../components/ui/Grid'
// import { NextSeo } from 'next-seo'
// import ImageComponent from '../../components/ImageComponent'
// import { ReactElement } from 'react'
// import { useAccount, useNetwork } from 'wagmi'
// import AppLayout from '../../layouts/AppLayout'
// import { useSessionStorage } from 'react-use'
// import { ascensionTokenAddress } from '../../wagmi/generated'
// import tokenList from '../../json/tokenList.json'
// import { WETH9_ADDRESS } from '../../constants'

// const MercuryPage: NextPageWithLayout = () => {
//   const { address } = useAccount()
//   const { chain } = useNetwork()

//   const [tokenIn, setTokenIn] = useSessionStorage<Token>('mercury_tokenIn', {
//     address: WETH9_ADDRESS[42161],
//     chainId: 42161,
//     name: 'Wrapped Ether',
//     symbol: 'WETH',
//     decimals: 18,
//   })
//   const [tokenOut, setTokenOut] = useSessionStorage<Token>('mercury_tokenOut', {
//     address: ascensionTokenAddress[42161],
//     chainId: 42161,
//     name: 'Ascension Token',
//     symbol: 'ASCEND',
//     decimals: 18,
//   })

//   return (
//     <>
//       <NextSeo
//         title="Mercury"
//         description={`Ascension Protocol universal swap tool`}
//       />

//       <Section className="py-12">
//         <Container className="max-w-7xl">
//           <Grid gap="md">
//             {' '}
//             <div className="col-span-12 md:col-span-4">
//               <Swap />
//             </div>
//             <div className="col-span-12  flex flex-col gap-3 md:col-span-8">
//               {/* <TradingChart buyToken={buyToken} dex={dex} /> */}

//               <ImageComponent
//                 src={`https://cfgi.io/images/cfgi/dark/ETH-CFGI-1h.png`}
//                 alt="ETH CFGI analysis"
//                 height={250}
//                 width={260}
//               />
//             </div>
//           </Grid>
//         </Container>
//       </Section>
//     </>
//   )
// }

// MercuryPage.getLayout = (page: ReactElement) => {
//   return <AppLayout>{page}</AppLayout>
// }
// export default MercuryPage

// const handleScriptLoad = (e: any) => {
//   const w = window as any
//   w.trends.embed.renderExploreWidgetTo(
//     document.getElementById('widget'),
//     'TIMESERIES',
//     {
//       comparisonItem: [
//         { keyword: 'Ethereum', geo: 'US', time: 'today 12-m' },
//       ],
//       category: 0,
//       property: '',
//     },
//     {
//       exploreQuery:
//         'geo=US&q=%2Fm%2F0108bn2x,%2Fm%2F0vpj4_b&date=today 12-m,today 12-m',
//       guestPath: 'https://trends.google.com:443/trends/embed/',
//     }
//   )
// }
