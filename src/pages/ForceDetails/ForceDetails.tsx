import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "./ForceDetails.scss";

interface ForceDetailsData {
  name: string;
  description: string;
  url: string;
}

export const ForceDetails: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<ForceDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //brak asynca
    fetch(`https://data.police.uk/api/forces/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch force details"); //zbedne
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <div className="force-details">
      <div className="force-content">
        <h2>{data.name}</h2>
        <hr />

        {/* czemu ma sluzyc ten typeof tutaj? tak samo po co tutaj ten parse? */}
        {data.description && typeof data.description === "string" ? (
          <div className="description">{parse(data.description)}</div>
        ) : (
          <div className="no-description">
            <img
              src="https://images.unsplash.com/photo-1608095476825-d4e0f916372f?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="No description"
            />
            <p>This police force does not provide a public description.</p>
            <a href={data.url} className="no-description-link">
              Visit official website
            </a>
          </div>
        )}

        {data.description && (
          <a href={data.url} className="cta-btn">
            Visit official website
          </a>
        )}
      </div>
    </div>
  );
};
