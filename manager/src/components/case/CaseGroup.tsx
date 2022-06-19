import { Case, User } from "@ethics-olympiad/types";
import {
  CollectionFunctions,
  RemoveOne,
  SetOne,
  SetOneField,
} from "../../state/hooks/useCollection";
import { Cases } from "../../state/types";
import ArrayMap from "../util/ArrayMap";
import CaseComponent from "./subcomponents/Case";
import OfficialCase from "./subcomponents/OfficialCase";

export default function CaseGroup({
  user,
  title,
  cases,
  sortCondition,
  functions,
  onNewClick,
}: {
  user: User;
  title: string;
  cases?: Cases;
  sortCondition: (id: string) => void;
  functions: CollectionFunctions<Case>;
  onNewClick: () => void;
}) {
  const { setOne, setOneField, removeOne } = functions;

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateRows: "auto 100%",
        maxHeight: "75vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          paddingBottom: "0.25rem",
          borderBottom: "solid 0.15rem",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>{title}</div>
        <button className="green" onClick={onNewClick}>
          New Case
        </button>
      </div>
      <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
        {cases && (
          <ArrayMap
            array={Object.keys(cases).filter(sortCondition)}
            map={(id) =>
              !user.admin && cases[id].isOfficial ? (
                <OfficialCase _case={cases[id]} user={user} />
              ) : (
                <CaseComponent
                  _case={cases[id]}
                  key={id}
                  setOne={setOne}
                  setOneField={setOneField}
                  removeOne={removeOne}
                />
              )
            }
          />
        )}
      </div>
    </div>
  );
}
