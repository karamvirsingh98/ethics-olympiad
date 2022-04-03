import { User } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";
import { Event } from "../../state/types";

export default function Topbar({ event, admin }: { event: Event, admin?: boolean }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "solid 1px",
        paddingBottom: "2rem",
      }}
    >
      <div style={{ fontSize: "2rem" }}> {event.eventTitle} </div>
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
        <button className="orange" onClick={() => navigate("../scores")}>
          {" "}
          Scores{" "}
        </button>
        {admin && (
          <button className="blue" onClick={() => navigate("../admin")}>
            Admin
          </button>
        )}
      </div>
    </div>
  );
}
