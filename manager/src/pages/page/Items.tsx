import { Case, Event } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";
import { Events } from "../../state/types";

export default function Items({
  events,
  onNewClick,
}: {
  events: Events;
  onNewClick: () => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="items">
      <button
        className="blue"
        onClick={() => navigate("..")}
        style={{ fontSize: "1.25rem", padding: "0.5rem 1rem" }}
      >
        General Configuration
      </button>
      {events &&
        Object.keys(events).map((id) => (
          <Item
            item={events[id]}
            onClick={() => navigate(`./${id}`)}
            key={id}
          />
        ))}
      <button className="green" onClick={onNewClick}>
        New Event
      </button>
    </div>
  );
}

function Item({ item, onClick }: { item: Event; onClick: () => void }) {
  return (
    <button
      className="grey"
      onClick={onClick}
      style={{ fontSize: "1.25rem", padding: "0.5rem 1rem" }}
    >
      {item.eventTitle}
    </button>
  );
}
