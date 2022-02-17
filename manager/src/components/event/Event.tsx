import { Event } from "@ethics-olympiad/types";
import { SetOneField } from "../../state/hooks/useCollection";
import { Cases } from "../../state/types";
import eventHelpers from "./helpers";
import Heats from "./subcomponents/Heats";
import Teams from "./subcomponents/Teams";
import Timers from "./subcomponents/Timers";

export default function EventCompnent({
  editing,
  cases,
  event,
  setOneField,
}: {
  editing: boolean;
  cases: Cases;
  event: Event;
  setOneField: SetOneField<Event>;
}) {
  const { addHeat, removeHeat, editTimer, addTeam, renameTeam, removeTeam } =
    eventHelpers(event, setOneField);

  return (
    <div className="event">
      <Heats
        editing={editing}
        cases={cases}
        heats={event.heats}
        eventID={event._id!}
        setOneField={setOneField}
        onAdd={addHeat}
        onRemove={removeHeat}
      />
      <Timers editing={editing} timers={event.timers} onConfirm={editTimer} />
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
