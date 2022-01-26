import { Fragment } from "react";
import { AppState, Case, User } from "../state/types";
import { getDefaultCase } from "../state/defaults";
import { client } from "..";
import CaseGroup from "../components/case/CaseGroup";

export default function Cases({
  user,
  state,
}: {
  user: User;
  state: AppState;
}) {
  const {
    cases: [cases, { setOne, setOneField, removeOne }],
  } = state;

  const createCase = (isVideo: boolean) => async () => {
    const newCase: Case = await client
      .service("/api/cases")
      .create(getDefaultCase(user._id, isVideo));
    setOne(newCase._id!, newCase);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "2rem",
        marginTop: "2rem",
      }}
    >
      {cases && (
        <Fragment>
          <CaseGroup
            title="Video Cases"
            cases={cases}
            sortCondition={(caseID) => cases[caseID].isVideo}
            setOne={setOne}
            setOneField={setOneField}
            removeOne={removeOne}
            onNewClick={createCase(true)}
          />
          <div
            style={{
              border: "solid 1px",
              opacity: "0.5",
              borderRadius: "0.25rem",
            }}
          />
          <CaseGroup
            title="Text Cases"
            cases={cases}
            sortCondition={(caseID) => !cases[caseID].isVideo}
            setOne={setOne}
            setOneField={setOneField}
            removeOne={removeOne}
            onNewClick={createCase(false)}
          />
        </Fragment>
      )}
    </div>
  );
}
