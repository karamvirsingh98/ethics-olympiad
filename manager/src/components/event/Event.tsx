import { Cases, Collection, Event, Events } from "../../state/types";
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

  const addHeat = () =>
    setOneField(event._id!, "heats", [
      ...event.heats,
      { case1: "", case2: "" },
    ]);

  const removeHeat = (index: number) =>
    setOneField(
      event._id!,
      "heats",
      event.heats.filter((_, i) => i !== index)
    );

  const editTimer = (value: string, index: number) => {
    setOneField(event._id!, "timers", [
      ...event.timers.map((time, i) => (i === index ? Number(value) : time)),
    ]);
  };

  const addTeam = () =>
    setOneField(event._id!, "teams", [
      ...event.teams,
      { name: "", present: false },
    ]);

  const renameTeam = (name: string, index: number) =>
    setOneField(
      event._id!,
      "teams",
      event.teams.map((team, i) => (i === index ? { ...team, name } : team))
    );

  const removeTeam = (index: number) => {
    setOneField(
      event._id!,
      "teams",
      event.teams.filter((_, i) => i !== index)
    );
  };

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
