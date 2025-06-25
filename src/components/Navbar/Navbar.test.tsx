import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar'

describe('Navbar', () => {
  it('renders all navigation links and heading', async () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    )

    expect(await screen.findByRole('heading', { name: /police data app/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /police forces/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /crimes/i })).toBeInTheDocument()
  })
})
