import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ForceDetails } from '../ForceDetails/ForceDetails'

const mockData = {
  name: 'Test Police',
  description: 'Some text',
  url: 'https://example.com',
}

describe('ForceDetails – no casts', () => {
  it('renders loading and then data', async () => {
    const responseBody = JSON.stringify(mockData)
    window.fetch = vi.fn(() => Promise.resolve(new Response(responseBody)))

    render(
      <MemoryRouter initialEntries={['/forces/test-id']}>
        <Routes>
          <Route path="/forces/:id" element={<ForceDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByRole('heading', { name: /test police/i })).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /visit official website/i })).toHaveAttribute(
      'href',
      'https://example.com'
    )
  })

  it('renders error when fetch fails', async () => {
    window.fetch = vi.fn(() => Promise.resolve(new Response(null, { status: 500 })))

    render(
      <MemoryRouter initialEntries={['/forces/test-id']}>
        <Routes>
          <Route path="/forces/:id" element={<ForceDetails />} />
        </Routes>
      </MemoryRouter>
    )

    expect(await screen.findByText(/error/i)).toBeInTheDocument()
  })
})
