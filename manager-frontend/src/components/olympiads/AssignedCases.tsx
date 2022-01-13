import { Case, Cases } from "../../state/types";

export default function AssignedCases({cases, caseIDs}: {cases: Cases, caseIDs: string[]}) {
  return (
    <div className="assigned-cases">
      <Header />
      {caseIDs.map(id => <AssignedCase  />)}
    </div>
  )

}

function AssignedCase({index, case }:{ index: number, case: Case }) {
  return (
    <div className="assigned-case">
      <div> Heat {index} </div>
      <div> {case.title} </div>
    </div>
  )
}

function Header() {
  return (
    <div className="assigned-case">
      <div />
      <div> Round 1 </div>
      <div> Round 2 </div>
    </div>
  )
}