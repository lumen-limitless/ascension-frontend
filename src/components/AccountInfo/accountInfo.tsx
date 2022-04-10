import React from 'react'
import Skeleton from '../Skeleton'
import { formatBalance } from '../../functions'
import { useToggle } from 'react-use'
import Modal from '../Modal'
import Avatar from '../Avatar'
import Button from '../Button'
import { Mainnet, shortenIfAddress, useEthers, useLookupAddress } from '@usedapp/core'
import { ExternalLinkIcon, LogoutIcon } from '@heroicons/react/outline'
import { useAscensionTokenSubgraph } from '../../hooks/useSubgraph'
import { HOME_CHAINID, SCAN_INFO } from '../../constants'

export default function AccountInfo() {
  const { account, deactivate, chainId } = useEthers()
  const ens = useLookupAddress()
  const tokenData = useAscensionTokenSubgraph(account)
  const [viewing, toggle] = useToggle(false)

  return (
    <>
      <Button size="sm" color="gray" variant="outlined" onClick={() => toggle(true)}>
        <Avatar size={16} />
        {ens ?? shortenIfAddress(account)}
      </Button>

      {viewing && (
        <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
          <div className="flex w-full flex-col items-center justify-center">
            <Avatar />
            <div className="m-3 flex items-center justify-center rounded  bg-dark-800 px-3 py-1">
              {ens ?? shortenIfAddress(account)}{' '}
              <a
                about="View on block explorer"
                className="px-1"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://${SCAN_INFO[chainId ?? Mainnet.chainId].name}.io/address/${account}`}
              >
                <Button size="none">
                  <ExternalLinkIcon width={20} className="stroke-current text-blue" />
                </Button>
              </a>
              <Button size="none">
                <LogoutIcon className=" stroke-current text-red" width={20} onClick={deactivate} />
              </Button>
            </div>
          </div>

          <div className="flex w-full items-center">
            Balance: {tokenData ? formatBalance(tokenData.balance) : <Skeleton />} ASCEND
          </div>
          <div className="flex w-full items-center">
            Staked: {tokenData ? formatBalance(tokenData.stakedBalance) : <Skeleton />} ASCEND
          </div>
        </Modal>
      )}
    </>
  )
}
