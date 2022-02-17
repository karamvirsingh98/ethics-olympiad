import { User } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";
import { Event } from "../../state/types";

export default function EventSplash({ event, user }: { event: Event, user: User | undefined | false }) {
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
      <div style={{ display: "flex", gap: "1rem" }}>
        <button
          className="green"
          style={{ fontSize: "2rem", padding: "0.5rem 2rem" }}
          onClick={() => navigate("./heat1")}
        >
          Begin!
        </button>
        {user && (
          <button
            className="green"
            style={{ fontSize: "2rem", padding: "0.5rem 2rem" }}
            onClick={() => navigate("./admin")}
          >
            Go to Admin Page
          </button>
        )}
      </div>
    </div>
  );
}
