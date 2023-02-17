import { render, screen } from '@testing-library/react'
import { BigNumber } from 'ethers'
import React from 'react'
import { useBlockNumber, useFeeData } from 'wagmi'

import NetworkStats from '../src/components/NetworkStats'

jest.mock('wagmi')

describe('NetworkStats', () => {
  it('renders the current block number and base fee per gas', () => {
    const mockBlockNumber = 12345
    const mockFeeData = {
      lastBaseFeePerGas: BigNumber.from('5000000000'), // 5 Gwei
    }

    // Mock the useBlockNumber and useFeeData hooks to return the desired values.
    ;(useBlockNumber as jest.Mock).mockReturnValue({
      data: mockBlockNumber,
    })
    ;(useFeeData as jest.Mock).mockReturnValue({
      data: mockFeeData,
    })

    render(<NetworkStats />)

    expect(screen.getByText('5.0 Gwei')).toBeInTheDocument()
    expect(screen.getByText(mockBlockNumber.toString())).toBeInTheDocument()
  })

  it('renders a skeleton loader when fee data is not available', () => {
    // Mock the useFeeData hook to return undefined.
    ;(useFeeData as jest.Mock).mockReturnValue({ data: undefined })

    render(<NetworkStats />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('renders a skeleton loader for block number when it is not available', () => {
    // Mock the useBlockNumber hook to return undefined.
    ;(useBlockNumber as jest.Mock).mockReturnValue({ data: undefined })

    render(<NetworkStats />)

    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })
})
