import { useNavigate } from "react-router-dom";
import { Case } from "../../../state/types";

export default function CaseOverview({ _case }: { _case: Case }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "grid" }}>
      <div className="case-title">
        {_case.title}
        <button
          className="green"
          onClick={() => navigate("./stage1")}
          style={{ fontSize: "2rem" }}
        >
          Start Round
        </button>
      </div>
      <div style={{ width: "100%", overflow: "scroll" }}>
        <div style={{ whiteSpace: "pre-line", fontSize: "1.25rem" }}>
          {_case.bodyText}
        </div>
      </div>
    </div>
  );
}
