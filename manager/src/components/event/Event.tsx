import { Event, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { eventsHelpers } from "../../pages/helpers";
import EventHeader from "../../pages/page/PageTitle";
import {
  CollectionFunctions,
  SetOneField,
} from "../../state/hooks/useCollection";
import { Events } from "../../state/types";
import eventHelpers from "./helpers";
import Teams from "./subcomponents/Teams";

export default function EventComponent({
  user,
  eventState,
}: {
  user: User;
  eventState: [events: Events, functions: CollectionFunctions<Event>];
}) {
  const { eventID } = useParams();
  const [events, { setOne, setOneField, removeOne }] = eventState;

  const [editing, setEditing] = useState(false);

  const helpers = eventsHelpers(
    user._id,
    eventID!,
    events!,
    setOne,
    setOneField,
    removeOne,
    setEditing
  );

  return (
    <div>
      <EventHeader
        editing={editing}
        eventID={eventID!}
        events={events}
        toggleEditing={() => setEditing(!editing)}
        {...helpers}
      />
      <EventCompnent
        editing={editing}
        event={events![eventID!]}
        setOneField={setOneField}
      />
    </div>
  );
}

function EventCompnent({
  editing,
  event,
  setOneField,
}: {
  editing: boolean;
  event: Event;
  setOneField: SetOneField<Event>;
}) {
  const { addTeam, renameTeam, removeTeam } = eventHelpers(event, setOneField);

  return (
    <div className="event">
      <Teams
        editing={editing}
        teams={event.teams}
        onAdd={addTeam}
        onRename={renameTeam}
        onRemove={removeTeam}
      />
    </div>
  );
}
