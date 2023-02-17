import React from 'react'
// import { useEthers } from '@usedapp/core'
// import { SUPPORTED_CHAINS } from '../../constants'
// import Button from '../ui/Button'
// import { useUI } from '../../hooks'
// import ChainIcon from '../icons/ChainIcon'
// import Grid from '../ui/Grid'

// export default function Network() {
//   const { switchNetwork, chainId } = useEthers()
//   const { toggleViewingModal } = useUI()

//   return (
//     <div className="w-full  md:pb-0">
//       <Grid gap="sm">
//         {SUPPORTED_CHAINS.map((chain) => (
//           <div className="col-span-6" key={chain.chainId}>
//             <Button
//               color={chainId === chain.chainId ? 'blue' : 'gray'}
//               disabled={chainId === chain.chainId}
//               onClick={() => {
//                 switchNetwork(chain.chainId).then(() => {
//                   toggleViewingModal(false)
//                 })
//               }}
//             >
//               <span className="sr-only">{chain.chainName}</span>
//               <ChainIcon chainId={chain.chainId} />
//             </Button>
//           </div>
//         ))}
//       </Grid>
//     </div>
//   )
// }
