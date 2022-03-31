import { Template } from "@ethics-olympiad/types";
import { SetOneField } from "../../state/hooks/useCollection";

export default function templateHelpers(
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
