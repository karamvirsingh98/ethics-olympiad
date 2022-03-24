import { Invite } from "@ethics-olympiad/types";
import { client } from "../../main";

export default function InviteComponent({
  invite,
  onDelete,
}: {
  invite: Invite;
  onDelete: (invites: Invite[]) => void;
}) {

	const deleteInvite = async () => {
		const invites = await client.service('api/invite').remove(invite.key)
		onDelete(invites)
	}

  return (
    <div className="invite grey-flat">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "1.25rem" }}>{invite.name}</div>
        <div style={{ opacity: 0.8 }}>{invite.email}</div>
        <button className="red" style={{ fontSize: "0.8rem" }}>
          Delete
        </button>
      </div>
      <div>Invite URL: http://localhost:3000/signup/{invite.key}</div>
    </div>
  );
}
