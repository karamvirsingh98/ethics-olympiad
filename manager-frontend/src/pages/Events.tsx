import { Fragment, useState } from "react";
import { client } from "..";
import EventCompnent from "../components/events/Event";
import Items from "../components/Items";
import PageTitle from "../components/page/PageTitle";
import { getDefaultEvent } from "../state/defaults";
import { AppState, Event } from "../state/types";
import { filterOutFromObj } from "../util/helpers";
import { useLocalStorage } from "../util/hooks";
import Input from "./Input";

export default function Events({ state }: { state: AppState }) {
  const { cases, events, setEvents } = state;
  const [currentID, setID] = useLocalStorage(
    "",
    "ethics-olympiad-selected-event"
  );

  const [editing, setEditing] = useState(false);

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
        title={
          editing ? (
            <Input
              style={{ fontSize: "2rem", width: "fit-content" }}
              defaultValue={getTitle()}
              onConfirm={(title) =>
                setEvents({
                  ...events,
                  [currentID]: { ...events![currentID], title },
                })
              }
            />
          ) : (
            <div>{getTitle()}</div>
          )
        }
        element={
          events &&
          events[currentID] && (
            <Fragment>
              <button className="blue" onClick={() => setEditing(!editing)}>
                Edit
              </button>
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
