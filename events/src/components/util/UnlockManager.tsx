import { Fragment, ReactNode } from "react";

export default function UnlockManager({
  unlocked,
  isUnlocked,
  notUnlocked,
}: {
  unlocked: boolean;
  isUnlocked: ReactNode;
  notUnlocked: ReactNode;
}) {
  if (unlocked) return <Fragment> {isUnlocked} </Fragment>;
  else return <Fragment> {notUnlocked} </Fragment>;
}
