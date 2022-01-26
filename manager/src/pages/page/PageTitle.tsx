import { ReactNode } from "react";
import Conditional from "../../components/util/Conditional";
import Input from "../../components/util/Input";
import ToggleInput from "../../components/util/ToggleInput";

export default function PageTitle({
  editing,
  title,
  rename,
  element,
}: {
  editing: boolean,
  title: string;
  rename: (name: string) => void
  element?: ReactNode;
}) {
  return (
    <div className="page-title">
      <ToggleInput editing={editing} value={title} fontSize="1.75rem" onEdit={rename} />
      {element}
    </div>
  );
}
