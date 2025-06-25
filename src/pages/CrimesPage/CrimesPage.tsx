import { useState, type FC, type FormEvent } from "react";
import { usePoliceContext } from "../../context/PoliceContext";
import { useCrimesContext } from "../../context/CrimeContext";
import { CrimesForm } from "./CrimesComponents/CrimesForm";
import { CrimesList } from "./CrimesComponents/CrimesList";

// nie wiem po co crimes w tym komponencie.
// jedyne co robisz to je paginujesz i przekazujesz do CrimesList- wszystko to mozna zrobic tam i uproscic tym samym ten komponent
// to samo tyczy sie forces, ktore tez sa tutaj nieuzywane do niczego

export const CrimesPage: FC = () => {
  const {
    forces,
    loading: forcesLoading,
    error: forcesError,
  } = usePoliceContext();
  const { crimes, loading, error, infoMessage, fetchCrimes } =
    useCrimesContext();

  const [selectedForce, setSelectedForce] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [page, setPage] = useState(1);

  const crimesPerPage = 10; // jak jest to statyczne to poza komponent
  const totalPages = Math.ceil(crimes.length / crimesPerPage);
  const paginatedCrimes = crimes.slice(
    (page - 1) * crimesPerPage,
    page * crimesPerPage
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedForce || !selectedDate) return;
    fetchCrimes(selectedForce, selectedDate);
    setPage(1);
  };

  const handleExampleClick = () => {
    const exampleForce = "leicestershire";
    const exampleDate = "2023-01";
    setSelectedForce(exampleForce);
    setSelectedDate(exampleDate);
    fetchCrimes(exampleForce, exampleDate);
    setPage(1);
  };

  return (
    <div className="crimes-page">
      <div className="overlay">
        <h2>Crime Reports by Police Force</h2>

        <CrimesForm
          forces={forces}
          selectedForce={selectedForce}
          selectedDate={selectedDate}
          onForceChange={setSelectedForce}
          onDateChange={setSelectedDate}
          onSubmit={handleSubmit}
          onExampleClick={handleExampleClick}
        />

        {forcesLoading && <p>Loading forces...</p>}
        {forcesError && <p className="error">{forcesError}</p>}
        {error && <p className="error">{error}</p>}
        {infoMessage && <p className="info">{infoMessage}</p>}
        {loading && <p>Loading crimes...</p>}

        <CrimesList
          crimes={paginatedCrimes}
          page={page}
          totalPages={totalPages}
          onPrevPage={() => setPage((p) => Math.max(1, p - 1))}
          onNextPage={() => setPage((p) => Math.min(totalPages, p + 1))}
        />
      </div>
    </div>
  );
};
