import { Event } from "@ethics-olympiad/types";
import { SetOneField } from "../../state/hooks/useCollection";
import eventHelpers from "./helpers";
import Teams from "./subcomponents/Teams";

export default function EventCompnent({
  editing,
  event,
  setOneField,
}: {
  editing: boolean;
  event: Event;
  setOneField: SetOneField<Event>;
}) {
  const { addTeam, renameTeam, removeTeam } =
    eventHelpers(event, setOneField);

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
