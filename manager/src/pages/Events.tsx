import { Fragment, useState } from "react";
import { client } from "..";
import EventCompnent from "../components/event/Event";
import Items from "../components/page/Items";
import PageTitle from "../components/page/PageTitle";
import { getDefaultEvent } from "../state/defaults";
import { AppState, Event, User } from "../state/types";
import { filterOutFromObj } from "../util/helpers";
import { useLocalStorage } from "../util/hooks";
import Input from "../components/util/Input";
import Conditional from "../components/util/Conditional";

export default function Events({ user, state }: { user: User, state: AppState }) {
  const { cases, events, setEvents } = state;
  const [currentID, setID] = useLocalStorage(
    "",
    "ethics-olympiad-selected-event"
  );

  const [editing, setEditing] = useState(false);

  const createEvent = async () => {
    const newEvent: Event = await client
      .service("/api/events")
      .create(getDefaultEvent(user._id!));
    setEvents({ ...events, [newEvent._id!]: newEvent });
    setID(newEvent._id!);
    setEditing(true);
  };

  const deleteEvent = async () => {
    await client.service("api/events").remove(events![currentID]._id!);
    setEvents(filterOutFromObj(events, [events![currentID]._id!]));
  };

  const saveEvent = async () => {
    const newItem = await client
      .service("api/events")
      .update(events![currentID]._id!, events![currentID]);
    setEvents({
      ...events,
      [events![currentID]._id!]: newItem,
    });
    setEditing(false);
  };

  const cancelEdits = async () => {
    setEvents({
      ...events,
      [events![currentID]._id!]: await client
        .service("/api/events")
        .get(currentID),
    });
    setEditing(false);
  };

  const getTitle = () =>
    events
      ? events[currentID]
        ? events[currentID].title
        : Object.keys(events).length > 0
        ? "Select an Event"
        : "Create an Event"
      : "Failed to Load Events";

  const setTitle = (title: string) => {
    setEvents({
      ...events,
      [currentID]: { ...events![currentID], title },
    });
  };

  return (
    <div className="page">
      <PageTitle
        title={
          <Conditional
            condition={editing}
            showTrue={
              <Input
                style={{ fontSize: "2rem" }}
                defaultValue={getTitle()}
                onConfirm={setTitle}
              />
            }
            showFalse={
              <div style={{ borderBottom: "solid 0.25rem transparent" }}>
                {getTitle()}
              </div>
            }
          />
        }
        element={
          events &&
          events[currentID] && (
            <Fragment>
              {!editing && (
                <Fragment>
                  <button className="blue" onClick={() => setEditing(!editing)}>
                    Edit
                  </button>
                  <button className="red" onClick={deleteEvent}>
                    Delete
                  </button>
                </Fragment>
              )}
              {editing && (
                <Fragment>
                  <button className="green" onClick={saveEvent}>
                    Save
                  </button>
                  <button className="orange" onClick={cancelEdits}>
                    Cancel
                  </button>
                </Fragment>
              )}
            </Fragment>
          )
        }
      />
      <div className="page-content">
        <div>
          {events && cases && currentID && events[currentID] && (
            <EventCompnent
              editing={editing}
              cases={cases}
              events={events}
              event={events[currentID]}
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
