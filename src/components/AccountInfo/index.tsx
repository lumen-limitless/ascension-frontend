<<<<<<< HEAD
import React from "react";
import DisconnectButton from "../Button/disconnectButton";
import { useWeb3React } from "@web3-react/core";
import { useAscendBalance, useAscendVoting } from "../../hooks/useAscend";
import Skeleton from "../Skeleton";
import { formatBalance, shortenAddress } from "../../functions";
import Pill from "../Button/pill";
import { useToggle } from "react-use";
import { FingerPrintIcon, UserIcon, XIcon } from "@heroicons/react/outline";
import Modal from "../Modal";
import { Web3Provider } from "@ethersproject/providers";
import Avatar from "../Avatar";
import Button from "../Button";
=======
import React from 'react'
import DisconnectButton from '../DisconnectButton'
import Skeleton from '../Skeleton'
import { formatBalance } from '../../functions'
import { useToggle } from 'react-use'
import Modal from '../Modal'
import Avatar from '../Avatar'
import Button from '../Button'
import { shortenIfAddress, useEthers, useLookupAddress } from '@usedapp/core'

import { ExternalLinkIcon } from '@heroicons/react/outline'
import { useAPIASCENDBalance, useAPIStakedASCENDBalance } from '../../hooks/useAPI'
>>>>>>> canary

export default function AccountInfo() {
  const { account } = useEthers()
  const ens = useLookupAddress()
  const ascendBalance = useAPIASCENDBalance(account)
  const sAscendBalance = useAPIStakedASCENDBalance(account)

  const [viewing, toggle] = useToggle(false)

<<<<<<< HEAD
    return (
        <>
            <Button
                color="gray"
                variant="outlined"
                onClick={() => toggle(true)}
            >
                <UserIcon height="20px" />
                {account ? shortenAddress(account) : ""}
            </Button>
=======
  return (
    <>
      <Button size="sm" color="gray" variant="outlined" onClick={() => toggle(true)}>
        <Avatar size={16} />
        {ens ?? shortenIfAddress(account)}
      </Button>
>>>>>>> canary

      {viewing && (
        <Modal isOpen={viewing} onDismiss={() => toggle(false)}>
          <div className="flex w-full flex-col items-center justify-center">
            <Avatar />
            <div className="m-2 flex items-center justify-center gap-1 rounded bg-gray-200 p-2 dark:bg-dark-800">
              {ens ?? shortenIfAddress(account)}{' '}
              <a
                about="View on block explorer"
                className="px-1"
                target="_blank"
                rel="noopener noreferrer"
                href="https://etherscan.io/address/0x369d1C11b4E520223Eb8694961c9D11dC423Dd45"
              >
                <ExternalLinkIcon width={20} className="stroke-current text-blue" />
              </a>
              <DisconnectButton />
            </div>
          </div>

          <div className="flex w-full items-center">
            Balance: {ascendBalance ? formatBalance(ascendBalance) : <Skeleton />} ASCEND
          </div>
          <div className="flex w-full items-center">
            Staked: {sAscendBalance ? formatBalance(sAscendBalance) : <Skeleton />} ASCEND
          </div>
        </Modal>
      )}
    </>
  )
}
