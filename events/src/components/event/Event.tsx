import { Fragment, ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import useUnlock, { useUnlockedEvent } from "../../state/hooks/useUnlock";
import { Event } from "../../state/types";
import Unlock from "./Unlock";

export default function EventComponent() {
  const { eventID } = useParams();
  const { unlocked, unlock } = useUnlock(eventID!);
  const { event, set } = useUnlockedEvent(eventID!)

  return (
    <UnlockManager
      unlocked={unlocked}
      isUnlocked={<div> {event?.title} </div>}
      notUnlocked={<Unlock eventID={eventID!} onUnlock={set} />}
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
