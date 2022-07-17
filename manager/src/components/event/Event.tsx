import { Event, Template, User } from "@ethics-olympiad/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { titleHelpers } from "../../pages/helpers";
import EventHeader from "./subcomponents/Header";
import {
  CollectionFunctions,
  SetOneField,
} from "../../state/hooks/useCollection";
import { Events } from "../../state/types";
import eventHelpers from "./helpers";
import Teams from "./subcomponents/Teams";
import Scores from "./subcomponents/Scores";
import Divider from "../util/Divider";
import { client } from "../../main";
import Conditional from "../util/Conditional";
import ScoresV2 from "./subcomponents/ScoresV2";
import useScores from "./useScores";
import CsvExporter from "./subcomponents/CsvExporter";

export default function EventComponent({
  template,
  eventState,
  editing,
  setEditing,
}: {
  template: Template;
  eventState: [events: Events, functions: CollectionFunctions<Event>];
  editing: boolean;
  setEditing: (editing: boolean) => void;
}) {
  const { eventID } = useParams();
  const [events, eventFunctions] = eventState;
  const [active, set] = useState(false);

  const event = events[eventID!];

  const { scores, loading, checkForScores } = useScores(event);

  const helpers = titleHelpers(editing, event, eventFunctions, setEditing);

  const { addTeam, renameTeam, removeTeam } = eventHelpers(
    events[eventID!],
    eventFunctions.setOneField
  );

  useEffect(() => {
    client
      .service("api/active")
      .get(eventID)
      .then((res: any) => set(res ? true : false));
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gap: "2rem",
      }}
    >
      <EventHeader
        editing={editing}
        eventID={eventID!}
        events={events}
        toggleEditing={() => setEditing(!editing)}
        {...helpers}
      />
      <div
        style={{
          display: "grid",
          gridTemplateRows: "auto 57.5vh",
          height: "fit-content",
          gap: "1rem",
        }}
      >
        <div className="flex-between" style={{ height: "fit-content" }}>
          <Conditional
            condition={editing}
            showTrue={
              <button className="green" onClick={addTeam}>
                Add Team
              </button>
            }
            showFalse={<span />}
          />
          <div style={{ display: "flex", gap: "1rem" }}>
            <CsvExporter title={event.eventTitle} scores={scores} />
            <button
              className={loading ? "orange" : "blue"}
              onClick={checkForScores}
            >
              {loading ? "Loading Scores" : "Refresh Scores"}
            </button>
          </div>
        </div>
        <ScoresV2
          editing={editing}
          template={template}
          event={event}
          scores={scores}
          onTeamRename={renameTeam}
          onTeamRemove={removeTeam}
        />
      </div>

      {/* <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "2rem",
        }}
      >
        <Teams
          editing={editing}
          teams={event.teams}
          onAdd={addTeam}
          onRename={renameTeam}
          onRemove={removeTeam}
        />
        <Divider vertical />
        <Conditional
          condition={active}
          showTrue={<Scores event={event} />}
          showFalse={
            <div style={{ padding: "1rem" }}>
              <div> This Event isn't active, so there are no scores yet! </div>
              <div
                style={{ display: "grid", placeItems: "center", gap: "1rem" }}
              >
                <div>
                  Click on the button below to navtigate to the Event App, and
                  Activate this Event.
                </div>
                <a href={`https://eo-events.vercel.app/${event._id}/admin`}>
                  <button
                    style={{ fontSize: "1.25rem", padding: "1rem" }}
                    className="green"
                  >
                    Go To Admin Page
                  </button>
                </a>
              </div>
            </div>
          }
        /> 
      </div> */}
    </div>
  );
}
