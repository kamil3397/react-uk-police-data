import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ForceDetails } from './ForceDetails'

const mockData = {
  name: 'Test Police',
  description: 'Some text',
  url: 'https://example.com',
}

describe('ForceDetails', () => {
  it('shows loading and then force name + link', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    render(
      <MemoryRouter initialEntries={['/forces/abc']}>
        <Routes>
          <Route path="/forces/:id" element={<ForceDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: /test police/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /visit official website/i })).toHaveAttribute('href', 'https://example.com')
  })

  it('shows error when fetch fails', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
    })

    render(
      <MemoryRouter initialEntries={['/forces/abc']}>
        <Routes>
          <Route path="/forces/:id" element={<ForceDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })
})
