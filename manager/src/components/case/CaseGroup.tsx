import { Case } from "@ethics-olympiad/types";
import { RemoveOne, SetOne, SetOneField } from "../../state/hooks/useCollection";
import { Cases } from "../../state/types";
import ArrayMap from "../util/ArrayMap";
import CaseComponent from "./subcomponents/Case";

export default function CaseGroup({
  title,
  cases,
  sortCondition,
  setOne,
  setOneField,
  removeOne,
  onNewClick,
}: {
  title: string;
  cases?: Cases;
  sortCondition: (id: string) => void;
  setOne: SetOne<Case>
  setOneField: SetOneField<Case>;
  removeOne: RemoveOne;
  onNewClick: () => void;
}) {
  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        gridTemplateRows: "auto 100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          borderBottom: "solid 0.15rem",
        }}
      >
        <div style={{ fontSize: "1.75rem" }}>{title}</div>
        <button className="green" onClick={onNewClick}>
          New Case
        </button>
      </div>
      <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
        {cases && (
          <ArrayMap
            array={Object.keys(cases).filter(sortCondition)}
            map={(id) => (
              <CaseComponent
                _case={cases![id]}
                key={id}
                setOne={setOne}
                setOneField={setOneField}
                removeOne={removeOne}
              />
            )}
          />
        )}
      </div>
    </div>
  );
}
