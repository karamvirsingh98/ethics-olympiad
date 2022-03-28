import { Fragment } from "react";
import { AppState } from "../state/types";
import { getDefaultCase } from "../state/defaults";
import { client } from "../main";
import CaseGroup from "../components/case/CaseGroup";
import Divider from "../components/util/Divider";
import { Case, Levels, User } from "@ethics-olympiad/types";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";

export default function Cases({
  user,
  state,
}: {
  user: User;
  state: AppState;
}) {
  return (
    <Routes>
      <Route path="/" element={<CaseRouteButtons />} />
      <Route
        path={"/:caseLevel"}
        element={<CaseLevel {...{ user, state }} />}
      />
    </Routes>
  );
}

function CaseRouteButtons() {
  const navigate = useNavigate();
  const levels: Levels[] = ["junior", "middle", "senior", "tertiary"];
  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => navigate(`./${level}`)}
          className="blue"
          style={{ fontSize: "1.5rem", padding: "0.5rem 2rem" }}
        >
          {capitalise(level)} Cases
        </button>
      ))}
    </div>
  );
}

function CaseLevel({ user, state }: { user: User; state: AppState }) {
  const { caseLevel } = useParams();

  const {
    cases: [cases, { setOne, setOneField, removeOne }],
  } = state;

  const createCase = (isVideo: boolean) => async () => {
    const newCase: Case = await client
      .service("/api/cases")
      .create(getDefaultCase(user._id, isVideo, caseLevel! as Levels));
    setOne(newCase._id!, newCase);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "2rem",
        marginTop: "2rem",
        overflow: "hidden",
      }}
    >
      <div style={{ overflowY: "auto" }}>
        <CaseGroup
          title="Video Cases"
          cases={cases}
          sortCondition={(caseID) =>
            cases && cases[caseID].isVideo && cases[caseID].level === caseLevel
          }
          setOne={setOne}
          setOneField={setOneField}
          removeOne={removeOne}
          onNewClick={createCase(true)}
        />
      </div>
      <Divider vertical />
      <div style={{ overflowY: "auto" }}>
        <CaseGroup
          title="Text Cases"
          cases={cases}
          sortCondition={(caseID) =>
            cases && !cases[caseID].isVideo && cases[caseID].level === caseLevel
          }
          setOne={setOne}
          setOneField={setOneField}
          removeOne={removeOne}
          onNewClick={createCase(false)}
        />
      </div>
    </div>
  );
}
