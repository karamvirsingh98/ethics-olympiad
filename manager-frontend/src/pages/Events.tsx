import { useState } from "react";
import EventCompnent from "../components/events/Event";
import Items from "../components/Items";
import { AppState } from "../state/types";
import { useLocalStorage } from "../util/hooks";

export default function Events({ state }: { state: AppState }) {
  const [currentID, setID] = useLocalStorage<string>(
    "",
    "ethics-olympiad-selected-event"
  );
  const { events, cases } = state;

  console.log(state);

    console.log(currentID)

  if (events) console.log(events[currentID]);

  return (
    <div className="page">
      <div className="page-title">Haboda Skeepoda Ethics Olympiad</div>
      <div className="page-content">
        <div style={{ borderRight: "solid 1px" }}>
          { events && cases && currentID && events[currentID] && <EventCompnent event={events![currentID!]} cases={cases!} />}
        </div>
        {events && <Items items={events} setCurrentID={setID} />}
      </div>
    </div>
  );
}
