import { Cases, Event } from "../../state/types";
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
  setOneField: (id: string, field: string, item: any) => void;
}) {
  const { addHeat, removeHeat, editTimer, addTeam, renameTeam, removeTeam } =
    eventHelpers(event, setOneField);

  return (
    <div className="event">
      <Heats
        editing={editing}
        cases={cases}
        heats={event.heats}
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
