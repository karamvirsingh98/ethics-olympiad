import { client } from "..";
import EventCompnent from "../components/events/Event";
import Items from "../components/Items";
import PageTitle from "../components/page/PageTitle";
import { getDefaultEvent } from "../state/defaults";
import { AppState, Event } from "../state/types";
import { filterOutFromObj } from "../util/helpers";
import { useLocalStorage } from "../util/hooks";

export default function Events({ state }: { state: AppState }) {
  const [currentID, setID] = useLocalStorage(
    "",
    "ethics-olympiad-selected-event"
  );
  const { cases, events, setEvents } = state;

  return (
    <div className="page">
      <PageTitle
        title={
          events && events[currentID]
            ? events[currentID].title
            : "No Event Selected"
        }
        element={
          events &&
          events[currentID] && (
            <button
              className="red"
              onClick={async () => {
                await client
                  .service("api/events")
                  .remove(events![currentID]._id!);
                setEvents(filterOutFromObj(events, [events![currentID]._id!]));
              }}
            >
              Delete Event
            </button>
          )
        }
      />
      <div className="page-content">
        <div>
          {events && cases && currentID && events[currentID] && (
            <EventCompnent event={events![currentID!]} cases={cases!} />
          )}
        </div>
        {events && (
          <Items
            label={"Event"}
            items={events}
            setCurrentID={setID}
            onNewClick={async () => {
              const newEvent: Event = await client
                .service("/api/events")
                .create(getDefaultEvent());
              setEvents({ ...events, [newEvent._id!]: newEvent });
              setID(newEvent._id!);
            }}
          />
        )}
      </div>
    </div>
  );
}
