import { Fragment, ReactNode } from "react";

export default function IfElse({
  showIf,
  showTrue,
  showFalse,
}: {
  showIf: boolean;
  showTrue: ReactNode;
  showFalse: ReactNode;
}) {
  if (showIf) return <Fragment> {showTrue} </Fragment>;
  else return <Fragment> {showFalse} </Fragment>;
}
