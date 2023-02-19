import { formatUnits } from '@ethersproject/units'
import { BigNumberish } from 'ethers'
import { useBlockNumber, useFeeData } from 'wagmi'
import Skeleton from './ui/Skeleton'

export default function NetworkStats() {
  const { data: blockNumber } = useBlockNumber()
  const { data: feeData } = useFeeData()
  return (
    <div className="ml-auto  flex items-center justify-end gap-1  py-1 px-3 text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
        className="h-5 w-5 text-blue"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 32 32"
      >
        <path fill="currentColor" d="M8 10h7v2H8z" />
        <path
          fill="currentColor"
          d="m28.414 8l-5-5L22 4.414l3 3V12a2.002 2.002 0 0 0 2 2v10.5a1.5 1.5 0 0 1-3 0V16a1 1 0 0 0-1-1h-4V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v21H2v2h19v-2h-2v-9h3v7.4a3.564 3.564 0 0 0 2.765 3.525A3.506 3.506 0 0 0 29 24.5V9.414A2 2 0 0 0 28.414 8ZM17 26H6V6h11Z"
        />
      </svg>{' '}
      <div>
        {feeData ? (
          parseFloat(
            formatUnits(feeData.lastBaseFeePerGas as BigNumberish, 'gwei')
          ).toFixed(1) + ' Gwei'
        ) : (
          <Skeleton />
        )}
      </div>
      <svg
        className="h-5 w-5 text-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>{' '}
      <div>{blockNumber || <Skeleton />}</div>
    </div>
  )
}
