import { Event, Score, Template } from "@ethics-olympiad/types";
import ArrayMap from "../../util/ArrayMap";
import Conditional from "../../util/Conditional";
import RangeGenerator from "../../util/RangeGenerator";
import ToggleInput from "../../util/ToggleInput";
import useScores from "../useScores";

export default function ScoresV2({
  editing,
  template,
  event,
  scores,
  onTeamRename,
  onTeamRemove,
}: {
  editing: boolean;
  template: Template;
  event: Event;
  scores?: Score[];
  onTeamRename: (name: string, index: number) => void;
  onTeamRemove: (index: number) => void;
}) {
  const heats = template.heats.length;

  return (
    <table>
      <Headers heats={heats} />
      <ArrayMap
        array={event.teams}
        map={({ teamName }, i) => (
          <tr key={i}>
            <TeamName
              editing={editing}
              teamName={teamName}
              onEdit={(name) => onTeamRename(name, i)}
              onRemove={() => onTeamRemove(i)}
            />
            <TotalScore heats={heats} teamName={teamName} scores={scores} />
          </tr>
        )}
      />
    </table>
  );
}

function TeamName({
  editing,
  teamName,
  onEdit,
  onRemove,
}: {
  editing: boolean;
  teamName: string;
  onEdit: (name: string) => void;
  onRemove: () => void;
}) {
  return (
    <td style={{ width: "40%" }}>
      <div className="flex-between">
        <ToggleInput
          editing={editing}
          value={teamName}
          placeholder="New Team"
          onEdit={onEdit}
        />
        {editing && (
          <button className="red" onClick={onRemove}>
            Remove
          </button>
        )}
      </div>
    </td>
  );
}

function TotalScore({
  heats,
  teamName,
  scores,
}: {
  heats: number;
  teamName: string;
  scores?: Score[];
}) {
  if (!scores) return null;

  const teamScores = scores.filter(
    (score) => score.teamA === teamName || score.teamB === teamName
  );

  console.log(teamScores);

  const totals = teamScores.map((score) =>
    Object.values(
      score.teamA === teamName ? score.scoreA : score.scoreB
    ).reduce((total, next) => next + total, 0)
  );

  console.log(totals);

  return (
    <>
      <RangeGenerator
        quantity={heats}
        element={(i) => <td key={i}>{totals[i] || "N/A"}</td>}
      />
      <td>{totals.reduce((total, next) => total + next, 0)}</td>
    </>
  );
}

function Headers({ heats }: { heats: number }) {
  return (
    <tr>
      <th> Teams </th>
      <RangeGenerator
        quantity={heats}
        element={(index) => <th key={index}>Heat {index + 1}</th>}
      />
      <th> Grand Total </th>
    </tr>
  );
}
