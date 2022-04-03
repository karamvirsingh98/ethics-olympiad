import { Case, Event } from "@ethics-olympiad/types";
import { useNavigate, useParams } from "react-router-dom";
import { Events } from "../../../state/types";

export default function EventsComponent({
  templateID,
  events,
  onNewClick,
  isTemplateEditing,
  isEventEditing,
}: {
  templateID: string;
  events: Events;
  onNewClick: () => void;
  setEditing: (editing: boolean) => void;
  isTemplateEditing: boolean;
  isEventEditing?: boolean;
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
          <EventLink
            event={events[id]}
            onClick={() => {
              if (isTemplateEditing) {
                window.alert("Please save your changes to the template first.");
              } else {
                navigate(`./${id}`);
              }
            }}
            key={id}
            disable={isTemplateEditing}
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

function EventLink({
  event,
  onClick,
  disable,
}: {
  event: Event;
  onClick: () => void;
  disable: boolean;
}) {
  return (
    <button
      className={disable ? "grey" : "blue"}
      onClick={onClick}
      style={{
        fontSize: "1.25rem",
        padding: "0.5rem 1rem",
        width: "100%",
        cursor: disable ? "not-allowed" : "pointer",
      }}
    >
      {event.eventTitle || "Unnamed Event"}
    </button>
  );
}
