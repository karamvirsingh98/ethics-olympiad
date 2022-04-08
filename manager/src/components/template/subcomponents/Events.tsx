import { Event } from "@ethics-olympiad/types";
import { useNavigate, useParams } from "react-router-dom";
import { Events } from "../../../state/types";

export default function EventsComponent({
  templateID,
  events,
  onNewClick,
  isTemplateEditing,
  isEventEditing,
  inEvent,
}: {
  templateID: string;
  events: Events;
  onNewClick: () => void;
  setEditing: (editing: boolean) => void;
  isTemplateEditing: boolean;
  isEventEditing: boolean;
  inEvent: boolean;
}) {
  const navigate = useNavigate();

  const arr = window.location.pathname.split("/");
  const eventID = arr[arr.length - 1];

  return (
    <div className="items">
      <button
        className={isEventEditing ? "grey" : inEvent ? "blue" : "blue-active"}
        onClick={() => {
          if (isEventEditing)
            window.alert("Please save your changes to the event first.");
          else navigate(`/events/${templateID}`);
        }}
        style={{
          fontSize: "1.25rem",
          padding: "0.5rem 1rem",
          width: "100%",
          cursor: isEventEditing ? "not-allowed" : "pointer",
        }}
      >
        General Configuration
      </button>
      {events &&
        Object.keys(events).map((id) => (
          <EventLink
            event={events[id]}
            onClick={() => {
              if (isTemplateEditing)
                window.alert("Please save your changes to the template first.");
              else navigate(`./${id}`);
            }}
            key={id}
            disable={isTemplateEditing || (isEventEditing && eventID !== id)}
            inEvent={inEvent}
          />
        ))}
      <button
        className={isEventEditing ? "grey" : "green"}
        onClick={isEventEditing ? undefined : onNewClick}
        style={{
          fontSize: "1.25rem",
          padding: "0.5rem 1rem",
          width: "100%",
          cursor: isEventEditing ? "not-allowed" : "pointer",
        }}
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
  inEvent,
}: {
  event: Event;
  onClick: () => void;
  disable: boolean;
  inEvent: boolean;
}) {
  //FIXME active event state has to be location.eventID === 'event._id'
  const params = useParams();
  console.log(params);

  return (
    <button
      className={disable ? "grey" : inEvent ? "blue-active" : "blue"}
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
