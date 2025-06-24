import { useState, type FC } from 'react'
import { Link } from 'react-router-dom'
import { usePoliceContext } from '../../context/PoliceContext'

export const ForcesPage:FC = () => {
  const { forces, loading, error } = usePoliceContext()
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  const totalPages = Math.ceil(forces.length / itemsPerPage)
  const currentForces = forces.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className="forces-page">
      <div className="forces-overlay">
        <h2 className="forces-heading">Police Forces</h2>

        {loading && <p className="forces-status">Loading...</p>}
        {error && <p className="forces-status">Error: {error}</p>}
          <>
            <div className="forces-grid">
              {currentForces.map((force) => (
                <Link key={force.id} to={`/forces/${force.id}`} className="forces-card">
                  {force.name}
                </Link>
              ))}
            </div>

              <div className="forces-pagination">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
          </>
      </div>
    </div>
  )
}