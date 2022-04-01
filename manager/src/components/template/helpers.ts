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
  template: Template,
  functions: CollectionFunctions<Template>,
  setEditing: (editing: boolean) => void
) {
  const { setOne, setOneField, removeOne } = functions;
  const navigate = useNavigate()

  const getTitle = () => {
    return template.templateTitle || "Name this template";
  };

  const rename = (templateTitle: string) => {
    setOneField(template._id!, "templateTitle", templateTitle);
  };

  const onDelete = async () => {
    await client.service("api/templates").remove(template._id!);
    removeOne(template._id!);
    navigate("..")
  };

  const onSave = async () => {
    const updatedTemplate = await client
      .service("api/templates")
      .update(template._id!, template);
    setOne(template._id!, updatedTemplate);
    setEditing(false);
  };

  const onCancel = async () => {
    setOne(
      template._id!,
      await client.service("api/templates").get(template._id!)
    );
    setEditing(false);
  };

  return { getTitle, rename, onDelete, onSave, onCancel };
}
