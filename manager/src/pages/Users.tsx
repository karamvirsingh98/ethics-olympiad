import { useEffect, useState } from "react";
import { client } from "../main";
import UserComponent from "../components/users/User";
import Divider from "../components/util/Divider";
import useCollection from "../state/hooks/useCollection";
import { Invite, User } from "@ethics-olympiad/types";
import InviteComponent from "../components/invites/Invite";
import InvitesHeader from "../components/invites/InvitesHeader";

export default function Users({ currentUserID }: { currentUserID: string }) {
  const [users, functions] = useCollection<User>("users");
  const userIDs =
    users && Object.keys(users).filter((u) => u !== currentUserID);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr auto 2fr",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "2rem",
          maxHeight: "85vh",
          height: "fit-content",
          overflowY: "scroll",
        }}
      >
        <div style={{ fontSize: "1.5rem" }}>All Users:</div>
        {userIDs &&
          userIDs.map((id) => (
            <UserComponent key={id} user={users[id]} functions={functions} />
          ))}
      </div>
      <Divider vertical />
      <Invites />
    </div>
  );
}

function Invites() {
  const [invites, set] = useState<Invite[]>();
  useEffect(() => {
    client.service("api/invite").find().then(set);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        maxHeight: "85vh",
        height: "fit-content",
        overflowY: "scroll",
      }}
    >
      <InvitesHeader onConfirmInvite={set} />
      {invites &&
        invites.map((invite) => (
          <InviteComponent key={invite.key} invite={invite} onDelete={set} />
        ))}
    </div>
  );
}
