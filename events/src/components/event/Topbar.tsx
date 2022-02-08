import { useNavigate } from "react-router-dom";
import { Event } from "../../state/types";

export default function Topbar({ event }: { event: Event }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "solid 1px",
        paddingBottom: "2rem"
      }}
    >
      <div style={{ fontSize: "2rem" }}> {event.title} </div>
      <div style={{ paddingRight: "3rem", display: "flex", gap: "1rem" }}>
        {event.heats.map((_, i) => (
          <button
            key={i}
            className="blue"
            onClick={() => navigate(`../heat${i + 1}`)}
          >
            Heat {i + 1}
          </button>
        ))}
        <button className="orange" onClick={() => navigate('../scores')}>
          {" "}
          Scores{" "}
        </button>
      </div>
    </div>
  );
}
