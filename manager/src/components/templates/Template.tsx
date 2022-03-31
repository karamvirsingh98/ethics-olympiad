import { Template, User } from "@ethics-olympiad/types";
import { useTemplates } from "../../App";
import Heats from "./subcomponents/Heats";
import Timers from "./subcomponents/Timers";
import ObjectMap from "../util/ObjectMap";
import templateHelpers from "./helpers";

export function Templates({ user }: { user: User }) {
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
  const [_, { setOneField }] = useTemplates(user);

  const { addHeat, removeHeat, editTimer } = templateHelpers(
    template,
    setOneField
  );

  return (
    <div>
      <div> {templateTitle} </div>
      <Heats
        editing={editing}
        user={user}
        heats={heats}
        templateID={_id!}
        addHeat={addHeat}
        removeHeat={removeHeat}
      />
      <Timers
        editing={editing}
        timers={template.timers}
        onConfirm={editTimer}
      />
    </div>
  );
}
