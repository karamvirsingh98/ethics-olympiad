import { useNavigate } from "react-router-dom";

export default function SubmitDialog({ heatNumber }: { heatNumber: number }) {
  const navigate = useNavigate()

  return (
    <div className="dialog">
      <div
        style={{
          padding: "2rem",
          display: "grid",
          gap: "1rem",
          borderRadius: "0.25rem",
          backgroundColor: "rgba(112, 108, 97, 1)",
          color: "#f8f4e3",
        }}
      >
        <div style={{ fontSize: "3rem" }}>
          Scores for Heat {heatNumber} submitted!{" "}
        </div>
        <button className="green" style={{ width: "100%", fontSize: "2rem" }} onClick={() => navigate("../..")}>
          Back To Event
        </button>
      </div>
    </div>
  );
}
