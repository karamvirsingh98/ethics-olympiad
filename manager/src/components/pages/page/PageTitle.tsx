import { ReactNode } from "react";
import Conditional from "../../util/Conditional";
import Input from "../../util/Input";

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
      <Conditional
        condition={editing}
        showTrue={
          <Input
            id="event-title"
            style={{ fontSize: "2rem" }}
            defaultValue={title}
            onConfirm={rename}
          />
        }
        showFalse={
          <div style={{ borderBottom: "solid 0.25rem transparent" }}>
            {title}
          </div>
        }
      />
      {element}
    </div>
  );
}
