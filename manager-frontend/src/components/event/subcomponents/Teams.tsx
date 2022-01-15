import { Team } from "../../../state/types";
import Input from "../../util/Input";

export default function Teams({
  teams,
  onAdd,
  onRename,
  onRemove,
}: {
  teams: Team[];
  onAdd: () => void;
  onRename: (name: string, index: number) => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="teams">
      <div className="heat-header">
        <div
          style={{
            fontSize: "1.5rem",
            borderBottom: "solid 0.25rem",
            width: "5rem",
          }}
        >
          Teams
        </div>
        <button className="green" onClick={onAdd} style={{ placeSelf: "end" }}>
          Add Team
        </button>
      </div>
      <div style={{ display: 'grid', gap: "1rem" }}>
        {teams.map((team, i) => (
          <TeamComponent
            key={team.name}
            team={team}
            onRename={(name) => onRename(name, i)}
            onRemove={() => onRemove(i)}
          />
        ))}
      </div>
    </div>
  );
}

export function TeamComponent({
  team,
  onRename,
  onRemove,
}: {
  team: Team;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="team">
      <Input defaultValue={team.name} placeholder="New Team" onConfirm={onRename} />
      <button className="red" onClick={onRemove}>
        Remove
      </button>
    </div>
  );
}
