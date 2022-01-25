import { Event } from "../../state/types";

export default function eventHelpers(
  event: Event,
  setOneField: (id: string, field: string, item: any) => void
) {
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

  return {
    addHeat,
    removeHeat,
    editTimer,
    addTeam,
    renameTeam,
    removeTeam,
  };
}
