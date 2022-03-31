import { SetOneField } from "../../state/hooks/useCollection";
import { Event } from "@ethics-olympiad/types";

export default function eventHelpers(
  event: Event,
  setOneField: SetOneField<Event>
) {
  const addTeam = () =>
    setOneField(event._id!, "teams", [
      ...event.teams,
      { teamName: "", present: false },
    ]);

  const renameTeam = (teamName: string, index: number) =>
    setOneField(
      event._id!,
      "teams",
      event.teams.map((team, i) => (i === index ? { ...team, teamName } : team))
    );

  const removeTeam = (index: number) => {
    setOneField(
      event._id!,
      "teams",
      event.teams.filter((_, i) => i !== index)
    );
  };

  return {
    addTeam,
    renameTeam,
    removeTeam,
  };
}
