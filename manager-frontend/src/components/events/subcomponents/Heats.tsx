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
      <div> Heat {index + 1} </div>
      <div> {case1 ? case1.title : "No Case Selected"} </div>
      <div> {case2 ? case2.title : "No Case Selected"} </div>
      <button className="red" onClick={() => onRemove(index)} style={{ placeSelf: "center" }}>
        Remove
      </button>
    </div>
  );
}

function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="heat">
      <div
        style={{
          fontSize: "1.5rem",
          borderBottom: "solid 0.25rem",
        }}
      >
        Heats
      </div>
      {[1, 2].map((i) => (
        <div className="heat-header-item" key={'round' + i}> Round {i} </div>
      ))}
      <button
        className="green"
        style={{ placeSelf: "end center" }}
        onClick={onAdd}
      >
        Add Heat
      </button>
    </div>
  );
}
