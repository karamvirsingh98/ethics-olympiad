import { Invite } from "@ethics-olympiad/types";
import { useState } from "react";
import { client } from "../../main";
import Conditional from "../util/Conditional";
import Input from "../util/Input";

export default function InvitesHeader({
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
  