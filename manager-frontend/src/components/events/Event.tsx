import { useState } from "react";
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
  return (
    <div className="event">
      <Heats
        cases={cases}
        heats={event.heats}
        onAdd={() =>
          setEvents({
            ...events,
            [event._id!]: {
              ...event,
              heats: [...event.heats, { case1: "", case2: "" }],
            },
          })
        }
        onRemove={(index) => {
          setEvents({
            ...events,
            [event._id!]: {
              ...event,
              heats: event.heats.filter((_, i) => i !== index),
            },
          });
        }}
      />
      <Divider />
      <Timers
        timers={event.timers}
        onConfirm={(value, i) => {
          event.timers.splice(i, 1, Number(value));
          setEvents({
            ...events,
            [event._id!]: {
              ...event,
              timers: [...event.timers],
            },
          });
        }}
      />
      <Divider />
      <div
        className="teams"
        style={{
          fontSize: "1.5rem",
          // borderBottom: "solid 0.25rem",
          // width: "5rem",
        }}
      >
        Teams
      </div>
    </div>
  );
}
