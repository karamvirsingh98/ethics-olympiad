import { Case, Cases, Heats } from "../../../state/types";

export default function AssignedCases({
  cases,
  heats,
}: {
  cases: Cases;
  heats: Heats;
}) {
  return (
    <div className="assigned-cases">
      <Header />
      {cases &&
        heats &&
        heats.map((heat, i) => (
          <AssignedCase
            index={i + 1}
            case1={cases[heat.case1]}
            case2={cases[heat.case2]}
          />
        ))}
    </div>
  );
}

function AssignedCase({
  index,
  case1,
  case2,
}: {
  index: number;
  case1: Case;
  case2: Case;
}) {
  return (
    <div className="assigned-case">
      <div> Heat {index} </div>
      <div> {case1.title} </div>
      <div> {case2.title} </div>
    </div>
  );
}

function Header() {
  return (
    <div className="assigned-case">
      <div style={{ fontSize: "1.25rem"}}> Heats </div>
      <div> Round 1 </div>
      <div> Round 2 </div>
    </div>
  );
}
