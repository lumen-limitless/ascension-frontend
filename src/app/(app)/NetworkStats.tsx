'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { commify } from '@/utils'
import { CubeIcon } from '@heroicons/react/24/outline'
import { Fuel } from 'lucide-react'
import { useBlockNumber, useFeeData } from 'wagmi'

export default function NetworkStats() {
  const blockNumber = useBlockNumber({
    watch: true,
  })

  const feeData = useFeeData({
    watch: true,
  })

  return (
    <div className="ml-auto  flex items-center justify-end gap-1  px-3 py-1">
      <Fuel className="h-5 stroke-blue" />
      <div>
        {feeData.isSuccess ? (
          commify(feeData?.data?.formatted.gasPrice ?? '0', 3)
        ) : (
          <Skeleton className="h-5 w-8" />
        )}
      </div>
      <CubeIcon className="h-5 stroke-green" />
      <div>
        {blockNumber.isSuccess ? (
          Number(blockNumber.data)
        ) : (
          <Skeleton className="h-5 w-12" />
        )}
      </div>
    </div>
  )
}
