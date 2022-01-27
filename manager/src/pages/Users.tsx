import { Fragment, useEffect, useState } from "react";
import { client } from "..";
import UserComponent from "../components/users/User";
import Conditional from "../components/util/Conditional";
import Divider from "../components/util/Divider";
import Input from "../components/util/Input";
import useCollection from "../state/hooks/useCollection";
import { Invite, User } from "../state/types";

export default function Users({ currentUserID }: { currentUserID: string }) {
  const [users, { removeOne }] = useCollection<User>("users");
  const userIDs =
    users && Object.keys(users).filter((u) => u !== currentUserID);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "2fr auto 1fr",
        gap: "2rem",
      }}
    >
      <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
        All Users:
        {userIDs &&
          userIDs.map((id) => <UserComponent key={id} user={users[id]} />)}
      </div>
      <Divider vertical />
      <Invites />
    </div>
  );
}

function Invites() {
  const [invites, set] = useState<Invite[]>();
  useEffect(() => {
    client
      .service("api/invite")
      .find()
      .then(console.log);
  }, []);

  return (
    <div style={{ display: "grid", gap: "1rem", height: "fit-content" }}>
      <Header onConfirmInvite={set} />
      {invites &&
        invites.map((invite) => (
          <InviteComponent key={invite.key} invite={invite} onDelete={set} />
        ))}
    </div>
  );
}

function Header({
  onConfirmInvite,
}: {
  onConfirmInvite: (invites: Invite[]) => void;
}) {
  const [show, setShow] = useState(false);
  const [invite, setInvite] = useState({ name: "", email: "" });

  async function confirmInvite() {
    const updated = await client.service("api/invite").create(invite);
    onConfirmInvite(updated);
    setInvite({ name: "", email: "" });
  }

  function cancelInvite() {
    setInvite({ name: "", email: "" });
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        paddingBottom: "1rem",
        borderBottom: "solid 2px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ fontSize: "1.5rem", borderBottom: "solid 1px transparent" }}
        >
          Invites
        </div>
        <NewInviteButtons
          show={show}
          toggle={() => setShow(!show)}
          confirm={confirmInvite}
          cancel={cancelInvite}
        />
      </div>
      {show && (
        <NewInvite
          setName={(name) => setInvite({ ...invite, name })}
          setEmail={(email) => setInvite({ ...invite, email })}
        />
      )}
    </div>
  );
}

function NewInvite({
  setName,
  setEmail,
}: {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
}) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1rem" }}
    >
      <Input placeholder="Name" onChange={setName} />
      <Input placeholder="Email" onChange={setEmail} />
    </div>
  );
}

function NewInviteButtons({
  show,
  toggle,
  confirm,
  cancel,
}: {
  show: boolean;
  toggle: () => void;
  confirm: () => void;
  cancel: () => void;
}) {
  return (
    <Conditional
      condition={show}
      showTrue={
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className="orange"
            style={{ fontSize: "1rem" }}
            onClick={() => {
              cancel();
              toggle();
            }}
          >
            Cancel
          </button>
          <button
            className="green"
            style={{ fontSize: "1rem" }}
            onClick={() => {
              confirm();
              toggle();
            }}
          >
            Confirm
          </button>
        </div>
      }
      showFalse={
        <button className="green" style={{ fontSize: "1rem" }} onClick={toggle}>
          New Invite
        </button>
      }
    />
  );
}

function InviteComponent({
  invite,
  onDelete,
}: {
  invite: Invite;
  onDelete: (invites: Invite[]) => void;
}) {
  return (
    <div>
      <div>{invite.name}</div>
      <div>{invite.email}</div>
      <div>Invite URL: http://localhost:3030/signup/{invite.key}</div>
    </div>
  );
}
