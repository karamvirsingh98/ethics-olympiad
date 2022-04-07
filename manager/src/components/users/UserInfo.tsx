import { User } from "@ethics-olympiad/types";
import { RemoveOne, SetOneField } from "../../state/hooks/useCollection";
import Switch from "../util/Switch";
import { useState } from "react";
import { client } from "../../main";

export default function UserInfo({
  user,
  removeOne,
  setOneField,
}: {
  user: User;
  removeOne: RemoveOne;
  setOneField: SetOneField<User>;
}) {
  const [confirm, set] = useState(false);

  const deleteUser = () => {
    if (!confirm) set(true);
    else {
      client.service("api/users").remove(user._id!);
      removeOne(user._id!);
      set(false);
    }
  };

  const updateAdmin = async () => {
    await client.service("api/users").patch(user._id!, { admin: !user.admin });
    setOneField(user._id, "admin", !user.admin);
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: "2rem" }}>{user.name}</div>
        <button
          className="red"
          style={{ fontSize: "0.8rem" }}
          onClick={deleteUser}
        >
          {confirm ? "Confirm" : "Delete"}
        </button>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        Has Admin Privelidges
        <Switch active={user.admin} onClick={updateAdmin} />
      </div>
      <div>{`Email: ${user.email}`}</div>
      <div>
        {user.createdAt &&
          `Member Since: ${formatDate(new Date(user.createdAt))}`}
      </div>
    </div>
  );
}

function formatDate(date: Date) {
  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
}
