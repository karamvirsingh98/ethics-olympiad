import { Template } from "@ethics-olympiad/types";
import { CollectionFunctions } from "../../../state/hooks/useCollection";
import TitleButtons from "../../event/subcomponents/TitleButtons";
import ToggleInput from "../../util/ToggleInput";
import { formatTemplateLevel, templateTitleHelpers } from "../helpers";

export default function TemplateTitle({
  editing,
  template,
  setEditing,
  templateFunctions,
  hideButtonsWhen,
}: {
  editing: boolean;
  template: Template;
  setEditing: (editing: boolean) => void;
  templateFunctions: CollectionFunctions<Template>;
  hideButtonsWhen?: boolean;
}) {
  const { getTitle, rename, ...helpers } = templateTitleHelpers(
    editing,
    template,
    templateFunctions,
    setEditing
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <ToggleInput
        editing={editing}
        value={getTitle()}
        onEdit={rename}
        fontSize="2rem"
        id={"template-title"}
        style={{ width: "50%" }}
        placeholder="Name This Template"
      />
      <div> {formatTemplateLevel(template.level)} </div>
      {!hideButtonsWhen && (
        <TitleButtons
          editing={editing}
          toggleEditing={() => setEditing(!editing)}
          {...helpers}
          extraText="Template"
        />
      )}
    </div>
  );
}
