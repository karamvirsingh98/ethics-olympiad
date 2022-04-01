import { Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTemplates } from "../App";
import TemplateComponent from "../components/template/Template";
import ObjectMap from "../components/util/ObjectMap";
import { client } from "../main";
import { getDefaultTemplate } from "../state/defaults";
import { SetOne } from "../state/hooks/useCollection";
import { Templates } from "../state/types";

export function TemplatesComponent({ user }: { user: User }) {
  const [templates, { setOne }] = useTemplates(user);
  const [editing, setEditing] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <TemplateCards
            templates={templates}
            user={user}
            setOne={setOne}
            setEditing={setEditing}
          />
        }
      />
      <Route
        path="/:templateID/*"
        element={<TemplateComponent user={user} />}
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
  console.log(templates);
  console.log("mounted");

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
          <div
            className="grey template"
            onClick={() => navigate(`./${templates[templateID]._id}`)}
          >
            asdfa {templates[templateID].templateTitle}
          </div>
        )}
      />
      <button className="green" onClick={createTemplate}>
        New Template
      </button>
    </div>
  );
}
