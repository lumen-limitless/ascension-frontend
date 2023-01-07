import { useBlockNumber, useEthers, useLogs, ChainId } from '@usedapp/core'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useContract } from '../../hooks'
import ToolLayout from '../../layouts/ToolLayout'
import factoryABI from '../../json/UniswapV2Factory.abi.json'
import { SUSHI_FACTORY_ADDRESS } from '../../constants'

const ACTIVE = false
const ListingSniperPage: NextPage = () => {
  const { chainId } = useEthers()
  const blockNumber = useBlockNumber()
  const [data, setData] = useState([])
  const factory = useContract(SUSHI_FACTORY_ADDRESS[chainId], factoryABI)
  const logs = useLogs(
    factory && {
      contract: factory,
      event: 'PairCreated',
      args: [null, null, null],
    },
    { fromBlock: blockNumber - 10 }
  )
  console.debug(logs)
  if (!ACTIVE) return <></>
  return (
    <ToolLayout
      supportedNetworks={[ChainId.Mainnet, ChainId.Arbitrum]}
      title="Listing Sniper"
    >
      <div className="relative rounded bg-gradient-to-br from-blue-500 to-blue-600 p-3 ring ring-black drop-shadow md:p-6">
        We do not condone any of the projects listed here, for informational
        purposes only, use at your own risk blah blah
      </div>

      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-purple-500/50 shadow sm:rounded-lg">
              <table className="max-h-80 min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs &&
                    logs.value.map((log, i) => (
                      <tr
                        key={i}
                        className={i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'}
                      >
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-bold text-primary">
                          {log.data.pair}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-primary">
                          {log.data.token0}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-primary">
                          {log.data.token1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-primary"></td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-bold">
                          <a
                            href="#"
                            className="text-indigo-500 hover:text-indigo-800"
                          >
                            Buy on Uniswap
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
export default ListingSniperPage
