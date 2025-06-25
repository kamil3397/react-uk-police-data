import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Home } from './Home'

describe('Home', () => {
  it('renders the welcome message, description, and link', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    expect(await screen.findByRole('heading', { name: /welcome to the police data app/i })).toBeInTheDocument()
    expect(await screen.findByText(/explore public data provided by the uk police api/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /view police forces/i })).toBeInTheDocument()
  })
})
