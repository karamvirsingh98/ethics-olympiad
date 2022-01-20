import { Case, Cases, Heat } from "../../../state/types";

export default function Heats({
  editing,
  cases,
  heats,
  onAdd,
  onRemove,
}: {
  editing: boolean;
  cases: Cases;
  heats: Heat[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="heats">
      <Header onAdd={onAdd} editing={editing} />
      {cases &&
        heats &&
        heats.map((heat, i) => (
          <HeatComponent
            key={i + Math.random()}
            editing={editing}
            index={i}
            case1={cases[heat.case1]}
            case2={cases[heat.case2]}
            onRemove={onRemove}
          />
        ))}
    </div>
  );
}

function HeatComponent({
  editing,
  index,
  case1,
  case2,
  onRemove,
}: {
  editing: boolean;

  index: number;
  case1?: Case;
  case2?: Case;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="heat">
      <div className="heat-header">
        <div style={{ fontSize: "1.5rem" }}> Heat {index + 1} </div>
        {editing && (
          <button
            className="red"
            onClick={() => onRemove(index)}
            style={{ placeSelf: "end" }}
          >
            Remove
          </button>
        )}
      </div>

      <div style={{ display: "grid", width: "100%", gap: "0.5rem" }}>
        <div className="heat-item">
          Round 1:
          <div style={{ placeSelf: "end" }}>
            {" "}
            {case1 ? case1.title : "No Case Selected"}{" "}
          </div>
        </div>
        <div className="heat-item">
          Round 2:
          <div style={{ placeSelf: "end" }}>
            {" "}
            {case2 ? case2.title : "No Case Selected"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ editing, onAdd }: { editing: boolean; onAdd: () => void }) {
  return (
    <div className="heat-header">
      <div
        style={{
          fontSize: "1.75rem",
          // borderBottom: "solid 0.25rem",
          width: "fit-content",
        }}
      >
        Heats
      </div>
      {editing && (
        <button className="green" style={{ placeSelf: "end" }} onClick={onAdd}>
          Add Heat
        </button>
      )}
    </div>
  );
}
