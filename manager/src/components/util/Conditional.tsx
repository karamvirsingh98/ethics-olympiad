import { Fragment, ReactNode } from "react";

export default function Conditional({ condition, showTrue, showFalse }: { condition: boolean, showTrue: ReactNode, showFalse: ReactNode}) {
  if (condition) return <Fragment> {showTrue} </Fragment>; 
  else return <Fragment> {showFalse} </Fragment>;
}