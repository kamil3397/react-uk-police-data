import { type FC } from 'react'
import type { Crime } from '../../../types'

interface Props {
    crimes: Crime[]
    page: number
    totalPages: number
    onPrevPage: () => void
    onNextPage: () => void
}

export const CrimesList: FC<Props> = ({ crimes, page, totalPages, onPrevPage, onNextPage }) => (
    <>
        <ul className="crimes-list">
            {crimes.map((crime) => (
                <li key={crime.id}>
                    <strong>{crime.category}</strong> ({crime.month})
                    <div>
                        Outcome:{' '}
                        {crime.outcome_status ? `${crime.outcome_status.category}`: 'not provided'}
                    </div>
                </li>
            ))}
        </ul>

        {totalPages > 1 && (
            <div className="pagination">
                <button onClick={onPrevPage} disabled={page === 1}>
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button onClick={onNextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
        )}
    </>
)
