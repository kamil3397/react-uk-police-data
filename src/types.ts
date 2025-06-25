export interface Crime {
  id: number;
  category: string;
  month: string;
  outcome_status: {
    // jak mamy obiekt to lepiej typowac go oddzielnie jako typ
    category: string;
    date: string;
  };
}

export interface PoliceForce {
  id: string;
  name: string;
}
