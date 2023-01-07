import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '../src/components/ui/Button'

describe('Button', () => {
  it('renders the Button', () => {
    render(<Button />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('renders the Button disabled', () => {
    render(<Button disabled />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })
  it('renders the blue Button', () => {
    render(<Button color="blue" />)
    const button = screen.getByRole('button')
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(button).toHaveClass('bg-blue-500')
    expect(button).toBeEnabled()
  })
  it('renders the green Button', () => {
    render(<Button color="green" />)
    const button = screen.getByRole('button')
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(button).toHaveClass('bg-green-500')
    expect(button).toBeEnabled()
  })
})
