import { RemoveOne, SetOneField } from "../../state/hooks/useCollection";
import { Case, Cases } from "../../state/types";
import ArrayMap from "../util/ArrayMap";
import CaseComponent from "./subcomponents/Case";

export default function CaseGroup({
  title,
  cases,
  sortCondition,
  setOneField,
  removeOne,
  onNewClick,
}: {
  title: string;
  cases: Cases;
  sortCondition: (id: string) => void;
  setOneField: SetOneField<Case>;
  removeOne: RemoveOne;
  onNewClick: () => void;
}) {
  return (
    <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
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
      <ArrayMap
        array={Object.keys(cases).filter(sortCondition)}
        map={(id) => (
          <CaseComponent
            Case={cases![id]}
            setOneField={setOneField}
            removeOne={removeOne}
          />
        )}
      />
    </div>
  );
}
