import React from 'react'
import DisconnectButton from '../Button/DisconnectButton'
import Skeleton from '../Skeleton'
import { formatBalance } from '../../functions'
import { useToggle } from 'react-use'
import Modal from '../Modal'
import Avatar from '../Avatar'
import Button from '../Button'
import { shortenIfAddress, useEthers, useLookupAddress } from '@usedapp/core'
import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useAscensionTokenSubgraph } from '../../hooks/useSubgraph'

export default function AccountInfo() {
  const { account } = useEthers()
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
            <div className="m-3 flex items-center justify-center gap-1 rounded  bg-dark-800 px-3">
              {ens ?? shortenIfAddress(account)}{' '}
              <a
                about="View on block explorer"
                className="px-1"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://etherscan.io/address/${account}`}
              >
                <ExternalLinkIcon width={20} className="stroke-current text-blue" />
              </a>
              <DisconnectButton />
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
