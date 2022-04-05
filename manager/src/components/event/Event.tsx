import { Event, User } from "@ethics-olympiad/types";
import { useState } from "react";
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

export default function EventComponent({
  eventState,
  editing,
  setEditing,
}: {
  eventState: [events: Events, functions: CollectionFunctions<Event>];
  editing: boolean;
  setEditing: (editing: boolean) => void;
}) {
  const { eventID } = useParams();
  const [events, eventFunctions] = eventState;

  const event = events[eventID!];

  const helpers = titleHelpers(editing, event, eventFunctions, setEditing);

  const { addTeam, renameTeam, removeTeam } = eventHelpers(
    events[eventID!],
    eventFunctions.setOneField
  );

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
        <Scores event={event} />
      </div>
    </div>
  );
}
