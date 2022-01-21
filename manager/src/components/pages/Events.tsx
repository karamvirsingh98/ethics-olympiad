import { Fragment, useEffect, useState } from "react";
import { client } from "../..";
import EventCompnent from "../event/Event";
import Items from "./page/Items";
import PageTitle from "./page/PageTitle";
import { getDefaultEvent } from "../../state/defaults";
import { AppState, Event, User } from "../../state/types";
import { useLocalStorage } from "../../util/hooks";
import Input from "../util/Input";
import Conditional from "../util/Conditional";
import TitleButtons from "../event/subcomponents/TitleButtons";

export default function Events({
  user,
  state,
}: {
  user: User;
  state: AppState;
}) {
  const {
    events: [events, { setOne, setOneField, removeOne }],
    cases: [cases],
  } = state;
  const [currentID, setID] = useLocalStorage(
    "",
    "ethics-olympiad-selected-event"
  );
  const [editing, setEditing] = useState(false);

  const createEvent = async () => {
    const newEvent: Event = await client
      .service("/api/events")
      .create(getDefaultEvent(user._id!));
    setOne(newEvent._id!, newEvent);
    setID(newEvent._id!);
    setEditing(true);
    document.getElementById("event-title")?.focus()
  };

  const deleteEvent = async () => {
    await client.service("api/events").remove(currentID);
    removeOne(currentID);
    setID("");
  };

  const saveEdits = async () => {
    const updatedEvent = await client
      .service("api/events")
      .update(currentID, events![currentID]);
    setOne(currentID, updatedEvent);
    setEditing(false);
  };

  const cancelEdits = async () => {
    setOne(currentID, await client.service("/api/events").get(currentID));
    setEditing(false)
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
    setOneField(currentID, "title", title);
  };

  return (
    <div className="page">
      <PageTitle
        title={
          <Conditional
            condition={editing}
            showTrue={
              <Input
                id="event-title"
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
          events && (
            <TitleButtons
              editing={editing}
              toggleEditing={() => setEditing(!editing)}
              onDelete={deleteEvent}
              onSave={saveEdits}
              onCancel={cancelEdits}
            />
          )
        }
      />
      <div className="page-content">
        <div>
          { events && events![currentID] && (
            <EventCompnent
              editing={editing}
              cases={cases!}
              event={events![currentID]}
              setOneField={setOneField}
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
