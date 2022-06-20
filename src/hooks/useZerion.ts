import { useEffect, useState } from 'react'

function verify(request, response) {
  // each value in request payload must be found in response meta
  return Object.keys(request.payload).every((key) => {
    const requestValue = request.payload[key]
    const responseMetaValue = response.meta[key]
    if (typeof requestValue === 'object') {
      return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue)
    }
    return responseMetaValue === requestValue
  })
}

// export const useZerionPortfolio = () => {
//   const [portfolio, setPortfolio] = useState(null)

//   useEffect(() => {
//     if (portfolio) return

//     let io = require('socket.io-client')

//     const addressSocket = {
//       namespace: 'address',
//       socket: io(`wss://api-v4.zerion.io/address`, {
//         origin: 'http://localhost:3000',
//         transports: ['websocket'],
//         timeout: 60000,
//         query: {
//           api_token: 'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
//         },
//       }),
//     }

//     const get = async (socketNamespace, requestBody) => {
//       const { socket, namespace } = socketNamespace
//       function handleReceive(data) {
//         unsubscribe()
//         setPortfolio(data.payload.portfolio)
//       }
//       const model = requestBody.scope[0]
//       function unsubscribe() {
//         socket.off(`received ${namespace} ${model}`, handleReceive)
//         socket.emit('unsubscribe', requestBody)
//       }
//       socket.emit('get', requestBody)
//       socket.on(`received ${namespace} ${model}`, handleReceive)
//     }

//     get(addressSocket, {
//       scope: ['portfolio'],
//       payload: {
//         addresses: [
//           '0xaF1513c82c95736Fb2aF91Afd535c998100339Dc',
//           '0xf170F8cF57D00b60331c33Dc73103415bfb9980d',
//         ],
//         currency: 'usd',
//         portfolio_fields: 'all',
//       },
//     }).catch((err) => {
//       console.error(err)
//     })
//   }, [portfolio])

//   return portfolio
// }

// export const useZerionAssets = () => {
//   const [assets, setAssets] = useState(null)
//   useEffect(() => {
//     if (assets) return

//     let io = require('socket.io-client')

//     const addressSocket = {
//       namespace: 'address',
//       socket: io(`wss://api-v4.zerion.io/address`, {
//         origin: 'http://localhost:3000',
//         transports: ['websocket'],
//         timeout: 60000,
//         query: {
//           api_token: 'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
//         },
//       }),
//     }

//     const get = async (socketNamespace, requestBody) => {
//       const { socket, namespace } = socketNamespace
//       function handleReceive(data) {
//         unsubscribe()
//         setAssets(data.payload.assets)
//       }
//       const model = requestBody.scope[0]
//       function unsubscribe() {
//         socket.off(`received ${namespace} ${model}`, handleReceive)
//         socket.emit('unsubscribe', requestBody)
//       }
//       socket.emit('get', requestBody)
//       socket.on(`received ${namespace} ${model}`, handleReceive)
//     }

//     get(addressSocket, {
//       scope: ['assets'],
//       payload: {
//         addresses: [
//           '0xaF1513c82c95736Fb2aF91Afd535c998100339Dc',
//           '0xf170F8cF57D00b60331c33Dc73103415bfb9980d',
//         ],
//         currency: 'usd',
//       },
//     }).catch((err) => {
//       console.error(err)
//     })
//   }, [assets])

//   return assets
// }
