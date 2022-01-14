import { useState } from "react";
import EventCompnent from "../components/events/Event";
import Items from "../components/Items";
import PageTitle from "../components/page/PageTitle";
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
      <PageTitle
        title={events ? events[currentID].title : "No Event Selected"}
      />
      <div className="page-content">
        {events && events[currentID] && (
          <div style={{ borderRight: "solid 1px" }}>
            {events && cases && currentID && events[currentID] && (
              <EventCompnent event={events![currentID!]} cases={cases!} />
            )}
          </div>
        )}
        {events && <Items items={events} setCurrentID={setID} />}
      </div>
    </div>
  );
}
