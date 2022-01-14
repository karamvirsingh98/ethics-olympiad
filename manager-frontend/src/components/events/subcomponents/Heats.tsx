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
  onRemove?: () => void;
}) {
  return (
    <div className="heats">
      <Header />
      {cases &&
        heats &&
        heats.map((heat, i) => (
          <HeatComponent
            key={i}
            index={i + 1}
            case1={cases[heat.case1]}
            case2={cases[heat.case2]}
          />
        ))}
      <button className="green" style={{ placeSelf: "center" }} onClick={onAdd}>
        Add Heat
      </button>
    </div>
  );
}

function HeatComponent({
  index,
  case1,
  case2,
}: {
  index: number;
  case1?: Case;
  case2?: Case;
}) {
  return (
    <div className="heat">
      <div> Heat {index} </div>
      <div> {case1 ? case1.title : "No Case Selected"} </div>
      <div> {case2 ? case2.title : "No Case Selected"} </div>
    </div>
  );
}

function Header() {
  return (
    <div className="heat">
      <div
        style={{
          fontSize: "1.5rem",
          borderBottom: "solid 0.25rem",
          width: "75%",
        }}
      >
        Heats
      </div>
      {[1, 2].map((i) => (
        <div className="heat-header-item"> Round {i} </div>
      ))}
    </div>
  );
}
