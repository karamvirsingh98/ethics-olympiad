import { Template, User } from "@ethics-olympiad/types";
import { useState } from "react";
import { useAuth, useCases, useTemplates } from "../../App";
import { Cases } from "../../state/types";
import Heats from "../event/subcomponents/Heats";
import ObjectMap from "../util/ObjectMap";

export function Templates({ user, eventID }: { user: User; eventID: string }) {
  const [templates] = useTemplates(user);

  return (
    <div>
      <ObjectMap
        object={templates}
        map={(templateID) => (
          <TemplateComponent
            editing={false}
            template={templates[templateID]}
            user={user}
          />
        )}
      />
    </div>
  );
}

export default function TemplateComponent({
  editing,
  user,
  template,
}: {
  editing: boolean;
  user: User;
  template: Template;
}) {
  const { _id, templateTitle, heats } = template;
  const [cases] = useCases(user);

  return (
    <div>
      <div> {templateTitle} </div>
      <Heats editing={editing} user={user} heats={heats} templateID={_id!} />
    </div>
  );
}
