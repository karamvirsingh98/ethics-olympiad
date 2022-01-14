import { Case, Cases, Heat } from "../../../state/types";

export default function HeatsComponent({
  cases,
  heats,
  onAdd,
  onRemove,
}: {
  cases: Cases;
  heats: Heat[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="heats">
      <Header onAdd={onAdd} />
      {cases &&
        heats &&
        heats.map((heat, i) => (
          <HeatComponent
            key={i}
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
  index,
  case1,
  case2,
  onRemove,
}: {
  index: number;
  case1?: Case;
  case2?: Case;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="heat">
      <div className="heat-header">
        <div style={{ fontSize: "1.25rem" }}> Heat {index + 1} </div>
        <button
          className="red"
          onClick={() => onRemove(index)}
          style={{ placeSelf: "end" }}
        >
          Remove
        </button>
      </div>

      <div style={{ display: "grid", width: "100%" }}>
        <div className="heat-item">
          Round 1
          <div style={{ placeSelf: "end" }}>
            {" "}
            {case1 ? case1.title : "No Case Selected"}{" "}
          </div>
        </div>
        <div className="heat-item">
          Round 2
          <div style={{ placeSelf: "end" }}>
            {" "}
            {case2 ? case2.title : "No Case Selected"}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="heat-header">
      <div
        style={{
          fontSize: "1.5rem",
          borderBottom: "solid 0.25rem",
          width: "5rem",
        }}
      >
        Heats
      </div>
      <button className="green" style={{ placeSelf: "end" }} onClick={onAdd}>
        Add Heat
      </button>
    </div>
  );
}
