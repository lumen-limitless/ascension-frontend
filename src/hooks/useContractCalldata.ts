import { ethers } from 'ethers'
import { useAsync } from 'react-use'

export const useContractCalldata = (
  address?: string,
  abi?: any,
  functionName?: string,
  args?: any[]
) => {
  return useAsync(async () => {
    if (!address) return null
    if (!abi) return null
    if (!functionName) return null
    const contract = new ethers.Contract(address, abi)
    if (!args) return await contract.populateTransaction[functionName]()

    return await contract.populateTransaction[functionName](...args)
    try {
    } catch {
      return null
    }
  }, [address, abi, functionName, args])
}
