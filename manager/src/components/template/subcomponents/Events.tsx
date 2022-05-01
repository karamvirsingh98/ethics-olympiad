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
      <button
        className={isEventEditing || isTemplateEditing ? "grey" : "green"}
        onClick={isEventEditing || isTemplateEditing ? undefined : onNewClick}
        style={{
          fontSize: "1.25rem",
          padding: "0.5rem 1rem",
          width: "100%",
          cursor:
            isEventEditing || isTemplateEditing ? "not-allowed" : "pointer",
        }}
      >
        New Event
      </button>
      <div
        style={{
          overflow: "scroll",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxHeight: "62.5vh",
          paddingBottom: "2rem",
          width: "100%",
        }}
      >
        {events &&
          Object.keys(events).map((id) => (
            <EventLink
              event={events[id]}
              onClick={() => {
                if (isTemplateEditing)
                  window.alert(
                    "Please save your changes to the template first."
                  );
                else navigate(`./${id}`);
              }}
              key={id}
              disable={isTemplateEditing || (isEventEditing && eventID !== id)}
              inEvent={inEvent}
            />
          ))}
      </div>
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
  const eventID = params["*"];

  return (
    <button
      className={
        disable
          ? "grey"
          : inEvent && eventID === event._id
          ? "blue-active"
          : "blue"
      }
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
