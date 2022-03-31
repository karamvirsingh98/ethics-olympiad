import { Fragment, useState } from "react";
import EventCompnent from "../components/event/Event";
import Items from "./page/Items";
import EventHeader from "./page/PageTitle";
import { useLocalStorage } from "../util/hooks";
import { eventsHelpers } from "./helpers";
import { User } from "@ethics-olympiad/types";
import { useEvents } from "../App";
import { Route, Routes } from "react-router-dom";

export default function Events({
  user,
}: {
  user: User;
}) {

  const [events, { setOne, setOneField, removeOne} ] = useEvents(user);

  const [currentID, setID] = useLocalStorage(
    "",
    "ethics-olympiad-selected-event"
  );

  const [editing, setEditing] = useState(false);

  const {
    createEvent,
    ...helpers
  } = eventsHelpers(
    user._id,
    currentID,
    events,
    setOne,
    setOneField,
    removeOne,
    setID,
    setEditing
  );

  return (
    <div className="page">
      <div className="page-content">
        {events && events[currentID] && (
          <Fragment>
            <EventHeader
              editing={editing}
              eventID={currentID}
              events={events}
              toggleEditing={() => setEditing(!editing)}
              {...helpers}
            />
            <EventCompnent
              editing={editing}
              event={events![currentID]}
              setOneField={setOneField}
            />
          </Fragment>
        )}
      </div>
      <div
        style={{
          border: "solid 1px",
          height: "100%",
          opacity: 0.25,
          borderRadius: "100%",
        }}
      />
      {events && (
        <Items
          label={"Event"}
          items={events}
          setCurrentID={setID}
          onNewClick={createEvent}
        />
      )}
    </div>
  );
}
