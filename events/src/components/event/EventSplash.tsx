import { useNavigate } from "react-router-dom";
import { Event } from "../../state/types";

export default function EventSplash({ event }: { event: Event }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontSize: "4rem",
        placeSelf: "center",
        display: "grid",
        placeItems: "center",
        gap: "2rem",
      }}
    >
      {event.title}
      <button
        className="green"
        style={{ fontSize: "2rem", padding: "0.5rem 2rem" }}
        onClick={() => navigate("./heat1")}
      >
        Begin!
      </button>
    </div>
  );
}
