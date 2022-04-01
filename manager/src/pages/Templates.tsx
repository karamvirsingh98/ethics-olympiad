import { Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { useTemplates } from "../App";
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

  const createTemplate = async () => {
    const newTemplate: Template = await client
      .service("/api/templates")
      .create(getDefaultTemplate(user._id));
    setOne(newTemplate._id!, newTemplate);
    navigate(`./${newTemplate._id!}`);
    setEditing(true);
  };

  return (
    <div className="templates">
      <ObjectMap
        object={templates}
        map={(templateID) => (
          <button
            className="grey template"
            onClick={() => navigate(`./${templates[templateID]._id}`)}
          >
            {templates[templateID].templateTitle}
          </button>
        )}
      />
      <button className="green" onClick={createTemplate}>
        New Template
      </button>
    </div>
  );
}
