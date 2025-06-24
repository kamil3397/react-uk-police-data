import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react'
import type { PoliceForce } from '../types'

interface PoliceContextType {
  forces: PoliceForce[]
  loading: boolean
  error: string | null
}

const PoliceContext = createContext<PoliceContextType>({
  forces: [],
  loading: false,
  error: null,
})

export const PoliceProvider = ({ children } : PropsWithChildren) => {
  const [forces, setForces] = useState<PoliceForce[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://data.police.uk/api/forces')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch police forces')
        return res.json()
      })
      .then(setForces)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <PoliceContext.Provider value={{ forces, loading, error }}>
      {children}
    </PoliceContext.Provider>
  )
}

export const usePoliceContext = ():PoliceContextType => {
  const context = useContext(PoliceContext)
  if(!context){
    throw new Error('usePoliceContext must be used within a PoliceProvider');
  }
  return context
}
