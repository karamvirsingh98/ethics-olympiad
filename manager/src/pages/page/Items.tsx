import { Case, Event } from "@ethics-olympiad/types";
import { useNavigate, useParams } from "react-router-dom";
import { Events } from "../../state/types";

export default function Items({
  templateID,
  events,
  onNewClick,
}: {
  templateID: string;
  events: Events;
  onNewClick: () => void;
}) {
  const navigate = useNavigate();
  const { eventID: _t } = useParams();

  return (
    <div className="items">
      <button
        className="blue"
        onClick={() => navigate(`/events/${templateID}`)}
        style={{ fontSize: "1.25rem", padding: "0.5rem 1rem", width: "100%" }}
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
      <button
        className="green"
        onClick={onNewClick}
        style={{ fontSize: "1.25rem", padding: "0.5rem 1rem", width: "100%" }}
      >
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
      style={{ fontSize: "1.25rem", padding: "0.5rem 1rem", width: "100%" }}
    >
      {item.eventTitle}
    </button>
  );
}
