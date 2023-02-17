import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { useSessionStorage } from 'react-use'
import Banner from '../src/components/Banner'
import '@testing-library/jest-dom'

jest.mock('react-use')

describe('Banner', () => {
  it('should render banner and dismiss button', () => {
    // @ts-ignore
    useSessionStorage.mockReturnValue([true, jest.fn()])

    render(<Banner>My banner message</Banner>)

    const banner = screen.getByLabelText('banner')
    expect(banner).toBeInTheDocument()

    const dismissButton = screen.getByRole('button')
    expect(dismissButton).toBeInTheDocument()
  })

  it('should dismiss banner on button click', () => {
    const setViewing = jest.fn()
    // @ts-ignore
    useSessionStorage.mockReturnValue([true, setViewing])

    render(<Banner>My banner message</Banner>)

    const dismissButton = screen.getByRole('button')
    fireEvent.click(dismissButton)

    expect(setViewing).toHaveBeenCalledWith(false)
  })

  it('should not render banner when viewing is false', () => {
    // @ts-ignore
    useSessionStorage.mockReturnValue([false, jest.fn()])

    render(<Banner>My banner message</Banner>)

    const banner = screen.queryByLabelText('banner')
    expect(banner).toBeNull()
  })
})
