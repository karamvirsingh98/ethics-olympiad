import { User } from "@ethics-olympiad/types";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useTemplates } from "../App";
import TemplateComponent from "../components/template/Template";
import ObjectMap from "../components/util/ObjectMap";
import { Templates } from "../state/types";

export function Templates({ user }: { user: User }) {
  const [templates] = useTemplates(user);

  return (
    <Routes>
      <Route path="/" element={<TemplateCards templates={templates} />} />
      <Route
        path="/:templateID/*"
        element={<TemplateComponent user={user} />}
      />
    </Routes>
  );
}

function TemplateCards({ templates }: { templates: Templates }) {
  const navigate = useNavigate();

  return (
    <ObjectMap
      object={templates}
      map={(templateID) => (
        <div
          className="grey"
          onClick={() => navigate(`./${templates[templateID]._id}`)}
        >
          {templates[templateID].templateTitle}
        </div>
      )}
    />
  );
}
