import React, { type FC } from 'react'
import type { PoliceForce } from '../../../types'

interface Props {
    forces: PoliceForce[]
    selectedForce: string
    selectedDate: string
    onForceChange: (value: string) => void
    onDateChange: (value: string) => void
    onSubmit: (e: React.FormEvent) => void
    onExampleClick: () => void
}

export const CrimesForm: FC<Props> = ({ forces, selectedForce, selectedDate, onForceChange, onDateChange, onSubmit, onExampleClick,
}) => (
    <form onSubmit={onSubmit} className="crime-form">
        <select value={selectedForce} onChange={(e) => onForceChange(e.target.value)}>
            <option value="">Select Police Force</option>
            {forces.map((force) => (
                <option key={force.id} value={force.id}>
                    {force.name}
                </option>
            ))}
        </select>

        <input
            type="month"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
        />

        <button type="button" onClick={onExampleClick}>
            Load Example Data
        </button>
        <button type="submit">Show Crimes</button>
    </form>
)
