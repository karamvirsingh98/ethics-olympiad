import { ReactNode } from "react";

export default function PageTitle({ title, element }: { title: string, element?: ReactNode}) {
  return (
    <div className="page-title">
      {title}
      {element}
    </div>
  );
}