export interface Crime {
    id: number
    category: string
    month: string
    outcome_status: {
        category: string
        date: string
    }
}

export interface PoliceForce {
  id: string
  name: string
}