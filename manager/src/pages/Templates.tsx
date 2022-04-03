import { Levels, Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { formatTemplateLevel } from "../components/template/helpers";
import TemplateComponent from "../components/template/Template";
import Divider from "../components/util/Divider";
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

  const createTemplate = (level: Levels) => async () => {
    const newTemplate: Template = await client
      .service("/api/templates")
      .create(getDefaultTemplate(user._id, level));
    setOne(newTemplate._id!, newTemplate);
    navigate(`./${newTemplate._id!}`);
    setEditing(true);
    document.getElementById("template-title")?.focus();
  };

  return (
    <div className="templates">
      {levels &&
        levels.map((level, i) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              marginLeft: i === 0 ? "undefined" : "1rem",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
            >
              <button
                className="green"
                onClick={createTemplate(level)}
                style={{ width: "100%" }}
              >
                {formatTemplateLevel(level, true)}
              </button>
              <ObjectMap
                object={templates}
                filter={(templateID) => templates[templateID].level === level}
                map={(templateID) => (
                  <button
                    className="blue"
                    onClick={() => navigate(`./${templates[templateID]._id}`)}
                    style={{ width: "100%", fontSize: "1.25rem" }}
                  >
                    {templates[templateID].templateTitle || "Unnamed Template"}
                  </button>
                )}
              />
            </div>
            {i < 3 && <Divider vertical />}
          </div>
        ))}
    </div>
  );
}
