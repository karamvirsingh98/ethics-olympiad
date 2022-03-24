import { Fragment, useState } from "react";
import EventCompnent from "../components/event/Event";
import Items from "./page/Items";
import EventHeader from "./page/PageTitle";
import { AppState } from "../state/types";
import { useLocalStorage } from "../util/hooks";
import { eventsHelpers } from "./helpers";
import { User } from "@ethics-olympiad/types";

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

  const {
    createEvent,
    ...helpers
  } = eventsHelpers(
    user._id,
    currentID,
    events!,
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
              cases={cases!}
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
