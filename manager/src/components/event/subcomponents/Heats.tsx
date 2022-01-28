import { SetOneField } from "../../../state/hooks/useCollection";
import { Cases, Event, Heat } from "../../../state/types";
import Conditional from "../../util/Conditional";
import CaseSelector from "../../case/subcomponents/Selector";

export default function Heats({
  editing,
  cases,
  heats,
  eventID,
  setOneField,
  onAdd,
  onRemove,
}: {
  editing: boolean;
  cases: Cases;
  heats: Heat[];
  eventID: string;
  setOneField: SetOneField<Event>;
  onAdd: () => void;
  onRemove: (index: number) => void;
}) {
  return (
    <div className="heats">
      <Header onAdd={onAdd} editing={editing} />
      {cases &&
        heats &&
        heats.map((heat, i) => (
          <HeatComponent
            key={i + Math.random()}
            editing={editing}
            eventID={eventID}
            index={i}
            cases={cases}
            heat={heat}
            heats={heats}
            setOneField={setOneField}
            onRemove={onRemove}
          />
        ))}
    </div>
  );
}

function HeatComponent({
  editing,
  index,
  eventID,
  cases,
  heats,
  heat,
  setOneField,
  onRemove,
}: {
  editing: boolean;
  index: number;
  eventID: string;
  cases: Cases;
  heats: Heat[];
  heat: Heat;
  setOneField: SetOneField<Event>;
  onRemove: (index: number) => void;
}) {
  const { case1, case2 } = heat;

  const updateCase =
    (heatIndex: number, case1: boolean) => (caseID: string) => {
      const _heats = heats;
      if (case1)
        _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case1: caseID });
      else _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case2: caseID });
      setOneField(eventID, "heats", _heats);
    };

  return (
    <div className="heat">
      <div className="heat-header">
        <div style={{ fontSize: "1.25rem" }}> Heat {index + 1} </div>
        {editing && (
          <button
            className="red"
            onClick={() => onRemove(index)}
            style={{ placeSelf: "end" }}
          >
            Remove
          </button>
        )}
      </div>

      <div style={{ display: "grid", width: "100%" }}>
        <HeatCase
          editing={editing}
          cases={cases}
          caseID={case1}
          onSelect={updateCase(index, true)}
        />
        <HeatCase
          editing={editing}
          cases={cases}
          caseID={case2}
          onSelect={updateCase(index, false)}
        />
      </div>
    </div>
  );
}

function HeatCase({
  editing,
  cases,
  caseID,
  onSelect,
}: {
  editing: boolean;
  cases: Cases;
  caseID: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="heat-item">
      <div style={{ padding: "0.5rem" }}>Round 1:</div>
      <Conditional
        condition={editing}
        showTrue={
          <CaseSelector cases={cases} selected={caseID} onSelect={onSelect} />
        }
        showFalse={
          <div style={{ alignSelf: "center" }}>
            {" "}
            {caseID && cases[caseID]
              ? cases[caseID].title
              : "No Case Selected"}{" "}
          </div>
        }
      />
    </div>
  );
}

function Header({ editing, onAdd }: { editing: boolean; onAdd: () => void }) {
  return (
    <div className="heat-header">
      <div
        style={{
          fontSize: "1.5rem",
          width: "fit-content",
        }}
      >
        Heats
      </div>
      {editing && (
        <button className="green" style={{ placeSelf: "end" }} onClick={onAdd}>
          Add Heat
        </button>
      )}
    </div>
  );
}
