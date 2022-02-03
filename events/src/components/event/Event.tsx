import { Fragment, ReactNode } from "react";
import { useParams } from "react-router-dom";
import useUnlock from "../../state/hooks/useUnlock";
import Unlock from "./Unlock";

export default function Event() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  
  return (
    <UnlockManager
      unlocked={unlocked}
      isUnlocked={<div> </div>}
      notUnlocked={<Unlock eventID={eventID!} onUnlock={(event) => unlock(eventID!)} />}
    />
  );
}

function UnlockManager({
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
