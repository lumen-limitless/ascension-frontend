import React from 'react'
// import { Contract } from 'ethers'
// import { formatUnits } from 'ethers/lib/utils'
// import { dropRight, startsWith } from 'lodash'
// import { SCAN_INFO } from '../constants'
// import { useToast } from '../hooks'
// import { ContractEvent } from '../types'
// import Button from './ui/Button'
// import Card from './ui/Card'
// import ExternalLink from './ui/ExternalLink'
// import Grid from './ui/Grid'
// import Loader from './ui/Loader'
// import Typography from './ui/Typography'
// import { motion } from 'framer-motion'
// import { isAddress } from '../functions'

// interface EventMonitorProps {
//   contract: Contract
//   event: ContractEvent
//   setEventArgs: (args: any[], type: 'event' | 'function') => void
// }
// export default function EventMonitor({
//   contract,
//   event,
//   setEventArgs,
// }: EventMonitorProps) {
//   const t = useToast()
//   const { chainId } = useEthers()
//   const blockNumber = useBlockNumber()
//   const logs = useLogs(
//     contract &&
//       event &&
//       blockNumber && { contract: contract, event: event.name, args: [] },
//     {
//       fromBlock: blockNumber - 10,
//     }
//   )

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ ease: 'easeOut', duration: 0.33 }}
//       className="h-full w-full"
//     >
//       <Card>
//         <Card.Header>
//           <div className="flex p-3">
//             <Typography as="h2" variant="lg">
//               {event.name} events
//             </Typography>
//           </div>
//         </Card.Header>

//         {!logs || logs.error ? (
//           <Loader size={48} />
//         ) : (
//           <>
//             <div className="flex max-h-[500px] flex-col items-center justify-start gap-3 overflow-y-auto overflow-x-hidden py-3">
//               {logs.value.reverse().map((log, i) => (
//                 <div
//                   className="w-full rounded bg-gradient-to-r from-gray-900 to-gray-800 p-3"
//                   key={i}
//                 >
//                   <Grid gap="sm">
//                     <div className="col-span-4">
//                       <ExternalLink
//                         href={`https://${SCAN_INFO[chainId].name}/block/${log.blockNumber}`}
//                       >
//                         <Button color="transparent">
//                           <svg
//                             className="h-6 w-6"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M9.504 1.132a1 1 0 01.992 0l1.75 1a1 1 0 11-.992 1.736L10 3.152l-1.254.716a1 1 0 11-.992-1.736l1.75-1zM5.618 4.504a1 1 0 01-.372 1.364L5.016 6l.23.132a1 1 0 11-.992 1.736L4 7.723V8a1 1 0 01-2 0V6a.996.996 0 01.52-.878l1.734-.99a1 1 0 011.364.372zm8.764 0a1 1 0 011.364-.372l1.733.99A1.002 1.002 0 0118 6v2a1 1 0 11-2 0v-.277l-.254.145a1 1 0 11-.992-1.736l.23-.132-.23-.132a1 1 0 01-.372-1.364zm-7 4a1 1 0 011.364-.372L10 8.848l1.254-.716a1 1 0 11.992 1.736L11 10.58V12a1 1 0 11-2 0v-1.42l-1.246-.712a1 1 0 01-.372-1.364zM3 11a1 1 0 011 1v1.42l1.246.712a1 1 0 11-.992 1.736l-1.75-1A1 1 0 012 14v-2a1 1 0 011-1zm14 0a1 1 0 011 1v2a1 1 0 01-.504.868l-1.75 1a1 1 0 11-.992-1.736L16 13.42V12a1 1 0 011-1zm-9.618 5.504a1 1 0 011.364-.372l.254.145V16a1 1 0 112 0v.277l.254-.145a1 1 0 11.992 1.736l-1.735.992a.995.995 0 01-1.022 0l-1.735-.992a1 1 0 01-.372-1.364z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           {log.blockNumber}
//                         </Button>
//                       </ExternalLink>
//                     </div>
//                     <div className="col-span-4">
//                       <ExternalLink
//                         href={`https://${SCAN_INFO[chainId].name}/tx/${log.transactionHash}`}
//                       >
//                         <Button full color="blue">
//                           <svg
//                             className="h-6 w-6"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                           TX
//                         </Button>
//                       </ExternalLink>
//                     </div>
//                     <div className="col-span-4">
//                       <Button
//                         full
//                         color="green"
//                         onClick={() => {
//                           setEventArgs(
//                             dropRight(
//                               log.data as any[],
//                               log.data.length -
//                                 event.inputs.filter(
//                                   (eventInput) => eventInput.indexed === true
//                                 ).length
//                             ),
//                             'event'
//                           )
//                           t('success', 'Added event inputs as filter ')
//                         }}
//                       >
//                         <svg
//                           className="h-6 w-6"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         Filter
//                       </Button>
//                     </div>

//                     <div className="col-span-12 flex w-full flex-col gap-3 md:flex-row ">
//                       {log.data.map((d, i) => (
//                         <div
//                           className=" flex flex-col rounded bg-purple-500 md:flex-row"
//                           key={i}
//                         >
//                           <div className=" p-3">{event.inputs[i].name}</div>

//                           <div className="rounded-r bg-purple-900 p-3">
//                             {startsWith(event.inputs[i].type, 'uint')
//                               ? formatUnits(d, '0')
//                               : isAddress(d)
//                               ? shortenAddress(d)
//                               : d}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </Grid>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}
//       </Card>
//     </motion.div>
//   )
// }
