import { Team } from "@ethics-olympiad/types";
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

  console.log(teams)

  return (
    <div className="teams">
      <div className="heat-header">
        <div style={{ fontSize: "1.5rem", width: "fit-content" }}>Teams</div>
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
        {teams && teams.length > 0 && (
          <div
            style={{
              display: "grid",
              gap: "0.5rem",
              borderTop: "solid 1px",
              borderBottom: "solid 1px",
              padding: "1rem 0rem ",
              maxHeight: "70vh",
              overflowY: "auto",
            }}
          >
            {teams &&
              teams.map((team, i) => (
                <TeamComponent
                  editing={editing}
                  key={team.teamName}
                  team={team}
                  onRename={(teamName) => onRename(teamName, i)}
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
          defaultValue={team.teamName}
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
          {team.teamName}
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
