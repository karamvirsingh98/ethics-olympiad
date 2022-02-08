import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Case } from "../../../state/types";

export default function CaseOverview({ _case }: { _case: Case }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {_case.title}
        <button className="green" onClick={() => navigate("./stage1")}>
          Start Round
        </button>
      </div>
      <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
        <div style={{ whiteSpace: "pre-line", fontSize: "1.25rem" }}>
          {_case.bodyText}
        </div>
      </div>
    </Fragment>
  );
}
