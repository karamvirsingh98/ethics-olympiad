import { Levels, Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { formatTemplateLevel } from "../components/template/helpers";
import LevelSelector from "../components/template/subcomponents/LevelSelector";
import TemplateComponent from "../components/template/Template";
import Conditional from "../components/util/Conditional";
import Divider from "../components/util/Divider";
import Input from "../components/util/Input";
import ObjectMap from "../components/util/ObjectMap";
import { client } from "../main";
import { getDefaultTemplate } from "../state/defaults";
import useCollection, { SetOne } from "../state/hooks/useCollection";
import { Templates } from "../state/types";

export function TemplatesComponent({ user }: { user: User }) {
  const [templates, templateFunctions] = useCollection<Template>("templates", {
    query: { owner: user._id },
  });
  const [editing, setEditing] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          templates && (
            <TemplateCards
              templates={templates}
              user={user}
              setOne={templateFunctions.setOne}
              setEditing={setEditing}
            />
          )
        }
      />
      <Route
        path="/:templateID/*"
        element={
          templates && (
            <TemplateComponent
              user={user}
              templateState={[templates!, templateFunctions]}
              editing={editing}
              setEditing={setEditing}
            />
          )
        }
      />
    </Routes>
  );
}

function TemplateCards({
  templates,
  user,
  setOne,
  setEditing,
}: {
  templates: Templates;
  user: User;
  setOne: SetOne<Template>;
  setEditing: (editing: boolean) => void;
}) {
  const navigate = useNavigate();
  const levels: Levels[] | undefined = user.admin
    ? ["junior", "middle", "senior", "tertiary"]
    : user.permissions;

  const [level, set] = useState<Levels | "">("");
  const [newClicked, setNewClicked] = useState(false);
  const [title, setTitle] = useState("");

  const createTemplate = async () => {
    const newTemplate: Template = await client
      .service("/api/templates")
      .create(getDefaultTemplate(user._id, title, level as Levels));
    setOne(newTemplate._id!, newTemplate);
    navigate(`./${newTemplate._id!}`);
    setEditing(true);
  };

  const capitalise = (s: string) => {
    return s[0].toUpperCase() + s.slice(1, s.length);
  };

  return (
    <div className="templates">
      <div
        className={`${newClicked ? "blue-flat" : "green"} template-card`}
        onClick={() => setNewClicked(true)}
        style={{ width: "100%", fontSize: "1.25rem" }}
      >
        <Conditional
          condition={newClicked}
          showTrue={
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="flex-between" style={{ gap: "1rem" }}>
                Title:
                <Input
                  value={title}
                  onChange={setTitle}
                  autofocus
                  style={{ fontSize: "1.25rem" }}
                />
              </div>
              <LevelSelector selected={level} onSelect={set} />
              {level && title && (
                <button className="green" onClick={createTemplate}>
                  Create Template
                </button>
              )}
            </div>
          }
          showFalse={<div>New Template</div>}
        />
      </div>
      {
        levels && (
          <ObjectMap
            object={templates}
            // filter={(templateID) => templates[templateID].level === level}
            map={(templateID) => (
              <button
                key={templateID}
                className={`${newClicked ? "grey" : "blue"} template-card`}
                onClick={() => navigate(`./${templates[templateID]._id}`)}
                style={{ width: "100%", fontSize: "1.25rem" }}
              >
                <div>
                  {templates[templateID].templateTitle || "Unnamed Template"}
                </div>
                <div style={{ fontSize: "1rem" }}>
                  {capitalise(templates[templateID].level) + " Level"}
                </div>
              </button>
            )}
          />
        )
        // levels.map((level, i) => (
        //   <div
        //     style={{
        //       display: "grid",
        //       gridTemplateColumns: "1fr auto",
        //       gap: "2rem",
        //       marginLeft: i === 0 ? "undefined" : "1rem",
        //     }}
        //   >
        //     <div
        //       style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
        //     >
        //       <button
        //         className="green"
        //         onClick={createTemplate(level)}
        //         style={{ width: "100%" }}
        //       >
        //         {formatTemplateLevel(level, true)}
        //       </button>
        //       <ObjectMap
        //         object={templates}
        //         filter={(templateID) => templates[templateID].level === level}
        //         map={(templateID) => (
        //           <button
        //             className="blue"
        //             onClick={() => navigate(`./${templates[templateID]._id}`)}
        //             style={{ width: "100%", fontSize: "1.25rem" }}
        //           >
        //             {templates[templateID].templateTitle || "Unnamed Template"}
        //           </button>
        //         )}
        //       />
        //     </div>
        //     {i < 3 && <Divider vertical />}
        //   </div>
        // ))
      }
    </div>
  );
}
