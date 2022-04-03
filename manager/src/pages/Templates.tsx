import { Levels, Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TemplateComponent from "../components/template/Template";
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
  const levels: Levels[] = ["junior", "middle", "senior", "tertiary"];

  const createTemplate = (level: Levels) => async () => {
    const newTemplate: Template = await client
      .service("/api/templates")
      .create(getDefaultTemplate(user._id, level));
    setOne(newTemplate._id!, newTemplate);
    navigate(`./${newTemplate._id!}`);
    setEditing(true);
  };

  function capitalise(s: string) {
    return s[0].toUpperCase() + s.slice(1);
  }

  function formatTemplate(level: string) {
    return `New ${capitalise(level)} Template`;
  }

  return (
    <div className="templates">
      {levels.map((level) => (
        <>
          <ObjectMap
            object={templates}
            filter={(templateID) => templates[templateID].level === level}
            map={(templateID) => (
              <button
                className="grey template"
                onClick={() => navigate(`./${templates[templateID]._id}`)}
              >
                {templates[templateID].templateTitle}
              </button>
            )}
          />
          <button className="green" onClick={createTemplate(level)}>
            {formatTemplate(level)}{" "}
          </button>
        </>
      ))}
    </div>
  );
}
