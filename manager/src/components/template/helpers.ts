import { Template } from "@ethics-olympiad/types";
import { useNavigate } from "react-router-dom";
import { client } from "../../main";
import {
  CollectionFunctions,
  SetOneField,
} from "../../state/hooks/useCollection";

export default function templateConfigHelpers(
  template: Template,
  setOneField: SetOneField<Template>
) {
  const addHeat = () =>
    setOneField(template._id!, "heats", [
      ...template.heats,
      { case1: "", case2: "" },
    ]);

  const removeHeat = (index: number) =>
    setOneField(
      template._id!,
      "heats",
      template.heats.filter((_, i) => i !== index)
    );

  const editTimer = (value: string, index: number) => {
    setOneField(template._id!, "timers", [
      ...template.timers.map((time, i) => (i === index ? Number(value) : time)),
    ]);
  };

  return { addHeat, removeHeat, editTimer };
}

export function templateTitleHelpers(
  editing: boolean,
  template: Template,
  functions: CollectionFunctions<Template>,
  setEditing: (editing: boolean) => void
) {
  const navigate = useNavigate();
  const { setOne, setOneField, removeOne } = functions;
  const templateID = template._id!;

  const getTitle = () => {
    if (editing) return template.templateTitle || "";
    else return template.templateTitle || "Unnamed Template";
  };

  const rename = (templateTitle: string) => {
    setOneField(templateID, "templateTitle", templateTitle);
  };

  const onDelete = () => {
    client.service("api/templates").remove(templateID);
    navigate("..");
    removeOne(templateID);
  };

  const onSave = async () => {
    const updatedTemplate = await client
      .service("api/templates")
      .update(templateID, template);
    setOne(templateID, updatedTemplate);
    setEditing(false);
  };

  const onCancel = async () => {
    const unedited: Template = await client
      .service("api/templates")
      .get(templateID);
    if (!unedited.templateTitle && !unedited.heats.length) {
      onDelete();
      setEditing(false);
    } else {
      setOne(templateID, unedited);
      setEditing(false);
    }
  };

  return { getTitle, rename, onDelete, onSave, onCancel };
}

export function capitalise(s: string) {
  return s[0].toUpperCase() + s.slice(1);
}

export function formatTemplateLevel(level: string, isNew?: boolean) {
  return `${isNew ? "New " : ""}${capitalise(level)} School Template`;
}
