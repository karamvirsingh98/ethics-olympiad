import { Team } from "../../../state/types";
import Input from "../../util/Input";

export default function Teams({
  editing,
  teams,
  onAdd,
  onRename,
  onRemove,
}: {
  editing: boolean;
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
            fontSize: "1.75rem",
            // borderBottom: "solid 0.25rem",
            width: "fit-content",
          }}
        >
          Teams
        </div>
        {editing && (
          <button
            className="green"
            onClick={onAdd}
            style={{ placeSelf: "end" }}
          >
            Add Team
          </button>
        )}
      </div>
      <div>
        {teams.length > 0 && (
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              borderTop: "solid 1px",
              borderBottom: "solid 1px",
              padding: "1rem 0rem ",
            }}
          >
            {teams.map((team, i) => (
              <TeamComponent
                editing={editing}
                key={team.name + Math.random()}
                team={team}
                onRename={(name) => onRename(name, i)}
                onRemove={() => onRemove(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function TeamComponent({
  editing,
  team,
  onRename,
  onRemove,
}: {
  editing: boolean;
  team: Team;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="team">
      {editing ? (
        <Input
          style={{ fontSize: "1rem", textOverflow: "ellipsis" }}
          defaultValue={team.name}
          placeholder="New Team"
          onConfirm={onRename}
        />
      ) : (
        <div
          style={{
            width: "100%",
            borderBottom: "solid 0.25rem transparent",
            textOverflow: "ellipsis",
          }}
        >
          {team.name}
        </div>
      )}
      {editing && (
        <button
          className="red"
          onClick={onRemove}
          style={{ fontSize: "0.8rem" }}
        >
          Remove
        </button>
      )}
    </div>
  );
}
