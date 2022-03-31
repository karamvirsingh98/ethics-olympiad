import { Heat, User } from "@ethics-olympiad/types";
import { useCases, useTemplates } from "../../../App";
import { Cases } from "../../../state/types";
import Conditional from "../../util/Conditional";
import CaseSelector from "../../event/subcomponents/Selector";

export default function Heats({
  editing,
  user,
  heats,
  templateID,
  addHeat,
  removeHeat,
}: {
  editing: boolean;
  user: User;
  heats: Heat[];
  templateID: string;
  addHeat: () => void;
  removeHeat: (index: number) => void;
}) {
  const [cases] = useCases(user);

  return (
    <div className="heats" style={{ maxHeight: "70vh" }}>
      <Header onAdd={addHeat} editing={editing} />
      <div
        style={{
          maxHeight: `70vh`,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          paddingBottom: "4rem",
        }}
      >
        {cases &&
          heats &&
          heats.map((heat, i) => (
            <HeatComponent
              key={i}
              editing={editing}
              templateID={templateID}
              user={user}
              index={i}
              cases={cases}
              heat={heat}
              heats={heats}
              onRemove={removeHeat}
            />
          ))}
      </div>
    </div>
  );
}

function HeatComponent({
  editing,
  index,
  templateID,
  user,
  cases,
  heats,
  heat,
  onRemove,
}: {
  editing: boolean;
  index: number;
  templateID: string;
  user: User;
  cases: Cases;
  heats: Heat[];
  heat: Heat;
  onRemove: (index: number) => void;
}) {
  const { case1, case2 } = heat;

  const [_, { setOneField }] = useTemplates(user);

  const updateCase =
    (heatIndex: number, case1: boolean) => (caseID: string) => {
      const _heats = heats;
      if (case1)
        _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case1: caseID });
      else _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case2: caseID });
      setOneField(templateID, "heats", _heats);
    };

  return (
    <div className="heat">
      <div className="heat-header">
        <div style={{ fontSize: "1.25rem", paddingLeft: "0.5rem" }}>
          Heat {index + 1}
        </div>
        {editing && (
          <button
            className="red"
            onClick={() => onRemove(index)}
            style={{ placeSelf: "end", fontSize: "0.8rem" }}
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
