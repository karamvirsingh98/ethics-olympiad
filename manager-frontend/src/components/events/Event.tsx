import { Cases, Collection, Event, Events } from "../../state/types";
import Divider from "../util/Divider";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";

export default function EventCompnent({
  cases,
  event,
  events,
  setEvents,
}: {
  cases: Cases;
  event: Event;
  events: Events;
  setEvents: (collection: Collection<Event>) => void;
}) {
  const onAdd = () => {
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        heats: [...event.heats, { case1: "", case2: "" }],
      },
    });
  };

  const onRemove = (index: number) => {
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        heats: event.heats.filter((_, i) => i !== index),
      },
    });
  };

  const onTimerEdit = (value: string, i: number) => {
    event.timers.splice(i, 1, Number(value));
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        timers: [...event.timers],
      },
    });
  };

  return (
    <div className="event">
      <Heats
        cases={cases}
        heats={event.heats}
        onAdd={onAdd}
        onRemove={onRemove}
      />
      <Divider />
      <Timers timers={event.timers} onConfirm={onTimerEdit} />
      <Divider />
      <div className="teams" style={{ fontSize: "1.5rem" }}>
        Teams
      </div>
    </div>
  );
}
