import { Fragment } from "react";
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

  const createEvent = async () => {
    const newEvent: Event = await client
      .service("/api/events")
      .create(getDefaultEvent());
    setEvents({ ...events, [newEvent._id!]: newEvent });
    setID(newEvent._id!);
  };

  const saveEvent = async () => {
    const newItem = await client
      .service("api/events")
      .update(events![currentID]._id!, events![currentID]);
    setEvents({
      ...events,
      [events![currentID]._id!]: newItem,
    });
  };

  const deleteEvent = async () => {
    await client.service("api/events").remove(events![currentID]._id!);
    setEvents(filterOutFromObj(events, [events![currentID]._id!]));
  };

  function getTitle() {
    return events && events[currentID]
      ? events[currentID].title
      : "No Event Selected";
  }

  return (
    <div className="page">
      <PageTitle
        title={getTitle()}
        element={
          events &&
          events[currentID] && (
            <Fragment>
              <button className="green" onClick={saveEvent}>
                Save
              </button>
              <button className="red" onClick={deleteEvent}>
                Delete
              </button>
            </Fragment>
          )
        }
      />
      <div className="page-content">
        <div>
          {events && cases && currentID && events[currentID] && (
            <EventCompnent
              cases={cases!}
              events={events}
              event={events![currentID!]}
              setEvents={setEvents}
            />
          )}
        </div>
        {events && (
          <Items
            label={"Event"}
            items={events}
            setCurrentID={setID}
            onNewClick={createEvent}
          />
        )}
      </div>
    </div>
  );
}
