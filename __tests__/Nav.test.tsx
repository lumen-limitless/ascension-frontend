import { render, screen, fireEvent } from '@testing-library/react'
import Nav from '../src/components/Nav'

describe('Nav', () => {
  it('renders the logo', () => {
    render(<Nav />)
    expect(
      screen.getByRole('img', { name: 'Ascension Protocol' })
    ).toBeInTheDocument()
  })

  it('toggles the tools menu on click', () => {
    render(<Nav />)
    const toolsMenuButton = screen.getByRole('button', { name: 'Tools' })
    fireEvent.click(toolsMenuButton)
    const toolsMenu = screen.getByRole('menu', { name: 'Tools menu' })
    expect(toolsMenu).toBeInTheDocument()
    fireEvent.click(toolsMenuButton)
    expect(toolsMenu).not.toBeInTheDocument()
  })

  it('navigates to the dashboard on link click', () => {
    render(<Nav />)
    const dashboardLink = screen.getByRole('link', { name: 'Dashboard' })
    fireEvent.click(dashboardLink)
    expect(window.location.pathname).toBe('/dashboard')
  })
})
