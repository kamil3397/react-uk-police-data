import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import type { Crime } from "../types";

interface CrimesContextType {
  crimes: Crime[];
  loading: boolean;
  error: string | null;
  infoMessage: string | null;
  fetchCrimes: (forceId: string, date: string) => void;
}

const CrimesContext = createContext<CrimesContextType>({
  crimes: [],
  loading: false,
  error: null,
  infoMessage: null,
  fetchCrimes: () => {},
}); // po co inicjujesz context?

export const CrimesProvider = ({ children }: PropsWithChildren) => {
  const [crimes, setCrimes] = useState<Crime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const fetchCrimes = (forceId: string, date: string) => {
    setLoading(true);
    setError(null); // jest z defaultu na null
    setInfoMessage(null); // jest z defaultu na null
    setCrimes([]); // jest z defaultu pustym arrayem

    //brak await
    fetch(
      `https://data.police.uk/api/crimes-no-location?category=all-crime&force=${forceId}&date=${date}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch crime data."); //jesli !res.ok to i tak fetch rzuci error, nie ma po co robic tego recznie
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          setInfoMessage(
            "This force has not yet uploaded any data for the selected date."
          );
        } else {
          setCrimes(data);
        }
      })
      .catch((err) => setError(err.message));
  };

  return (
    <CrimesContext.Provider
      value={{ crimes, loading, error, infoMessage, fetchCrimes }}
    >
      {children}
    </CrimesContext.Provider>
  );
};

export const useCrimesContext = (): CrimesContextType => {
  const context = useContext(CrimesContext); // inicjujesz context wyzej, ten if jest zbedny, bo nigdy nie wystapi sytuacja, ze context bedzie undefined
  if (!context) {
    throw new Error("useCrimesContext must be used within a CrimesProvider");
  }
  return context;
};
