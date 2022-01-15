import { Cases, Collection, Event, Events } from "../../state/types";
import Divider from "../util/Divider";
import Heats from "./subcomponents/Heats";
import Teams from "./subcomponents/Teams";
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
  const onAdd = () =>
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        heats: [...event.heats, { case1: "", case2: "" }],
      },
    });

  const onRemove = (index: number) =>
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        heats: event.heats.filter((_, i) => i !== index),
      },
    });

  const onTimerEdit = (value: string, index: number) => {
     setEvents({
       ...events,
       [event._id!]: {
         ...event,
         timers: event.timers.map((time, i) => i === index ? Number(value) : time),
       },
     });
  }
   
  const onTeamAdd = () =>
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        teams: [...event.teams, { name: "", present: false }],
      },
    });

  const onTeamRename = (name: string, index: number) =>
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        teams: event.teams.map((team, i) =>
          i === index ? { ...team, name } : team
        ),
      },
    });

  const onTeamRemove = (index: number) => {
    setEvents({
      ...events,
      [event._id!]: {
        ...event,
        teams: event.teams.filter((_, i) => i !== index),
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
      {/* <Divider /> */}
      <Teams
        teams={event.teams}
        onAdd={onTeamAdd}
        onRename={onTeamRename}
        onRemove={onTeamRemove}
      />
      {/* <Divider /> */}
      <Timers timers={event.timers} onConfirm={onTimerEdit} />
    </div>
  );
}
