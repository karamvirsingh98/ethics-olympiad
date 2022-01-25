import { Fragment, useState } from "react";
import EventCompnent from "../event/Event";
import Items from "./page/Items";
import PageTitle from "./page/PageTitle";
import { AppState, User } from "../../state/types";
import { useLocalStorage } from "../../util/hooks";
import TitleButtons from "../event/subcomponents/TitleButtons";
import { eventsHelpers } from "./helpers";
import Input from "../util/Input";

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
    deleteEvent,
    saveEdits,
    cancelEdits,
    getTitle,
    setTitle,
    setPassword,
  } = eventsHelpers(
    user._id,
    currentID,
    events!,
    setOne,
    removeOne,
    setOneField,
    setID,
    setEditing
  );

  return (
    <div className="page">
      <div className={`page-content ${ events && events[currentID] ? "grey-flat" : ""}`}>
        {events && events[currentID] && (
          <Fragment>
            <PageTitle
              editing={editing}
              title={getTitle()}
              rename={setTitle}
              element={
                <div
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", placeSelf: 'start end'}}
                >
                  <div style={{ placeSelf: "center", display: 'flex', alignItems: "flex-end", fontSize: "1rem"}}>
                    Password:
                    <Input
                      value={events[currentID].password}
                      onChange={setPassword(currentID)}
                    />
                  </div>
                  <TitleButtons
                    editing={editing}
                    toggleEditing={() => setEditing(!editing)}
                    onDelete={deleteEvent}
                    onSave={saveEdits}
                    onCancel={cancelEdits}
                  />
                </div>
              }
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