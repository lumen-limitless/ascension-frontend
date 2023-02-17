import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders the Homepage', () => {
    render(<Home />)

    expect(
      screen.getByRole('heading', {
        name: 'Prepare for Ascension',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Our Partners',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', {
        name: 'Join the Ascension',
      })
    ).toBeInTheDocument()
  })
})
