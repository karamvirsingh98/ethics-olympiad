import { Fragment, useState } from "react";
import EventCompnent from "../components/event/Event";
import Items from "./page/Items";
import PageTitle from "./page/PageTitle";
import { AppState } from "../state/types";
import { useLocalStorage } from "../util/hooks";
import TitleButtons from "../components/event/subcomponents/TitleButtons";
import { eventsHelpers } from "./helpers";
import Input from "../components/util/Input";
import ToggleInput from "../components/util/ToggleInput";
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
            <PageTitle
              editing={editing}
              title={getTitle()}
              rename={setTitle}
              element={
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    width: "100%",
                    placeSelf: "start",
                    gap: "2rem",
                  }}
                >
                  <div
                    style={{
                      placeSelf: "start",
                      display: "flex",
                      alignItems: "flex-end",
                      fontSize: "1rem",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ borderBottom: "solid 0.25rem transparent" }}>
                      Password:
                    </div>
                    <ToggleInput
                      editing={editing}
                      value={events[currentID].password}
                      onEdit={setPassword(currentID)}
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
