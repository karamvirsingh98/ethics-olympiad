import { useNavigate } from "react-router-dom";
import { BaseEvent } from "../../state/types";

export default function BaseEventComponent({ event }: { event: BaseEvent }) {
  const navigate = useNavigate();

  return (
    <div
      className="base-event green border"
      onClick={() => navigate(`/${event._id}`)}
    >
      {event.eventTitle}
    </div>
  );
}
