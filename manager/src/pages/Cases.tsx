import { getDefaultCase } from "../state/defaults";
import { client } from "../main";
import CaseGroup from "../components/case/CaseGroup";
import Divider from "../components/util/Divider";
import { Case, Levels, User } from "@ethics-olympiad/types";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useCases } from "../App";

export default function Cases({ user }: { user: User }) {
  return (
    <Routes>
      <Route path="/" element={<CaseRouteButtons />} />
      <Route path={"/:caseLevel"} element={<CaseLevel user={user} />} />
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
    <div style={{ display: "grid", placeItems: "center", height: "100%" }}>
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
            {capitalise(level)} Level Cases
          </button>
        ))}
      </div>
    </div>
  );
}

function CaseLevel({ user }: { user: User }) {
  const { caseLevel } = useParams();

  const [cases, { setOne, setOneField, removeOne }] = useCases(user);

  const createCase = (isVideo: boolean) => async () => {
    const newCase: Case = await client
      .service("/api/cases")
      .create(getDefaultCase(user._id, isVideo, caseLevel! as Levels));
    setOne(newCase._id!, newCase);
  };

  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }
  function formatTemplate(level: string, isNew?: boolean) {
    return `${capitalise(level)} School Cases`;
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateRows: "auto auto 1fr",
      }}
    >
      <div
        style={{ display: " grid", fontSize: "2rem", textAlign: "center" }}
      >
        {" "}
        {formatTemplate(caseLevel!)}{" "}
      </div>
      <Divider />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          gap: "2rem",
          marginTop: "1rem",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowY: "auto" }}>
          <CaseGroup
            title="Video Cases"
            cases={cases}
            sortCondition={(caseID) =>
              cases &&
              cases[caseID].isVideo &&
              cases[caseID].level === caseLevel
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
              cases &&
              !cases[caseID].isVideo &&
              cases[caseID].level === caseLevel
            }
            setOne={setOne}
            setOneField={setOneField}
            removeOne={removeOne}
            onNewClick={createCase(false)}
          />
        </div>
      </div>
    </div>
  );
}
