import { Case, Heat, Levels, Template, User } from "@ethics-olympiad/types";
import { useCases } from "../../../App";
import { Cases, Collection } from "../../../state/types";
import Conditional from "../../util/Conditional";
import CaseSelector from "../../event/subcomponents/CaseSelector";
import { SetOneField } from "../../../state/hooks/useCollection";
import { useEffect, useState } from "react";
import { client } from "../../../main";
import { arrToKeyedObject } from "../../../util/helpers";

export default function Heats({
  editing,
  user,
  template,
  addHeat,
  removeHeat,
  setOneField,
}: {
  editing: boolean;
  user: User;
  template: Template;
  addHeat: () => void;
  removeHeat: (index: number) => void;
  setOneField: SetOneField<Template>;
}) {
  const [cases] = useCases(user);
  const [officialCases, setOfficialCases] = useState<Collection<Case>>({});
  useEffect(() => {
    if (!user.admin)
      client
        .service("api/cases")
        .find({ query: { isOfficial: true, level: template.level } })
        .then((res: Case[]) => setOfficialCases(arrToKeyedObject(res, "_id")));
  }, []);
  const _cases = user.admin ? cases : { ...cases, ...officialCases };

  return (
    <div className="heats" style={{ maxHeight: "70vh" }}>
      <Header onAdd={addHeat} editing={editing} />
      <div
        style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          paddingBottom: "4rem",
          height: "70vh",
        }}
      >
        {cases &&
          template.heats &&
          template.heats.map((heat, i) => (
            <HeatComponent
              key={i}
              editing={editing}
              template={template}
              index={i}
              cases={_cases}
              heat={heat}
              heats={template.heats}
              onRemove={removeHeat}
              setOneField={setOneField}
            />
          ))}
      </div>
    </div>
  );
}

function HeatComponent({
  editing,
  index,
  template,
  cases,
  heats,
  heat,
  onRemove,
  setOneField,
}: {
  editing: boolean;
  index: number;
  template: Template;
  cases: Cases;
  heats: Heat[];
  heat: Heat;
  onRemove: (index: number) => void;
  setOneField: SetOneField<Template>;
}) {
  const { case1, case2 } = heat;
  const { _id: templateID, level } = template;
  const updateCase =
    (heatIndex: number, case1: boolean) => (caseID: string) => {
      const _heats = heats;
      if (case1)
        _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case1: caseID });
      else _heats.splice(heatIndex, 1, { ..._heats[heatIndex], case2: caseID });
      setOneField(templateID!, "heats", _heats);
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
          level={level}
          onSelect={updateCase(index, true)}
        />
        <HeatCase
          editing={editing}
          cases={cases}
          caseID={case2}
          level={level}
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
  level,
  onSelect,
}: {
  editing: boolean;
  cases: Cases;
  caseID: string;
  level: Levels;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="heat-item">
      <div style={{ padding: "0.5rem" }}>Round 1:</div>
      <Conditional
        condition={editing}
        showTrue={
          <CaseSelector
            cases={cases}
            selected={caseID}
            onSelect={onSelect}
            level={level}
          />
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
