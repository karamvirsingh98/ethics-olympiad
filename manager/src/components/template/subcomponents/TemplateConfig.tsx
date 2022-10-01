import { Template, User } from "@ethics-olympiad/types";
import { useMemo } from "react";
import { SetOneField } from "../../../state/hooks/useCollection";
import Divider from "../../util/Divider";
import templateConfigHelpers from "../helpers";
import Heats from "./Heats";
import Timers from "./Timers";

export default function TemplateConfig({
  editing,
  user,
  template,
  setOneField,
}: {
  editing: boolean;
  user: User;
  template: Template;
  setOneField: SetOneField<Template>;
}) {
  const { addHeat, removeHeat, editTimer } = useMemo(
    () => templateConfigHelpers(template, setOneField),
    [template]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        gap: "1rem",
      }}
    >
      <Heats
        editing={editing}
        user={user}
        template={template}
        addHeat={addHeat}
        removeHeat={removeHeat}
        setOneField={setOneField}
      />
      <Divider vertical />
      <Timers
        editing={editing}
        timers={template.timers}
        onConfirm={editTimer}
      />
    </div>
  );
}
