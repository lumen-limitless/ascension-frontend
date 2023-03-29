import { useState } from 'react'
// import { ChainId, useEthers } from '@usedapp/core'
// import { useBoolean, useSessionStorage } from 'react-use'
// import Button from '../../components/ui/Button'
// import Card from '../../components/ui/Card'
// import Papa from 'papaparse'
// import ToolLayout from '../../layouts/ToolLayout'
// import { motion } from 'framer-motion'

// const stepInfo = [
//   { id: 0, name: 'Prepare' },
//   { id: 1, name: 'Approve' },
//   { id: 2, name: 'Preview' },
// ]

// export default function BatchSenderPage() {
//   const {} = useEthers()
//   const [isReviewing, toggleReviewing] = useBoolean(false)
//   const [listInput, setListInput] = useSessionStorage('batchSenderList', [])
//   const [step, setStep] = useState(0)
//   const onUpload = (e) => {
//     console.debug(e.target.files[0])
//     Papa.parse(e.target.files[0], {
//       header: true,
//       skipEmptyLines: true,
//       complete: function (results) {
//         console.debug(results.data)
//       },
//     })
//   }
//   return (
//     <ToolLayout
//       requiredBalance={1}
//       supportedNetworks={[ChainId.Arbitrum, ChainId.Mainnet]}
//       title="Batch Sender"
//       description="Send batches of assets"
//     >
//       <motion.nav
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ ease: 'easeOut', duration: 0.33 }}
//         aria-label="Progress"
//         className="py-3 md:py-6 lg:py-9"
//       >
//         <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
//           {stepInfo.map((s) => (
//             <li key={s.name} className="md:flex-1">
//               {s.id < step ? (
//                 <a
//                   onClick={() => {
//                     return
//                   }}
//                   className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
//                 >
//                   <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-800">
//                     {`Step ${s.id + 1}`}
//                   </span>
//                   <span className="text-sm font-medium">{s.name}</span>
//                 </a>
//               ) : s.id === step ? (
//                 <a
//                   className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0"
//                   aria-current="step"
//                 >
//                   <span className="text-sm font-medium text-indigo-600">
//                     {`Step ${s.id + 1}`}
//                   </span>
//                   <span className="text-sm font-medium">{s.name}</span>
//                 </a>
//               ) : (
//                 <a className="group flex flex-col border-l-4 border-gray-500 py-2 pl-4  md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 md:pb-0">
//                   <span className="text-sm font-medium text-gray-500 ">
//                     {`Step ${s.id + 1}`}
//                   </span>
//                   <span className="text-sm font-medium">{s.name}</span>
//                 </a>
//               )}
//             </li>
//           ))}
//         </ol>
//       </motion.nav>
//       <Card>
//         <Card.Header>Ascension BatchSender</Card.Header>
//         <Card.Body>
//           <div className="flex flex-col items-center gap-9">
//             <h2>List of Addresses (csv format)</h2>
//             <textarea
//               className="w-full max-w-3xl rounded bg-transparent ring-2 ring-purple-500/50"
//               placeholder="type,address,to,amount,id"
//             />
//             <input type="file" name="file" accept=".csv" onChange={onUpload} />
//             <Button
//               color="blue"
//               onClick={() => {
//                 toggleReviewing()
//               }}
//             >
//               Review Transaction
//             </Button>
//           </div>
//         </Card.Body>
//       </Card>
//     </ToolLayout>
//   )
// }
